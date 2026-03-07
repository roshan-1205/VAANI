import http from 'http'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function testQuestion(userQuestion) {
  try {
    const postData = JSON.stringify({
      message: userQuestion,
      userId: 'debugger'
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
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📝 Your Question: "${userQuestion}"`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`\n🌐 Detected Language: ${response.language || 'unknown'}`)
    console.log(`📊 Source: ${response.source || 'unknown'}`)
    console.log(`\n💬 VAANI Response:`)
    console.log(`   ${response.content}`)
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    if (response.source && response.source.includes('training')) {
      console.log('✅ Using training data - CORRECT!')
    } else if (response.source === 'fallback') {
      console.log('⚠️  Using fallback - Training data not found!')
    } else {
      console.log('⚠️  Using Bedrock API - Training data not matched!')
    }
    console.log()
    
  } catch (err) {
    console.log(`\n❌ Error: ${err.message}\n`)
  }
}

async function debugLoop() {
  console.log('\n🔍 VAANI Debug Tool')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('Type your question to test the response.')
  console.log('Type "exit" to quit.\n')
  
  while (true) {
    const userQuestion = await question('Your Question: ')
    
    if (userQuestion.toLowerCase() === 'exit') {
      console.log('\n👋 Goodbye!\n')
      rl.close()
      break
    }
    
    if (userQuestion.trim()) {
      await testQuestion(userQuestion)
    }
  }
}

debugLoop()
