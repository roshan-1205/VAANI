/**
 * Test cache speed for instant responses
 */

import axios from 'axios'

const API_URL = 'http://localhost:5000'

const testQueries = [
  'Tum kaun ho?',
  'Vaani kya hai?',
  'Sarkari scheme kaise pata kare?',
  'Ayushman card kaise banwaye?',
  'Complaint kaise kare?',
  'Pani nahi aa raha kya kare?',
  'Street light kharab hai kya kare?',
  'Account kaise banaye?',
  'Volunteer help mil sakti hai kya?',
  'Dhanyavaad'
]

console.log('⚡ Testing Cache Speed for Instant Responses\n')
console.log('=' .repeat(70))

async function testSpeed() {
  const results = []
  
  for (const query of testQueries) {
    const startTime = Date.now()
    
    try {
      const response = await axios.post(`${API_URL}/voice-command`, {
        command: query,
        userId: 'speed-test'
      })
      
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      results.push({
        query,
        time: responseTime,
        source: response.data.source,
        success: true
      })
      
      console.log(`✅ ${responseTime}ms - "${query.substring(0, 40)}..." (${response.data.source})`)
      
    } catch (err) {
      results.push({
        query,
        time: -1,
        source: 'error',
        success: false
      })
      console.log(`❌ Error - "${query}"`)
    }
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('\n' + '=' .repeat(70))
  console.log('\n📊 Speed Test Results\n')
  
  const successResults = results.filter(r => r.success)
  const avgTime = successResults.reduce((sum, r) => sum + r.time, 0) / successResults.length
  const minTime = Math.min(...successResults.map(r => r.time))
  const maxTime = Math.max(...successResults.map(r => r.time))
  
  console.log(`Average Response Time: ${avgTime.toFixed(1)}ms`)
  console.log(`Fastest: ${minTime}ms`)
  console.log(`Slowest: ${maxTime}ms`)
  
  // Source breakdown
  const sourceCount = {}
  successResults.forEach(r => {
    sourceCount[r.source] = (sourceCount[r.source] || 0) + 1
  })
  
  console.log('\nResponse Sources:')
  Object.keys(sourceCount).forEach(source => {
    console.log(`   ${source}: ${sourceCount[source]} queries`)
  })
  
  // Speed rating
  console.log('\n⚡ Speed Rating:')
  if (avgTime < 10) {
    console.log('   🚀 EXCELLENT - Lightning fast responses!')
  } else if (avgTime < 50) {
    console.log('   ✅ GOOD - Fast responses')
  } else if (avgTime < 100) {
    console.log('   ⚠️  MODERATE - Acceptable speed')
  } else {
    console.log('   ❌ SLOW - Needs optimization')
  }
  
  console.log('\n🎉 All queries tested!')
}

testSpeed().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
