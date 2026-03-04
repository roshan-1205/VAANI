"""
VAANI Voice Processing Lambda Handler
Handles voice-to-text (Transcribe) and text-to-voice (Polly) processing
Uses Mangum to adapt FastAPI to AWS Lambda
"""

import json
import os
import time
import uuid
import base64
import logging
from typing import Dict, Any, Optional
from datetime import datetime

import boto3
from botocore.exceptions import ClientError
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel, Field
from mangum import Mangum

# Configure logging
logger = logging.getLogger()
logger.setLevel(os.environ.get('LOG_LEVEL', 'INFO'))

# Initialize AWS clients
REGION = os.environ.get('AWS_REGION_NAME', 'us-east-1')
BUCKET_NAME = os.environ.get('AUDIO_BUCKET_NAME')

transcribe_client = boto3.client('transcribe', region_name=REGION)
polly_client = boto3.client('polly', region_name=REGION)
s3_client = boto3.client('s3', region_name=REGION)

# Initialize FastAPI app
app = FastAPI(
    title="VAANI Voice API",
    description="Voice-first public service platform - Voice processing API",
    version="2.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class VoiceRequest(BaseModel):
    """Request model for voice processing"""
    audio_base64: str = Field(..., description="Base64 encoded audio data")
    language_code: str = Field(default="en-US", description="Language code for transcription")
    voice_id: str = Field(default="Joanna", description="Polly voice ID for synthesis")
    
class TranscribeStatusRequest(BaseModel):
    """Request model for checking transcription status"""
    job_name: str = Field(..., description="Transcription job name")

class SynthesizeRequest(BaseModel):
    """Request model for text-to-speech synthesis"""
    text: str = Field(..., description="Text to synthesize")
    voice_id: str = Field(default="Joanna", description="Polly voice ID")
    language_code: str = Field(default="en-US", description="Language code")


# Helper functions
def upload_audio_to_s3(audio_data: bytes, file_extension: str = "webm") -> str:
    """
    Upload audio data to S3 bucket
    
    Args:
        audio_data: Raw audio bytes
        file_extension: File extension (webm, mp3, wav, etc.)
    
    Returns:
        S3 URI of uploaded file
    """
    if not BUCKET_NAME:
        raise ValueError("AUDIO_BUCKET_NAME environment variable not set")
    
    file_key = f"input/{uuid.uuid4().hex}.{file_extension}"
    
    try:
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=file_key,
            Body=audio_data,
            ContentType=f"audio/{file_extension}",
            Metadata={
                'uploaded_at': datetime.utcnow().isoformat(),
                'source': 'vaani-voice-api'
            }
        )
        
        s3_uri = f"s3://{BUCKET_NAME}/{file_key}"
        logger.info(f"Audio uploaded to S3: {s3_uri}")
        return s3_uri
    
    except ClientError as e:
        logger.error(f"Failed to upload audio to S3: {str(e)}")
        raise HTTPException(status_code=500, detail=f"S3 upload failed: {str(e)}")


def start_transcription(s3_uri: str, language_code: str = "en-US") -> str:
    """
    Start AWS Transcribe job
    
    Args:
        s3_uri: S3 URI of audio file
        language_code: Language code for transcription
    
    Returns:
        Transcription job name
    """
    job_name = f"vaani-{uuid.uuid4().hex[:12]}"
    
    try:
        transcribe_client.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': s3_uri},
            MediaFormat='webm',  # Adjust based on actual format
            LanguageCode=language_code,
            Settings={
                'ShowSpeakerLabels': False,
                'MaxSpeakerLabels': 2,
            }
        )
        
        logger.info(f"Started transcription job: {job_name}")
        return job_name
    
    except ClientError as e:
        logger.error(f"Failed to start transcription: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


def get_transcription_result(job_name: str, max_wait_seconds: int = 120) -> Optional[str]:
    """
    Poll for transcription result with timeout
    
    Args:
        job_name: Transcription job name
        max_wait_seconds: Maximum time to wait for completion
    
    Returns:
        Transcribed text or None if timeout
    """
    start_time = time.time()
    
    while (time.time() - start_time) < max_wait_seconds:
        try:
            response = transcribe_client.get_transcription_job(
                TranscriptionJobName=job_name
            )
            
            status = response['TranscriptionJob']['TranscriptionJobStatus']
            
            if status == 'COMPLETED':
                transcript_uri = response['TranscriptionJob']['Transcript']['TranscriptFileUri']
                
                # Fetch transcript from S3
                import urllib.request
                with urllib.request.urlopen(transcript_uri) as response:
                    transcript_data = json.loads(response.read())
                
                text = transcript_data['results']['transcripts'][0]['transcript']
                logger.info(f"Transcription completed: {text[:100]}...")
                
                # Clean up transcription job
                try:
                    transcribe_client.delete_transcription_job(TranscriptionJobName=job_name)
                except:
                    pass
                
                return text
            
            elif status == 'FAILED':
                logger.error(f"Transcription job failed: {job_name}")
                raise HTTPException(status_code=500, detail="Transcription job failed")
            
            # Wait before polling again
            time.sleep(2)
        
        except ClientError as e:
            logger.error(f"Error checking transcription status: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Transcription check failed: {str(e)}")
    
    logger.warning(f"Transcription timeout for job: {job_name}")
    return None


def process_text_with_ai(text: str) -> str:
    """
    Process text with conversational AI
    Maintains conversation context for natural dialogue
    """
    import urllib.request
    import urllib.error
    
    logger.info(f"Processing text with conversational AI: {text[:100]}")
    
    # Get AI backend URL
    ai_backend_url = os.environ.get('AI_BACKEND_URL', 'http://localhost:5000/chat')
    
    # Generate session ID (could be from user context in production)
    session_id = os.environ.get('SESSION_ID', 'voice-session-default')
    
    try:
        # Call the conversational AI backend
        request_data = json.dumps({
            "message": text,
            "sessionId": session_id,
            "userId": "voice-user"
        }).encode('utf-8')
        
        req = urllib.request.Request(
            ai_backend_url,
            data=request_data,
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req, timeout=15) as response:
            result = json.loads(response.read())
            ai_response = result.get('content', '')
            logger.info(f"Conversational AI response: {ai_response[:100]}")
            return ai_response
    
    except urllib.error.URLError as e:
        logger.error(f"Failed to connect to AI backend: {str(e)}")
        return get_conversational_fallback(text)
    except Exception as e:
        logger.error(f"AI processing error: {str(e)}")
        return get_conversational_fallback(text)


def get_conversational_fallback(text: str) -> str:
    """
    Clean, direct fallback - NO UNWANTED DATA
    """
    text_lower = text.lower()
    
    # Detect language
    is_hindi = any(c in text for c in 'ािीुूेैोौंःँ') or \
               any(word in text_lower for word in ['hai', 'kya', 'kahan', 'kaise', 'mein'])
    
    # Greetings - SHORT
    if any(word in text_lower for word in ['hello', 'hi', 'hey']):
        return "Hi! What's the problem?"
    
    if any(word in text_lower for word in ['नमस्ते', 'नमस्कार', 'हेलो']):
        return "हाँ बोलो, क्या problem है?"
    
    # Help - DIRECT
    if text_lower == 'help':
        return "What's the problem?"
    
    if any(word in text_lower for word in ['मदद', 'सहायता']):
        return "क्या problem है?"
    
    # Road - DIRECT QUESTIONS
    if any(word in text_lower for word in ['road', 'pothole', 'street']):
        return "Where? Since when?"
    
    if any(word in text_lower for word in ['सड़क', 'गड्ढा']):
        return "कहाँ है? कब से?"
    
    # Water - DIRECT
    if any(word in text_lower for word in ['water', 'supply', 'tap']):
        return "Since how many days? Where?"
    
    if any(word in text_lower for word in ['पानी']):
        return "कितने दिन से? कहाँ?"
    
    # Electricity - DIRECT
    if any(word in text_lower for word in ['electricity', 'power', 'light', 'current']):
        return "What's the issue? No power?"
    
    if any(word in text_lower for word in ['बिजली']):
        return "क्या problem है? नहीं आ रही?"
    
    # Garbage - DIRECT
    if any(word in text_lower for word in ['garbage', 'waste', 'trash', 'sanitation']):
        return "Where? Not collected?"
    
    if any(word in text_lower for word in ['कचरा']):
        return "कहाँ? नहीं उठा रहे?"
    
    # Streetlights - DIRECT
    if any(word in text_lower for word in ['streetlight', 'street light', 'lamp']):
        return "Where?"
    
    if any(word in text_lower for word in ['बत्ती']):
        return "कहाँ?"
    
    # Drainage - DIRECT
    if any(word in text_lower for word in ['drainage', 'drain', 'sewer']):
        return "Where? Blocked?"
    
    if any(word in text_lower for word in ['नाली']):
        return "कहाँ? बंद है?"
    
    # Complaint - DIRECT
    if any(word in text_lower for word in ['complaint', 'file', 'submit']):
        if is_hindi:
            return "किस problem की?"
        return "For what problem?"
    
    if any(word in text_lower for word in ['शिकायत']):
        return "किस चीज़ की?"
    
    # Default - MINIMAL
    if is_hindi:
        return "समझा। और?"
    return "Got it. What else?"


def synthesize_speech(text: str, voice_id: str = "Joanna", language_code: str = "en-US") -> bytes:
    """
    Convert text to speech using Amazon Nova Sonic
    Falls back to Polly if Nova Sonic is unavailable
    
    Args:
        text: Text to synthesize
        voice_id: Voice ID (Nova Sonic or Polly compatible)
        language_code: Language code
    
    Returns:
        Audio data as bytes
    """
    try:
        # Try Amazon Nova Sonic first (latest generative AI voice model)
        logger.info("Attempting synthesis with Amazon Nova Sonic")
        
        # Initialize Bedrock Runtime client for Nova Sonic
        bedrock_client = boto3.client('bedrock-runtime', region_name=REGION)
        
        # Prepare Nova Sonic request
        nova_payload = {
            "text": text,
            "voice": voice_id,
            "languageCode": language_code,
            "outputFormat": "mp3",
            "sampleRate": 24000,
            "engine": "generative"
        }
        
        # Invoke Nova Sonic model
        response = bedrock_client.invoke_model(
            modelId='amazon.nova-sonic-v1:0',
            contentType='application/json',
            accept='audio/mpeg',
            body=json.dumps(nova_payload)
        )
        
        audio_data = response['body'].read()
        logger.info(f"Nova Sonic synthesized {len(audio_data)} bytes of audio")
        
        return audio_data
        
    except Exception as nova_error:
        # Fallback to Polly if Nova Sonic fails
        logger.warning(f"Nova Sonic failed: {str(nova_error)}, falling back to Polly")
        
        try:
            response = polly_client.synthesize_speech(
                Text=text,
                OutputFormat='mp3',
                VoiceId=voice_id,
                LanguageCode=language_code,
                Engine='neural'  # Use neural engine for better quality
            )
            
            audio_data = response['AudioStream'].read()
            logger.info(f"Polly synthesized {len(audio_data)} bytes (fallback)")
            
            return audio_data
        
        except ClientError as e:
            logger.error(f"Failed to synthesize speech: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Speech synthesis failed: {str(e)}")


def save_audio_to_s3(audio_data: bytes) -> str:
    """
    Save synthesized audio to S3
    
    Args:
        audio_data: Audio bytes
    
    Returns:
        S3 URI of saved file
    """
    if not BUCKET_NAME:
        raise ValueError("AUDIO_BUCKET_NAME environment variable not set")
    
    file_key = f"output/{uuid.uuid4().hex}.mp3"
    
    try:
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=file_key,
            Body=audio_data,
            ContentType="audio/mpeg",
            Metadata={
                'generated_at': datetime.utcnow().isoformat(),
                'source': 'vaani-polly'
            }
        )
        
        # Generate presigned URL (valid for 1 hour)
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': BUCKET_NAME, 'Key': file_key},
            ExpiresIn=3600
        )
        
        logger.info(f"Audio saved to S3: {file_key}")
        return url
    
    except ClientError as e:
        logger.error(f"Failed to save audio to S3: {str(e)}")
        raise HTTPException(status_code=500, detail=f"S3 save failed: {str(e)}")


# API Routes
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "VAANI Voice API",
        "status": "running",
        "version": "2.0.0",
        "region": REGION,
        "bucket": BUCKET_NAME
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "transcribe": "available",
            "polly": "available",
            "s3": "available"
        }
    }


@app.post("/voice")
async def process_voice(request: VoiceRequest):
    """
    Main voice processing endpoint
    
    Flow:
    1. Receive audio (base64)
    2. Upload to S3
    3. Start Transcribe job
    4. Wait for transcription
    5. Process text with AI
    6. Synthesize response with Polly
    7. Save to S3
    8. Return audio URL
    """
    try:
        logger.info("Processing voice request")
        
        # Step 1: Decode audio
        audio_data = base64.b64decode(request.audio_base64)
        logger.info(f"Decoded audio: {len(audio_data)} bytes")
        
        # Step 2: Upload to S3
        s3_uri = upload_audio_to_s3(audio_data, "webm")
        
        # Step 3: Start transcription
        job_name = start_transcription(s3_uri, request.language_code)
        
        # Step 4: Wait for transcription result
        transcribed_text = get_transcription_result(job_name)
        
        if not transcribed_text:
            raise HTTPException(status_code=408, detail="Transcription timeout")
        
        # Step 5: Process with AI (placeholder)
        response_text = process_text_with_ai(transcribed_text)
        
        # Step 6: Synthesize speech
        audio_response = synthesize_speech(response_text, request.voice_id, request.language_code)
        
        # Step 7: Save to S3 and get URL
        audio_url = save_audio_to_s3(audio_response)
        
        # Step 8: Return response
        return JSONResponse(content={
            "success": True,
            "transcribed_text": transcribed_text,
            "response_text": response_text,
            "audio_url": audio_url,
            "job_name": job_name
        })
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in voice processing: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/synthesize")
async def synthesize_text(request: SynthesizeRequest):
    """
    Text-to-speech synthesis endpoint
    Returns audio directly as response
    """
    try:
        logger.info(f"Synthesizing text: {request.text[:50]}...")
        
        # Synthesize speech
        audio_data = synthesize_speech(request.text, request.voice_id, request.language_code)
        
        # Return audio directly
        return Response(
            content=audio_data,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "inline; filename=speech.mp3"
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Synthesis error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Synthesis failed: {str(e)}")


@app.post("/transcribe/status")
async def check_transcription_status(request: TranscribeStatusRequest):
    """
    Check status of a transcription job
    """
    try:
        response = transcribe_client.get_transcription_job(
            TranscriptionJobName=request.job_name
        )
        
        job = response['TranscriptionJob']
        status = job['TranscriptionJobStatus']
        
        result = {
            "job_name": request.job_name,
            "status": status,
            "language_code": job.get('LanguageCode'),
        }
        
        if status == 'COMPLETED':
            transcript_uri = job['Transcript']['TranscriptFileUri']
            import urllib.request
            with urllib.request.urlopen(transcript_uri) as resp:
                transcript_data = json.loads(resp.read())
            result['transcript'] = transcript_data['results']['transcripts'][0]['transcript']
        
        return JSONResponse(content=result)
    
    except ClientError as e:
        raise HTTPException(status_code=404, detail=f"Job not found: {str(e)}")


# AWS Lambda handler using Mangum
handler = Mangum(app, lifespan="off")
