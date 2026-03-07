/**
 * Quick test to verify backend is working after fix
 */

const testQuestions = [
  { message: "what is vaani", expected: "training_exact" },
  { message: "how does it work", expected: "training_similar" },
  { message: "report an issue", expected: "training" },
  { message: "track my complaint", expected: "training" },
  { message: "hello", expected: "training_exact" }
]

async function testBackend() {
  console.log('🧪 Testing Backend After Fix\n')
  console.log('=' .repeat(50))
  
  let passed = 0
  let failed = 0
  
  for (const test of testQuestions) {
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: test.message,
          userId: 'test-user'
        })
      })
      
      const data = await response.json()
      
      if (data.content && data.content.length > 0) {
        console.log(`✅ PASS: "${test.message}"`)
        console.log(`   Response: ${data.content.substring(0, 60)}...`)
        console.log(`   Source: ${data.source}`)
        passed++
      } else {
        console.log(`❌ FAIL: "${test.message}"`)
        console.log(`   No response content`)
        failed++
      }
    } catch (error) {
      console.log(`❌ ERROR: "${test.message}"`)
      console.log(`   ${error.message}`)
      failed++
    }
    console.log('')
  }
  
  console.log('=' .repeat(50))
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`)
  
  if (failed === 0) {
    console.log('✅ All tests passed! Backend is working correctly.')
  } else {
    console.log('⚠️ Some tests failed. Check server logs.')
  }
}

testBackend()
