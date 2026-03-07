/**
 * Test specific entry: conv_070
 * Clear cache, train, and test with variations
 */

import fs from 'fs'
import cache from "./response-cache.js"
import indexer from "./data-indexer.js"

const testQuestions = [
  // Exact match
  "Ye app kya karta hai?",
  
  // Variations without question mark
  "Ye app kya karta hai",
  "ye app kya karta hai",
  
  // Spelling variations
  "Yeh app kya karta hai",
  "Yeh app kya karta hai?",
  
  // Word order variations
  "App kya karta hai",
  "Kya karta hai ye app",
  
  // Similar questions
  "Ye kya karta hai",
  "App ka kaam kya hai",
  "Is app ka use kya hai",
  
  // More variations
  "Vaani kya karta hai",
  "Vaani app kya hai",
  "Ye platform kya hai"
]

async function testConv070() {
  console.log('🧪 TESTING CONV_070: "Ye app kya karta hai?"\n')
  console.log('=' .repeat(70))
  
  // Step 1: Clear cache
  console.log('\n📝 Step 1: Clearing cache...')
  const cachePath = './cache/responses.json'
  
  if (fs.existsSync(cachePath)) {
    const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
    const originalSize = Object.keys(cacheData).length
    
    // Remove entries related to conv_070
    const keysToRemove = []
    for (const key in cacheData) {
      if (key.toLowerCase().includes('ye app') || 
          key.toLowerCase().includes('yeh app') ||
          key.toLowerCase().includes('app kya karta')) {
        keysToRemove.push(key)
      }
    }
    
    keysToRemove.forEach(key => delete cacheData[key])
    fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2))
    
    console.log(`   ✅ Removed ${keysToRemove.length} cache entries`)
    console.log(`   📊 Cache size: ${originalSize} → ${Object.keys(cacheData).length}`)
  } else {
    console.log('   ℹ️ No cache file found')
  }
  
  // Step 2: Initialize systems
  console.log('\n📝 Step 2: Loading training data...')
  await cache.initialize()
  await indexer.initialize()
  
  const stats = indexer.getStats()
  console.log(`   ✅ Loaded ${stats.totalConversations} conversations`)
  
  // Step 3: Verify conv_070 exists
  console.log('\n📝 Step 3: Verifying conv_070 in training data...')
  const trainingData = JSON.parse(fs.readFileSync('./training-dataset.json', 'utf8'))
  const conv070 = trainingData.training_conversations.find(c => c.id === 'conv_070')
  
  if (conv070) {
    console.log('   ✅ Found conv_070')
    console.log(`   📄 Question: "${conv070.user}"`)
    console.log(`   📄 Answer: "${conv070.assistant.substring(0, 80)}..."`)
    console.log(`   📄 Category: ${conv070.category}`)
  } else {
    console.log('   ❌ conv_070 NOT FOUND in training data!')
    return
  }
  
  // Step 4: Test all variations
  console.log('\n📝 Step 4: Testing all variations...\n')
  console.log('=' .repeat(70))
  
  let passed = 0
  let failed = 0
  const results = []
  
  for (const question of testQuestions) {
    // Check exact match
    const exactMatch = indexer.findExactMatch(question)
    
    if (exactMatch && (exactMatch.id === 'conv_070' || exactMatch.id.startsWith('conv_070_var'))) {
      console.log(`✅ EXACT: "${question}"`)
      console.log(`   Match: ${exactMatch.id}`)
      console.log(`   Score: 100%`)
      passed++
      results.push({ question, status: 'EXACT', score: 100 })
    } else {
      // Check similar match
      const similarMatches = indexer.findSimilar(question, 'hinglish', 3)
      
      if (similarMatches.length > 0) {
        const bestMatch = similarMatches[0]
        const score = (bestMatch.score * 100).toFixed(1)
        
        if (bestMatch.id === 'conv_070' || bestMatch.id.startsWith('conv_070_var')) {
          if (bestMatch.score >= 0.70) {
            console.log(`✅ SIMILAR (${score}%): "${question}"`)
            console.log(`   Match: ${bestMatch.id}`)
            passed++
            results.push({ question, status: 'SIMILAR', score: parseFloat(score) })
          } else {
            console.log(`⚠️ LOW SCORE (${score}%): "${question}"`)
            console.log(`   Match: ${bestMatch.id} (but score too low)`)
            failed++
            results.push({ question, status: 'LOW', score: parseFloat(score) })
          }
        } else {
          console.log(`❌ WRONG MATCH (${score}%): "${question}"`)
          console.log(`   Matched: ${bestMatch.id} instead of conv_070 family`)
          console.log(`   Matched question: "${bestMatch.user}"`)
          failed++
          results.push({ question, status: 'WRONG', score: parseFloat(score), matched: bestMatch.id })
        }
      } else {
        console.log(`❌ NO MATCH: "${question}"`)
        failed++
        results.push({ question, status: 'NONE', score: 0 })
      }
    }
    console.log('')
  }
  
  // Step 5: Summary
  console.log('=' .repeat(70))
  console.log('\n📊 TEST RESULTS\n')
  console.log(`Total Tests: ${testQuestions.length}`)
  console.log(`✅ Passed: ${passed} (${((passed/testQuestions.length)*100).toFixed(1)}%)`)
  console.log(`❌ Failed: ${failed} (${((failed/testQuestions.length)*100).toFixed(1)}%)`)
  
  // Step 6: Recommendations
  if (failed > 0) {
    console.log('\n💡 RECOMMENDATIONS:\n')
    
    const failedQuestions = results.filter(r => r.status !== 'EXACT' && r.status !== 'SIMILAR')
    
    if (failedQuestions.length > 0) {
      console.log('Add these variations to training-dataset.json:\n')
      
      failedQuestions.forEach((item, index) => {
        console.log(`{`)
        console.log(`  "id": "conv_070_var_${index + 1}",`)
        console.log(`  "category": "platform_help",`)
        console.log(`  "user": "${item.question}",`)
        console.log(`  "assistant": "${conv070.assistant}",`)
        console.log(`  "context": "about_app_hinglish_var${index + 1}"`)
        console.log(`},`)
        console.log('')
      })
    }
  } else {
    console.log('\n🎉 100% ACCURACY ACHIEVED!')
    console.log('All variations of conv_070 are working perfectly!')
  }
  
  // Step 7: Live server test
  console.log('\n📝 Step 5: Testing with live server...\n')
  console.log('=' .repeat(70))
  
  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "Ye app kya karta hai?",
        userId: 'test-conv070'
      })
    })
    
    const data = await response.json()
    
    console.log(`✅ Live Server Test: SUCCESS`)
    console.log(`📝 Source: ${data.source}`)
    console.log(`🌐 Language: ${data.language}`)
    console.log(`📄 Response: ${data.content.substring(0, 100)}...`)
    
  } catch (error) {
    console.log(`⚠️ Live Server Test: ${error.message}`)
    console.log('   (Make sure server is running on http://localhost:5000)')
  }
  
  console.log('\n' + '=' .repeat(70))
}

testConv070().catch(console.error)
