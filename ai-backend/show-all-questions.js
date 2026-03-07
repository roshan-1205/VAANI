/**
 * Show All Trained Questions
 * Saare trained questions ko category-wise dikhao
 */

import fs from 'fs/promises'

console.log('📋 All Trained Questions\n')
console.log('=' .repeat(70))

async function showAllQuestions() {
  try {
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    console.log(`\n📊 Total Questions: ${conversations.length}`)
    console.log(`📅 Last Updated: ${dataset.metadata.updated}`)
    console.log(`🌐 Languages: ${dataset.metadata.language}\n`)
    console.log('=' .repeat(70))
    
    // Group by category
    const categories = {}
    conversations.forEach(conv => {
      const mainCategory = conv.category.split('_')[0]
      if (!categories[mainCategory]) {
        categories[mainCategory] = []
      }
      categories[mainCategory].push(conv)
    })
    
    // Show by category
    Object.keys(categories).sort().forEach(cat => {
      console.log(`\n📂 ${cat.toUpperCase()} (${categories[cat].length} questions)`)
      console.log('-'.repeat(70))
      
      categories[cat].forEach((conv, idx) => {
        console.log(`\n${idx + 1}. [${conv.id}] ${conv.category}`)
        console.log(`   Q: "${conv.user}"`)
        console.log(`   A: "${conv.assistant.substring(0, 80)}..."`)
      })
    })
    
    console.log('\n' + '='.repeat(70))
    console.log('\n✅ All questions displayed successfully!')
    
    // Summary
    console.log('\n📊 Category Summary:\n')
    Object.keys(categories).sort().forEach(cat => {
      console.log(`   ${cat}: ${categories[cat].length} questions`)
    })
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

showAllQuestions()
