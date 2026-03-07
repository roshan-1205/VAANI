import fs from 'fs/promises'

async function removeAyushmanFromTraining() {
  console.log('🗑️  Removing Ayushman Questions from Training Dataset\n')
  console.log('='.repeat(80) + '\n')
  
  // Read training dataset
  const data = JSON.parse(await fs.readFile('./training-dataset.json', 'utf-8'))
  
  console.log('Initial conversations:', data.training_conversations.length)
  
  // Filter out Ayushman entries
  const filtered = data.training_conversations.filter(conv => {
    const hasAyushman = 
      conv.user.toLowerCase().includes('ayushman') ||
      conv.assistant.toLowerCase().includes('ayushman') ||
      conv.category?.toLowerCase().includes('ayushman')
    
    if (hasAyushman) {
      console.log(`❌ Removing: ${conv.id} - ${conv.user}`)
      console.log(`   Category: ${conv.category}`)
      console.log(`   Answer length: ${conv.assistant.length} chars\n`)
    }
    
    return !hasAyushman
  })
  
  console.log('='.repeat(80))
  console.log(`Removed: ${data.training_conversations.length - filtered.length} conversations`)
  console.log(`Remaining: ${filtered.length} conversations`)
  
  // Update dataset
  data.training_conversations = filtered
  
  // Save
  await fs.writeFile('./training-dataset.json', JSON.stringify(data, null, 2))
  
  console.log('\n✅ Training dataset updated!')
  
  // Verify
  const remaining = filtered.filter(conv => 
    conv.user.toLowerCase().includes('ayushman') ||
    conv.assistant.toLowerCase().includes('ayushman')
  )
  
  console.log(`\n📊 Remaining Ayushman entries: ${remaining.length}`)
  
  if (remaining.length === 0) {
    console.log('✅ All Ayushman questions removed from training dataset!')
  }
}

removeAyushmanFromTraining().catch(console.error)
