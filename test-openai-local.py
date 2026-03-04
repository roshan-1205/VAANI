#!/usr/bin/env python3
"""
Local test script for OpenAI integration
Tests the AI response logic before deploying to Lambda
"""

import os
from datetime import datetime

# Set your OpenAI API key
os.environ['OPENAI_API_KEY'] = 'sk-proj-SwimqMrmBJD6ixekq1xqHbPMhTY3GPNZ-4RJ3YvGuNYKGNHaSij-sp6TOwedFxrExVImMhvPmQT3BlbkFJwWR0QswLVQ8V3QET3C8TdgV0BhOx2NgXLro8Na8urHD0AJMFhsbYiuEOQEqakNYhFLa6LKdLsAYou'

try:
    import openai
except ImportError:
    print("❌ OpenAI library not installed")
    print("Run: pip install openai==0.28.1")
    exit(1)

def test_openai_integration():
    """Test OpenAI integration with sample queries"""
    
    print("=" * 60)
    print("VAANI OpenAI Integration Test")
    print("=" * 60)
    print()
    
    # Set API key
    openai.api_key = os.environ.get('OPENAI_API_KEY')
    
    # Determine greeting
    current_hour = datetime.now().hour
    if 5 <= current_hour < 12:
        greeting_time = "Good Morning"
    elif 12 <= current_hour < 17:
        greeting_time = "Good Afternoon"
    elif 17 <= current_hour < 21:
        greeting_time = "Good Evening"
    else:
        greeting_time = "Good Night"
    
    print(f"Current time greeting: {greeting_time}")
    print()
    
    # System prompt
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

GREETING BEHAVIOR:
Current time greeting: {greeting_time}

DOMAIN RESTRICTION (STRICT):
You MUST only respond to civic issues: Roads, drainage, garbage, street lights, water supply, public sanitation, municipal complaints, infrastructure problems, complaint tracking, dashboard guidance, volunteer support, Vaani platform features.

If question is outside civic scope: Politely refuse and redirect to civic examples.

VOICE ASSISTANT MODE:
• Short sentences
• Conversational tone
• Keep responses under 100 words for voice

RESPONSE STYLE: Professional, Calm, Empathetic, Civic-focused, Context-aware, Emotion-aware"""
    
    # Test cases
    test_cases = [
        {
            "name": "English - Pothole Report",
            "query": "How do I report a pothole on my street?",
            "expected": "civic guidance"
        },
        {
            "name": "Hindi - Water Problem",
            "query": "मेरे इलाके में पानी की समस्या है",
            "expected": "Hindi response about water issue"
        },
        {
            "name": "English - Angry Tone",
            "query": "This is ridiculous! The garbage hasn't been collected for a week!",
            "expected": "empathetic, calming response"
        },
        {
            "name": "Out of Domain - Movie",
            "query": "What's the latest movie in theaters?",
            "expected": "polite refusal, redirect to civic topics"
        },
        {
            "name": "English - Confused User",
            "query": "I'm not sure how to use this platform",
            "expected": "simple step-by-step guidance"
        }
    ]
    
    for i, test in enumerate(test_cases, 1):
        print(f"Test {i}: {test['name']}")
        print(f"Query: {test['query']}")
        print(f"Expected: {test['expected']}")
        print()
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": test['query']}
                ],
                max_tokens=150,
                temperature=0.7,
                top_p=0.9,
                frequency_penalty=0.5,
                presence_penalty=0.3
            )
            
            ai_response = response.choices[0].message.content.strip()
            tokens_used = response.usage.total_tokens
            
            print(f"✓ Response: {ai_response}")
            print(f"  Tokens used: {tokens_used}")
            print()
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            print()
    
    print("=" * 60)
    print("✓ Test Complete!")
    print("=" * 60)
    print()
    print("If all tests passed, you're ready to deploy!")
    print("Run: ./deploy-openai.ps1")

if __name__ == "__main__":
    test_openai_integration()
