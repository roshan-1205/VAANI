/**
 * Quick Verification - Government Schemes
 * Kuch sample questions test karo
 */

import cache from './response-cache.js'

console.log('🔍 Government Schemes Quick Verification\n')
console.log('=' .repeat(70))

const testQuestions = [
  // Ayushman Bharat
  { q: "Ayushman Bharat Yojana kya hai?", lang: "Hinglish" },
  { q: "What is Ayushman Bharat Yojana?", lang: "English" },
  { q: "Ayushman card kaise banwaye?", lang: "Hinglish" },
  
  // PM Awas Yojana
  { q: "PM Awas Yojana me apply kaise kare?", lang: "Hinglish" },
  { q: "Ghar ke liye scheme kya hai?", lang: "Hinglish" },
  
  // Ration Card
  { q: "Ration card kaise banwaye?", lang: "Hinglish" },
  { q: "Ration card ke liye documents kya chahiye?", lang: "Hinglish" },
  
  // Ujjwala Yojana
  { q: "Ujjwala Yojana kya hai?", lang: "Hinglish" },
  { q: "उज्ज्वला योजना क्या है?", lang: "Hindi" },
  
  // General
  { q: "Sarkari scheme kaise pata kare?", lang: "Hinglish" },
  { q: "सरकारी योजना कैसे पता करें?", lang: "Hindi" },
  { q: "Kya kya schemes hain?", lang: "Hinglish" }
]

async function verifySchemes() {
  try {
    await cache.initialize()
    
    console.log(`\n📋 Testing ${testQuestions.length} Sample Questions\n`)
    
    let found = 0
    let notFound = 0
    
    for (const test of testQuestions) {
      const response = await cache.get(test.q)
      
      if (response) {
        found++
        console.log(`✅ [${test.lang}] ${test.q}`)
        console.log(`   → ${response.substring(0, 80)}...\n`)
      } else {
        notFound++
        console.log(`❌ [${test.lang}] ${test.q}`)
        console.log(`   → NOT FOUND\n`)
      }
    }
    
    console.log('=' .repeat(70))
    console.log(`\n📊 Verification Results:`)
    console.log(`   Found: ${found}/${testQuestions.length}`)
    console.log(`   Not Found: ${notFound}`)
    console.log(`   Success Rate: ${((found/testQuestions.length)*100).toFixed(0)}%`)
    
    if (found === testQuestions.length) {
      console.log('\n🎉 All government scheme questions verified successfully!')
      console.log('✅ System is ready for production use.')
    } else {
      console.log('\n⚠️  Some questions not found. Run training again:')
      console.log('   npm run train-loop')
    }
    
    console.log('\n' + '=' .repeat(70))
    
    return found === testQuestions.length
  } catch (err) {
    console.error('❌ Error:', err.message)
    return false
  }
}

verifySchemes()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err)
    process.exit(1)
  })
