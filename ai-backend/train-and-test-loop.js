/**
 * Complete Training and Testing Loop
 * Train aur test karo jab tak 100% accuracy na mile
 */

import fs from 'fs/promises'
import cache from './response-cache.js'
import { detectLanguage } from './language-detector.js'

const ACCURACY_THRESHOLD = 95 // 95% accuracy chahiye
const MAX_ITERATIONS = 10 // Maximum 10 baar try karo

console.log('🎯 VAANI Complete Training & Testing Loop\n')
console.log('=' .repeat(70))

async function trainDataset() {
  console.log('\n📚 Training Phase Started...\n')
  
  try {
    // Initialize cache
    await cache.initialize()
    
    // Load training dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    console.log(`📊 Total Conversations: ${conversations.length}`)
    
    let added = 0
    let updated = 0
    
    for (const conv of conversations) {
      const language = detectLanguage(conv.user)
      
      // Always update to ensure latest data
      await cache.set(conv.user, conv.assistant, {
        source: 'training_exact',
        language: language,
        category: conv.category,
        id: conv.id
      })
      
      const existing = await cache.get(conv.user)
      if (existing) {
        updated++
      } else {
        added++
      }
    }
    
    // Force save
    await cache.persist()
    
    console.log(`✅ Training Complete`)
    console.log(`   Added: ${added} | Updated: ${updated}`)
    console.log(`   Total in Cache: ${cache.cache.size}`)
    
    return true
  } catch (err) {
    console.error('❌ Training Error:', err.message)
    return false
  }
}

async function testDataset() {
  console.log('\n🧪 Testing Phase Started...\n')
  
  try {
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    let totalTests = conversations.length
    let passed = 0
    let failed = 0
    const failedTests = []
    
    for (const conv of conversations) {
      const cached = await cache.get(conv.user)
      
      if (cached && cached === conv.assistant) {
        passed++
        console.log(`✅ ${conv.id}: PASS`)
      } else {
        failed++
        failedTests.push({
          id: conv.id,
          question: conv.user,
          expected: conv.assistant,
          got: cached || 'NOT FOUND'
        })
        console.log(`❌ ${conv.id}: FAIL`)
      }
    }
    
    const accuracy = ((passed / totalTests) * 100).toFixed(2)
    
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Test Results:')
    console.log(`   Total Tests: ${totalTests}`)
    console.log(`   Passed: ${passed}`)
    console.log(`   Failed: ${failed}`)
    console.log(`   Accuracy: ${accuracy}%`)
    
    if (failedTests.length > 0) {
      console.log('\n❌ Failed Tests:')
      failedTests.forEach(test => {
        console.log(`\n   ID: ${test.id}`)
        console.log(`   Q: ${test.question.substring(0, 50)}...`)
        console.log(`   Expected: ${test.expected.substring(0, 50)}...`)
        console.log(`   Got: ${typeof test.got === 'string' ? test.got.substring(0, 50) : test.got}...`)
      })
    }
    
    return {
      accuracy: parseFloat(accuracy),
      passed,
      failed,
      totalTests,
      failedTests
    }
  } catch (err) {
    console.error('❌ Testing Error:', err.message)
    return null
  }
}

async function runTrainingLoop() {
  console.log('\n🔄 Starting Training Loop...')
  console.log(`🎯 Target Accuracy: ${ACCURACY_THRESHOLD}%`)
  console.log(`🔁 Max Iterations: ${MAX_ITERATIONS}\n`)
  
  let iteration = 1
  let bestAccuracy = 0
  let targetReached = false
  
  while (iteration <= MAX_ITERATIONS && !targetReached) {
    console.log('\n' + '='.repeat(70))
    console.log(`\n🔄 ITERATION ${iteration}/${MAX_ITERATIONS}`)
    console.log('='.repeat(70))
    
    // Train
    const trainSuccess = await trainDataset()
    if (!trainSuccess) {
      console.log('❌ Training failed, retrying...')
      iteration++
      continue
    }
    
    // Wait a bit for cache to settle
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Test
    const testResults = await testDataset()
    if (!testResults) {
      console.log('❌ Testing failed, retrying...')
      iteration++
      continue
    }
    
    // Check accuracy
    if (testResults.accuracy > bestAccuracy) {
      bestAccuracy = testResults.accuracy
    }
    
    if (testResults.accuracy >= ACCURACY_THRESHOLD) {
      targetReached = true
      console.log('\n' + '='.repeat(70))
      console.log('\n🎉 SUCCESS! Target Accuracy Reached!')
      console.log(`✅ Final Accuracy: ${testResults.accuracy}%`)
      console.log(`✅ Passed: ${testResults.passed}/${testResults.totalTests}`)
      console.log(`✅ Iterations: ${iteration}`)
      console.log('\n' + '='.repeat(70))
    } else {
      console.log(`\n⚠️  Accuracy ${testResults.accuracy}% < Target ${ACCURACY_THRESHOLD}%`)
      console.log(`   Retrying... (${iteration}/${MAX_ITERATIONS})`)
    }
    
    iteration++
  }
  
  if (!targetReached) {
    console.log('\n' + '='.repeat(70))
    console.log('\n⚠️  Maximum iterations reached')
    console.log(`📊 Best Accuracy Achieved: ${bestAccuracy}%`)
    console.log(`🎯 Target was: ${ACCURACY_THRESHOLD}%`)
    console.log('\n💡 Suggestions:')
    console.log('   1. Check cache persistence')
    console.log('   2. Verify training data format')
    console.log('   3. Check language detection')
    console.log('   4. Review failed test cases')
    console.log('\n' + '='.repeat(70))
  }
  
  // Final stats
  const stats = cache.getStats()
  console.log('\n📈 Final Cache Stats:')
  console.log(`   Total Entries: ${stats.totalEntries}`)
  console.log(`   Hit Rate: ${stats.hitRate}`)
  console.log(`   Estimated Savings: ${stats.estimatedSavings}`)
  
  return targetReached
}

// Run the training loop
runTrainingLoop()
  .then(success => {
    if (success) {
      console.log('\n✅ Training and Testing Complete - System Ready!')
      process.exit(0)
    } else {
      console.log('\n⚠️  Training completed with warnings')
      process.exit(1)
    }
  })
  .catch(err => {
    console.error('\n❌ Fatal Error:', err)
    process.exit(1)
  })
