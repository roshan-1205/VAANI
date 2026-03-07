/**
 * Display all questions with their context and expected answers
 */

import fs from 'fs/promises'

console.log('📋 ALL 65 QUESTIONS WITH CONTEXT & ANSWERS\n')
console.log('=' .repeat(80))

async function displayQuestionsWithContext() {
  // Load training dataset
  const data = await fs.readFile('./training-dataset.json', 'utf-8')
  const dataset = JSON.parse(data)
  const conversations = dataset.training_conversations
  
  console.log(`\nTotal Questions: ${conversations.length}\n`)
  console.log('=' .repeat(80))
  
  // Group by category for better understanding
  const categories = {}
  
  conversations.forEach(conv => {
    const categoryBase = conv.category.replace(/_english|_hindi/g, '')
    if (!categories[categoryBase]) {
      categories[categoryBase] = []
    }
    categories[categoryBase].push(conv)
  })
  
  let questionNum = 1
  
  Object.keys(categories).sort().forEach(category => {
    const items = categories[category]
    
    console.log(`\n${'='.repeat(80)}`)
    console.log(`📂 CATEGORY: ${category.toUpperCase().replace(/_/g, ' ')}`)
    console.log(`   Total: ${items.length} questions`)
    console.log('='.repeat(80))
    
    items.forEach(conv => {
      console.log(`\n${questionNum}. ID: ${conv.id}`)
      console.log(`   Context: ${conv.context}`)
      console.log(`   
   ❓ QUESTION:`)
      console.log(`      "${conv.user}"`)
      console.log(`   
   ✅ EXPECTED ANSWER:`)
      console.log(`      "${conv.assistant}"`)
      console.log(`   
   📝 Category: ${conv.category}`)
      
      // Detect language
      let language = 'Hinglish'
      if (conv.category.includes('_english')) language = 'English'
      else if (conv.category.includes('_hindi')) language = 'Hindi'
      else if (/[\u0900-\u097F]/.test(conv.user)) language = 'Hindi'
      
      console.log(`   🌐 Language: ${language}`)
      console.log(`   ${'-'.repeat(76)}`)
      
      questionNum++
    })
  })
  
  // Summary by language
  console.log(`\n${'='.repeat(80)}`)
  console.log('\n📊 SUMMARY BY LANGUAGE:\n')
  
  const langCount = { English: 0, Hindi: 0, Hinglish: 0 }
  conversations.forEach(conv => {
    if (conv.category.includes('_english')) langCount.English++
    else if (conv.category.includes('_hindi') || /[\u0900-\u097F]/.test(conv.user)) langCount.Hindi++
    else langCount.Hinglish++
  })
  
  console.log(`   English Questions: ${langCount.English}`)
  console.log(`   Hindi Questions: ${langCount.Hindi}`)
  console.log(`   Hinglish Questions: ${langCount.Hinglish}`)
  
  // Summary by category
  console.log(`\n📊 SUMMARY BY CATEGORY:\n`)
  
  Object.keys(categories).sort().forEach(category => {
    console.log(`   ${category.replace(/_/g, ' ')}: ${categories[category].length} questions`)
  })
  
  console.log(`\n${'='.repeat(80)}`)
  console.log('\n✅ All questions documented with context and expected answers!')
  console.log('🎯 Use this as reference for understanding what each question should return')
}

displayQuestionsWithContext().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
