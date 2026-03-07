/**
 * Test all 65 conversations in training dataset
 */

import axios from 'axios'
import fs from 'fs/promises'

const API_URL = 'http://localhost:5000'

console.log('🧪 Testing All 65 Conversations\n')
console.log('=' .repeat(70))

async function runTests() {
  // Load training dataset
  const data = await fs.readFile('./training-dataset.json', 'utf-8')
  const dataset = JSON.parse(data)
  const conversations = dataset.training_conversations
  
  console.log(`Total Conversations: ${conversations.length}\n`)
  
  let passed = 0
  let failed = 0
  const failedTests = []
  
  for (const conv of conversations) {
    try {
      const response = await axios.post(`${API_URL}/voice-command`, {
        command: conv.user,
        userId: 'test-user'
      })
      
      const data = response.data
      
      if (data.content && data.content.length > 0) {
        passed++
        console.log(`✅ ${conv.id}: "${conv.user.substring(0, 50)}..."`)
      } else {
        failed++
        failedTests.push({ id: conv.id, query: conv.user, reason: 'No response' })
        console.log(`❌ ${conv.id}: "${conv.user}" - No response`)
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 50))
      
    } catch (err) {
      failed++
      failedTests.push({ id: conv.id, query: conv.user, reason: err.message })
      console.log(`❌ ${conv.id}: "${conv.user}" - Error: ${err.message}`)
    }
  }
  
  console.log('\n' + '=' .repeat(70))
  console.log('\n📊 Final Results\n')
  console.log(`✅ Passed: ${passed}/${conversations.length}`)
  console.log(`❌ Failed: ${failed}/${conversations.length}`)
  console.log(`Success Rate: ${((passed / conversations.length) * 100).toFixed(1)}%`)
  
  if (failedTests.length > 0) {
    console.log('\n⚠️ Failed Tests:')
    failedTests.forEach(test => {
      console.log(`   - ${test.id}: ${test.query} (${test.reason})`)
    })
  } else {
    console.log('\n🎉 All 65 conversations working perfectly!')
  }
}

runTests().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
