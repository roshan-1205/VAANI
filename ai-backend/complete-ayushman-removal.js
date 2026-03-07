import fs from 'fs/promises'

async function completeAyushmanRemoval() {
  console.log('🗑️  COMPLETE AYUSHMAN REMOVAL - All Files\n')
  console.log('='.repeat(80) + '\n')
  
  let totalRemoved = 0
  
  // 1. Remove from training dataset
  console.log('📂 Step 1: Cleaning training-dataset.json\n')
  const trainingData = JSON.parse(await fs.readFile('./training-dataset.json', 'utf-8'))
  const initialTraining = trainingData.training_conversations.length
  
  trainingData.training_conversations = trainingData.training_conversations.filter(conv => {
    const hasAyushman = 
      conv.user?.toLowerCase().includes('ayushman') ||
      conv.assistant?.toLowerCase().includes('ayushman') ||
      conv.category?.toLowerCase().includes('ayushman') ||
      conv.context?.toLowerCase().includes('ayushman')
    
    if (hasAyushman) {
      console.log(`   ❌ ${conv.id}: ${conv.user}`)
      totalRemoved++
    }
    
    return !hasAyushman
  })
  
  trainingData.metadata.total_conversations = trainingData.training_conversations.length
  trainingData.metadata.version = "13.0-ayushman-completely-removed"
  trainingData.metadata.note = "All Ayushman Bharat data completely removed"
  trainingData.metadata.updated = new Date().toISOString().split('T')[0]
  
  await fs.writeFile('./training-dataset.json', JSON.stringify(trainingData, null, 2))
  
  console.log(`\n   Removed from training: ${initialTraining - trainingData.training_conversations.length}`)
  console.log(`   Remaining: ${trainingData.training_conversations.length}\n`)
  
  // 2. Remove from cache
  console.log('📂 Step 2: Cleaning cache/responses.json\n')
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const initialCache = Object.keys(cacheData.responses).length
  
  const cleanedResponses = {}
  for (const [key, entry] of Object.entries(cacheData.responses)) {
    const hasAyushman = 
      entry.message?.toLowerCase().includes('ayushman') ||
      entry.response?.toLowerCase().includes('ayushman')
    
    if (hasAyushman) {
      console.log(`   ❌ ${entry.message}`)
      totalRemoved++
    } else {
      cleanedResponses[key] = entry
    }
  }
  
  cacheData.responses = cleanedResponses
  cacheData.lastUpdated = new Date().toISOString()
  
  await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2))
  await fs.writeFile('./cache/responses-formatted.json', JSON.stringify(cacheData, null, 2))
  
  console.log(`\n   Removed from cache: ${initialCache - Object.keys(cleanedResponses).length}`)
  console.log(`   Remaining: ${Object.keys(cleanedResponses).length}\n`)
  
  // 3. Verify
  console.log('='.repeat(80))
  console.log('📊 Verification:\n')
  
  // Check training
  const trainingCheck = trainingData.training_conversations.filter(c => 
    c.user?.toLowerCase().includes('ayushman') ||
    c.assistant?.toLowerCase().includes('ayushman')
  )
  
  // Check cache
  let cacheCheck = 0
  for (const entry of Object.values(cleanedResponses)) {
    if (entry.message?.toLowerCase().includes('ayushman') ||
        entry.response?.toLowerCase().includes('ayushman')) {
      cacheCheck++
    }
  }
  
  console.log(`   Training dataset: ${trainingCheck.length} Ayushman entries`)
  console.log(`   Cache: ${cacheCheck} Ayushman entries`)
  console.log(`   Total removed: ${totalRemoved}`)
  
  if (trainingCheck.length === 0 && cacheCheck === 0) {
    console.log('\n✅ SUCCESS! All Ayushman data completely removed!')
  } else {
    console.log('\n⚠️  Warning: Some Ayushman data still remains')
  }
}

completeAyushmanRemoval().catch(console.error)
