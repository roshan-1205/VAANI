import fs from 'fs/promises'

async function removeGenericResponses() {
  console.log('🗑️  Removing Generic Fallback Responses from Cache\n')
  console.log('='.repeat(80) + '\n')
  
  // Read cache
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const responses = cacheData.responses
  
  console.log('Initial entries:', Object.keys(responses).length)
  
  // Generic response text to match
  const genericText = 'मैं नागरिक मुद्दों में मदद के लिए यहाँ हूँ'
  
  const cleanedResponses = {}
  let removed = 0
  
  console.log('\n🔍 Finding and removing generic responses:\n')
  
  for (const [key, entry] of Object.entries(responses)) {
    if (entry.response.includes(genericText)) {
      console.log(`❌ ${entry.message}`)
      console.log(`   Response: ${entry.response.substring(0, 80)}...`)
      console.log(`   Use count: ${entry.useCount}\n`)
      removed++
    } else {
      cleanedResponses[key] = entry
    }
  }
  
  console.log('='.repeat(80))
  console.log(`Removed: ${removed} entries`)
  console.log(`Remaining: ${Object.keys(cleanedResponses).length}`)
  
  // Save
  cacheData.responses = cleanedResponses
  cacheData.lastUpdated = new Date().toISOString()
  
  await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2))
  await fs.writeFile('./cache/responses-formatted.json', JSON.stringify(cacheData, null, 2))
  
  console.log('\n✅ Cache files updated!')
  
  // Verify
  let remaining = 0
  for (const entry of Object.values(cleanedResponses)) {
    if (entry.response.includes(genericText)) {
      remaining++
    }
  }
  
  console.log(`\n📊 Verification: ${remaining} generic responses remaining`)
  
  if (remaining === 0) {
    console.log('✅ All generic fallback responses removed!')
  }
}

removeGenericResponses().catch(console.error)
