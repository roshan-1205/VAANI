/**
 * Test new scheme info questions
 */

import axios from 'axios'

const API_URL = 'http://localhost:5000'

const testCases = [
  { query: 'Sarkari scheme kaise pata kare?', expectedLang: 'hinglish' },
  { query: 'How to find government schemes?', expectedLang: 'english' },
  { query: 'सरकारी योजना कैसे पता करें?', expectedLang: 'hindi' },
  // Variations
  { query: 'sarkari yojana kaise pata kare', expectedLang: 'hinglish' },
  { query: 'government scheme kaise jane', expectedLang: 'hinglish' }
]

console.log('🧪 Testing New Scheme Info Questions\n')
console.log('=' .repeat(70))

let passed = 0
let failed = 0

async function testQuery(query, expectedLang) {
  try {
    const response = await axios.post(`${API_URL}/voice-command`, {
      command: query,
      userId: 'test-user'
    })
    
    const data = response.data
    const langMatch = data.detectedLanguage === expectedLang || data.language === expectedLang
    const hasResponse = data.content && data.content.length > 0
    
    if (langMatch && hasResponse) {
      passed++
      console.log(`✅ "${query}"`)
      console.log(`   Lang: ${data.detectedLanguage || data.language} | Source: ${data.source}`)
      console.log(`   Response: ${data.content.substring(0, 100)}...`)
    } else {
      failed++
      console.log(`❌ "${query}"`)
      console.log(`   Expected: ${expectedLang} | Got: ${data.detectedLanguage || data.language}`)
    }
    console.log()
    
  } catch (err) {
    failed++
    console.log(`❌ "${query}"`)
    console.log(`   Error: ${err.message}`)
    console.log()
  }
}

async function runTests() {
  for (const test of testCases) {
    await testQuery(test.query, test.expectedLang)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('=' .repeat(70))
  console.log(`\n✅ Passed: ${passed}/${testCases.length}`)
  console.log(`❌ Failed: ${failed}/${testCases.length}`)
  console.log(`Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`)
  
  if (passed === testCases.length) {
    console.log('\n🎉 All scheme info questions working perfectly!')
  }
}

runTests().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
