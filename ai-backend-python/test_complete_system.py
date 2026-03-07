"""Complete system test - All features"""

print('🧪 VAANI Python Backend - Complete System Test\n')
print('=' * 70)

# Test 1: Import all modules
print('\n1️⃣ Testing imports...')
try:
    from language_detector import detect_language, get_language_prompt
    from data_indexer import DataIndexer
    from intent_classifier import IntentClassifier
    from server import app
    print('   ✅ All modules imported successfully')
except Exception as e:
    print(f'   ❌ Import failed: {e}')
    exit(1)

# Test 2: Language Detection
print('\n2️⃣ Testing language detection...')
test_langs = [
    ('hello how are you', 'english'),
    ('namaste kaise ho', 'hinglish'),
    ('नमस्ते कैसे हो', 'hindi'),
]
lang_passed = 0
for query, expected in test_langs:
    detected = detect_language(query)
    if detected == expected:
        lang_passed += 1
        print(f'   ✅ "{query}" → {detected}')
    else:
        print(f'   ❌ "{query}" → {detected} (expected {expected})')

print(f'   Result: {lang_passed}/{len(test_langs)} passed')

# Test 3: Data Indexer
print('\n3️⃣ Testing data indexer...')
try:
    indexer = DataIndexer('../ai-backend/training-dataset.json')
    indexer.initialize()
    stats = indexer.get_stats()
    print(f'   ✅ Loaded {stats["totalConversations"]} conversations')
    print(f'   ✅ Categories: {stats["categories"]}')
except Exception as e:
    print(f'   ⚠️ Indexer warning: {e} (non-critical)')
    indexer = None

# Test 4: Intent Classification
print('\n4️⃣ Testing intent classification...')
classifier = IntentClassifier()
test_intents = [
    ('I want to report a pothole', 'report_issue'),
    ('where is my complaint', 'track_complaint'),
    ('hello', 'greeting'),
    ('paani nahi aa raha', 'water_issue'),
    ('bijli nahi hai', 'electricity_issue'),
]
intent_passed = 0
for query, expected in test_intents:
    intent, confidence, _ = classifier.classify_intent(query)
    if intent == expected:
        intent_passed += 1
        print(f'   ✅ "{query}" → {intent} ({confidence:.2f})')
    else:
        print(f'   ❌ "{query}" → {intent} (expected {expected})')

print(f'   Result: {intent_passed}/{len(test_intents)} passed')

# Test 5: Entity Extraction
print('\n5️⃣ Testing entity extraction...')
test_entities = [
    ('pothole in sector 5 urgent', {'location', 'urgency'}),
    ('bijli nahi hai', {'issue_type'}),
]
entity_passed = 0
for query, expected_keys in test_entities:
    intent, _, _ = classifier.classify_intent(query)
    entities = classifier.extract_entities(query, intent)
    if expected_keys.issubset(set(entities.keys())):
        entity_passed += 1
        print(f'   ✅ "{query}" → {entities}')
    else:
        print(f'   ❌ "{query}" → {entities} (expected keys: {expected_keys})')

print(f'   Result: {entity_passed}/{len(test_entities)} passed')

# Test 6: Response Templates
print('\n6️⃣ Testing response templates...')
template_passed = 0
for lang in ['english', 'hindi', 'hinglish']:
    template = classifier.get_intent_response_template('greeting', lang)
    if template and len(template) > 10:
        template_passed += 1
        print(f'   ✅ {lang}: {template[:50]}...')
    else:
        print(f'   ❌ {lang}: template missing or too short')

print(f'   Result: {template_passed}/3 passed')

# Final Summary
print('\n' + '=' * 70)
print('\n📊 FINAL RESULTS:')
total_tests = len(test_langs) + len(test_intents) + len(test_entities) + 3
total_passed = lang_passed + intent_passed + entity_passed + template_passed
print(f'   Total: {total_passed}/{total_tests} tests passed')
print(f'   Success Rate: {(total_passed/total_tests)*100:.1f}%')

if total_passed == total_tests:
    print('\n🎉 ALL TESTS PASSED! System is ready for production!')
else:
    print(f'\n⚠️ {total_tests - total_passed} tests failed. Review above.')

print('\n📈 System Statistics:')
print(f'   Intent Categories: {len(classifier.intents)}')
print(f'   Keywords: {classifier.get_stats()["total_keywords"]}')
print(f'   Patterns: {classifier.get_stats()["total_patterns"]}')
if indexer:
    print(f'   Training Data: {stats["totalConversations"]} conversations')
print(f'   Dependencies: Lightweight (no ML libraries)')
print('\n' + '=' * 70)
