/**
 * Populate cache with all training data for instant responses
 */

import fs from 'fs/promises'
import cache from './response-cache.js'
import { detectLanguage } from './language-detector.js'

console.log('🔄 Populating cache with all training data...\n')

async function populateCache() {
  try {
    // Initialize cache
    await cache.initialize()
    
    // Load training dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    console.log(`📚 Found ${conversations.length} conversations`)
    console.log('💾 Adding to cache...\n')
    
    let added = 0
    let skipped = 0
    
    for (const conv of conversations) {
      // Detect language
      const language = detectLanguage(conv.user)
      const cacheKey = `${language}:${conv.user}`
      
      // Check if already cached
      const existing = await cache.get(conv.user)
      
      if (!existing) {
        // Add to cache
        await cache.set(conv.user, conv.assistant, {
          source: 'training_preload',
          language: language,
          category: conv.category,
          id: conv.id
        })
        added++
        console.log(`✅ Added: ${conv.id} - "${conv.user.substring(0, 50)}..."`)
      } else {
        skipped++
        console.log(`⏭️  Skipped: ${conv.id} - Already cached`)
      }
    }
    
    // Force save to disk
    await cache.persist()
    
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Cache Population Complete\n')
    console.log(`✅ Added: ${added} entries`)
    console.log(`⏭️  Skipped: ${skipped} entries (already cached)`)
    console.log(`💾 Total in cache: ${cache.cache.size} entries`)
    
    const stats = cache.getStats()
    console.log(`\n📈 Cache Stats:`)
    console.log(`   Total Entries: ${stats.totalEntries}`)
    console.log(`   Hit Rate: ${stats.hitRate}`)
    console.log(`   Estimated Savings: ${stats.estimatedSavings}`)
    
    console.log('\n🎉 All training data cached for instant responses!')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

populateCache()
