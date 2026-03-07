console.log('🧪 Testing Live API with New Conversations\n')
console.log('Make sure server is running: node server-production.js\n')

const API_URL = 'http://localhost:5000/chat'

// Test cases with new conversations
const testCases = [
  {
    name: "Test 1: Hinglish Road Issue",
    message: "bhai mere ghar ke paas sadak tut gayi hai",
    userId: "test_user_1",
    sessionId: "session_1",
    expectedLanguage: "hinglish"
  },
  {
    name: "Test 2: Hinglish Water Issue",
    message: "paani ki supply bahut kam aa rhi hai",
    userId: "test_user_2",
    sessionId: "session_2",
    expectedLanguage: "hinglish"
  },
  {
    name: "Test 3: English Tracking",
    message: "How can I track my complaint status?",
    userId: "test_user_3",
    sessionId: "session_3",
    expectedLanguage: "english"
  },
  {
    name: "Test 4: Hindi Help Request",
    message: "मुझे शिकायत दर्ज करने में मदद चाहिए",
    userId: "test_user_4",
    sessionId: "session_4",
    expectedLanguage: "hindi"
  },
  {
    name: "Test 5: Language Persistence - Hinglish User",
    message: "mere area mein pothole hai",
    userId: "persistence_test",
    sessionId: "persistence_session",
    expectedLanguage: "hinglish"
  },
  {
    name: "Test 6: Language Persistence - Same User (English input)",
    message: "thank you",
    userId: "persistence_test",
    sessionId: "persistence_session",
    expectedLanguage: "hinglish", // Should respond in Hinglish due to persistence!
    expectedDetected: "english"
  }
]

async function testAPI(testCase) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: testCase.message,
        userId: testCase.userId,
        sessionId: testCase.sessionId
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function runTests() {
  console.log('═'.repeat(70))
  console.log()

  let passed = 0
  let failed = 0

  for (let i = 0; i < testCases.length; i++) {
    const test = testCases[i]
    
    console.log(`${test.name}`)
    console.log(`📝 Query: "${test.message}"`)
    
    const result = await testAPI(test)
    
    if (result.error) {
      console.log(`❌ ERROR: ${result.error}`)
      console.log(`   Make sure server is running: node server-production.js`)
      failed++
    } else {
      const languageMatch = result.language === test.expectedLanguage
      const detectedMatch = test.expectedDetected ? 
        result.detectedLanguage === test.expectedDetected : true
      
      console.log(`  🌐 Response Language: ${result.language} ${languageMatch ? '✅' : '❌'}`)
      
      if (result.detectedLanguage) {
        console.log(`  🔍 Detected Language: ${result.detectedLanguage} ${detectedMatch ? '✅' : '❌'}`)
      }
      
      if (result.preferredLanguage) {
        console.log(`  ⭐ Preferred Language: ${result.preferredLanguage}`)
      }
      
      console.log(`  📊 Source: ${result.source}`)
      console.log(`  💬 Response: "${result.content.substring(0, 80)}..."`)
      
      if (languageMatch && detectedMatch) {
        console.log(`  ✅ TEST PASSED`)
        passed++
      } else {
        console.log(`  ❌ TEST FAILED`)
        failed++
      }
    }
    
    console.log()
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log('═'.repeat(70))
  console.log()
  console.log('📊 Final Results:')
  console.log(`   Total Tests: ${testCases.length}`)
  console.log(`   Passed: ${passed} ✅`)
  console.log(`   Failed: ${failed} ${failed > 0 ? '❌' : ''}`)
  console.log(`   Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`)
  console.log()

  if (failed === 0) {
    console.log('🎉 ALL TESTS PASSED!')
    console.log('✅ New conversations are working')
    console.log('✅ Language detection is accurate')
    console.log('✅ Language persistence is working')
    console.log('✅ Responses are in correct language')
  } else {
    console.log('⚠️ Some tests failed. Check the errors above.')
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
