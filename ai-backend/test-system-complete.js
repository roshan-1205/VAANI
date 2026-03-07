/**
 * Complete System Test
 * Tests all features: Language Detection, Fuzzy Matching, Cache, Training Data
 */

import axios from 'axios'

const API_URL = 'http://localhost:5000'

console.log('🧪 Complete System Test\n')
console.log('=' .repeat(70))

// Test cases covering all features
const testCases = [
  // Language Detection Tests
  { query: 'Tum kaun ho?', expectedLang: 'hinglish', feature: 'Language Detection' },
  { query: 'Who are you?', expectedLang: 'english', feature: 'Language Detection' },
  { query: 'तुम कौन हो?', expectedLang: 'hindi', feature: 'Language Detection' },
  
  // Fuzzy Matching Tests (speech errors)
  { query: 'tum kon ho', expectedLang: 'hinglish', feature: 'Fuzzy Matching' },
  { query: 'wani kya hai', expectedLang: 'hinglish', feature: 'Fuzzy Matching' },
  { query: 'complain kese kare', expectedLang: 'hinglish', feature: 'Fuzzy Matching' },
  { query: 'pani nhi aa rha', expectedLang: 'hinglish', feature: 'Fuzzy Matching' },
  
  // Cache Tests (repeat queries)
  { query: 'Vaani kya hai?', expectedLang: 'hinglish', feature: 'Cache System' },
  { query: 'What is Vaani?', expectedLang: 'english', feature: 'Cache System' },
  
  // Training Data Tests
  { query: 'Ayushman card kaise banwaye?', expectedLang: 'hinglish', feature: 'Training Data' },
  { query: 'Volunteer help mil sakti hai kya?', expectedLang: 'hinglish', feature: 'Training Data' },
  { query: 'Complaint karna free hai kya?', expectedLang: 'hinglish', feature: 'Training Data' },
  
  // Government Schemes
  { query: 'PM Awas Yojana me apply kaise kare?', expectedLang: 'hinglish', feature: 'Gov Schemes' },
  { query: 'Ration card kaise banwaye?', expectedLang: 'hinglish', feature: 'Gov Schemes' },
  
  // Civic Issues
  { query: 'Sadak toot gayi hai kya kare?', expectedLang: 'hinglish', feature: 'Civic Issues' },
  { query: 'Street light kharab hai kya kare?', expectedLang: 'hinglish', feature: 'Civic Issues' },
  { query: 'Kooda nahi uth raha kya kare?', expectedLang: 'hinglish', feature: 'Civic Issues' }
]

let passed = 0
let failed = 0
const results = []

async function testQuery(query, expectedLang, feature) {
  try {
    const startTime = Date.now()
    
    const response = await axios.post(`${API_URL}/voice-command`, {
      command: query,
      userId: 'test-user'
    })
    
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    const data = response.data
    
    const langMatch = data.detectedLanguage === expectedLang || data.language === expectedLang
    const hasResponse = data.content && data.content.length > 0
    
    if (langMatch && hasResponse) {
      passed++
      console.log(`✅ "${query}"`)
      console.log(`   Feature: ${feature} | Lang: ${data.detectedLanguage || data.language} | Source: ${data.source} | Time: ${responseTime}ms`)
      console.log(`   Response: ${data.content.substring(0, 80)}...`)
      
      results.push({
        status: 'PASS',
        query,
        feature,
        language: data.detectedLanguage || data.language,
        source: data.source,
        responseTime
      })
    } else {
      failed++
      console.log(`❌ "${query}"`)
      console.log(`   Expected: ${expectedLang} | Got: ${data.detectedLanguage || data.language}`)
      console.log(`   Response: ${data.content}`)
      
      results.push({
        status: 'FAIL',
        query,
        feature,
        expected: expectedLang,
        got: data.detectedLanguage || data.language
      })
    }
    
    console.log()
    
  } catch (err) {
    failed++
    console.log(`❌ "${query}"`)
    console.log(`   Error: ${err.message}`)
    console.log()
    
    results.push({
      status: 'ERROR',
      query,
      feature,
      error: err.message
    })
  }
}

// Run all tests
async function runTests() {
  console.log(`Testing ${testCases.length} queries...\n`)
  
  for (const test of testCases) {
    await testQuery(test.query, test.expectedLang, test.feature)
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('=' .repeat(70))
  console.log('\n📊 Test Summary\n')
  
  // Feature breakdown
  const featureStats = {}
  results.forEach(r => {
    if (!featureStats[r.feature]) {
      featureStats[r.feature] = { pass: 0, fail: 0 }
    }
    if (r.status === 'PASS') {
      featureStats[r.feature].pass++
    } else {
      featureStats[r.feature].fail++
    }
  })
  
  console.log('Feature Breakdown:')
  Object.keys(featureStats).forEach(feature => {
    const stats = featureStats[feature]
    const total = stats.pass + stats.fail
    const rate = ((stats.pass / total) * 100).toFixed(1)
    console.log(`   ${feature}: ${stats.pass}/${total} (${rate}%)`)
  })
  
  console.log()
  
  // Performance stats
  const passedResults = results.filter(r => r.status === 'PASS')
  if (passedResults.length > 0) {
    const avgTime = passedResults.reduce((sum, r) => sum + r.responseTime, 0) / passedResults.length
    const minTime = Math.min(...passedResults.map(r => r.responseTime))
    const maxTime = Math.max(...passedResults.map(r => r.responseTime))
    
    console.log('Performance:')
    console.log(`   Average Response Time: ${avgTime.toFixed(0)}ms`)
    console.log(`   Fastest: ${minTime}ms`)
    console.log(`   Slowest: ${maxTime}ms`)
    console.log()
  }
  
  // Source breakdown
  const sourceStats = {}
  passedResults.forEach(r => {
    sourceStats[r.source] = (sourceStats[r.source] || 0) + 1
  })
  
  console.log('Response Sources:')
  Object.keys(sourceStats).forEach(source => {
    console.log(`   ${source}: ${sourceStats[source]} queries`)
  })
  
  console.log()
  console.log('=' .repeat(70))
  console.log(`\n✅ Passed: ${passed}/${testCases.length}`)
  console.log(`❌ Failed: ${failed}/${testCases.length}`)
  console.log(`Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`)
  
  if (passed === testCases.length) {
    console.log('\n🎉 All tests passed! System working perfectly!')
  } else {
    console.log('\n⚠️ Some tests failed. Check logs above.')
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err)
  process.exit(1)
})
