/**
 * Test Ayushman Bharat Answers
 * Detailed answers ko verify karo
 */

import cache from './response-cache.js'

console.log('🔍 Testing Ayushman Bharat Answers\n')
console.log('=' .repeat(70))

const testQuestions = [
  'Ayushman Bharat Yojana kya hai?',
  'What is Ayushman Bharat Yojana?',
  'Ayushman card kaise banwaye?',
  'How to make Ayushman card?',
  'Ayushman card ke liye eligible kaun hai?',
  'Who is eligible for Ayushman card?',
  'Ayushman card के लिए eligible कौन है?'
]

async function testAyushmanAnswers() {
  try {
    await cache.initialize()
    
    console.log(`\n📋 Testing ${testQuestions.length} questions\n`)
    console.log('=' .repeat(70))
    
    for (const question of testQuestions) {
      const answer = await cache.get(question)
      
      console.log(`\n❓ Q: ${question}`)
      console.log('-'.repeat(70))
      
      if (answer) {
        console.log(`✅ A: ${answer}`)
      } else {
        console.log(`❌ NOT FOUND IN CACHE`)
      }
      
      console.log('='.repeat(70))
    }
    
    console.log('\n✅ All questions tested!')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

testAyushmanAnswers()
