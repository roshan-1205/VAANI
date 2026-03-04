// Test script for conversational AI - checks for repetition
import fetch from 'node-fetch'

const API_URL = 'http://localhost:5000/chat'
const SESSION_ID = 'test-session-' + Date.now()

async function testConversation() {
  console.log('🎤 Testing VAANI Conversational AI\n')
  console.log('Session ID:', SESSION_ID)
  console.log('=' .repeat(50))
  
  const conversations = [
    "Hello",
    "सड़क में गड्ढा है",
    "Sector 15 में",
    "2 हफ्ते से",
    "हाँ",
    "पानी नहीं आ रहा",
    "3 दिन से",
    "Block C में"
  ]
  
  const responses = []
  
  for (const message of conversations) {
    console.log(`\n👤 User: ${message}`)
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          sessionId: SESSION_ID,
          userId: 'test-user'
        })
      })
      
      const data = await response.json()
      const aiResponse = data.content
      
      console.log(`🤖 VAANI: ${aiResponse}`)
      responses.push(aiResponse)
      
      // Wait a bit between messages
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error('❌ Error:', error.message)
    }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('📊 Checking for repetition...\n')
  
  // Check for repetition
  let repetitionCount = 0
  for (let i = 0; i < responses.length - 1; i++) {
    for (let j = i + 1; j < responses.length; j++) {
      // Check if responses are too similar (more than 50% overlap)
      const similarity = calculateSimilarity(responses[i], responses[j])
      if (similarity > 0.5) {
        console.log(`⚠️  Repetition detected (${Math.round(similarity * 100)}% similar):`)
        console.log(`   Response ${i + 1}: ${responses[i].substring(0, 50)}...`)
        console.log(`   Response ${j + 1}: ${responses[j].substring(0, 50)}...`)
        repetitionCount++
      }
    }
  }
  
  if (repetitionCount === 0) {
    console.log('✅ No repetition detected! All responses are unique.')
  } else {
    console.log(`\n❌ Found ${repetitionCount} similar responses.`)
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('✅ Test complete!')
}

function calculateSimilarity(str1, str2) {
  const words1 = str1.toLowerCase().split(/\s+/)
  const words2 = str2.toLowerCase().split(/\s+/)
  
  const commonWords = words1.filter(word => words2.includes(word))
  const totalWords = Math.max(words1.length, words2.length)
  
  return commonWords.length / totalWords
}

// Run test
testConversation().catch(console.error)
