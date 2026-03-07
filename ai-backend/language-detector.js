/**
 * Language Detection Module
 * Detects user's language and ensures response in same language
 */

/**
 * Detect language from user message
 * @param {string} message - User's message
 * @returns {string} - 'english', 'hindi', or 'hinglish'
 */
export function detectLanguage(message) {
  const text = message.trim()
  
  // Check for Devanagari script (Hindi)
  const devanagariRegex = /[\u0900-\u097F]/
  if (devanagariRegex.test(text)) {
    return 'hindi'
  }
  
  const lowerText = text.toLowerCase()
  
  // Special case: Single word Hinglish greetings/farewells
  const hinglishSingleWords = ['namaste', 'namaskar', 'dhanyavaad', 'shukriya', 'alvida', 'pranam']
  const cleanText = lowerText.replace(/[?!.,]/g, '').trim()
  if (hinglishSingleWords.includes(cleanText)) {
    return 'hinglish'
  }
  
  // Check for common Hindi/Hinglish words in Roman script
  const hinglishKeywords = [
    // Greetings
    'namaste', 'namaskar', 'pranam', 'ram ram',
    // Question words
    'kya', 'kaise', 'kahan', 'kaun', 'kab', 'kyun', 'kyu', 'kitna', 'kitne',
    // Common verbs
    'hai', 'hain', 'ho', 'tha', 'the', 'thi', 'hoga', 'hogi', 'hoge',
    'kare', 'karo', 'karein', 'karna', 'karne', 'karta', 'karti', 'karte',
    'chahiye', 'chahie', 'chahta', 'chahti', 'chahte',
    'aa', 'aata', 'aati', 'aate', 'aayi', 'aaya', 'aaye', 'raha', 'rahi', 'rahe', 'rha', 'rhi',
    'sakta', 'sakti', 'sakte',
    'hoon', 'hu', 'hun',
    'banwaye', 'banwae', 'banaye', 'banae', // Added for "kaise banwaye"
    'pata', 'jane', 'jaane', 'maloom', // Added for "pata kare"
    'yojana', 'sarkari', // Added for government schemes
    // Pronouns
    'aap', 'aapka', 'aapki', 'aapke', 'mere', 'mera', 'meri', 'mujhe', 'mujhko',
    'tum', 'tumhara', 'tumhari', 'tumhe', 'tumko', 'tera', 'teri', 'tere',
    'main', 'mai', 'hum', 'humara', 'humari', 'yeh', 'woh', 'ye', 'wo',
    'apna', 'apni', 'apne',
    // Common words
    'nahi', 'nahin', 'haan', 'ha', 'ji', 'bhi', 'aur', 'ya', 'par', 'lekin',
    'bahut', 'bohot', 'zyada', 'jyada', 'kam', 'thoda', 'kuch', 'koi',
    'deta', 'dete', 'deti', 'leta', 'lete', 'leti', 'krna', 'kre', 'lrna',
    'wajah', 'jabki', 'usse', 'kaun', 'se', 'baat', 'kr', 'rha', 'rhi',
    'me', 'mein', // Added for "me apply"
    // Civic words (only strong Hinglish indicators)
    'shikayat', 'madad', 'sadak', 'paani', 'pani', 'bijli', 'kachra',
    'gali', 'mohalla'
  ]
  
  // More aggressive Hinglish detection - check for word boundaries
  const words = lowerText.split(/\s+/).filter(w => w.length > 0)
  const hinglishWordCount = words.filter(word => 
    hinglishKeywords.includes(word)
  ).length
  
  // Special case: If starts with common Hinglish question words, it's Hinglish
  const startsWithHinglishQuestion = /^(kya|kaise|kahan|kaun|kab|kyun|kyu)\s/i.test(lowerText)
  
  // If starts with Hinglish question OR at least 2 Hinglish words OR more than 20% of words are Hinglish (reduced from 25%)
  const hasHinglishWords = startsWithHinglishQuestion ||
    hinglishWordCount >= 2 || 
    (hinglishWordCount > 0 && (hinglishWordCount / words.length) > 0.20)
  
  if (hasHinglishWords) {
    return 'hinglish'
  }
  
  // Default to English
  return 'english'
}

/**
 * Get language-specific system prompt
 * @param {string} language - Detected language
 * @returns {string} - System prompt for that language
 */
export function getLanguagePrompt(language) {
  const prompts = {
    english: `You are VAANI, a Voice-First AI civic assistant. 
CRITICAL RULE: User is speaking in ENGLISH. You MUST respond ONLY in ENGLISH.
- Use clear, professional English
- Be helpful and empathetic
- Provide step-by-step guidance
- Keep responses concise (10-15 words per sentence)
- Never mix languages - ENGLISH ONLY`,

    hindi: `आप VAANI हैं, एक Voice-First AI civic assistant।
महत्वपूर्ण नियम: उपयोगकर्ता हिंदी में बोल रहा है। आपको केवल हिंदी (देवनागरी) में जवाब देना है।
- स्पष्ट, औपचारिक हिंदी का उपयोग करें
- सहायक और सहानुभूतिपूर्ण रहें
- चरण-दर-चरण मार्गदर्शन दें
- संक्षिप्त उत्तर दें (10-15 शब्द प्रति वाक्य)
- कभी भी भाषाएं न मिलाएं - केवल हिंदी`,

    hinglish: `Aap VAANI hain, ek Voice-First AI civic assistant.
CRITICAL RULE: User Hinglish (Roman Hindi) mein bol raha hai. Aapko SIRF Hinglish mein jawab dena hai.
- Natural Hinglish use karein (Hindi words in Roman script)
- Helpful aur empathetic rahein
- Step-by-step guidance dein
- Short responses (10-15 words per sentence)
- Kabhi bhi pure English ya pure Hindi mat use karein - ONLY Hinglish`
  }
  
  return prompts[language] || prompts.english
}

/**
 * Filter training data by language
 * @param {Array} conversations - All conversations
 * @param {string} language - Target language
 * @returns {Array} - Filtered conversations
 */
export function filterByLanguage(conversations, language) {
  const languageMap = {
    english: ['_english', 'english'],
    hindi: ['_hindi', 'hindi'],
    hinglish: ['introduction', 'platform_help', 'road_pothole', 'water_supply', 
               'electricity', 'garbage', 'streetlight', 'drainage', 'greeting',
               'emotional_support', 'volunteer', 'tracking', 'complaint_management']
  }
  
  const patterns = languageMap[language] || []
  
  return conversations.filter(conv => {
    // Check if category contains language identifier
    const categoryLower = conv.category.toLowerCase()
    return patterns.some(pattern => categoryLower.includes(pattern))
  })
}

/**
 * Validate response language matches user language
 * @param {string} response - AI response
 * @param {string} expectedLanguage - Expected language
 * @returns {boolean} - True if language matches
 */
export function validateResponseLanguage(response, expectedLanguage) {
  const detectedLanguage = detectLanguage(response)
  return detectedLanguage === expectedLanguage
}

export default {
  detectLanguage,
  getLanguagePrompt,
  filterByLanguage,
  validateResponseLanguage
}
