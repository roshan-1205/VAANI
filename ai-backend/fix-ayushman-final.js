import fs from 'fs/promises'

async function fixAyushmanCache() {
  console.log('🔧 Fixing Ayushman Cache - Removing Old Short Answers\n')
  console.log('='.repeat(80) + '\n')
  
  // Read cache
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const responses = cacheData.responses
  
  console.log('Initial entries:', Object.keys(responses).length)
  
  // Keys to remove (old short answers)
  const keysToRemove = [
    '08a7f4c956a0ab77d62d52b20457557e', // hinglish:Ayushman card kaise banwaye? (170 chars)
    '822f3903f08cb50d3cd0c2893e207fde', // english:What is Ayushman Bharat Yojana? (166 chars)
    'ab6f745a467ee589c972cd6ce23fcdc0', // english:How to make Ayushman card? (148 chars)
    '4b3188a706258e751fc7c5e0804a9b4e'  // hinglish:Ayushman Bharat Yojana kya hai? (198 chars)
  ]
  
  console.log('\n🗑️  Removing old short answers:\n')
  
  keysToRemove.forEach(key => {
    if (responses[key]) {
      console.log(`❌ Removed: ${responses[key].message}`)
      console.log(`   Length: ${responses[key].response.length} chars`)
      console.log(`   Response: ${responses[key].response.substring(0, 100)}...\n`)
      delete responses[key]
    }
  })
  
  console.log('Final entries:', Object.keys(responses).length)
  console.log('Removed:', keysToRemove.length)
  
  // Save
  cacheData.responses = responses
  cacheData.lastUpdated = new Date().toISOString()
  
  await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2))
  
  console.log('\n✅ Cache file saved!')
  
  // Verify
  console.log('\n' + '='.repeat(80))
  console.log('🧪 Verification:\n')
  
  const ayushmanEntries = Object.entries(responses).filter(([k, v]) => 
    v.message.toLowerCase().includes('ayushman')
  )
  
  console.log(`Total Ayushman entries: ${ayushmanEntries.length}\n`)
  
  ayushmanEntries.forEach(([key, entry]) => {
    console.log(`✅ ${entry.message}`)
    console.log(`   Length: ${entry.response.length} chars`)
    console.log(`   Response: ${entry.response.substring(0, 150)}...\n`)
  })
  
  console.log('='.repeat(80))
  console.log('✅ Fix Complete!')
}

fixAyushmanCache().catch(console.error)
