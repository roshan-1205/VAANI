import fs from 'fs/promises'

console.log('\n🧹 Clearing VAANI Cache...\n')

async function clearCache() {
  try {
    // Clear response cache
    const emptyCache = {
      responses: {},
      stats: {
        hits: 0,
        misses: 0,
        saved: 0
      },
      lastUpdated: new Date().toISOString()
    }
    
    await fs.writeFile('./cache/responses.json', JSON.stringify(emptyCache, null, 2))
    console.log('✅ Response cache cleared')
    
    console.log('\n📊 Cache reset complete!')
    console.log('🔄 Please restart the server for changes to take effect.\n')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

clearCache()
