import fs from 'fs/promises'

console.log('\n📝 Adding missing common entries...\n')

const missingEntries = [
  {
    language: 'hinglish',
    category: 'electricity',
    user: 'Bijli ka problem hai',
    assistant: 'Bijli ki problem? ⚡ Yeh toh bahut frustrating hai. Kya specific issue hai - poori bijli gayi hai, voltage kam hai, ya kuch aur? Main aapko VAANI mein complaint file karne mein help karungi.',
    context: 'electricity_general'
  },
  {
    language: 'hinglish',
    category: 'road_pothole',
    user: 'Sadak pe gadda hai',
    assistant: 'Sadak pe gadda? 🛣️ Yeh toh accident ka risk hai! Kahan hai yeh? Area aur landmark bataiye, main complaint file karne mein help karungi.',
    context: 'pothole_general'
  },
  {
    language: 'hinglish',
    category: 'water_supply',
    user: 'Paani ki problem hai',
    assistant: 'Paani ki problem? 💧 Kya issue hai - paani nahi aa raha, kam aa raha, ya quality kharab hai? Bataiye, main aapko help karungi.',
    context: 'water_general'
  }
]

async function addEntries() {
  try {
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    
    const startCount = dataset.training_conversations.length
    
    missingEntries.forEach((entry, index) => {
      const newId = `conv_${String(startCount + index + 1).padStart(3, '0')}`
      
      dataset.training_conversations.push({
        id: newId,
        category: entry.category,
        user: entry.user,
        assistant: entry.assistant,
        context: entry.context
      })
      
      console.log(`✅ Added: "${entry.user}"`)
    })
    
    // Update metadata
    dataset.metadata.total_conversations = dataset.training_conversations.length
    dataset.metadata.hinglish_conversations += missingEntries.length
    dataset.metadata.updated = new Date().toISOString().split('T')[0]
    
    await fs.writeFile('./training-dataset.json', JSON.stringify(dataset, null, 2))
    
    console.log(`\n✅ Added ${missingEntries.length} new entries`)
    console.log(`📊 Total conversations: ${dataset.metadata.total_conversations}`)
    console.log('\n🔄 Please restart the server to load new data.\n')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

addEntries()
