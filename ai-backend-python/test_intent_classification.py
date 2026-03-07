"""Test intent classification"""

from intent_classifier import IntentClassifier

print('🧪 Testing Intent Classification with NLP\n')

# Initialize classifier
classifier = IntentClassifier()

# Test cases
test_cases = [
    # Report issue intents
    {"query": "I want to report a pothole", "expected": "report_issue"},
    {"query": "mere area mein problem hai", "expected": "report_issue"},
    {"query": "complaint darz karna hai", "expected": "report_issue"},
    {"query": "शिकायत दर्ज करनी है", "expected": "report_issue"},
    
    # Track complaint intents
    {"query": "where is my complaint", "expected": "track_complaint"},
    {"query": "meri complaint ka status kya hai", "expected": "track_complaint"},
    {"query": "स्थिति देखनी है", "expected": "track_complaint"},
    
    # Help intents
    {"query": "I need help", "expected": "get_help"},
    {"query": "madad chahiye", "expected": "get_help"},
    {"query": "मदद चाहिए", "expected": "get_help"},
    
    # Greeting intents
    {"query": "hello", "expected": "greeting"},
    {"query": "namaste", "expected": "greeting"},
    {"query": "नमस्ते", "expected": "greeting"},
    
    # About Vaani
    {"query": "what is vaani", "expected": "about_vaani"},
    {"query": "vaani kya hai", "expected": "about_vaani"},
    
    # Specific issue types
    {"query": "there is a big pothole on the road", "expected": "road_issue"},
    {"query": "sadak tut gayi hai", "expected": "road_issue"},
    {"query": "no water supply since morning", "expected": "water_issue"},
    {"query": "paani nahi aa raha", "expected": "water_issue"},
    {"query": "power cut in my area", "expected": "electricity_issue"},
    {"query": "bijli nahi hai", "expected": "electricity_issue"},
    {"query": "garbage not collected", "expected": "garbage_issue"},
    {"query": "kachra nahi uthaya", "expected": "garbage_issue"},
]

print("Testing intent classification...\n")
print("=" * 70)

passed = 0
failed = 0

for i, test in enumerate(test_cases, 1):
    intent, confidence, details = classifier.classify_intent(test['query'])
    entities = classifier.extract_entities(test['query'], intent)
    
    is_correct = intent == test['expected']
    status = '✅ PASS' if is_correct else '❌ FAIL'
    
    if is_correct:
        passed += 1
    else:
        failed += 1
    
    print(f"\n{status} Test {i}:")
    print(f"  Query: \"{test['query']}\"")
    print(f"  Expected: {test['expected']}")
    print(f"  Detected: {intent} (confidence: {confidence:.2f})")
    if entities:
        print(f"  Entities: {entities}")

print("\n" + "=" * 70)
print(f"\n📊 Results: {passed} passed, {failed} failed out of {len(test_cases)} tests")
print(f"   Accuracy: {(passed / len(test_cases)) * 100:.1f}%")

if failed == 0:
    print('\n🎉 All tests passed! Intent classification is working perfectly!')
else:
    print(f'\n⚠️ {failed} tests failed. Model may need fine-tuning.')

# Show classifier stats
print("\n📈 Classifier Statistics:")
stats = classifier.get_stats()
for key, value in stats.items():
    print(f"   {key}: {value}")
