/**
 * Cleanup Ayushman Duplicates
 * Remove old/duplicate entries, keep only the new detailed ones
 */

import fs from 'fs/promises'
import crypto from 'crypto'

console.log('🧹 Cleaning up Ayushman Duplicates\n')
console.log('=' .repeat(70))

function generateKey(message) {
  const normalized = message.toLowerCase().trim().replace(/\s+/g, ' ')
  return crypto.createHash('md5').update(normalized).digest('hex')
}

// Questions we want to keep (without language prefix)
const questionsToKeep = [
  'Ayushman Bharat Yojana kya hai?',
  'What is Ayushman Bharat Yojana?',
  'Ayushman card kaise banwaye?',
  'How to make Ayushman card?',
  'Ayushman card ke liye eligible kaun hai?',
  'Who is eligible for Ayushman card?',
  'Ayushman card के लिए eligible कौन है?'
]

async function cleanupDuplicates() {
  try {
    console.log('\n📂 Step 1: Reading cache file...\n')
    
    const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
    const initialCount = Object.keys(cacheData.responses).length
    console.log(`   Initial entries: ${initialCount}`)
    
    console.log('\n🔍 Step 2: Finding Ayushman entries...\n')
    
    const ayushmanEntries = {}
    
    // Group all Ayushman entries
    for (const [key, value] of Object.entries(cacheData.responses)) {
      const msg = value.message.toLowerCase()
      
      for (const question of questionsToKeep) {
        if (msg.includes(question.toLowerCase())) {
          if (!ayushmanEntries[question]) {
            ayushmanEntries[question] = []
          }
          ayushmanEntries[question].push({
            key,
            message: value.message,
            answerLength: value.response.length,
            hasPrefix: value.message.includes(':')
          })
        }
      }
    }
    
    // Show what we found
    for (const [question, entries] of Object.entries(ayushmanEntries)) {
      console.log(`\n   Question: "${question}"`)
      console.log(`   Found ${entries.length} entries:`)
      entries.forEach((e, i) => {
        console.log(`      ${i+1}. Key: ${e.key.substring(0, 16)}... | Message: ${e.message.substring(0, 50)}... | Length: ${e.answerLength}`)
      })
    }
    
    console.log('\n🗑️  Step 3: Removing duplicates...\n')
    
    let removed = 0
    
    for (const [question, entries] of Object.entries(ayushmanEntries)) {
      if (entries.length > 1) {
        // Sort by answer length (keep longest = most detailed)
        entries.sort((a, b) => b.answerLength - a.answerLength)
        
        // Keep the first one (longest), remove others
        const toKeep = entries[0]
        const toRemove = entries.slice(1)
        
        console.log(`   "${question}":`)
        console.log(`      ✅ Keeping: ${toKeep.message} (${toKeep.answerLength} chars)`)
        
        for (const entry of toRemove) {
          delete cacheData.responses[entry.key]
          removed++
          console.log(`      ❌ Removed: ${entry.message} (${entry.answerLength} chars)`)
        }
        console.log()
      }
    }
    
    const finalCount = Object.keys(cacheData.responses).length
    
    console.log('=' .repeat(70))
    console.log(`\n📊 Summary:`)
    console.log(`   Initial entries: ${initialCount}`)
    console.log(`   Removed duplicates: ${removed}`)
    console.log(`   Final entries: ${finalCount}`)
    
    console.log('\n💾 Step 4: Saving cleaned cache...\n')
    
    await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2), 'utf-8')
    
    console.log('   ✅ Cache file saved!')
    
    console.log('\n🧪 Step 5: Verifying cleanup...\n')
    
    // Re-read and verify
    const verifyData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
    
    for (const question of questionsToKeep) {
      const key = generateKey(question)
      const entry = verifyData.responses[key]
      
      if (entry) {
        console.log(`   ✅ ${question}`)
        console.log(`      Answer: ${entry.response.length} chars`)
      } else {
        console.log(`   ❌ ${question} - NOT FOUND`)
      }
    }
    
    console.log('\n' + '='.repeat(70))
    console.log('\n✅ Cleanup complete!')
    console.log('💡 Test with: npm run test-ayushman')
    
    return true
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    console.error(err.stack)
    return false
  }
}

cleanupDuplicates()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err)
    process.exit(1)
  })
