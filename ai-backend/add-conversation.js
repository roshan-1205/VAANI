import fs from 'fs/promises'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

console.log('\n🎯 VAANI Dataset - Add New Conversation\n')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

async function addConversation() {
  try {
    // Load existing dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    
    const totalConversations = dataset.training_conversations.length
    const newId = `conv_${String(totalConversations + 1).padStart(3, '0')}`
    
    console.log(`📊 Current conversations: ${totalConversations}`)
    console.log(`🆕 New conversation ID: ${newId}\n`)
    
    // Get user input
    const language = await question('Language (1=English, 2=Hindi, 3=Hinglish): ')
    const category = await question('Category (e.g., road_issue, water_supply): ')
    const user = await question('User question: ')
    const assistant = await question('VAANI response: ')
    const context = await question('Context (short description): ')
    
    // Create new conversation
    const newConversation = {
      id: newId,
      category: category.trim(),
      user: user.trim(),
      assistant: assistant.trim(),
      context: context.trim()
    }
    
    // Add to dataset
    dataset.training_conversations.push(newConversation)
    
    // Update metadata
    dataset.metadata.total_conversations = dataset.training_conversations.length
    dataset.metadata.updated = new Date().toISOString().split('T')[0]
    
    // Update language counts
    if (language === '1') {
      dataset.metadata.english_conversations++
    } else if (language === '2') {
      dataset.metadata.hindi_conversations++
    } else if (language === '3') {
      dataset.metadata.hinglish_conversations++
    }
    
    // Save updated dataset
    await fs.writeFile('./training-dataset.json', JSON.stringify(dataset, null, 2))
    
    console.log('\n✅ Conversation added successfully!')
    console.log(`📊 Total conversations: ${dataset.metadata.total_conversations}`)
    console.log('\n🔄 Please restart the server to load new data.')
    
    const addMore = await question('\nAdd another conversation? (y/n): ')
    if (addMore.toLowerCase() === 'y') {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
      await addConversation()
    } else {
      rl.close()
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    rl.close()
  }
}

addConversation()
