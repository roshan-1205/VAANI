import fs from 'fs/promises'

console.log('\n📝 Adding 10 new diverse conversations...\n')

const newConversations = [
  // Parking Issues
  {
    language: 'hinglish',
    category: 'parking_issue',
    user: 'Parking ki jagah nahi hai',
    assistant: 'Parking problem? 🚗 Yeh toh bahut common issue hai. Kahan hai yeh - residential area, market, ya office ke paas? Main aapko VAANI mein "Parking Issue" report karne mein help karungi.',
    context: 'parking_shortage'
  },
  
  // Noise Pollution
  {
    language: 'hinglish',
    category: 'noise_pollution',
    user: 'Raat ko bahut shor hota hai',
    assistant: 'Noise pollution? 🔊 Yeh health ke liye bhi kharab hai. Kya shor hai - construction, DJ, ya traffic? Time aur location bataiye, main complaint file karne mein help karungi.',
    context: 'noise_complaint'
  },
  
  // Stray Animals
  {
    language: 'hinglish',
    category: 'stray_animals',
    user: 'Sadak pe kutte ghoom rahe hain',
    assistant: 'Stray dogs ki problem? 🐕 Safety concern hai yeh. Kitne dogs hain aur kahan? Main aapko municipal corporation ko report karne mein help karungi.',
    context: 'stray_dogs'
  },
  
  // Public Toilet
  {
    language: 'hinglish',
    category: 'public_toilet',
    user: 'Public toilet ganda hai',
    assistant: 'Public toilet ki cleanliness issue? 🚻 Yeh toh basic facility hai. Kahan hai yeh toilet? Main VAANI mein complaint file karne mein help karungi.',
    context: 'toilet_cleanliness'
  },
  
  // Traffic Signal
  {
    language: 'hinglish',
    category: 'traffic_signal',
    user: 'Traffic light kharab hai',
    assistant: 'Traffic signal not working? 🚦 Yeh accident ka risk hai! Kaunse crossing pe hai? Main turant complaint file karne mein help karungi.',
    context: 'traffic_signal_issue'
  },
  
  // Tree Cutting
  {
    language: 'hinglish',
    category: 'tree_cutting',
    user: 'Ped kat rahe hain',
    assistant: 'Unauthorized tree cutting? 🌳 Yeh environment ke liye serious issue hai! Kahan ho raha hai yeh? Photo hai kya? Main turant report karne mein help karungi.',
    context: 'illegal_tree_cutting'
  },
  
  // Manhole Open
  {
    language: 'hinglish',
    category: 'manhole_open',
    user: 'Manhole khula pada hai',
    assistant: 'Open manhole? ⚠️ Yeh toh bahut dangerous hai! Accident ho sakta hai. Kahan hai yeh? Main emergency complaint file karne mein help karungi.',
    context: 'open_manhole_danger'
  },
  
  // Water Leakage
  {
    language: 'hinglish',
    category: 'water_leakage',
    user: 'Pipe se paani leak ho raha hai',
    assistant: 'Water leakage? 💧 Paani waste ho raha hai. Kahan hai yeh leak - main road pe ya gali mein? Main jal board ko complaint karne mein help karungi.',
    context: 'water_pipe_leak'
  },
  
  // Illegal Construction
  {
    language: 'hinglish',
    category: 'illegal_construction',
    user: 'Illegal construction ho raha hai',
    assistant: 'Illegal construction? 🏗️ Yeh building norms violation hai. Kahan ho raha hai? Kya proof hai? Main municipal building department ko report karne mein help karungi.',
    context: 'unauthorized_construction'
  },
  
  // Volunteer Help
  {
    language: 'hinglish',
    category: 'volunteer_request',
    user: 'Mujhe volunteer chahiye',
    assistant: 'Volunteer help chahiye? 🤝 Koi baat nahi! Kis cheez ke liye help chahiye - complaint file karne, form bharne, ya kuch aur? Main aapko volunteer connect karne mein help karungi.',
    context: 'volunteer_assistance'
  }
]

async function addNewConversations() {
  try {
    // Load existing dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    
    const startCount = dataset.training_conversations.length
    console.log(`📊 Current conversations: ${startCount}`)
    
    // Add new conversations
    newConversations.forEach((conv, index) => {
      const newId = `conv_${String(startCount + index + 1).padStart(3, '0')}`
      
      dataset.training_conversations.push({
        id: newId,
        category: conv.category,
        user: conv.user,
        assistant: conv.assistant,
        context: conv.context
      })
      
      console.log(`✅ ${index + 1}. Added: "${conv.user}"`)
    })
    
    // Update metadata
    dataset.metadata.total_conversations = dataset.training_conversations.length
    dataset.metadata.hinglish_conversations += newConversations.length
    dataset.metadata.updated = new Date().toISOString().split('T')[0]
    
    // Save updated dataset
    await fs.writeFile('./training-dataset.json', JSON.stringify(dataset, null, 2))
    
    console.log(`\n✅ Successfully added ${newConversations.length} new conversations!`)
    console.log(`📊 Total conversations: ${dataset.metadata.total_conversations}`)
    console.log(`\n🎯 New categories covered:`)
    console.log(`   - Parking issues`)
    console.log(`   - Noise pollution`)
    console.log(`   - Stray animals`)
    console.log(`   - Public toilets`)
    console.log(`   - Traffic signals`)
    console.log(`   - Tree cutting`)
    console.log(`   - Open manholes`)
    console.log(`   - Water leakage`)
    console.log(`   - Illegal construction`)
    console.log(`   - Volunteer requests`)
    console.log(`\n🔄 Restarting server to load new data...\n`)
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

addNewConversations()
