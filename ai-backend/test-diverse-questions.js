import http from 'http'

const testQuestions = [
  // Greetings
  { q: 'Namaste', expected: 'greeting' },
  { q: 'Hello', expected: 'greeting' },
  { q: 'नमस्ते', expected: 'greeting' },
  
  // Identity
  { q: 'Tum kaun ho?', expected: 'identity' },
  { q: 'Who are you?', expected: 'identity' },
  { q: 'तुम कौन हो?', expected: 'identity' },
  
  // Platform info
  { q: 'VAANI kya hai?', expected: 'platform' },
  { q: 'What is VAANI?', expected: 'platform' },
  { q: 'VAANI क्या है?', expected: 'platform' },
  
  // Issues
  { q: 'Paani nahi aa raha', expected: 'water' },
  { q: 'Sadak tut gayi hai', expected: 'road' },
  { q: 'Bijli ka problem hai', expected: 'electricity' },
  { q: 'Kachra nahi uthaya', expected: 'garbage' },
  
  // Help
  { q: 'Complaint kaise file kare?', expected: 'help' },
  { q: 'Status kaise check kare?', expected: 'tracking' }
]

console.log('\n🧪 Testing Diverse Questions\n')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

async function testQuestion(question, expected) {
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
    console.log(`   Language: ${response.language || 'unknown'}`)
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
  for (const test of testQuestions) {
    await testQuestion(test.q, test.expected)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ Test complete!\n')
}

runTests()
