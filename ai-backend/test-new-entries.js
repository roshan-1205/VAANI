import http from 'http'

const newTestQuestions = [
  'Parking ki jagah nahi hai',
  'Raat ko bahut shor hota hai',
  'Sadak pe kutte ghoom rahe hain',
  'Public toilet ganda hai',
  'Traffic light kharab hai',
  'Ped kat rahe hain',
  'Manhole khula pada hai',
  'Pipe se paani leak ho raha hai',
  'Illegal construction ho raha hai',
  'Mujhe volunteer chahiye'
]

console.log('\n🧪 Testing 10 New Entries\n')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

async function testQuestion(question) {
  try {
    const postData = JSON.stringify({
      message: question,
      userId: 'tester'
    })
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    
    const response = await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => resolve(JSON.parse(data)))
      })
      req.on('error', reject)
      req.write(postData)
      req.end()
    })
    
    console.log(`📝 Q: "${question}"`)
    console.log(`   Source: ${response.source || 'unknown'}`)
    console.log(`   Answer: ${response.content.substring(0, 80)}...`)
    
    if (response.source && response.source.includes('training')) {
      console.log(`   ✅ Using training data`)
    } else {
      console.log(`   ⚠️  Not using training data`)
    }
    console.log()
    
  } catch (err) {
    console.log(`❌ Error: ${err.message}\n`)
  }
}

async function runTests() {
  for (const question of newTestQuestions) {
    await testQuestion(question)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ Test complete!\n')
}

runTests()
