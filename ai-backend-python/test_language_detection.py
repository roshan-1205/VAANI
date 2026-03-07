"""Test language detection"""

from language_detector import detect_language

print('🧪 Testing Language Detection (Python)\n')

test_cases = [
    # Hinglish test cases
    {"input": "jo mai input deta hu assistant unko hindi mai leta h", "expected": "hinglish"},
    {"input": "iske wajah se issue ho rha jabki usse detect kr lrna chaiye", "expected": "hinglish"},
    {"input": "kaun se language mai baat kr rha hu", "expected": "hinglish"},
    {"input": "mere area mein bahut bada pothole hai", "expected": "hinglish"},
    {"input": "Paani nahi aa raha 3 din se", "expected": "hinglish"},
    {"input": "Main bahut pareshan hoon", "expected": "hinglish"},
    {"input": "Kya VAANI me complaint register kar sakte hain?", "expected": "hinglish"},
    
    # English test cases
    {"input": "Hello, how are you?", "expected": "english"},
    {"input": "I want to report an issue", "expected": "english"},
    {"input": "What is Vaani?", "expected": "english"},
    
    # Hindi (Devanagari) test cases
    {"input": "तुम कौन हो?", "expected": "hindi"},
    {"input": "मैं बहुत परेशान हूँ", "expected": "hindi"},
    {"input": "नमस्ते", "expected": "hindi"}
]

passed = 0
failed = 0

for i, test in enumerate(test_cases, 1):
    detected = detect_language(test['input'])
    status = '✅ PASS' if detected == test['expected'] else '❌ FAIL'
    
    if detected == test['expected']:
        passed += 1
    else:
        failed += 1
    
    print(f"{status} Test {i}:")
    print(f"  Input: \"{test['input']}\"")
    print(f"  Expected: {test['expected']}")
    print(f"  Detected: {detected}")
    print()

print(f"\n📊 Results: {passed} passed, {failed} failed out of {len(test_cases)} tests")

if failed == 0:
    print('🎉 All tests passed!')
else:
    print('⚠️ Some tests failed.')
