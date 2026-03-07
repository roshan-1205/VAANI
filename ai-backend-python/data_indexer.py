"""
Data Indexer Module
Indexes training data for fast retrieval
"""

import json
import re
from typing import List, Dict, Optional
from difflib import SequenceMatcher


class DataIndexer:
    def __init__(self, dataset_path: str = './training-dataset.json'):
        self.dataset_path = dataset_path
        self.conversations = []
        self.exact_matches = {}
        self.by_language = {'english': [], 'hindi': [], 'hinglish': []}
        self.by_category = {}
        
    def initialize(self):
        """Load and index training data"""
        print("📚 Loading training data...")
        
        with open(self.dataset_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        self.conversations = data['training_conversations']
        
        print("🔨 Building indexes...")
        
        # Build exact match index
        for conv in self.conversations:
            user_msg = conv['user'].lower().strip()
            self.exact_matches[user_msg] = conv
            
            # Index by language
            lang = self._detect_language_from_category(conv['category'])
            self.by_language[lang].append(conv)
            
            # Index by category
            category = conv['category']
            if category not in self.by_category:
                self.by_category[category] = []
            self.by_category[category].append(conv)
        
        print(f"✅ Indexed {len(self.conversations)} conversations")
        print(f"   - Languages: {len(self.by_language)}")
        print(f"   - Categories: {len(self.by_category)}")
        print(f"   - Exact matches: {len(self.exact_matches)}")
        
    def _detect_language_from_category(self, category: str) -> str:
        """Detect language from category name"""
        category_lower = category.lower()
        
        if 'english' in category_lower:
            return 'english'
        elif 'hindi' in category_lower:
            return 'hindi'
        else:
            return 'hinglish'
    
    def find_exact_match(self, query: str) -> Optional[Dict]:
        """Find exact match in training data"""
        query_lower = query.lower().strip()
        return self.exact_matches.get(query_lower)
    
    def find_similar(self, query: str, language: str, limit: int = 3) -> List[Dict]:
        """
        Find similar matches using fuzzy matching
        
        Args:
            query: User's query
            language: Target language
            limit: Maximum number of results
            
        Returns:
            List of similar conversations with scores
        """
        query_lower = query.lower().strip()
        candidates = self.by_language.get(language, [])
        
        if not candidates:
            return []
        
        # Calculate similarity scores
        scored_matches = []
        for conv in candidates:
            user_msg = conv['user'].lower().strip()
            score = SequenceMatcher(None, query_lower, user_msg).ratio()
            
            if score > 0.5:  # Minimum 50% similarity
                scored_matches.append({
                    **conv,
                    'score': score
                })
        
        # Sort by score and return top matches
        scored_matches.sort(key=lambda x: x['score'], reverse=True)
        
        if scored_matches:
            print(f"🎯 Best match score: {scored_matches[0]['score']*100:.1f}%")
        
        return scored_matches[:limit]
    
    def get_stats(self) -> Dict:
        """Get indexer statistics"""
        return {
            'totalConversations': len(self.conversations),
            'exactMatches': len(self.exact_matches),
            'categories': len(self.by_category),
            'byLanguage': {
                'english': len(self.by_language['english']),
                'hindi': len(self.by_language['hindi']),
                'hinglish': len(self.by_language['hinglish'])
            }
        }
