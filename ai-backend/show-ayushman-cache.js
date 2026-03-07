import fs from 'fs/promises'

async function showAyushmanCache() {
  console.log('📂 Reading cache file...\n')
  
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const responses = cacheData.responses
  
  console.log('Total cache entries:', Object.keys(responses).length)
  console.log('Last updated:', cacheData.lastUpdated)
  console.log('\n' + '='.repeat(80) + '\n')
  
  // Find all Ayushman entries
  const ayushmanEntries = []
  
  for (const [key, entry] of Object.entries(responses)) {
    if (entry.message.toLowerCase().includes('ayushman')) {
      ayushmanEntries.push({ key, ...entry })
    }
  }
  
  console.log(`Found ${ayushmanEntries.length} Ayushman entries:\n`)
  
  ayushmanEntries.forEach((entry, index) => {
    console.log(`${index + 1}. KEY: ${entry.key}`)
    console.log(`   MESSAGE: ${entry.message}`)
    console.log(`   RESPONSE LENGTH: ${entry.response.length} chars`)
    console.log(`   RESPONSE:`)
    console.log(`   ${entry.response.substring(0, 200)}...`)
    console.log(`   USE COUNT: ${entry.useCount}`)
    console.log(`   CREATED: ${new Date(entry.createdAt).toLocaleString()}`)
    console.log('\n' + '-'.repeat(80) + '\n')
  })
  
  // Show full responses
  console.log('\n' + '='.repeat(80))
  console.log('FULL RESPONSES:')
  console.log('='.repeat(80) + '\n')
  
  ayushmanEntries.forEach((entry, index) => {
    console.log(`\n${index + 1}. ${entry.message}`)
    console.log('-'.repeat(80))
    console.log(entry.response)
    console.log('\n')
  })
}

showAyushmanCache().catch(console.error)
