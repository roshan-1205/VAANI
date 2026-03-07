/**
 * Add conv_070 variations for 100% accuracy
 */

import fs from 'fs'

// Read training data
const data = JSON.parse(fs.readFileSync('./training-dataset.json', 'utf8'))
const trainingData = data.training_conversations

// Find conv_070
const conv070 = trainingData.find(c => c.id === 'conv_070')

if (!conv070) {
  console.log('❌ conv_070 not found!')
  process.exit(1)
}

console.log('✅ Found conv_070')
console.log(`   Question: "${conv070.user}"`)
console.log(`   Answer: "${conv070.assistant}"`)

// New variations to add
const newVariations = [
  {
    id: "conv_070_var_1",
    category: "platform_help",
    user: "Ye kya karta hai",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var1"
  },
  {
    id: "conv_070_var_2",
    category: "platform_help",
    user: "App ka kaam kya hai",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var2"
  },
  {
    id: "conv_070_var_3",
    category: "platform_help",
    user: "Is app ka use kya hai",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var3"
  },
  {
    id: "conv_070_var_4",
    category: "platform_help",
    user: "Vaani kya karta hai",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var4"
  },
  {
    id: "conv_070_var_5",
    category: "platform_help",
    user: "Vaani app kya hai",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var5"
  },
  {
    id: "conv_070_var_6",
    category: "platform_help",
    user: "Ye platform kya hai",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var6"
  },
  {
    id: "conv_070_var_7",
    category: "platform_help",
    user: "Yeh app kya karta hai",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var7"
  },
  {
    id: "conv_070_var_8",
    category: "platform_help",
    user: "Yeh app kya karta hai?",
    assistant: conv070.assistant,
    context: "about_app_hinglish_var8"
  }
]

console.log(`\n📝 Adding ${newVariations.length} variations...`)

// Add variations
newVariations.forEach(variation => {
  trainingData.push(variation)
})

// Update metadata
data.metadata.total_conversations = trainingData.length
data.metadata.version = "12.2-conv070-variations"
data.metadata.updated = new Date().toISOString().split('T')[0]

// Save
fs.writeFileSync('./training-dataset.json', JSON.stringify(data, null, 2))

console.log(`✅ Successfully added ${newVariations.length} variations`)
console.log(`📊 Total conversations: ${trainingData.length}`)
console.log('\n🎯 Run test-conv070-specific.js to verify 100% accuracy!')
