"""
Language Detection Module
Detects user's language and ensures response in same language
"""

import re
from typing import Dict, List

# Hinglish keywords for detection
HINGLISH_KEYWORDS = [
    # Greetings
    'namaste', 'namaskar', 'pranam', 'ram ram',
    # Question words
    'kya', 'kaise', 'kahan', 'kaun', 'kab', 'kyun', 'kyu', 'kitna', 'kitne',
    # Common verbs
    'hai', 'hain', 'ho', 'tha', 'the', 'thi', 'hoga', 'hogi', 'hoge',
    'kare', 'karo', 'karein', 'karna', 'karne', 'karta', 'karti', 'karte',
    'chahiye', 'chahie', 'chahta', 'chahti', 'chahte',
    # Pronouns
    'aap', 'aapka', 'aapki', 'aapke', 'mere', 'mera', 'meri', 'mujhe', 'mujhko',
    'tum', 'tumhara', 'tumhari', 'tumhe', 'tumko', 'tera', 'teri', 'tere',
    'main', 'mai', 'hum', 'humara', 'humari', 'yeh', 'woh', 'ye', 'wo',
    # Common words
    'nahi', 'nahin', 'haan', 'ha', 'ji', 'bhi', 'aur', 'ya', 'par', 'lekin',
    'bahut', 'bohot', 'zyada', 'jyada', 'kam', 'thoda', 'kuch', 'koi',
    'deta', 'dete', 'deti', 'leta', 'lete', 'leti', 'krna', 'kre', 'lrna',
    'wajah', 'jabki', 'usse', 'kaun', 'se', 'baat', 'kr', 'rha', 'rhi',
    # Civic words
    'problem', 'issue', 'complaint', 'shikayat', 'madad', 'help',
    'sadak', 'paani', 'pani', 'bijli', 'light', 'kachra', 'garbage',
    'area', 'gali', 'mohalla', 'sector', 'block'
]


def detect_language(message: str) -> str:
    """
    Detect language from user message
    
    Args:
        message: User's message
        
    Returns:
        'english', 'hindi', or 'hinglish'
    """
    text = message.strip()
    
    # Check for Devanagari script (Hindi)
    devanagari_pattern = re.compile(r'[\u0900-\u097F]')
    if devanagari_pattern.search(text):
        return 'hindi'
    
    # Check for Hinglish words
    lower_text = text.lower()
    words = [w for w in lower_text.split() if w]
    
    if not words:
        return 'english'
    
    # Count Hinglish words
    hinglish_word_count = sum(1 for word in words if word in HINGLISH_KEYWORDS)
    
    # If at least 2 Hinglish words OR more than 25% of words are Hinglish
    if hinglish_word_count >= 2 or (hinglish_word_count > 0 and hinglish_word_count / len(words) > 0.25):
        return 'hinglish'
    
    # Default to English
    return 'english'


def get_language_prompt(language: str) -> str:
    """
    Get language-specific system prompt
    
    Args:
        language: Detected language
        
    Returns:
        System prompt for that language
    """
    prompts = {
        'english': """You are VAANI, a Voice-First AI civic assistant. 
CRITICAL RULE: User is speaking in ENGLISH. You MUST respond ONLY in ENGLISH.
- Use clear, professional English
- Be helpful and empathetic
- Provide step-by-step guidance
- Keep responses concise (10-15 words per sentence)
- Never mix languages - ENGLISH ONLY""",

        'hindi': """आप VAANI हैं, एक Voice-First AI civic assistant।
महत्वपूर्ण नियम: उपयोगकर्ता हिंदी में बोल रहा है। आपको केवल हिंदी (देवनागरी) में जवाब देना है।
- स्पष्ट, औपचारिक हिंदी का उपयोग करें
- सहायक और सहानुभूतिपूर्ण रहें
- चरण-दर-चरण मार्गदर्शन दें
- संक्षिप्त उत्तर दें (10-15 शब्द प्रति वाक्य)
- कभी भी भाषाएं न मिलाएं - केवल हिंदी""",

        'hinglish': """Aap VAANI hain, ek Voice-First AI civic assistant.
CRITICAL RULE: User Hinglish (Roman Hindi) mein bol raha hai. Aapko SIRF Hinglish mein jawab dena hai.
- Natural Hinglish use karein (Hindi words in Roman script)
- Helpful aur empathetic rahein
- Step-by-step guidance dein
- Short responses (10-15 words per sentence)
- Kabhi bhi pure English ya pure Hindi mat use karein - ONLY Hinglish"""
    }
    
    return prompts.get(language, prompts['english'])


def get_fallback_response(message: str, language: str) -> str:
    """
    Get fallback response in correct language
    
    Args:
        message: User's message
        language: Target language
        
    Returns:
        Fallback response in appropriate language
    """
    lower_msg = message.lower()
    
    responses = {
        'english': {
            'greeting': "Hello! I'm Vaani, your civic assistant. I can help you report issues like potholes, water problems, or garbage collection. What do you need help with?",
            'help': "I can help you report civic complaints, track your issues, and access government services. You can say things like 'report an issue' or 'track my complaint'. What would you like to do?",
            'vaani': "Vaani is a civic engagement platform where you can report problems in your area like road damage, water supply issues, or garbage collection. You can file complaints, track their status, and get volunteer support.",
            'report': "To report an issue: Say 'report an issue' and I'll open the form. You can report potholes, water leaks, broken streetlights, garbage problems, or any civic issue.",
            'track': "To track your complaint: Say 'track my complaint' and I'll show you all your reported issues with their current status.",
            'default': "I'm here to help with civic issues. You can report problems, track complaints, or ask me questions about Vaani. What would you like to know?"
        },
        'hindi': {
            'greeting': "नमस्ते! मैं वाणी हूँ, आपकी नागरिक सहायक। मैं आपको गड्ढे, पानी की समस्या, या कचरा संग्रह जैसी समस्याओं की रिपोर्ट करने में मदद कर सकती हूँ। आपको किस चीज़ में मदद चाहिए?",
            'help': "मैं आपको नागरिक शिकायतें दर्ज करने, आपके मुद्दों को ट्रैक करने और सरकारी सेवाओं तक पहुँचने में मदद कर सकती हूँ। आप क्या करना चाहेंगे?",
            'vaani': "वाणी एक नागरिक जुड़ाव मंच है जहाँ आप अपने क्षेत्र में सड़क क्षति, पानी की आपूर्ति, या कचरा संग्रह जैसी समस्याओं की रिपोर्ट कर सकते हैं।",
            'report': "समस्या की रिपोर्ट करने के लिए: 'शिकायत दर्ज करें' कहें और मैं फॉर्म खोल दूंगी। आप गड्ढे, पानी के रिसाव, टूटी स्ट्रीटलाइट रिपोर्ट कर सकते हैं।",
            'track': "अपनी शिकायत ट्रैक करने के लिए: 'मेरी शिकायत ट्रैक करें' कहें और मैं आपको आपकी सभी रिपोर्ट की गई समस्याओं की स्थिति दिखाऊंगी।",
            'default': "मैं नागरिक मुद्दों में मदद के लिए यहाँ हूँ। आप समस्याओं की रिपोर्ट कर सकते हैं या मुझसे वाणी के बारे में सवाल पूछ सकते हैं।"
        },
        'hinglish': {
            'greeting': "Namaste! Main Vaani hoon, aapki civic assistant. Main aapko potholes, paani ki problem, ya garbage collection jaise issues report karne mein madad kar sakti hoon. Aapko kis cheez mein madad chahiye?",
            'help': "Main aapko civic complaints file karne, issues track karne, aur government services access karne mein madad kar sakti hoon. Aap kya karna chahenge?",
            'vaani': "Vaani ek civic engagement platform hai jahan aap apne area mein road damage, water supply, ya garbage collection jaise problems report kar sakte hain.",
            'report': "Issue report karne ke liye: 'report an issue' kahiye aur main aapke liye form khol dungi. Aap potholes, water leaks, broken streetlights report kar sakte hain.",
            'track': "Apni complaint track karne ke liye: 'track my complaint' kahiye aur main aapko aapki sabhi reported issues ki status dikhaungi.",
            'default': "Main civic issues mein help ke liye yahan hoon. Aap problems report kar sakte hain, complaints track kar sakte hain, ya mujhse Vaani ke baare mein questions pooch sakte hain."
        }
    }
    
    lang_responses = responses.get(language, responses['english'])
    
    # Check for specific keywords
    if re.search(r'^(hello|hi|hey|namaste|नमस्ते)$', lower_msg, re.IGNORECASE):
        return lang_responses['greeting']
    
    if 'help' in lower_msg or 'madad' in lower_msg or 'मदद' in lower_msg:
        return lang_responses['help']
    
    if 'vaani' in lower_msg or 'वाणी' in lower_msg:
        return lang_responses['vaani']
    
    if 'report' in lower_msg or 'complaint' in lower_msg or 'शिकायत' in lower_msg:
        return lang_responses['report']
    
    if 'track' in lower_msg or 'status' in lower_msg or 'ट्रैक' in lower_msg:
        return lang_responses['track']
    
    return lang_responses['default']
