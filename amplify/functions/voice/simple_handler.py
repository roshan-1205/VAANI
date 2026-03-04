"""
VAANI Voice Processing Lambda Handler (Simplified)
Direct Lambda handler without FastAPI
"""

import json
import os
import time
import uuid
import base64
import logging
from typing import Dict, Any
from datetime import datetime

import boto3
from botocore.exceptions import ClientError

# Configure logging
logger = logging.getLogger()
logger.setLevel(os.environ.get('LOG_LEVEL', 'INFO'))

# Initialize AWS clients
REGION = os.environ.get('AWS_REGION_NAME', 'us-east-1')
BUCKET_NAME = os.environ.get('AUDIO_BUCKET_NAME')

transcribe_client = boto3.client('transcribe', region_name=REGION)
polly_client = boto3.client('polly', region_name=REGION)
s3_client = boto3.client('s3', region_name=REGION)


def handler(event, context):
    """
    Main Lambda handler
    Routes requests based on path
    """
    logger.info(f"Event: {json.dumps(event)}")
    
    # Handle API Gateway proxy integration
    path = event.get('path', event.get('rawPath', '/'))
    http_method = event.get('httpMethod', event.get('requestContext', {}).get('http', {}).get('method', 'GET'))
    
    # CORS headers
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
    }
    
    # Handle OPTIONS for CORS
    if http_method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Route based on path
        if path == '/' or path == '/health':
            return handle_health(headers)
        elif path == '/voice' and http_method == 'POST':
            return handle_voice(event, headers)
        elif path == '/synthesize' and http_method == 'POST':
            return handle_synthesize(event, headers)
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Not found'})
            }
    
    except Exception as e:
        logger.error(f"Error: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }


def handle_health(headers):
    """Health check endpoint"""
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'service': 'VAANI Voice API',
            'version': '2.0.0',
            'region': REGION,
            'bucket': BUCKET_NAME
        })
    }


def handle_voice(event, headers):
    """
    Main voice processing endpoint
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        audio_base64 = body.get('audio_base64')
        language_code = body.get('language_code', 'en-US')
        voice_id = body.get('voice_id', 'Joanna')
        
        if not audio_base64:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'audio_base64 is required'})
            }
        
        logger.info("Processing voice request")
        
        # Step 1: Decode audio
        audio_data = base64.b64decode(audio_base64)
        logger.info(f"Decoded audio: {len(audio_data)} bytes")
        
        # Step 2: Upload to S3
        s3_uri = upload_audio_to_s3(audio_data)
        
        # Step 3: Start transcription
        job_name = start_transcription(s3_uri, language_code)
        
        # Step 4: Wait for transcription
        transcribed_text = get_transcription_result(job_name)
        
        if not transcribed_text:
            return {
                'statusCode': 408,
                'headers': headers,
                'body': json.dumps({'error': 'Transcription timeout'})
            }
        
        # Step 5: Process with AI (placeholder)
        response_text = process_text_with_ai(transcribed_text)
        
        # Step 6: Synthesize speech
        audio_response = synthesize_speech(response_text, voice_id, language_code)
        
        # Step 7: Save to S3 and get URL
        audio_url = save_audio_to_s3(audio_response)
        
        # Return response
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'success': True,
                'transcribed_text': transcribed_text,
                'response_text': response_text,
                'audio_url': audio_url,
                'job_name': job_name
            })
        }
    
    except Exception as e:
        logger.error(f"Voice processing error: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }


def handle_synthesize(event, headers):
    """Text-to-speech synthesis endpoint"""
    try:
        body = json.loads(event.get('body', '{}'))
        text = body.get('text')
        voice_id = body.get('voice_id', 'Joanna')
        language_code = body.get('language_code', 'en-US')
        
        if not text:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'text is required'})
            }
        
        audio_data = synthesize_speech(text, voice_id, language_code)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'audio/mpeg',
                'Access-Control-Allow-Origin': '*',
            },
            'body': base64.b64encode(audio_data).decode('utf-8'),
            'isBase64Encoded': True
        }
    
    except Exception as e:
        logger.error(f"Synthesis error: {str(e)}", exc_info=True)
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }


def upload_audio_to_s3(audio_data: bytes) -> str:
    """Upload audio to S3"""
    file_key = f"input/{uuid.uuid4().hex}.webm"
    
    s3_client.put_object(
        Bucket=BUCKET_NAME,
        Key=file_key,
        Body=audio_data,
        ContentType="audio/webm"
    )
    
    s3_uri = f"s3://{BUCKET_NAME}/{file_key}"
    logger.info(f"Audio uploaded: {s3_uri}")
    return s3_uri


def start_transcription(s3_uri: str, language_code: str) -> str:
    """Start Transcribe job"""
    job_name = f"vaani-{uuid.uuid4().hex[:12]}"
    
    transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': s3_uri},
        MediaFormat='webm',
        LanguageCode=language_code
    )
    
    logger.info(f"Started transcription: {job_name}")
    return job_name


def get_transcription_result(job_name: str, max_wait: int = 120) -> str:
    """Poll for transcription result"""
    import urllib.request
    
    start_time = time.time()
    
    while (time.time() - start_time) < max_wait:
        response = transcribe_client.get_transcription_job(
            TranscriptionJobName=job_name
        )
        
        status = response['TranscriptionJob']['TranscriptionJobStatus']
        
        if status == 'COMPLETED':
            transcript_uri = response['TranscriptionJob']['Transcript']['TranscriptFileUri']
            
            with urllib.request.urlopen(transcript_uri) as resp:
                transcript_data = json.loads(resp.read())
            
            text = transcript_data['results']['transcripts'][0]['transcript']
            logger.info(f"Transcription completed: {text[:100]}")
            
            # Cleanup
            try:
                transcribe_client.delete_transcription_job(TranscriptionJobName=job_name)
            except:
                pass
            
            return text
        
        elif status == 'FAILED':
            logger.error(f"Transcription failed: {job_name}")
            return None
        
        time.sleep(2)
    
    logger.warning(f"Transcription timeout: {job_name}")
    return None


def process_text_with_ai(text: str) -> str:
    """
    Process text with Bedrock Nova Lite - DIRECT, NO EXTERNAL CALLS
    """
    logger.info(f"Processing with Bedrock Nova Lite: {text[:100]}")
    
    try:
        # Initialize Bedrock client
        bedrock_client = boto3.client('bedrock-runtime', region_name=REGION)
        
        # Detect language
        is_hindi = any(c in text for c in 'ािीुूेैोौंःँ') or \
                   any(word in text.lower() for word in ['hai', 'kya', 'kahan', 'mein'])
        
        # Simple, direct system prompt
        system_prompt = """You are VAANI voice assistant. 
        
RULES:
1. DIRECT answers only (1-2 sentences max)
2. If Hindi input → Hindi output ONLY
3. If English input → English output ONLY
4. NO generic responses
5. Ask follow-up questions
6. Be natural and conversational

DOMAIN: Civic issues only (roads, water, electricity, garbage, drainage, streetlights)

Examples:
User: "Hello" → "Hi! What's the problem?"
User: "नमस्ते" → "हाँ बोलो, क्या problem है?"
User: "सड़क में गड्ढा है" → "कहाँ है? कब से?"
User: "Road has pothole" → "Where? Since when?"

Now respond to user naturally and directly."""
        
        # Prepare request
        payload = {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": f"{system_prompt}\n\nUser: {text}\n\nVAANI:"}]
                }
            ],
            "inferenceConfig": {
                "maxTokens": 150,
                "temperature": 0.9,
                "topP": 0.95
            }
        }
        
        # Call Bedrock Nova Lite
        response = bedrock_client.invoke_model(
            modelId='us.amazon.nova-lite-v1:0',
            contentType='application/json',
            accept='application/json',
            body=json.dumps(payload)
        )
        
        # Parse response
        response_body = json.loads(response['body'].read())
        ai_response = response_body['output']['message']['content'][0]['text'].strip()
        
        # Clean up response
        ai_response = ai_response.replace('VAANI:', '').strip()
        
        logger.info(f"Bedrock response: {ai_response[:100]}")
        return ai_response
        
    except Exception as e:
        logger.error(f"Bedrock error: {str(e)}")
        # Use simple fallback
        return get_conversational_fallback(text)
    
    # System prompt for Vaani Voice Assistant
    system_prompt = f"""You are "Vaani Voice", the official AI assistant of the Vaani Platform.
Your role is to assist users ONLY with civic issue related topics and guidance about the Vaani platform.
You must be intelligent, emotionally aware, and context-sensitive while remaining strictly civic-focused.

LANGUAGE BEHAVIOR (VERY IMPORTANT):
1. Automatically detect the language of the user's input.
2. Respond in the SAME language.
   - English → English reply
   - Hindi → Hindi reply
3. Do not mix languages unless necessary.
4. Keep responses natural and conversational.

EMOTION DETECTION & TONE ADAPTATION:
Analyze the user's emotional tone before responding.
Detect if user is: Angry, Frustrated, Confused, Urgent, Neutral, or Appreciative

Adapt tone accordingly:
- If angry/frustrated: Acknowledge, show empathy, use calming language
- If confused: Provide simple step-by-step guidance
- If urgent: Provide quick, direct instructions
- If neutral: Professional and clear
- If appreciative: Respond politely and warmly

SMART RESPONSE LOGIC:
Before answering:
1. Identify the intent
2. Categorize the question type:
   - Complaint reporting
   - Status tracking
   - Platform usage guidance
   - Civic information
   - Volunteer support request

GREETING BEHAVIOR:
Current time greeting: {greeting_time}
Use this greeting if starting a conversation.

DOMAIN RESTRICTION (STRICT):
You MUST only respond to:
• Roads, drainage, garbage, street lights
• Water supply issues
• Public sanitation
• Municipal complaints
• Infrastructure problems
• Complaint tracking
• OTP confirmation
• Dashboard guidance
• Volunteer call support
• Vaani platform features

If question is outside civic scope:
Politely refuse in user's language and redirect to civic examples.

Never answer: Movies, Coding tutorials, Politics debates, General knowledge, Personal advice, Unrelated topics

VOICE ASSISTANT MODE:
• Short sentences
• Conversational tone
• No complex formatting
• Natural speaking rhythm
• Keep responses under 100 words for voice

RESPONSE STYLE:
• Professional
• Calm
• Empathetic
• Civic-focused
• Context-aware
• Emotion-aware
• Never leave domain

You are strictly a Civic AI Assistant for the Vaani Platform with emotional intelligence and contextual awareness."""
    
    try:
        # Prepare OpenAI API request
        request_data = json.dumps({
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text}
            ],
            "max_tokens": 150,
            "temperature": 0.7,
            "top_p": 0.9,
            "frequency_penalty": 0.5,
            "presence_penalty": 0.3
        }).encode('utf-8')
        
        # Call OpenAI API
        req = urllib.request.Request(
            'https://api.openai.com/v1/chat/completions',
            data=request_data,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {openai_api_key}'
            }
        )
        
        with urllib.request.urlopen(req, timeout=15) as response:
            result = json.loads(response.read())
            ai_response = result['choices'][0]['message']['content'].strip()
            logger.info(f"OpenAI response: {ai_response[:100]}")
            return ai_response
    
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        logger.error(f"OpenAI API HTTP error: {e.code} - {error_body}")
        return get_civic_fallback_response(text)
    except Exception as e:
        logger.error(f"OpenAI API error: {str(e)}", exc_info=True)
        return get_civic_fallback_response(text)


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
    
    # Road - DIRECT
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
        return "क्या problem है?"
    
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
    
    # Default - MINIMAL
    if is_hindi:
        return "समझा। और?"
    return "Got it. What else?"


def synthesize_speech(text: str, voice_id: str = "Joanna", language_code: str = "en-US") -> bytes:
    """
    Convert text to speech using Amazon Nova Sonic
    Falls back to Polly if Nova Sonic is unavailable
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
        logger.info(f"Nova Sonic synthesized {len(audio_data)} bytes")
        
        return audio_data
        
    except Exception as nova_error:
        # Fallback to Polly if Nova Sonic fails
        logger.warning(f"Nova Sonic failed: {str(nova_error)}, falling back to Polly")
        
        response = polly_client.synthesize_speech(
            Text=text,
            OutputFormat='mp3',
            VoiceId=voice_id,
            LanguageCode=language_code,
            Engine='neural'
        )
        
        audio_data = response['AudioStream'].read()
        logger.info(f"Polly synthesized {len(audio_data)} bytes (fallback)")
        
        return audio_data


def save_audio_to_s3(audio_data: bytes) -> str:
    """Save audio to S3 and return presigned URL"""
    file_key = f"output/{uuid.uuid4().hex}.mp3"
    
    s3_client.put_object(
        Bucket=BUCKET_NAME,
        Key=file_key,
        Body=audio_data,
        ContentType="audio/mpeg"
    )
    
    url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': BUCKET_NAME, 'Key': file_key},
        ExpiresIn=3600
    )
    
    logger.info(f"Audio saved: {file_key}")
    return url
