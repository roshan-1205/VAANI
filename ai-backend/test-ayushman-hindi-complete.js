/**
 * Complete Ayushman Bharat Hindi Training & Testing
 * Tests all Hindi variations until 100% accuracy
 */

import cache from "./response-cache.js"
import indexer from "./data-indexer.js"

// All Ayushman Bharat Hindi test questions with variations
const hindiTestQuestions = [
  // Basic questions
  "आयुष्मान भारत योजना क्या है",
  "आयुष्मान भारत योजना क्या है?",
  "Ayushman Bharat Yojana क्या है",
  "आयुष्मान योजना क्या है",
  "आयुष्मान कार्ड क्या है",
  "PMJAY क्या है",
  "प्रधानमंत्री जन आरोग्य योजना क्या है",
  
  // Card making questions
  "आयुष्मान कार्ड कैसे बनाएं",
  "आयुष्मान कार्ड कैसे बनवाएं",
  "Ayushman card कैसे बनाएं",
  "आयुष्मान कार्ड बनाने की प्रक्रिया",
  "आयुष्मान कार्ड के लिए क्या करें",
  "कार्ड कैसे मिलेगा",
  
  // Eligibility questions
  "आयुष्मान कार्ड के लिए eligible कौन है",
  "आयुष्मान कार्ड के लिए कौन eligible है",
  "कौन आयुष्मान कार्ड बनवा सकता है",
  "आयुष्मान योजना के लिए पात्रता",
  "क्या मैं eligible हूं",
  "मैं कार्ड बनवा सकता हूं क्या",
  
  // Spelling variations
  "आयुष्मान भारत योजना",
  "आयुष्मान भारत",
  "ayushman bharat yojana",
  "ayushman card",
  "आयुष्मान कार्ड",
  
  // Common typos and variations
  "आयुष्मान भारत योजना के बारे में बताओ",
  "आयुष्मान भारत योजना की जानकारी",
  "आयुष्मान कार्ड बनाने के लिए क्या चाहिए",
  "आयुष्मान कार्ड documents",
  "आयुष्मान कार्ड eligibility"
]

async function testHindiQuestions() {
  console.log('🧪 AYUSHMAN BHARAT HINDI - COMPLETE TEST\n')
  console.log('=' .repeat(70))
  
  // Initialize systems
  await cache.initialize()
  await indexer.initialize()
  
  console.log('\n📚 Training Data Loaded')
  console.log(`   Total Conversations: ${indexer.getStats().totalConversations}`)
  console.log(`   Categories: ${indexer.getStats().categories}`)
  
  let totalTests = 0
  let passed = 0
  let failed = 0
  const failedQuestions = []
  
  console.log('\n🔍 Testing Hindi Questions...\n')
  console.log('=' .repeat(70))
  
  for (const question of hindiTestQuestions) {
    totalTests++
    
    // Test 1: Check exact match
    const exactMatch = indexer.findExactMatch(question)
    
    if (exactMatch) {
      console.log(`✅ EXACT: "${question}"`)
      console.log(`   Category: ${exactMatch.category}`)
      console.log(`   Response: ${exactMatch.assistant.substring(0, 80)}...`)
      passed++
      console.log('')
      continue
    }
    
    // Test 2: Check similar match
    const similarMatches = indexer.findSimilar(question, 'hindi', 3)
    
    if (similarMatches.length > 0) {
      const bestMatch = similarMatches[0]
      const score = (bestMatch.score * 100).toFixed(1)
      
      if (bestMatch.score >= 0.70) {
        console.log(`✅ SIMILAR (${score}%): "${question}"`)
        console.log(`   Matched: "${bestMatch.user}"`)
        console.log(`   Category: ${bestMatch.category}`)
        console.log(`   Response: ${bestMatch.assistant.substring(0, 80)}...`)
        passed++
      } else {
        console.log(`⚠️ LOW SCORE (${score}%): "${question}"`)
        console.log(`   Best match: "${bestMatch.user}"`)
        console.log(`   Category: ${bestMatch.category}`)
        failedQuestions.push({
          question,
          score: bestMatch.score,
          matched: bestMatch.user,
          category: bestMatch.category
        })
        failed++
      }
    } else {
      console.log(`❌ NO MATCH: "${question}"`)
      failedQuestions.push({
        question,
        score: 0,
        matched: 'none',
        category: 'none'
      })
      failed++
    }
    console.log('')
  }
  
  // Summary
  console.log('=' .repeat(70))
  console.log('\n📊 TEST RESULTS\n')
  console.log(`Total Tests: ${totalTests}`)
  console.log(`✅ Passed: ${passed} (${((passed/totalTests)*100).toFixed(1)}%)`)
  console.log(`❌ Failed: ${failed} (${((failed/totalTests)*100).toFixed(1)}%)`)
  
  if (failed > 0) {
    console.log('\n⚠️ FAILED QUESTIONS:\n')
    failedQuestions.forEach((item, index) => {
      console.log(`${index + 1}. "${item.question}"`)
      console.log(`   Score: ${(item.score * 100).toFixed(1)}%`)
      console.log(`   Best Match: "${item.matched}"`)
      console.log(`   Category: ${item.category}`)
      console.log('')
    })
    
    console.log('\n💡 RECOMMENDATIONS:\n')
    console.log('To improve accuracy, add these variations to training-dataset.json:')
    console.log('')
    
    failedQuestions.forEach((item, index) => {
      const convId = `conv_ayushman_hindi_${index + 1}`
      console.log(`{`)
      console.log(`  "id": "${convId}",`)
      console.log(`  "category": "ayushman_yojana_hindi",`)
      console.log(`  "user": "${item.question}",`)
      console.log(`  "assistant": "[Use appropriate response from existing Ayushman entries]",`)
      console.log(`  "context": "ayushman_variation_hindi"`)
      console.log(`},`)
      console.log('')
    })
  } else {
    console.log('\n🎉 100% ACCURACY ACHIEVED!')
    console.log('All Hindi Ayushman questions are properly trained!')
  }
  
  // Test cache performance
  console.log('\n💾 CACHE STATUS:\n')
  const cacheStats = cache.getStats()
  console.log(`Total Entries: ${cacheStats.total}`)
  console.log(`Hit Rate: ${cacheStats.hitRate}`)
  
  console.log('\n' + '=' .repeat(70))
}

// Run the test
testHindiQuestions().catch(console.error)
