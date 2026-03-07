/**
 * Add Ayushman Bharat Hindi variations to training dataset
 * Automatically adds all missing variations for 100% accuracy
 */

import fs from 'fs'

// Read existing training data
const data = JSON.parse(fs.readFileSync('./training-dataset.json', 'utf8'))
const trainingData = data.training_conversations

// Find existing Ayushman responses
const ayushmanInfo = trainingData.find(c => c.id === 'conv_052')?.assistant
const ayushmanCard = trainingData.find(c => c.id === 'conv_054')?.assistant
const ayushmanEligibility = trainingData.find(c => c.id === 'conv_102')?.assistant

console.log('📚 Found existing Ayushman responses')
console.log(`   Info response: ${ayushmanInfo ? 'Found' : 'Missing'}`)
console.log(`   Card response: ${ayushmanCard ? 'Found' : 'Missing'}`)
console.log(`   Eligibility response: ${ayushmanEligibility ? 'Found' : 'Missing'}`)

// New variations to add
const newVariations = [
  // What is Ayushman variations
  {
    id: "conv_ayushman_hindi_var_001",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान भारत योजना क्या है",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var1"
  },
  {
    id: "conv_ayushman_hindi_var_002",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान भारत योजना क्या है?",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var2"
  },
  {
    id: "conv_ayushman_hindi_var_003",
    category: "ayushman_yojana_hindi",
    user: "Ayushman Bharat Yojana क्या है",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var3"
  },
  {
    id: "conv_ayushman_hindi_var_004",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान योजना क्या है",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var4"
  },
  {
    id: "conv_ayushman_hindi_var_005",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान कार्ड क्या है",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var5"
  },
  {
    id: "conv_ayushman_hindi_var_006",
    category: "ayushman_yojana_hindi",
    user: "PMJAY क्या है",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var6"
  },
  {
    id: "conv_ayushman_hindi_var_007",
    category: "ayushman_yojana_hindi",
    user: "प्रधानमंत्री जन आरोग्य योजना क्या है",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var7"
  },
  {
    id: "conv_ayushman_hindi_var_008",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान भारत योजना",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var8"
  },
  {
    id: "conv_ayushman_hindi_var_009",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान भारत",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var9"
  },
  {
    id: "conv_ayushman_hindi_var_010",
    category: "ayushman_yojana_hindi",
    user: "ayushman bharat yojana",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var10"
  },
  {
    id: "conv_ayushman_hindi_var_011",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान कार्ड",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var11"
  },
  {
    id: "conv_ayushman_hindi_var_012",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान भारत योजना के बारे में बताओ",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var12"
  },
  {
    id: "conv_ayushman_hindi_var_013",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान भारत योजना की जानकारी",
    assistant: ayushmanEligibility,
    context: "ayushman_info_hindi_var13"
  },
  // How to make card variations
  {
    id: "conv_ayushman_hindi_var_014",
    category: "ayushman_card_hindi",
    user: "आयुष्मान कार्ड कैसे बनाएं",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var1"
  },
  {
    id: "conv_ayushman_hindi_var_015",
    category: "ayushman_card_hindi",
    user: "आयुष्मान कार्ड कैसे बनवाएं",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var2"
  },
  {
    id: "conv_ayushman_hindi_var_016",
    category: "ayushman_card_hindi",
    user: "Ayushman card कैसे बनाएं",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var3"
  },
  {
    id: "conv_ayushman_hindi_var_017",
    category: "ayushman_card_hindi",
    user: "आयुष्मान कार्ड बनाने की प्रक्रिया",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var4"
  },
  {
    id: "conv_ayushman_hindi_var_018",
    category: "ayushman_card_hindi",
    user: "आयुष्मान कार्ड के लिए क्या करें",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var5"
  },
  {
    id: "conv_ayushman_hindi_var_019",
    category: "ayushman_card_hindi",
    user: "कार्ड कैसे मिलेगा",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var6"
  },
  {
    id: "conv_ayushman_hindi_var_020",
    category: "ayushman_card_hindi",
    user: "आयुष्मान कार्ड बनाने के लिए क्या चाहिए",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var7"
  },
  {
    id: "conv_ayushman_hindi_var_021",
    category: "ayushman_card_hindi",
    user: "आयुष्मान कार्ड documents",
    assistant: ayushmanCard,
    context: "ayushman_card_hindi_var8"
  },
  // Eligibility variations
  {
    id: "conv_ayushman_hindi_var_022",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान कार्ड के लिए eligible कौन है",
    assistant: ayushmanEligibility,
    context: "ayushman_eligibility_hindi_var1"
  },
  {
    id: "conv_ayushman_hindi_var_023",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान कार्ड के लिए कौन eligible है",
    assistant: ayushmanEligibility,
    context: "ayushman_eligibility_hindi_var2"
  },
  {
    id: "conv_ayushman_hindi_var_024",
    category: "ayushman_yojana_hindi",
    user: "कौन आयुष्मान कार्ड बनवा सकता है",
    assistant: ayushmanEligibility,
    context: "ayushman_eligibility_hindi_var3"
  },
  {
    id: "conv_ayushman_hindi_var_025",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान योजना के लिए पात्रता",
    assistant: ayushmanEligibility,
    context: "ayushman_eligibility_hindi_var4"
  },
  {
    id: "conv_ayushman_hindi_var_026",
    category: "ayushman_yojana_hindi",
    user: "क्या मैं eligible हूं",
    assistant: ayushmanEligibility,
    context: "ayushman_eligibility_hindi_var5"
  },
  {
    id: "conv_ayushman_hindi_var_027",
    category: "ayushman_yojana_hindi",
    user: "मैं कार्ड बनवा सकता हूं क्या",
    assistant: ayushmanEligibility,
    context: "ayushman_eligibility_hindi_var6"
  },
  {
    id: "conv_ayushman_hindi_var_028",
    category: "ayushman_yojana_hindi",
    user: "आयुष्मान कार्ड eligibility",
    assistant: ayushmanEligibility,
    context: "ayushman_eligibility_hindi_var7"
  }
]

console.log(`\n📝 Adding ${newVariations.length} new variations...`)

// Add new variations to training data
newVariations.forEach(variation => {
  trainingData.push(variation)
})

// Save updated training data
data.metadata.total_conversations = trainingData.length
data.metadata.version = "12.1-ayushman-hindi-variations"
data.metadata.updated = new Date().toISOString().split('T')[0]
fs.writeFileSync('./training-dataset.json', JSON.stringify(data, null, 2))

console.log(`✅ Successfully added ${newVariations.length} variations`)
console.log(`📊 Total conversations: ${trainingData.length}`)
console.log('\n🎯 Run test-ayushman-hindi-complete.js to verify 100% accuracy!')
