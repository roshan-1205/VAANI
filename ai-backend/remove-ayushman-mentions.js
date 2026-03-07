import fs from 'fs/promises'

async function removeAyushmanMentions() {
  console.log('🔧 Removing Ayushman Mentions from Responses\n')
  console.log('='.repeat(80) + '\n')
  
  // Read cache
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const responses = cacheData.responses
  
  console.log('Total entries:', Object.keys(responses).length)
  
  // Find entries that mention Ayushman in response
  let modified = 0
  
  for (const [key, entry] of Object.entries(responses)) {
    if (entry.response.toLowerCase().includes('ayushman')) {
      console.log(`\n📝 Found mention in: ${entry.message}`)
      console.log(`   Old response: ${entry.response.substring(0, 100)}...`)
      
      // Replace Ayushman Bharat with generic text
      const newResponse = entry.response
        .replace(/Ayushman Bharat,?\s*/gi, '')
        .replace(/,\s*PM Awas/gi, 'PM Awas')
        .replace(/आपको\s+PM Awas/gi, 'आपको PM Awas')
        .replace(/about\s+PM Awas/gi, 'about PM Awas')
        .replace(/\s+,/g, ',') // Clean up extra commas
        .trim()
      
      responses[key].response = newResponse
      console.log(`   New response: ${newResponse.substring(0, 100)}...`)
      modified++
    }
  }
  
  console.log('\n' + '='.repeat(80))
  console.log(`Modified: ${modified} entries`)
  
  // Save
  cacheData.responses = responses
  cacheData.lastUpdated = new Date().toISOString()
  
  await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2))
  await fs.writeFile('./cache/responses-formatted.json', JSON.stringify(cacheData, null, 2))
  
  console.log('\n✅ Cache files updated!')
  
  // Verify
  let remaining = 0
  for (const entry of Object.values(responses)) {
    if (entry.response.toLowerCase().includes('ayushman')) {
      remaining++
    }
  }
  
  console.log(`\n📊 Remaining Ayushman mentions: ${remaining}`)
  
  if (remaining === 0) {
    console.log('✅ All Ayushman mentions removed!')
  }
}

removeAyushmanMentions().catch(console.error)
