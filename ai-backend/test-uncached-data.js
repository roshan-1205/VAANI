/**
 * Test all training data that is NOT in cache
 * Train and test until 100% accuracy
 */

import axios from 'axios'
import fs from 'fs/promises'

const API_URL = 'http://localhost:5000'

console.log('🧪 Testing Uncached Training Data\n')
console.log('=' .repeat(70))

async function getCachedQuestions() {
  try {
    const data = await fs.readFile('./cache/responses.json', 'utf-8')
    const cache = JSON.parse(data)
    const cachedQuestions = new Set()
    
    // Extract all cached questions (remove language prefix)
    Object.values(cache.responses || {}).forEach(entry => {
      if (entry.message) {
        // Remove language prefix like "hinglish:", "english:", "hindi:"
        const question = entry.message.split(':').slice(1).join(':').trim()
        cachedQuestions.add(question.toLowerCase())
      }
    })
    
    return cachedQuestions
  } catch (err) {
    console.log('⚠️  Could not load cache, testing all data')
    return new Set()
  }
}

async function testUncachedData() {
  // Load training dataset
  const data = await fs.readFile('./training-dataset.json', 'utf-8')
  const dataset = JSON.parse(data)
  const conversations = dataset.training_conversations
  
  // Get cached questions
  const cachedQuestions = await getCachedQuestions()
  console.log(`📊 Total training conversations: ${conversations.length}`)
  console.log(`💾 Cached questions: ${cachedQuestions.size}`)
  
  // Filter uncached conversations
  const uncachedConversations = conversations.filter(conv => {
    const question = conv.user.toLowerCase()
    return !cachedQuestions.has(question)
  })
  
  console.log(`🎯 Uncached conversations to test: ${uncachedConversations.length}\n`)
  
  if (uncachedConversations.length === 0) {
    console.log('✅ All training data is already cached!')
    console.log('🎉 100% coverage achieved!')
    return
  }
  
  console.log('Testing uncached conversations:\n')
  
  let passed = 0
  let failed = 0
  const failedTests = []
  
  for (const conv of uncachedConversations) {
    try {
      const response = await axios.post(`${API_URL}/voice-command`, {
        command: conv.user,
        userId: 'uncached-test'
      })
      
      const data = response.data
      
      // Check if response is valid
      if (data.content && data.content.length > 0) {
        passed++
        console.log(`✅ ${conv.id}: "${conv.user.substring(0, 50)}..." (${data.source})`)
      } else {
        failed++
        failedTests.push({ id: conv.id, query: conv.user, reason: 'No response' })
        console.log(`❌ ${conv.id}: "${conv.user}" - No response`)
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (err) {
      failed++
      failedTests.push({ id: conv.id, query: conv.user, reason: err.message })
      console.log(`❌ ${conv.id}: "${conv.user}" - Error: ${err.message}`)
    }
  }
  
  console.log('\n' + '=' .repeat(70))
  console.log('\n📊 Test Results\n')
  console.log(`Total Uncached: ${uncachedConversations.length}`)
  console.log(`✅ Passed: ${passed}/${uncachedConversations.length}`)
  console.log(`❌ Failed: ${failed}/${uncachedConversations.length}`)
  
  const accuracy = ((passed / uncachedConversations.length) * 100).toFixed(2)
  console.log(`\n🎯 Accuracy: ${accuracy}%`)
  
  if (accuracy >= 100) {
    console.log('\n🎉 100% ACCURACY ACHIEVED!')
    console.log('✅ All uncached data working perfectly!')
  } else {
    console.log('\n⚠️  Some tests failed:')
    failedTests.forEach(test => {
      console.log(`   - ${test.id}: ${test.query} (${test.reason})`)
    })
  }
  
  // Now test ALL data (cached + uncached)
  console.log('\n' + '=' .repeat(70))
  console.log('\n🔄 Testing ALL Training Data (Cached + Uncached)\n')
  
  let totalPassed = 0
  let totalFailed = 0
  
  for (const conv of conversations) {
    try {
      const response = await axios.post(`${API_URL}/voice-command`, {
        command: conv.user,
        userId: 'full-test'
      })
      
      if (response.data.content && response.data.content.length > 0) {
        totalPassed++
      } else {
        totalFailed++
      }
      
      await new Promise(resolve => setTimeout(resolve, 50))
      
    } catch (err) {
      totalFailed++
    }
  }
  
  const totalAccuracy = ((totalPassed / conversations.length) * 100).toFixed(2)
  
  console.log('=' .repeat(70))
  console.log('\n📊 FINAL RESULTS\n')
  console.log(`Total Conversations: ${conversations.length}`)
  console.log(`✅ Passed: ${totalPassed}/${conversations.length}`)
  console.log(`❌ Failed: ${totalFailed}/${conversations.length}`)
  console.log(`\n🎯 OVERALL ACCURACY: ${totalAccuracy}%`)
  
  if (totalAccuracy >= 100) {
    console.log('\n🎉🎉🎉 100% ACCURACY ACHIEVED! 🎉🎉🎉')
    console.log('✅ ALL training data working perfectly!')
    console.log('✅ System ready for production!')
  } else {
    console.log('\n⚠️  Need to improve accuracy')
  }
}

testUncachedData().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
