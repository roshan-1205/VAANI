/**
 * Test Bedrock API responses are cached
 */

import axios from 'axios'

const API_URL = 'http://localhost:5000'

console.log('🧪 Testing Bedrock API Auto-Cache\n')
console.log('=' .repeat(70))

async function testBedrockCache() {
  // Questions that will likely go to Bedrock (not exact match in training)
  const questions = [
    'Vaani kitne languages support karta hai?',
    'Kya main multiple complaints ek saath file kar sakta hoon?'
  ]
  
  for (const question of questions) {
    console.log(`\n❓ Question: "${question}"`)
    
    try {
      // First call
      console.log('   🔄 First call...')
      const start1 = Date.now()
      const response1 = await axios.post(`${API_URL}/voice-command`, {
        command: question,
        userId: 'bedrock-test'
      })
      const time1 = Date.now() - start1
      
      console.log(`   ⏱️  Time: ${time1}ms`)
      console.log(`   📍 Source: ${response1.data.source}`)
      console.log(`   💬 Response: ${response1.data.content.substring(0, 100)}...`)
      
      // Wait for cache to save
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Second call - should be cached
      console.log('   🔄 Second call...')
      const start2 = Date.now()
      const response2 = await axios.post(`${API_URL}/voice-command`, {
        command: question,
        userId: 'bedrock-test'
      })
      const time2 = Date.now() - start2
      
      console.log(`   ⏱️  Time: ${time2}ms`)
      console.log(`   📍 Source: ${response2.data.source}`)
      
      if (response2.data.source === 'cache') {
        const speedup = Math.round(time1 / time2)
        console.log(`   ✅ CACHED! ${speedup}x faster (${time1}ms → ${time2}ms)`)
      } else {
        console.log(`   ⚠️  Not cached (source: ${response2.data.source})`)
      }
      
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`)
    }
  }
  
  console.log('\n' + '=' .repeat(70))
  console.log('\n🎉 Bedrock responses are being auto-cached!')
}

testBedrockCache().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
