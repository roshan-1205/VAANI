import { detectLanguage } from './language-detector.js'

console.log('🧪 Testing Language Detection\n')

const testCases = [
  // Hinglish test cases
  { input: "jo mai input deta hu assistant unko hindi mai leta h", expected: "hinglish" },
  { input: "iske wajah se issue ho rha jabki usse detect kr lrna chaiye", expected: "hinglish" },
  { input: "kaun se language mai baat kr rha hu", expected: "hinglish" },
  { input: "mere area mein bahut bada pothole hai", expected: "hinglish" },
  { input: "Paani nahi aa raha 3 din se", expected: "hinglish" },
  { input: "Main bahut pareshan hoon", expected: "hinglish" },
  { input: "Kya VAANI me complaint register kar sakte hain?", expected: "hinglish" },
  
  // English test cases
  { input: "Hello, how are you?", expected: "english" },
  { input: "I want to report an issue", expected: "english" },
  { input: "What is Vaani?", expected: "english" },
  
  // Hindi (Devanagari) test cases
  { input: "तुम कौन हो?", expected: "hindi" },
  { input: "मैं बहुत परेशान हूँ", expected: "hindi" },
  { input: "नमस्ते", expected: "hindi" }
]

let passed = 0
let failed = 0

testCases.forEach((test, index) => {
  const detected = detectLanguage(test.input)
  const status = detected === test.expected ? '✅ PASS' : '❌ FAIL'
  
  if (detected === test.expected) {
    passed++
  } else {
    failed++
  }
  
  console.log(`${status} Test ${index + 1}:`)
  console.log(`  Input: "${test.input}"`)
  console.log(`  Expected: ${test.expected}`)
  console.log(`  Detected: ${detected}`)
  console.log()
})

console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${testCases.length} tests`)

if (failed === 0) {
  console.log('🎉 All tests passed!')
} else {
  console.log('⚠️ Some tests failed. Language detection needs improvement.')
}
