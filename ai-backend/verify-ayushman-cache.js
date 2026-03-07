/**
 * Verify Ayushman Answers Directly from Cache File
 */

import fs from 'fs/promises'
import crypto from 'crypto'

console.log('🔍 Verifying Ayushman Answers from Cache File\n')
console.log('=' .repeat(70))

function generateKey(message) {
  const normalized = message.toLowerCase().trim().replace(/\s+/g, ' ')
  return crypto.createHash('md5').update(normalized).digest('hex')
}

const questions = [
  'Ayushman Bharat Yojana kya hai?',
  'What is Ayushman Bharat Yojana?',
  'Ayushman card kaise banwaye?',
  'How to make Ayushman card?',
  'Ayushman card ke liye eligible kaun hai?',
  'Who is eligible for Ayushman card?',
  'Ayushman card के लिए eligible कौन है?'
]

async function verifyCache() {
  try {
    console.log('\n📂 Reading cache file...\n')
    
    const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
    
    console.log(`Total cache entries: ${Object.keys(cacheData.responses).length}\n`)
    console.log('=' .repeat(70))
    
    let found = 0
    let notFound = 0
    
    for (const question of questions) {
      const key = generateKey(question)
      const entry = cacheData.responses[key]
      
      console.log(`\n❓ Q: ${question}`)
      console.log(`🔑 Key: ${key}`)
      console.log('-'.repeat(70))
      
      if (entry) {
        found++
        console.log(`✅ FOUND IN CACHE`)
        console.log(`📝 Answer (${entry.response.length} chars):`)
        console.log(entry.response.substring(0, 200) + '...')
      } else {
        notFound++
        console.log(`❌ NOT FOUND`)
      }
      
      console.log('='.repeat(70))
    }
    
    console.log(`\n📊 Summary:`)
    console.log(`   Total questions: ${questions.length}`)
    console.log(`   Found: ${found}`)
    console.log(`   Not found: ${notFound}`)
    console.log(`   Success rate: ${((found/questions.length)*100).toFixed(0)}%`)
    
    if (found === questions.length) {
      console.log('\n🎉 All Ayushman questions found in cache!')
    } else {
      console.log('\n⚠️  Some questions missing from cache')
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

verifyCache()
