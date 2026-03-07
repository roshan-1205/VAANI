import fs from 'fs/promises'

console.log('\n🎯 VAANI Dataset - Bulk Add Conversations\n')

// Tumhare naye conversations yahan add karo
const newConversations = [
  {
    language: 'hinglish', // english, hindi, hinglish
    category: 'noise_pollution',
    user: 'Raat ko bahut shor hota hai',
    assistant: 'Noise pollution ki complaint aap police ya municipal corporation ko kar sakte hain. VAANI mein "Noise Complaint" select karke time, location aur details add karein. Main aapko step-by-step guide kar sakti hoon.',
    context: 'noise_complaint'
  },
  {
    language: 'hinglish',
    category: 'stray_animals',
    user: 'Sadak pe bahut kutte ghoom rahe hain',
    assistant: 'Stray animals ki problem ke liye aap municipal corporation ko complaint karein. VAANI mein "Stray Animals" category select karke location aur photo add karein. Kya aapko help chahiye?',
    context: 'stray_dogs'
  },
  {
    language: 'hinglish',
    category: 'building_collapse',
    user: 'Building gir sakti hai, bahut purani hai',
    assistant: 'Yeh serious safety issue hai! Turant municipal building department ko report karein. VAANI mein "Unsafe Building" select karke urgent complaint file karein. Emergency mein 100 dial karein.',
    context: 'building_safety'
  },
  {
    language: 'hinglish',
    category: 'air_pollution',
    user: 'Pollution bahut zyada hai yahan',
    assistant: 'Air pollution ki complaint Pollution Control Board ko karein. VAANI mein "Air Pollution" select karke source aur location details add karein. Main aapko process bataungi.',
    context: 'air_quality'
  },
  {
    language: 'hinglish',
    category: 'child_labor',
    user: 'Bacche kaam kar rahe hain yahan',
    assistant: 'Child labor serious crime hai. Turant Child Helpline 1098 pe call karein ya police ko inform karein. VAANI mein bhi "Child Labor" report kar sakte hain with location details.',
    context: 'child_protection'
  }
  // Aur conversations yahan add karo...
]

async function bulkAdd() {
  try {
    // Load existing dataset
    console.log('📚 Loading existing dataset...')
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    
    const startCount = dataset.training_conversations.length
    console.log(`📊 Current conversations: ${startCount}`)
    
    // Add new conversations
    let englishCount = 0
    let hindiCount = 0
    let hinglishCount = 0
    
    newConversations.forEach((conv, index) => {
      const newId = `conv_${String(startCount + index + 1).padStart(3, '0')}`
      
      dataset.training_conversations.push({
        id: newId,
        category: conv.category,
        user: conv.user,
        assistant: conv.assistant,
        context: conv.context
      })
      
      // Count by language
      if (conv.language === 'english') englishCount++
      else if (conv.language === 'hindi') hindiCount++
      else if (conv.language === 'hinglish') hinglishCount++
    })
    
    // Update metadata
    dataset.metadata.total_conversations = dataset.training_conversations.length
    dataset.metadata.english_conversations += englishCount
    dataset.metadata.hindi_conversations += hindiCount
    dataset.metadata.hinglish_conversations += hinglishCount
    dataset.metadata.updated = new Date().toISOString().split('T')[0]
    
    // Save updated dataset
    console.log('\n💾 Saving updated dataset...')
    await fs.writeFile('./training-dataset.json', JSON.stringify(dataset, null, 2))
    
    console.log('\n✅ Bulk add completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Added: ${newConversations.length} conversations`)
    console.log(`   - English: +${englishCount}`)
    console.log(`   - Hindi: +${hindiCount}`)
    console.log(`   - Hinglish: +${hinglishCount}`)
    console.log(`   - Total: ${dataset.metadata.total_conversations}`)
    console.log('\n🔄 Please restart the server to load new data.')
    console.log('   Command: node server-production.js\n')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

bulkAdd()
