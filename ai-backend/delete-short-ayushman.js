import fs from 'fs/promises'

async function deleteShortAyushman() {
  console.log('🗑️  Deleting Short Ayushman Answers\n')
  console.log('='.repeat(80) + '\n')
  
  // Read cache
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const responses = cacheData.responses
  
  console.log('Initial entries:', Object.keys(responses).length)
  
  // Keys to remove (all short answers)
  const keysToRemove = [
    '08a7f4c956a0ab77d62d52b20457557e', // hinglish:Ayushman card kaise banwaye? (170)
    '40d97080b660f7ea7118d5398c91e2aa', // english:Ayushman Bharat Yojana kya hai? (166)
    '822f3903f08cb50d3cd0c2893e207fde', // english:What is Ayushman Bharat Yojana? (166)
    'ab6f745a467ee589c972cd6ce23fcdc0', // english:How to make Ayushman card? (148)
    '4b3188a706258e751fc7c5e0804a9b4e'  // hinglish:Ayushman Bharat Yojana kya hai? (198)
  ]
  
  console.log('🗑️  Removing short answers:\n')
  
  let removed = 0
  keysToRemove.forEach(key => {
    if (responses[key]) {
      console.log(`❌ ${responses[key].message}`)
      console.log(`   Length: ${responses[key].response.length} chars`)
      console.log(`   Response: ${responses[key].response.substring(0, 80)}...\n`)
      delete responses[key]
      removed++
    } else {
      console.log(`⚠️  Key not found: ${key}\n`)
    }
  })
  
  console.log('='.repeat(80))
  console.log(`Removed: ${removed} entries`)
  console.log(`Final entries: ${Object.keys(responses).length}`)
  
  // Save
  cacheData.responses = responses
  cacheData.lastUpdated = new Date().toISOString()
  
  await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2))
  console.log('\n✅ Cache saved!')
  
  // Verify
  const ayushman = Object.entries(responses).filter(([k,v]) => 
    v.message.toLowerCase().includes('ayushman')
  )
  
  console.log('\n📊 Remaining Ayushman entries:', ayushman.length)
  
  if (ayushman.length === 0) {
    console.log('\n✅ All Ayushman entries removed!')
    console.log('💡 Now run: node train-and-test-loop.js')
    console.log('   This will add detailed answers back to cache')
  } else {
    console.log('\n⚠️  Some Ayushman entries still remain:')
    ayushman.forEach(([k, v]) => {
      console.log(`   - ${v.message} (${v.response.length} chars)`)
    })
  }
}

deleteShortAyushman().catch(console.error)
