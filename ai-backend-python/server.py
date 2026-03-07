"""
VAANI Production Server - Python FastAPI
High-performance server with language detection and persistence
"""

import os
import json
import time
from datetime import datetime
from typing import Dict, Optional, List
from collections import defaultdict

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
from dotenv import load_dotenv

from language_detector import detect_language, get_language_prompt, get_fallback_response
from data_indexer import DataIndexer
from intent_classifier import IntentClassifier

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="VAANI AI Backend", version="2.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AWS Bedrock client
bedrock_client = boto3.client(
    'bedrock-runtime',
    region_name=os.getenv('AWS_REGION', 'us-east-1'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

# Initialize data indexer
indexer = DataIndexer('../ai-backend/training-dataset.json')

# Initialize intent classifier
intent_classifier = IntentClassifier()

# Conversation memory with language persistence
conversation_memory: Dict[str, Dict] = {}
MAX_CONVERSATION_HISTORY = 10
MAX_MEMORY_SIZE = 10000

# API call statistics
api_stats = {
    'total': 0,
    'cached': 0,
    'training': 0,
    'bedrock': 0,
    'fallback': 0,
    'by_language': {'english': 0, 'hindi': 0, 'hinglish': 0},
    'last_reset': datetime.now().isoformat()
}

# Simple in-memory cache
response_cache: Dict[str, str] = {}


# Request/Response models
class ChatRequest(BaseModel):
    message: str
    userId: Optional[str] = 'anonymous'
    sessionId: Optional[str] = None


class ChatResponse(BaseModel):
    role: str
    content: str
    language: str
    detectedLanguage: Optional[str] = None
    preferredLanguage: Optional[str] = None
    source: str
    intent: Optional[str] = None
    intentConfidence: Optional[float] = None
    entities: Optional[Dict] = None


@app.on_event("startup")
async def startup_event():
    """Initialize on startup"""
    indexer.initialize()
    print('\n🎤 ========================================')
    print('   VAANI Production Server (Python)')
    print('   ========================================')
    print(f'   Port: {os.getenv("PORT", 5000)}')
    print('   Mode: High-Performance')
    print('   Languages: English, Hindi, Hinglish')
    stats = indexer.get_stats()
    print(f'   Training Data: {stats["totalConversations"]} conversations')
    print('   Features:')
    print('   ✅ Language Detection')
    print('   ✅ Data Indexing')
    print('   ✅ Language Persistence')
    print('   ✅ Smart Caching')
    print('   ========================================\n')


def cleanup_memory():
    """Cleanup old conversation memory"""
    if len(conversation_memory) > MAX_MEMORY_SIZE:
        # Sort by last update time
        sorted_sessions = sorted(
            conversation_memory.items(),
            key=lambda x: x[1]['context']['lastUpdate'],
            reverse=True
        )
        
        # Keep only most recent half
        conversation_memory.clear()
        for session_id, data in sorted_sessions[:MAX_MEMORY_SIZE // 2]:
            conversation_memory[session_id] = data
        
        print(f"🧹 Memory cleanup: {len(sorted_sessions)} → {len(conversation_memory)}")


def update_language_preference(session: Dict, detected_language: str) -> str:
    """
    Update user's language preference based on history
    
    Args:
        session: User session data
        detected_language: Currently detected language
        
    Returns:
        Preferred language for response
    """
    context = session['context']
    context['lastDetectedLanguage'] = detected_language
    context['lastUpdate'] = time.time()
    context['messageCount'] += 1
    
    # Track language history (last 5 messages)
    context['languageHistory'].append(detected_language)
    if len(context['languageHistory']) > 5:
        context['languageHistory'].pop(0)
    
    # Count language occurrences
    language_counts = defaultdict(int)
    for lang in context['languageHistory']:
        language_counts[lang] += 1
    
    # Find most used language
    most_used_language = max(language_counts.items(), key=lambda x: x[1])[0]
    
    # Update preferred language if consistent (3+ messages)
    if language_counts[most_used_language] >= 3:
        context['preferredLanguage'] = most_used_language
    
    return context['preferredLanguage']


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint with language detection and persistence"""
    try:
        user_msg = request.message.strip()
        user_id = request.userId or 'anonymous'
        session_id = request.sessionId or user_id
        
        if not user_msg:
            raise HTTPException(status_code=400, detail="Empty message")
        
        print(f"\n📩 [{session_id}] {user_msg}")
        api_stats['total'] += 1
        
        # STEP 1: Detect language with user preference memory
        detected_language = detect_language(user_msg)
        api_stats['by_language'][detected_language] += 1
        
        # Initialize or get conversation session
        if session_id not in conversation_memory:
            conversation_memory[session_id] = {
                'messages': [],
                'context': {
                    'preferredLanguage': detected_language,
                    'lastDetectedLanguage': detected_language,
                    'languageHistory': [detected_language],
                    'lastUpdate': time.time(),
                    'messageCount': 0
                }
            }
        
        session = conversation_memory[session_id]
        response_language = update_language_preference(session, detected_language)
        
        print(f"🌐 Detected: {detected_language} | Preferred: {response_language} | "
              f"History: {session['context']['languageHistory']}")
        
        # STEP 1.5: Classify intent using NLP model
        intent, intent_confidence, intent_details = intent_classifier.classify_intent(user_msg)
        entities = intent_classifier.extract_entities(user_msg, intent)
        
        print(f"🎯 Intent: {intent} (confidence: {intent_confidence:.2f})")
        if entities:
            print(f"📋 Entities: {entities}")
        
        # Define cache key
        cache_key = f"{response_language}:{user_msg}"
        
        # STEP 2: Check training data (exact match) - HIGHEST PRIORITY
        exact_match = indexer.find_exact_match(user_msg)
        
        if exact_match:
            match_language = indexer._detect_language_from_category(exact_match['category'])
            
            if match_language == response_language:
                api_stats['training'] += 1
                response_cache[cache_key] = exact_match['assistant']
                
                session['messages'].append({'role': 'user', 'content': user_msg})
                session['messages'].append({'role': 'assistant', 'content': exact_match['assistant']})
                
                print(f"📚 Training EXACT match ({response_language})")
                
                return ChatResponse(
                    role="assistant",
                    content=exact_match['assistant'],
                    language=response_language,
                    detectedLanguage=detected_language,
                    preferredLanguage=response_language,
                    source="training_exact",
                    intent=intent,
                    intentConfidence=intent_confidence,
                    entities=entities
                )
        
        # STEP 3: Check training data (similar match)
        similar_matches = indexer.find_similar(user_msg, response_language, 3)
        
        if similar_matches:
            best_match = similar_matches[0]
            
            print(f"📚 Training SIMILAR match ({response_language})")
            
            api_stats['training'] += 1
            response_cache[cache_key] = best_match['assistant']
            
            session['messages'].append({'role': 'user', 'content': user_msg})
            session['messages'].append({'role': 'assistant', 'content': best_match['assistant']})
            
            return ChatResponse(
                role="assistant",
                content=best_match['assistant'],
                language=response_language,
                detectedLanguage=detected_language,
                preferredLanguage=response_language,
                source="training_similar",
                intent=intent,
                intentConfidence=intent_confidence,
                entities=entities
            )
        
        # STEP 4: Check cache
        if cache_key in response_cache:
            api_stats['cached'] += 1
            cached_response = response_cache[cache_key]
            
            session['messages'].append({'role': 'user', 'content': user_msg})
            session['messages'].append({'role': 'assistant', 'content': cached_response})
            
            print(f"💾 Cache HIT ({response_language})")
            
            return ChatResponse(
                role="assistant",
                content=cached_response,
                language=response_language,
                detectedLanguage=detected_language,
                preferredLanguage=response_language,
                source="cache",
                intent=intent,
                intentConfidence=intent_confidence,
                entities=entities
            )
        
        # STEP 5: Call Bedrock API (FALLBACK ONLY)
        try:
            # Use intent-aware prompt
            intent_template = intent_classifier.get_intent_response_template(intent, response_language)
            language_prompt = get_language_prompt(response_language)
            
            # Combine intent understanding with language prompt
            enhanced_prompt = f"{language_prompt}\n\nUser Intent: {intent}\nEntities: {entities}\n\nProvide a helpful response in {response_language}."
            
            # Build messages with conversation history
            messages = []
            for msg in session['messages'][-6:]:
                messages.append({
                    'role': msg['role'],
                    'content': [{'text': msg['content']}]
                })
            
            # Add current message
            messages.append({
                'role': 'user',
                'content': [{'text': f"{enhanced_prompt}\n\nUser: {user_msg}\n\nVAANI (respond in {response_language}):"}]
            })
            
            payload = {
                'messages': messages,
                'inferenceConfig': {
                    'maxTokens': 250,
                    'temperature': 0.8,
                    'topP': 0.9
                }
            }
            
            response = bedrock_client.invoke_model(
                modelId="us.amazon.nova-lite-v1:0",
                contentType="application/json",
                accept="application/json",
                body=json.dumps(payload)
            )
            
            response_body = json.loads(response['body'].read())
            ai_response = response_body['output']['message']['content'][0]['text'].strip()
            ai_response = ai_response.replace('VAANI:', '').replace('Assistant:', '').strip()
            
            # Validate response language
            response_detected_lang = detect_language(ai_response)
            if response_detected_lang != response_language:
                print(f"⚠️ Language mismatch: expected {response_language}, got {response_detected_lang}")
                ai_response = get_fallback_response(user_msg, response_language)
            
            api_stats['bedrock'] += 1
            response_cache[cache_key] = ai_response
            
            session['messages'].append({'role': 'user', 'content': user_msg})
            session['messages'].append({'role': 'assistant', 'content': ai_response})
            
            # Maintain history limit
            if len(session['messages']) > MAX_CONVERSATION_HISTORY * 2:
                session['messages'] = session['messages'][-MAX_CONVERSATION_HISTORY * 2:]
            
            print(f"🤖 Bedrock API ({response_language})")
            
            return ChatResponse(
                role="assistant",
                content=ai_response,
                language=response_language,
                detectedLanguage=detected_language,
                preferredLanguage=response_language,
                source="bedrock",
                intent=intent,
                intentConfidence=intent_confidence,
                entities=entities
            )
            
        except Exception as api_error:
            print(f"⚠️ Bedrock Error: {str(api_error)}")
            
            # STEP 6: Fallback
            fallback_response = get_fallback_response(user_msg, response_language)
            api_stats['fallback'] += 1
            
            response_cache[cache_key] = fallback_response
            
            session['messages'].append({'role': 'user', 'content': user_msg})
            session['messages'].append({'role': 'assistant', 'content': fallback_response})
            
            print(f"🔄 Fallback ({response_language})")
            
            return ChatResponse(
                role="assistant",
                content=fallback_response,
                language=response_language,
                detectedLanguage=detected_language,
                preferredLanguage=response_language,
                source="fallback",
                intent=intent,
                intentConfidence=intent_confidence,
                entities=entities
            )
        
        # Cleanup memory periodically
        if api_stats['total'] % 100 == 0:
            cleanup_memory()
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Server Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Server error occurred")


@app.get("/health")
async def health():
    """Health check endpoint"""
    stats = indexer.get_stats()
    intent_stats = intent_classifier.get_stats()
    return {
        'status': 'healthy',
        'mode': 'production-python-nlp',
        'features': {
            'languageDetection': True,
            'dataIndexing': True,
            'languagePersistence': True,
            'caching': True,
            'intentClassification': True,
            'entityExtraction': True,
            'semanticUnderstanding': True
        },
        'languages': ['english', 'hindi', 'hinglish'],
        'trainingData': stats,
        'intentClassifier': intent_stats
    }


@app.get("/stats")
async def stats():
    """Statistics endpoint"""
    stats = indexer.get_stats()
    uptime = (datetime.now() - datetime.fromisoformat(api_stats['last_reset'])).total_seconds()
    
    total = api_stats['total'] or 1  # Avoid division by zero
    
    return {
        'uptime': f"{int(uptime / 60)} minutes",
        'apiCalls': api_stats,
        'indexer': stats,
        'activeSessions': len(conversation_memory),
        'cacheSize': len(response_cache),
        'performance': {
            'cacheHitRate': f"{(api_stats['cached'] / total) * 100:.2f}%",
            'trainingHitRate': f"{(api_stats['training'] / total) * 100:.2f}%",
            'apiCallRate': f"{(api_stats['bedrock'] / total) * 100:.2f}%",
            'costSavings': f"{((api_stats['cached'] + api_stats['training'] + api_stats['fallback']) / total) * 100:.2f}%"
        }
    }


@app.post("/clear-conversation")
async def clear_conversation(request: ChatRequest):
    """Clear conversation history"""
    session_id = request.sessionId or request.userId or 'anonymous'
    if session_id in conversation_memory:
        del conversation_memory[session_id]
    return {'success': True, 'message': 'Conversation cleared'}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv('PORT', 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
