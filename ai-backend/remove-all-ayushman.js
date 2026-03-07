import fs from 'fs/promises'

async function removeAllAyushman() {
  console.log('🗑️  Removing ALL Ayushman Entries from Cache\n')
  console.log('='.repeat(80) + '\n')
  
  // Read cache
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const responses = cacheData.responses
  
  console.log('Initial entries:', Object.keys(responses).length)
  
  // Find all Ayushman entries
  const ayushmanKeys = []
  for (const [key, entry] of Object.entries(responses)) {
    if (entry.message.toLowerCase().includes('ayushman')) {
      ayushmanKeys.push(key)
    }
  }
  
  console.log(`Found ${ayushmanKeys.length} Ayushman entries\n`)
  
  // Remove all
  ayushmanKeys.forEach(key => {
    const entry = responses[key]
    console.log(`❌ Removing: ${entry.message}`)
    console.log(`   Length: ${entry.response.length} chars`)
    console.log(`   Key: ${key}\n`)
    delete responses[key]
  })
  
  console.log('='.repeat(80))
  console.log(`Removed: ${ayushmanKeys.length} entries`)
  console.log(`Final entries: ${Object.keys(responses).length}`)
  
  // Save
  cacheData.responses = responses
  cacheData.lastUpdated = new Date().toISOString()
  
  await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2))
  await fs.writeFile('./cache/responses-formatted.json', JSON.stringify(cacheData, null, 2))
  
  console.log('\n✅ Cache files saved!')
  console.log('   - cache/responses.json')
  console.log('   - cache/responses-formatted.json')
  
  // Verify
  const remaining = Object.entries(responses).filter(([k,v]) => 
    v.message.toLowerCase().includes('ayushman')
  )
  
  console.log('\n📊 Verification:')
  console.log(`   Remaining Ayushman entries: ${remaining.length}`)
  
  if (remaining.length === 0) {
    console.log('\n✅ SUCCESS! All Ayushman entries removed from cache!')
  } else {
    console.log('\n⚠️  Warning: Some entries still remain')
  }
}

removeAllAyushman().catch(console.error)
