/**
 * Test automatic caching of new questions
 */

import axios from 'axios'
import fs from 'fs/promises'

const API_URL = 'http://localhost:5000'

console.log('🧪 Testing Automatic Cache for New Questions\n')
console.log('=' .repeat(70))

async function getCacheCount() {
  try {
    const data = await fs.readFile('./cache/responses.json', 'utf-8')
    const cache = JSON.parse(data)
    return Object.keys(cache.responses || {}).length
  } catch (err) {
    return 0
  }
}

async function testAutoCache() {
  // Get initial cache count
  const initialCount = await getCacheCount()
  console.log(`📊 Initial cache entries: ${initialCount}\n`)
  
  // Test with a completely new question (not in training data)
  const newQuestions = [
    'Kya main complaint cancel kar sakta hoon?',
    'Volunteer ka phone number kaise milega?',
    'Complaint kitne din me resolve hoti hai?'
  ]
  
  console.log('Testing new questions (not in training data):\n')
  
  for (const question of newQuestions) {
    console.log(`❓ Question: "${question}"`)
    
    try {
      // First call - should NOT be in cache
      const startTime1 = Date.now()
      const response1 = await axios.post(`${API_URL}/voice-command`, {
        command: question,
        userId: 'auto-cache-test'
      })
      const time1 = Date.now() - startTime1
      
      console.log(`   First call: ${time1}ms (source: ${response1.data.source})`)
      console.log(`   Response: ${response1.data.content.substring(0, 80)}...`)
      
      // Wait a bit for cache to save
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Second call - should be from cache
      const startTime2 = Date.now()
      const response2 = await axios.post(`${API_URL}/voice-command`, {
        command: question,
        userId: 'auto-cache-test'
      })
      const time2 = Date.now() - startTime2
      
      console.log(`   Second call: ${time2}ms (source: ${response2.data.source})`)
      
      if (response2.data.source === 'cache') {
        console.log(`   ✅ AUTO-CACHED! Response now instant (${time2}ms vs ${time1}ms)`)
      } else {
        console.log(`   ⚠️  Not cached yet (source: ${response2.data.source})`)
      }
      
      console.log()
      
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}\n`)
    }
  }
  
  // Get final cache count
  const finalCount = await getCacheCount()
  console.log('=' .repeat(70))
  console.log(`\n📊 Final Results\n`)
  console.log(`Initial cache entries: ${initialCount}`)
  console.log(`Final cache entries: ${finalCount}`)
  console.log(`New entries added: ${finalCount - initialCount}`)
  
  if (finalCount > initialCount) {
    console.log('\n✅ AUTO-CACHE WORKING! New questions automatically cached!')
  } else {
    console.log('\n⚠️  Cache not updated yet (may need to wait for auto-save)')
  }
}

testAutoCache().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
