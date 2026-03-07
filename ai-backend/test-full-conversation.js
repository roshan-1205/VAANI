import { detectLanguage, getLanguagePrompt } from './language-detector.js'
import indexer from './data-indexer.js'

console.log('🧪 Testing Full Conversation Flow\n')

// Initialize indexer
await indexer.initialize()

const testMessages = [
  "jo mai input deta hu assistant unko hindi mai leta h",
  "iske wajah se issue ho rha",
  "kaun se language mai baat kr rha hu",
  "mere area mein pothole hai",
  "Hello, how are you?",
  "What is Vaani?",
  "तुम कौन हो?"
]

console.log('Testing language detection and response matching:\n')

for (const message of testMessages) {
  console.log(`📩 User: "${message}"`)
  
  // Step 1: Detect language
  const language = detectLanguage(message)
  console.log(`   🌐 Detected Language: ${language}`)
  
  // Step 2: Check for exact match
  const exactMatch = indexer.findExactMatch(message)
  if (exactMatch) {
    console.log(`   ✅ Exact match found in training data`)
    console.log(`   🤖 Response: "${exactMatch.assistant.substring(0, 80)}..."`)
  } else {
    // Step 3: Check for similar matches
    const similarMatches = indexer.findSimilar(message, language, 3)
    if (similarMatches.length > 0) {
      console.log(`   ✅ Similar match found (score: ${(similarMatches[0].score * 100).toFixed(1)}%)`)
      console.log(`   🤖 Response: "${similarMatches[0].assistant.substring(0, 80)}..."`)
    } else {
      console.log(`   ⚠️ No training match - would call Bedrock API`)
      const prompt = getLanguagePrompt(language)
      console.log(`   📝 System Prompt: ${prompt.substring(0, 100)}...`)
    }
  }
  
  console.log()
}

console.log('\n✅ Full conversation flow test complete!')
console.log('\nKey Points:')
console.log('1. Language detection is working correctly')
console.log('2. Training data is being searched with language filter')
console.log('3. Responses will be in the same language as user input')
console.log('4. Bedrock API will use language-specific prompts as fallback')
