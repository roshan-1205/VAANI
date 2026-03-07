import fs from 'fs/promises'

console.log('\n🧹 Cleaning up duplicate conversations...\n')

async function cleanupDuplicates() {
  try {
    // Load dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    
    const conversations = dataset.training_conversations
    const seen = new Map()
    const duplicates = []
    const unique = []
    
    // Find duplicates based on normalized user message
    conversations.forEach((conv, index) => {
      const normalized = conv.user.toLowerCase().trim().replace(/\s+/g, ' ')
      
      if (seen.has(normalized)) {
        duplicates.push({
          index,
          id: conv.id,
          user: conv.user,
          duplicate_of: seen.get(normalized)
        })
      } else {
        seen.set(normalized, conv.id)
        unique.push(conv)
      }
    })
    
    console.log(`📊 Analysis:`)
    console.log(`   Total conversations: ${conversations.length}`)
    console.log(`   Unique conversations: ${unique.length}`)
    console.log(`   Duplicates found: ${duplicates.length}`)
    
    if (duplicates.length > 0) {
      console.log(`\n🔍 Duplicate entries:`)
      duplicates.forEach(dup => {
        console.log(`   - ${dup.id}: "${dup.user}" (duplicate of ${dup.duplicate_of})`)
      })
      
      // Update dataset with unique conversations only
      dataset.training_conversations = unique
      dataset.metadata.total_conversations = unique.length
      
      // Recalculate language counts
      let englishCount = 0
      let hindiCount = 0
      let hinglishCount = 0
      
      unique.forEach(conv => {
        if (conv.category.includes('_english')) englishCount++
        else if (conv.category.includes('_hindi')) hindiCount++
        else hinglishCount++
      })
      
      dataset.metadata.english_conversations = englishCount
      dataset.metadata.hindi_conversations = hindiCount
      dataset.metadata.hinglish_conversations = hinglishCount
      dataset.metadata.updated = new Date().toISOString().split('T')[0]
      
      // Save cleaned dataset
      await fs.writeFile('./training-dataset.json', JSON.stringify(dataset, null, 2))
      
      console.log(`\n✅ Cleanup complete!`)
      console.log(`   Removed: ${duplicates.length} duplicates`)
      console.log(`   Remaining: ${unique.length} unique conversations`)
      console.log(`\n🔄 Please restart the server to load cleaned data.\n`)
    } else {
      console.log(`\n✅ No duplicates found! Dataset is clean.\n`)
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

cleanupDuplicates()
