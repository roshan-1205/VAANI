"""
Lightweight Intent Classification Module
Uses keyword matching and word similarity (no heavy ML dependencies)
"""

from typing import Dict, List, Tuple, Optional
from collections import Counter
import re


class IntentClassifier:
    """
    Lightweight intent classifier using keyword matching and word similarity
    Fast, efficient, no heavy dependencies
    """
    
    def __init__(self):
        """Initialize intent classifier with keyword patterns"""
        print("🤖 Loading lightweight intent classifier...")
        
        # Define intent categories with keywords and patterns
        self.intents = {
            'report_issue': {
                'keywords': [
                    'report', 'complaint', 'issue', 'problem', 'file', 'register', 'want', 'to',
                    'shikayat', 'darz', 'karna', 'karni', 'समस्या', 'शिकायत', 'दर्ज', 'करनी', 'है'
                ],
                'patterns': [
                    r'\b(report|file|register)\s+(a|an)?\s*(complaint|issue|problem|pothole)',
                    r'\b(want|need)\s+to\s+(report|file)',
                    r'\b(shikayat|complaint)\s+(darz|karna|karni)',
                    r'\bproblem\s+(hai|report)',
                    r'\bissue\s+(hai|report)',
                    r'शिकायत.*दर्ज',
                    r'दर्ज.*करनी'
                ],
                'weight': 1.0
            },
            'track_complaint': {
                'keywords': [
                    'track', 'status', 'check', 'where', 'find', 'locate', 'is', 'my',
                    'kahan', 'kya', 'hai', 'देखना', 'स्थिति', 'कहाँ', 'देखनी'
                ],
                'patterns': [
                    r'\b(track|check|where)\s+(is|my)?\s*(complaint|status)',
                    r'\bwhere\s+is',
                    r'\b(complaint|shikayat)\s+(ka)?\s*(status|kahan)',
                    r'\bstatus\s+(check|kya|hai)',
                    r'\bkahan\s+hai',
                    r'स्थिति.*देखनी',
                    r'देखनी.*है'
                ],
                'weight': 1.0
            },
            'get_help': {
                'keywords': [
                    'help', 'guide', 'how', 'assist', 'support', 'need',
                    'madad', 'chahiye', 'kaise', 'मदद', 'सहायता', 'चाहिए'
                ],
                'patterns': [
                    r'\b(need|want)\s+help',
                    r'\bhow\s+to',
                    r'\b(madad|help)\s+(chahiye|karo)',
                    r'\bkaise\s+(use|kare)',
                    r'मदद.*चाहिए',
                    r'चाहिए'
                ],
                'weight': 1.0
            },
            'greeting': {
                'keywords': [
                    'hello', 'hi', 'hey', 'namaste', 'good', 'morning', 'evening',
                    'नमस्ते', 'हैलो', 'हाय'
                ],
                'patterns': [
                    r'^(hello|hi|hey|namaste)',
                    r'\bgood\s+(morning|evening|afternoon)',
                    r'^(नमस्ते|हैलो)'
                ],
                'weight': 1.2
            },
            'about_vaani': {
                'keywords': [
                    'vaani', 'about', 'what', 'platform', 'system',
                    'kya', 'hai', 'बारे', 'वाणी'
                ],
                'patterns': [
                    r'\b(what|tell)\s+(is|me|about)\s+vaani',
                    r'\bvaani\s+(kya|hai)',
                    r'\babout\s+(this|vaani|platform)'
                ],
                'weight': 1.0
            },
            'volunteer_request': {
                'keywords': [
                    'volunteer', 'call', 'support', 'help', 'connect',
                    'chahiye', 'karo', 'स्वयंसेवक', 'सहायता'
                ],
                'patterns': [
                    r'\b(need|want)\s+(volunteer|support|call)',
                    r'\b(volunteer|call)\s+(chahiye|karo)',
                    r'\bconnect\s+(me|with)'
                ],
                'weight': 1.0
            },
            'road_issue': {
                'keywords': [
                    'road', 'pothole', 'street', 'damage', 'crack',
                    'sadak', 'tut', 'gayi', 'गड्ढा', 'सड़क', 'टूटी'
                ],
                'patterns': [
                    r'\b(pothole|road)\s+(on|in|problem)',
                    r'\b(sadak|road)\s+(tut|damage|broken)',
                    r'\bpothole\s+hai'
                ],
                'weight': 1.1
            },
            'water_issue': {
                'keywords': [
                    'water', 'supply', 'leak', 'shortage', 'tap',
                    'paani', 'pani', 'nahi', 'aa', 'raha', 'पानी', 'जल'
                ],
                'patterns': [
                    r'\b(water|paani)\s+(supply|problem|nahi|leak)',
                    r'\b(no|nahi)\s+(water|paani)',
                    r'\bpaani\s+(nahi|kam)'
                ],
                'weight': 1.1
            },
            'electricity_issue': {
                'keywords': [
                    'electricity', 'power', 'light', 'cut', 'outage',
                    'bijli', 'nahi', 'hai', 'बिजली', 'विद्युत'
                ],
                'patterns': [
                    r'\b(power|electricity)\s+(cut|outage|problem)',
                    r'\b(bijli|power)\s+(nahi|cut)',
                    r'\bno\s+(power|electricity|bijli)'
                ],
                'weight': 1.1
            },
            'garbage_issue': {
                'keywords': [
                    'garbage', 'trash', 'waste', 'collection', 'smell',
                    'kachra', 'kuda', 'uthaya', 'कचरा', 'कूड़ा'
                ],
                'patterns': [
                    r'\b(garbage|trash)\s+(not|nahi|collection)',
                    r'\b(kachra|garbage)\s+(nahi|uthaya)',
                    r'\bgarbage\s+problem'
                ],
                'weight': 1.1
            }
        }
        
        print(f"✅ Loaded {len(self.intents)} intent categories")
    
    def _normalize_text(self, text: str) -> str:
        """Normalize text for matching"""
        return text.lower().strip()
    
    def _count_keyword_matches(self, query: str, keywords: List[str]) -> int:
        """Count how many keywords match in query"""
        query_lower = self._normalize_text(query)
        # Extract both ASCII and Unicode words
        query_words = set(re.findall(r'\w+', query_lower, re.UNICODE))
        
        matches = 0
        for keyword in keywords:
            keyword_lower = keyword.lower()
            # Exact word match
            if keyword_lower in query_words:
                matches += 1
            # Substring match in query (for Hindi/Devanagari)
            elif keyword_lower in query_lower:
                matches += 0.8
            # Partial match for compound words
            elif any(keyword_lower in word for word in query_words):
                matches += 0.5
        
        return matches
    
    def _check_patterns(self, query: str, patterns: List[str]) -> bool:
        """Check if any regex pattern matches"""
        query_lower = self._normalize_text(query)
        for pattern in patterns:
            if re.search(pattern, query_lower):
                return True
        return False
    
    def classify_intent(self, query: str, threshold: float = 0.25) -> Tuple[str, float, Dict]:
        """
        Classify user intent using keyword matching and patterns
        
        Args:
            query: User's query
            threshold: Minimum confidence threshold
            
        Returns:
            Tuple of (intent, confidence, details)
        """
        query_normalized = self._normalize_text(query)
        # Use Unicode-aware word extraction
        query_words = re.findall(r'\w+', query_normalized, re.UNICODE)
        query_word_count = len(query_words)
        
        if query_word_count == 0:
            return 'unknown', 0.0, {'method': 'keyword_matching'}
        
        # Calculate scores for each intent
        intent_scores = {}
        
        for intent, data in self.intents.items():
            # Count keyword matches
            keyword_matches = self._count_keyword_matches(query, data['keywords'])
            
            # Check pattern matches (bonus)
            pattern_match = self._check_patterns(query, data['patterns'])
            
            # Calculate score
            keyword_score = keyword_matches / max(query_word_count, len(data['keywords']))
            pattern_bonus = 0.3 if pattern_match else 0.0
            
            # Apply weight
            total_score = (keyword_score + pattern_bonus) * data['weight']
            
            intent_scores[intent] = total_score
        
        # Get best intent
        if not intent_scores:
            return 'unknown', 0.0, {'method': 'keyword_matching'}
        
        best_intent = max(intent_scores.items(), key=lambda x: x[1])
        intent_name, confidence = best_intent
        
        # Check if confidence is above threshold
        if confidence < threshold:
            intent_name = 'unknown'
            confidence = 0.0
        
        details = {
            'all_scores': intent_scores,
            'confidence': confidence,
            'threshold': threshold,
            'method': 'keyword_matching'
        }
        
        return intent_name, confidence, details
    
    def extract_entities(self, query: str, intent: str) -> Dict[str, str]:
        """
        Extract entities based on intent
        
        Args:
            query: User's query
            intent: Classified intent
            
        Returns:
            Dictionary of extracted entities
        """
        entities = {}
        query_lower = self._normalize_text(query)
        
        # Location extraction
        location_keywords = ['area', 'sector', 'block', 'gali', 'mohalla', 'near', 'paas', 'में']
        for keyword in location_keywords:
            if keyword in query_lower:
                # Simple extraction
                words = query.split()
                for i, word in enumerate(words):
                    if keyword in word.lower() and i + 1 < len(words):
                        entities['location'] = ' '.join(words[i:min(i+3, len(words))])
                        break
        
        # Issue type extraction for civic issues
        if intent in ['road_issue', 'water_issue', 'electricity_issue', 'garbage_issue']:
            issue_types = {
                'road_issue': ['pothole', 'damage', 'crack', 'गड्ढा', 'टूटी', 'tut'],
                'water_issue': ['leak', 'supply', 'shortage', 'रिसाव', 'कमी', 'nahi'],
                'electricity_issue': ['cut', 'outage', 'meter', 'कटौती', 'मीटर', 'nahi'],
                'garbage_issue': ['collection', 'smell', 'overflow', 'संग्रह', 'गंध', 'uthaya']
            }
            
            for issue_type in issue_types.get(intent, []):
                if issue_type in query_lower:
                    entities['issue_type'] = issue_type
                    break
        
        # Urgency detection
        urgency_keywords = ['urgent', 'emergency', 'immediately', 'turant', 'तुरंत', 'आपातकाल', 'jaldi']
        for keyword in urgency_keywords:
            if keyword in query_lower:
                entities['urgency'] = 'high'
                break
        
        return entities
    
    def get_intent_response_template(self, intent: str, language: str) -> str:
        """
        Get response template based on intent and language
        
        Args:
            intent: Classified intent
            language: User's language
            
        Returns:
            Response template
        """
        templates = {
            'english': {
                'report_issue': "I understand you want to report an issue. Let me help you file a complaint. What type of problem is it?",
                'track_complaint': "I can help you track your complaint. Please provide your complaint ID or tell me what issue you reported.",
                'get_help': "I'm here to help! You can report civic issues, track complaints, or get information about government services. What would you like to do?",
                'greeting': "Hello! I'm Vaani, your civic assistant. How can I help you today?",
                'about_vaani': "Vaani is a civic engagement platform where you can report issues like potholes, water problems, or garbage collection. You can also track your complaints and get volunteer support.",
                'volunteer_request': "I can connect you with a volunteer who will help you. Please tell me what assistance you need.",
                'road_issue': "I see you have a road-related issue. Let me help you report this pothole/damage. Where is it located?",
                'water_issue': "I understand there's a water supply problem. Let me help you report this. Can you provide more details about the issue?",
                'electricity_issue': "I see you're facing an electricity problem. Let me help you report this. What exactly is the issue?",
                'garbage_issue': "I understand there's a garbage collection issue. Let me help you report this. Where is the problem located?",
                'unknown': "I'm not sure I understood that correctly. Could you please rephrase? I can help you report issues, track complaints, or answer questions about Vaani."
            },
            'hindi': {
                'report_issue': "मैं समझती हूँ कि आप एक समस्या की रिपोर्ट करना चाहते हैं। मैं शिकायत दर्ज करने में मदद करूँगी। किस प्रकार की समस्या है?",
                'track_complaint': "मैं आपकी शिकायत ट्रैक करने में मदद कर सकती हूँ। कृपया अपनी शिकायत ID बताएं या बताएं कि आपने क्या समस्या रिपोर्ट की थी।",
                'get_help': "मैं मदद के लिए यहाँ हूँ! आप नागरिक समस्याओं की रिपोर्ट कर सकते हैं, शिकायतें ट्रैक कर सकते हैं, या सरकारी सेवाओं के बारे में जानकारी प्राप्त कर सकते हैं। आप क्या करना चाहेंगे?",
                'greeting': "नमस्ते! मैं वाणी हूँ, आपकी नागरिक सहायक। मैं आज आपकी कैसे मदद कर सकती हूँ?",
                'about_vaani': "वाणी एक नागरिक जुड़ाव मंच है जहाँ आप गड्ढे, पानी की समस्या, या कचरा संग्रह जैसी समस्याओं की रिपोर्ट कर सकते हैं। आप अपनी शिकायतों को ट्रैक भी कर सकते हैं।",
                'volunteer_request': "मैं आपको एक स्वयंसेवक से जोड़ सकती हूँ जो आपकी मदद करेगा। कृपया बताएं कि आपको किस सहायता की आवश्यकता है।",
                'road_issue': "मैं देख रही हूँ कि आपको सड़क से संबंधित समस्या है। मैं इस गड्ढे/क्षति की रिपोर्ट करने में मदद करूँगी। यह कहाँ स्थित है?",
                'water_issue': "मैं समझती हूँ कि पानी की आपूर्ति में समस्या है। मैं इसकी रिपोर्ट करने में मदद करूँगी। क्या आप समस्या के बारे में अधिक विवरण दे सकते हैं?",
                'electricity_issue': "मैं देख रही हूँ कि आपको बिजली की समस्या है। मैं इसकी रिपोर्ट करने में मदद करूँगी। वास्तव में क्या समस्या है?",
                'garbage_issue': "मैं समझती हूँ कि कचरा संग्रह में समस्या है। मैं इसकी रिपोर्ट करने में मदद करूँगी। समस्या कहाँ है?",
                'unknown': "मुझे यकीन नहीं है कि मैंने सही समझा। क्या आप कृपया दोबारा बता सकते हैं? मैं समस्याओं की रिपोर्ट करने, शिकायतों को ट्रैक करने, या वाणी के बारे में सवालों के जवाब देने में मदद कर सकती हूँ।"
            },
            'hinglish': {
                'report_issue': "Main samajh gayi ki aap ek issue report karna chahte hain. Main complaint file karne mein madad karungi. Kis type ki problem hai?",
                'track_complaint': "Main aapki complaint track karne mein madad kar sakti hoon. Please apni complaint ID bataiye ya bataiye ki aapne kya issue report kiya tha.",
                'get_help': "Main help ke liye yahan hoon! Aap civic issues report kar sakte hain, complaints track kar sakte hain, ya government services ke baare mein jaankari le sakte hain. Aap kya karna chahenge?",
                'greeting': "Namaste! Main Vaani hoon, aapki civic assistant. Main aaj aapki kaise madad kar sakti hoon?",
                'about_vaani': "Vaani ek civic engagement platform hai jahan aap potholes, paani ki problem, ya garbage collection jaise issues report kar sakte hain. Aap apni complaints track bhi kar sakte hain.",
                'volunteer_request': "Main aapko ek volunteer se connect kar sakti hoon jo aapki madad karega. Please bataiye ki aapko kis assistance ki zarurat hai.",
                'road_issue': "Main dekh rahi hoon ki aapko road se related issue hai. Main is pothole/damage ki report karne mein madad karungi. Yeh kahan located hai?",
                'water_issue': "Main samajh gayi ki paani ki supply mein problem hai. Main isko report karne mein madad karungi. Kya aap issue ke baare mein aur details de sakte hain?",
                'electricity_issue': "Main dekh rahi hoon ki aapko bijli ki problem hai. Main isko report karne mein madad karungi. Exactly kya issue hai?",
                'garbage_issue': "Main samajh gayi ki garbage collection mein issue hai. Main isko report karne mein madad karungi. Problem kahan hai?",
                'unknown': "Mujhe sure nahi hai ki maine sahi samjha. Kya aap please dobara bata sakte hain? Main issues report karne, complaints track karne, ya Vaani ke baare mein questions answer karne mein madad kar sakti hoon."
            }
        }
        
        lang_templates = templates.get(language, templates['english'])
        return lang_templates.get(intent, lang_templates['unknown'])
    
    def get_stats(self) -> Dict:
        """Get classifier statistics"""
        total_keywords = sum(len(data['keywords']) for data in self.intents.values())
        total_patterns = sum(len(data['patterns']) for data in self.intents.values())
        
        return {
            'type': 'lightweight_keyword_matching',
            'intents': len(self.intents),
            'total_keywords': total_keywords,
            'total_patterns': total_patterns,
            'supported_languages': ['english', 'hindi', 'hinglish'],
            'dependencies': 'none (built-in only)'
        }
