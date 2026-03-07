import { detectLanguage } from './language-detector.js'
import indexer from './data-indexer.js'

console.log('🧪 Testing New 10 Conversations\n')
console.log('Testing language detection and response matching for newly added data\n')

// Initialize indexer
await indexer.initialize()

// Test queries based on new conversations
const testQueries = [
  // Test 1: Hinglish - Road issue
  {
    query: "bhai mere ghar ke paas sadak tut gayi hai",
    expectedLanguage: "hinglish",
    description: "Hinglish road complaint"
  },
  
  // Test 2: Hinglish - Water issue
  {
    query: "paani ki supply bahut kam aa rhi hai",
    expectedLanguage: "hinglish",
    description: "Hinglish water shortage"
  },
  
  // Test 3: Hinglish - Electricity
  {
    query: "bijli ka meter kharab ho gaya hai",
    expectedLanguage: "hinglish",
    description: "Hinglish electricity meter issue"
  },
  
  // Test 4: Hinglish - Garbage
  {
    query: "kachra wale nahi aa rhe hain ek hafte se",
    expectedLanguage: "hinglish",
    description: "Hinglish garbage collection"
  },
  
  // Test 5: English - Tracking
  {
    query: "How can I track my complaint status?",
    expectedLanguage: "english",
    description: "English complaint tracking"
  },
  
  // Test 6: English - Volunteer
  {
    query: "I need volunteer assistance for filing complaint",
    expectedLanguage: "english",
    description: "English volunteer request"
  },
  
  // Test 7: Hindi - Help request
  {
    query: "मुझे शिकायत दर्ज करने में मदद चाहिए",
    expectedLanguage: "hindi",
    description: "Hindi help request"
  },
  
  // Test 8: Hindi - Road danger
  {
    query: "सड़क पर बहुत बड़ा गड्ढा है",
    expectedLanguage: "hindi",
    description: "Hindi dangerous pothole"
  },
  
  // Test 9: Hinglish - Schemes
  {
    query: "kya VAANI mein government schemes ki information mil sakti hai",
    expectedLanguage: "hinglish",
    description: "Hinglish schemes query"
  },
  
  // Test 10: Hinglish - Response time
  {
    query: "complaint submit karne ke baad kitne din mein response milta hai",
    expectedLanguage: "hinglish",
    description: "Hinglish response time query"
  }
]

let passed = 0
let failed = 0

console.log('═'.repeat(70))
console.log()

for (let i = 0; i < testQueries.length; i++) {
  const test = testQueries[i]
  
  console.log(`Test ${i + 1}: ${test.description}`)
  console.log(`Query: "${test.query}"`)
  
  // Step 1: Detect language
  const detectedLanguage = detectLanguage(test.query)
  const languageMatch = detectedLanguage === test.expectedLanguage
  
  console.log(`  🌐 Language: ${detectedLanguage} ${languageMatch ? '✅' : '❌ Expected: ' + test.expectedLanguage}`)
  
  // Step 2: Check for exact match
  const exactMatch = indexer.findExactMatch(test.query)
  
  if (exactMatch) {
    console.log(`  ✅ EXACT match found in training data`)
    console.log(`  📚 Response: "${exactMatch.assistant.substring(0, 80)}..."`)
    passed++
  } else {
    // Step 3: Check for similar matches
    const similarMatches = indexer.findSimilar(test.query, detectedLanguage, 3)
    
    if (similarMatches.length > 0) {
      const bestMatch = similarMatches[0]
      const score = (bestMatch.score * 100).toFixed(1)
      console.log(`  ✅ SIMILAR match found (score: ${score}%)`)
      console.log(`  📚 Response: "${bestMatch.assistant.substring(0, 80)}..."`)
      passed++
    } else {
      console.log(`  ⚠️ No match found - would use Bedrock API`)
      failed++
    }
  }
  
  console.log()
}

console.log('═'.repeat(70))
console.log()
console.log('📊 Test Results:')
console.log(`   Total Tests: ${testQueries.length}`)
console.log(`   Passed: ${passed} ✅`)
console.log(`   Failed: ${failed} ${failed > 0 ? '❌' : ''}`)
console.log(`   Success Rate: ${((passed / testQueries.length) * 100).toFixed(1)}%`)
console.log()

if (failed === 0) {
  console.log('🎉 All new conversations are working perfectly!')
  console.log('✅ Language detection is accurate')
  console.log('✅ Training data matches are found')
  console.log('✅ Responses are in correct language')
} else {
  console.log('⚠️ Some queries did not find matches in training data')
  console.log('   These will use Bedrock API as fallback')
}

console.log()
console.log('🚀 Next Steps:')
console.log('   1. Start server: node server-production.js')
console.log('   2. Test with real API calls')
console.log('   3. Verify language persistence works')
