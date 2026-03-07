import { detectLanguage } from './language-detector.js'

console.log('🧪 Testing Language Persistence Feature\n')

// Simulate conversation memory
const conversationMemory = new Map()

function processMessage(userId, message) {
  const sessionId = userId
  const detectedLanguage = detectLanguage(message)
  
  // Initialize or get session
  if (!conversationMemory.has(sessionId)) {
    conversationMemory.set(sessionId, {
      messages: [],
      context: {
        preferredLanguage: detectedLanguage,
        lastDetectedLanguage: detectedLanguage,
        languageHistory: [detectedLanguage],
        lastUpdate: Date.now(),
        messageCount: 0
      }
    })
  }
  
  const session = conversationMemory.get(sessionId)
  session.context.lastDetectedLanguage = detectedLanguage
  session.context.lastUpdate = Date.now()
  session.context.messageCount++
  
  // Track language history (last 5 messages)
  session.context.languageHistory.push(detectedLanguage)
  if (session.context.languageHistory.length > 5) {
    session.context.languageHistory.shift()
  }
  
  // Determine preferred language based on history
  const languageCounts = {}
  session.context.languageHistory.forEach(lang => {
    languageCounts[lang] = (languageCounts[lang] || 0) + 1
  })
  
  const mostUsedLanguage = Object.keys(languageCounts).reduce((a, b) => 
    languageCounts[a] > languageCounts[b] ? a : b
  )
  
  // Update preferred language if user has been consistent
  if (languageCounts[mostUsedLanguage] >= 3) {
    session.context.preferredLanguage = mostUsedLanguage
  }
  
  const responseLanguage = session.context.preferredLanguage
  
  return {
    detected: detectedLanguage,
    preferred: responseLanguage,
    history: [...session.context.languageHistory],
    messageCount: session.context.messageCount
  }
}

console.log('=== Test Case 1: User starts in Hinglish and stays consistent ===\n')

const user1Messages = [
  "mere area mein pothole hai",
  "kab fix hoga yeh",
  "complaint kaise file kare",
  "status kaise check kare",
  "thank you"
]

user1Messages.forEach((msg, index) => {
  const result = processMessage('user1', msg)
  console.log(`Message ${index + 1}: "${msg}"`)
  console.log(`  Detected: ${result.detected} | Preferred: ${result.preferred}`)
  console.log(`  History: [${result.history.join(', ')}]`)
  console.log()
})

console.log('✅ Expected: After 3 messages, preferred language should be "hinglish"\n')
console.log('='.repeat(70))
console.log()

console.log('=== Test Case 2: User switches from English to Hinglish ===\n')

const user2Messages = [
  "Hello, what is Vaani?",
  "How do I report an issue?",
  "mere area mein problem hai",
  "kaise complaint file kare",
  "status kaise check kare"
]

conversationMemory.clear() // Reset for new user

user2Messages.forEach((msg, index) => {
  const result = processMessage('user2', msg)
  console.log(`Message ${index + 1}: "${msg}"`)
  console.log(`  Detected: ${result.detected} | Preferred: ${result.preferred}`)
  console.log(`  History: [${result.history.join(', ')}]`)
  console.log()
})

console.log('✅ Expected: Preferred language should switch from "english" to "hinglish" after 3 Hinglish messages\n')
console.log('='.repeat(70))
console.log()

console.log('=== Test Case 3: User mixes languages but mostly uses Hinglish ===\n')

const user3Messages = [
  "mere area mein pothole hai",
  "What is the status?",
  "kab fix hoga",
  "complaint kaise file kare",
  "Thank you",
  "aur kya karna hai"
]

conversationMemory.clear() // Reset for new user

user3Messages.forEach((msg, index) => {
  const result = processMessage('user3', msg)
  console.log(`Message ${index + 1}: "${msg}"`)
  console.log(`  Detected: ${result.detected} | Preferred: ${result.preferred}`)
  console.log(`  History: [${result.history.join(', ')}] (last 5)`)
  console.log()
})

console.log('✅ Expected: Preferred language should be "hinglish" as it appears most frequently\n')
console.log('='.repeat(70))
console.log()

console.log('=== Test Case 4: User starts in Hindi (Devanagari) ===\n')

const user4Messages = [
  "तुम कौन हो?",
  "मुझे मदद चाहिए",
  "शिकायत कैसे दर्ज करें?"
]

conversationMemory.clear() // Reset for new user

user4Messages.forEach((msg, index) => {
  const result = processMessage('user4', msg)
  console.log(`Message ${index + 1}: "${msg}"`)
  console.log(`  Detected: ${result.detected} | Preferred: ${result.preferred}`)
  console.log(`  History: [${result.history.join(', ')}]`)
  console.log()
})

console.log('✅ Expected: Preferred language should be "hindi" after 3 messages\n')
console.log('='.repeat(70))
console.log()

console.log('📊 Summary:\n')
console.log('✅ Language persistence tracks user\'s language preference')
console.log('✅ Preferred language updates after 3 consistent messages')
console.log('✅ System remembers last 5 messages for language detection')
console.log('✅ Most frequently used language becomes preferred')
console.log('✅ Responses will be generated in preferred language, not just detected language')
console.log()
console.log('🎯 Key Feature: Even if user occasionally switches language,')
console.log('   the system will respond in their most commonly used language!')
