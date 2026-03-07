import fs from 'fs'

console.log('📝 Adding 10 New Test Conversations\n')

// Read existing dataset
const datasetPath = './training-dataset.json'
const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))

// Get current conversation count
const currentCount = dataset.training_conversations.length
const currentId = currentCount + 1

console.log(`Current conversations: ${currentCount}`)
console.log(`Starting from ID: conv_${String(currentId).padStart(3, '0')}\n`)

// 10 New diverse test conversations
const newConversations = [
  // Test 1: Hinglish - Common civic issue
  {
    id: `conv_${String(currentId).padStart(3, '0')}`,
    category: "test_hinglish_civic",
    user: "bhai mere ghar ke paas sadak tut gayi hai bahut problem ho rhi hai",
    assistant: "Main samajh sakti hoon. Sadak tutna bahut serious problem hai. Kahan hai yeh exactly? Area aur landmark bataiye, main complaint file karne mein madad karungi.",
    context: "hinglish_road_issue"
  },
  
  // Test 2: Hinglish - Water problem
  {
    id: `conv_${String(currentId + 1).padStart(3, '0')}`,
    category: "test_hinglish_water",
    user: "paani ki supply bahut kam aa rhi hai subah se shaam tak sirf 2 ghante",
    assistant: "Yeh toh bahut serious hai! Sirf 2 ghante paani? Kaunse area mein rehte ho? Main turant water supply complaint register karne mein help karungi.",
    context: "hinglish_water_shortage"
  },
  
  // Test 3: Hinglish - Electricity issue
  {
    id: `conv_${String(currentId + 2).padStart(3, '0')}`,
    category: "test_hinglish_electricity",
    user: "bijli ka meter kharab ho gaya hai bill bahut zyada aa rha hai",
    assistant: "Meter kharab hai aur bill zyada? Yeh check karna zaruri hai. Aap electricity department ko complaint kar sakte ho. VAANI mein 'Electricity Issue' select kare aur details add kare.",
    context: "hinglish_meter_issue"
  },
  
  // Test 4: Hinglish - Garbage collection
  {
    id: `conv_${String(currentId + 3).padStart(3, '0')}`,
    category: "test_hinglish_garbage",
    user: "kachra wale nahi aa rhe hain ek hafte se smell bahut aa rhi hai",
    assistant: "Ek hafte se kachra nahi uthaya? Yeh health hazard hai! Kaunsi society ya area hai? Main sanitation complaint file karne mein madad karungi. Photo bhi add kar sakte ho.",
    context: "hinglish_garbage_issue"
  },
  
  // Test 5: English - Platform query
  {
    id: `conv_${String(currentId + 4).padStart(3, '0')}`,
    category: "test_english_platform",
    user: "How can I track the status of my complaint after submitting it?",
    assistant: "To track your complaint status: Login to VAANI, go to 'My Complaints' section, select your complaint, and view the current status. You'll also receive notifications for any updates.",
    context: "english_tracking"
  },
  
  // Test 6: English - Volunteer request
  {
    id: `conv_${String(currentId + 5).padStart(3, '0')}`,
    category: "test_english_volunteer",
    user: "I need help filing a complaint, can I get volunteer assistance?",
    assistant: "Yes! VAANI provides volunteer assistance. Click on 'Request Volunteer' button, select your issue type, and a volunteer will call you to help with the complaint filing process.",
    context: "english_volunteer_help"
  },
  
  // Test 7: Hindi - Greeting and help
  {
    id: `conv_${String(currentId + 6).padStart(3, '0')}`,
    category: "test_hindi_greeting",
    user: "नमस्ते, मुझे शिकायत दर्ज करने में मदद चाहिए",
    assistant: "नमस्ते! मैं VAANI हूँ। मैं आपकी शिकायत दर्ज करने में मदद करूँगी। कृपया बताइए कि किस प्रकार की समस्या है - सड़क, पानी, बिजली, या कचरा?",
    context: "hindi_help_request"
  },
  
  // Test 8: Hindi - Road complaint
  {
    id: `conv_${String(currentId + 7).padStart(3, '0')}`,
    category: "test_hindi_road",
    user: "सड़क पर बहुत बड़ा गड्ढा है, कई बार एक्सीडेंट हो चुके हैं",
    assistant: "यह बहुत गंभीर समस्या है। एक्सीडेंट हो रहे हैं तो तुरंत शिकायत दर्ज करनी चाहिए। कृपया स्थान और फोटो के साथ VAANI में 'सड़क समस्या' चुनकर शिकायत दर्ज करें।",
    context: "hindi_dangerous_pothole"
  },
  
  // Test 9: Hinglish - Mixed query about schemes
  {
    id: `conv_${String(currentId + 8).padStart(3, '0')}`,
    category: "test_hinglish_schemes",
    user: "kya VAANI mein government schemes ki information bhi mil sakti hai",
    assistant: "Haan bilkul! VAANI mein aap government schemes ki details dekh sakte ho. 'Schemes' section mein jaaye, apna state/city select kare, aur available schemes ki list aur details mil jayegi.",
    context: "hinglish_schemes_query"
  },
  
  // Test 10: Hinglish - Follow-up question
  {
    id: `conv_${String(currentId + 9).padStart(3, '0')}`,
    category: "test_hinglish_followup",
    user: "complaint submit karne ke baad kitne din mein response milta hai",
    assistant: "Usually 2-3 din mein response milta hai. Aapko notification bhi milegi jab complaint ka status update hoga. Aap 'My Complaints' section mein jaake real-time status check kar sakte ho.",
    context: "hinglish_response_time"
  }
]

// Add new conversations to dataset
dataset.training_conversations.push(...newConversations)

// Update metadata
dataset.metadata.total_conversations = dataset.training_conversations.length
dataset.metadata.updated = new Date().toISOString().split('T')[0]

// Count by language
const hinglishCount = dataset.training_conversations.filter(c => 
  c.category.includes('hinglish') || 
  (!c.category.includes('english') && !c.category.includes('hindi') && c.user.match(/[a-z]/i) && !c.user.match(/[\u0900-\u097F]/))
).length

const englishCount = dataset.training_conversations.filter(c => 
  c.category.includes('english')
).length

const hindiCount = dataset.training_conversations.filter(c => 
  c.category.includes('hindi') || c.user.match(/[\u0900-\u097F]/)
).length

dataset.metadata.hinglish_conversations = hinglishCount
dataset.metadata.english_conversations = englishCount
dataset.metadata.hindi_conversations = hindiCount

// Save updated dataset
fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 2))

console.log('✅ Successfully added 10 new conversations!\n')
console.log('📊 Updated Statistics:')
console.log(`   Total Conversations: ${dataset.metadata.total_conversations}`)
console.log(`   English: ${englishCount}`)
console.log(`   Hindi: ${hindiCount}`)
console.log(`   Hinglish: ${hinglishCount}`)
console.log()

console.log('📝 New Conversations Added:')
newConversations.forEach((conv, index) => {
  const lang = conv.category.includes('english') ? 'English' : 
               conv.category.includes('hindi') ? 'Hindi' : 'Hinglish'
  console.log(`   ${index + 1}. [${lang}] ${conv.user.substring(0, 50)}...`)
})

console.log()
console.log('🧪 Next Steps:')
console.log('   1. Run: node test-training.js')
console.log('   2. Run: node test-full-conversation.js')
console.log('   3. Start server: node server-production.js')
console.log('   4. Test with new queries!')
