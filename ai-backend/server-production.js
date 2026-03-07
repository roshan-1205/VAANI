import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"
import cache from "./response-cache.js"
import indexer from "./data-indexer.js"
import { detectLanguage, getLanguagePrompt, validateResponseLanguage } from "./language-detector.js"

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Rate limiting for high traffic
const requestCounts = new Map()
const RATE_LIMIT = 100 // requests per minute per user
const RATE_WINDOW = 60 * 1000 // 1 minute

// Initialize AWS Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
})

// Conversation memory (optimized with size limits)
const conversationMemory = new Map()
const MAX_CONVERSATION_HISTORY = 10
const MAX_MEMORY_SIZE = 10000 // Maximum conversations to keep in memory

// API call statistics
let apiCallStats = {
  total: 0,
  cached: 0,
  training: 0,
  bedrock: 0,
  fallback: 0,
  byLanguage: {
    english: 0,
    hindi: 0,
    hinglish: 0
  },
  lastReset: Date.now()
}

// Initialize data indexer
await cache.initialize()
await indexer.initialize()

console.log('✅ Production server initialized')
console.log('✅ Data indexer ready')
console.log('✅ Cache system ready')

/**
 * Rate limiting middleware
 */
function rateLimiter(req, res, next) {
  const userId = req.body.userId || req.ip
  const now = Date.now()
  
  if (!requestCounts.has(userId)) {
    requestCounts.set(userId, { count: 1, resetTime: now + RATE_WINDOW })
    return next()
  }
  
  const userStats = requestCounts.get(userId)
  
  if (now > userStats.resetTime) {
    userStats.count = 1
    userStats.resetTime = now + RATE_WINDOW
    return next()
  }
  
  if (userStats.count >= RATE_LIMIT) {
    return res.status(429).json({
      role: "assistant",
      content: "Too many requests. Please wait a moment.",
      error: "RATE_LIMIT_EXCEEDED"
    })
  }
  
  userStats.count++
  next()
}

/**
 * Memory cleanup for high traffic
 */
function cleanupMemory() {
  if (conversationMemory.size > MAX_MEMORY_SIZE) {
    const entries = Array.from(conversationMemory.entries())
    const sorted = entries.sort((a, b) => 
      (b[1].context?.lastUpdate || 0) - (a[1].context?.lastUpdate || 0)
    )
    
    // Keep only most recent conversations
    conversationMemory.clear()
    sorted.slice(0, MAX_MEMORY_SIZE / 2).forEach(([key, value]) => {
      conversationMemory.set(key, value)
    })
    
    console.log(`🧹 Memory cleanup: ${entries.length} → ${conversationMemory.size}`)
  }
}

/**
 * Main chat endpoint with language detection
 */
app.post("/chat", rateLimiter, async (req, res) => {
  try {
    const userMsg = req.body.message
    const userId = req.body.userId || 'anonymous'
    const sessionId = req.body.sessionId || userId
    
    if (!userMsg || userMsg.trim().length === 0) {
      return res.status(400).json({
        role: "assistant",
        content: "Please provide a message.",
        error: "EMPTY_MESSAGE"
      })
    }

    console.log(`\n📩 [${sessionId}] ${userMsg}`)
    apiCallStats.total++

    // STEP 1: Detect language with user preference memory
    const detectedLanguage = detectLanguage(userMsg)
    apiCallStats.byLanguage[detectedLanguage]++
    
    // Initialize conversation history
    if (!conversationMemory.has(sessionId)) {
      conversationMemory.set(sessionId, {
        messages: [],
        context: {
          preferredLanguage: detectedLanguage, // User's preferred language
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
    // If user consistently uses one language, that becomes preferred
    const languageCounts = {}
    session.context.languageHistory.forEach(lang => {
      languageCounts[lang] = (languageCounts[lang] || 0) + 1
    })
    
    // Find most used language
    const mostUsedLanguage = Object.keys(languageCounts).reduce((a, b) => 
      languageCounts[a] > languageCounts[b] ? a : b
    )
    
    // Update preferred language if user has been consistent
    if (languageCounts[mostUsedLanguage] >= 3) {
      session.context.preferredLanguage = mostUsedLanguage
    }
    
    // Use preferred language for responses
    const responseLanguage = session.context.preferredLanguage
    
    console.log(`🌐 Detected: ${detectedLanguage} | Preferred: ${responseLanguage} | History: [${session.context.languageHistory.join(', ')}]`)

    // STEP 2: Check training data (exact match) - HIGHEST PRIORITY
    const exactMatch = indexer.findExactMatch(userMsg)
    
    if (exactMatch) {
      apiCallStats.training++
      
      session.messages.push({ role: 'user', content: userMsg })
      session.messages.push({ role: 'assistant', content: exactMatch.assistant })
      
      console.log(`📚 Training EXACT match`)
      return res.json({ 
        role: "assistant", 
        content: exactMatch.assistant,
        language: responseLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: responseLanguage,
        source: "training_exact"
      })
    }

    // STEP 3: Check cache (simple key without language prefix)
    const cacheKey = userMsg
    const cachedResponse = await cache.get(cacheKey)
    
    if (cachedResponse) {
      apiCallStats.cached++
      session.messages.push({ role: 'user', content: userMsg })
      session.messages.push({ role: 'assistant', content: cachedResponse })
      
      console.log(`💾 Cache HIT`)
      return res.json({ 
        role: "assistant", 
        content: cachedResponse,
        language: responseLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: responseLanguage,
        source: "cache"
      })
    }

    // STEP 4: Check training data (similar match) - use preferred language
    const similarMatches = indexer.findSimilar(userMsg, responseLanguage, 3)
    
    if (similarMatches.length > 0 && similarMatches[0].score > 0.70) {
      const bestMatch = similarMatches[0]
      
      console.log(`📚 Training SIMILAR match (${(bestMatch.score * 100).toFixed(1)}%)`)
      
      apiCallStats.training++
      await cache.set(userMsg, bestMatch.assistant, { source: 'training_similar' })
      
      session.messages.push({ role: 'user', content: userMsg })
      session.messages.push({ role: 'assistant', content: bestMatch.assistant })
      
      return res.json({ 
        role: "assistant", 
        content: bestMatch.assistant,
        language: responseLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: responseLanguage,
        source: "training_similar"
      })
    }

    // STEP 5: Call Bedrock API with preferred language prompt (FALLBACK ONLY)
    try {
      const languagePrompt = getLanguagePrompt(responseLanguage)
      
      const messages = []
      
      // Add recent conversation history
      session.messages.slice(-6).forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: [{ text: msg.content }]
        })
      })
      
      // Add current message with language-specific prompt
      messages.push({
        role: 'user',
        content: [{ text: `${languagePrompt}\n\nUser: ${userMsg}\n\nVAANI (respond in ${responseLanguage}):` }]
      })

      const payload = {
        messages: messages,
        inferenceConfig: {
          maxTokens: 250,
          temperature: 0.8,
          topP: 0.9
        }
      }

      const command = new InvokeModelCommand({
        modelId: "us.amazon.nova-lite-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload)
      })

      const response = await bedrockClient.send(command)
      const responseBody = JSON.parse(new TextDecoder().decode(response.body))
      
      let aiResponse = responseBody.output.message.content[0].text.trim()
      aiResponse = aiResponse.replace(/^(VAANI:|Assistant:)/i, '').trim()
      
      // Validate response language matches preferred language
      const responseDetectedLanguage = detectLanguage(aiResponse)
      if (responseDetectedLanguage !== responseLanguage) {
        console.log(`⚠️ Language mismatch: expected ${responseLanguage}, got ${responseDetectedLanguage}`)
        // Try to get fallback in correct language
        const fallback = getFallbackResponse(userMsg, responseLanguage)
        aiResponse = fallback
      }
      
      apiCallStats.bedrock++
      await cache.set(cacheKey, aiResponse, { 
        source: 'bedrock_api',
        language: responseLanguage 
      })
      
      session.messages.push({ role: 'user', content: userMsg })
      session.messages.push({ role: 'assistant', content: aiResponse })
      
      // Maintain history limit
      if (session.messages.length > MAX_CONVERSATION_HISTORY * 2) {
        session.messages.splice(0, session.messages.length - MAX_CONVERSATION_HISTORY * 2)
      }
      
      console.log(`🤖 Bedrock API (${responseLanguage})`)
      res.json({ 
        role: "assistant", 
        content: aiResponse,
        language: responseLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: responseLanguage,
        source: "bedrock"
      })
      
    } catch (apiError) {
      console.log(`⚠️ Bedrock Error: ${apiError.message}`)
      
      // STEP 6: Fallback with preferred language response
      const fallbackResponse = getFallbackResponse(userMsg, responseLanguage)
      apiCallStats.fallback++
      
      await cache.set(cacheKey, fallbackResponse, { source: 'fallback' })
      
      session.messages.push({ role: 'user', content: userMsg })
      session.messages.push({ role: 'assistant', content: fallbackResponse })
      
      console.log(`🔄 Fallback (${responseLanguage})`)
      res.json({ 
        role: "assistant", 
        content: fallbackResponse,
        language: responseLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: responseLanguage,
        source: "fallback"
      })
    }

    // Cleanup memory periodically
    if (apiCallStats.total % 100 === 0) {
      cleanupMemory()
    }

  } catch (err) {
    console.log(`❌ Server Error: ${err.message}`)
    res.status(500).json({
      role: "assistant",
      content: "Technical issue occurred. Please try again.",
      error: "SERVER_ERROR"
    })
  }
})

/**
 * Get fallback response in correct language with better, more specific answers
 */
function getFallbackResponse(message, language) {
  const lowerMsg = message.toLowerCase()
  
  const responses = {
    english: {
      greeting: "Hello! I'm Vaani, your civic assistant. I can help you report issues like potholes, water problems, or garbage collection. What do you need help with?",
      help: "I can help you report civic complaints, track your issues, and access government services. You can say things like 'report an issue' or 'track my complaint'. What would you like to do?",
      vaani: "Vaani is a civic engagement platform where you can report problems in your area like road damage, water supply issues, or garbage collection. You can file complaints, track their status, and get volunteer support. It's free to use and available in multiple languages.",
      report: "To report an issue: First, say 'report an issue' and I'll open the form. You can report potholes, water leaks, broken streetlights, garbage problems, or any civic issue. Just describe the problem and add a photo if possible.",
      track: "To track your complaint: Say 'track my complaint' and I'll show you all your reported issues. You can see if they're submitted, in progress, or resolved. You'll also get notifications when there are updates.",
      services: "Vaani provides several services: Report civic issues (roads, water, electricity, garbage), Track complaint status, Access government scheme information, Get volunteer support, View civic alerts, and more. What would you like to know about?",
      how: "Vaani works in simple steps: 1) Login to your account, 2) Choose what you want to do (report, track, or get info), 3) Follow the guided process, 4) Get updates and notifications. It's designed to be easy for everyone to use.",
      who: "Anyone can use Vaani! It's for all citizens who want to report civic problems or access government services. Whether you're reporting a pothole, checking on a complaint, or learning about schemes, Vaani is here to help.",
      free: "Yes, Vaani is completely free to use! There are no charges for reporting issues, tracking complaints, or accessing any features. It's a public service platform to help citizens engage with civic matters.",
      default: "I'm here to help with civic issues. You can report problems, track complaints, or ask me questions about Vaani. What would you like to know?"
    },
    hindi: {
      greeting: "नमस्ते! मैं वाणी हूँ, आपकी नागरिक सहायक। मैं आपको गड्ढे, पानी की समस्या, या कचरा संग्रह जैसी समस्याओं की रिपोर्ट करने में मदद कर सकती हूँ। आपको किस चीज़ में मदद चाहिए?",
      help: "मैं आपको नागरिक शिकायतें दर्ज करने, आपके मुद्दों को ट्रैक करने और सरकारी सेवाओं तक पहुँचने में मदद कर सकती हूँ। आप 'शिकायत दर्ज करें' या 'मेरी शिकायत ट्रैक करें' जैसी बातें कह सकते हैं। आप क्या करना चाहेंगे?",
      vaani: "वाणी एक नागरिक जुड़ाव मंच है जहाँ आप अपने क्षेत्र में सड़क क्षति, पानी की आपूर्ति, या कचरा संग्रह जैसी समस्याओं की रिपोर्ट कर सकते हैं। आप शिकायतें दर्ज कर सकते हैं, उनकी स्थिति ट्रैक कर सकते हैं, और स्वयंसेवक सहायता प्राप्त कर सकते हैं। यह उपयोग करने के लिए मुफ्त है।",
      report: "समस्या की रिपोर्ट करने के लिए: पहले, 'शिकायत दर्ज करें' कहें और मैं फॉर्म खोल दूंगी। आप गड्ढे, पानी के रिसाव, टूटी स्ट्रीटलाइट, कचरे की समस्या, या कोई भी नागरिक मुद्दा रिपोर्ट कर सकते हैं।",
      track: "अपनी शिकायत ट्रैक करने के लिए: 'मेरी शिकायत ट्रैक करें' कहें और मैं आपको आपकी सभी रिपोर्ट की गई समस्याओं की स्थिति दिखाऊंगी। आप देख सकते हैं कि वे सबमिट की गई हैं, प्रगति में हैं, या हल हो गई हैं।",
      services: "वाणी कई सेवाएं प्रदान करती है: नागरिक मुद्दों की रिपोर्ट करें (सड़क, पानी, बिजली, कचरा), शिकायत की स्थिति ट्रैक करें, सरकारी योजना की जानकारी प्राप्त करें, स्वयंसेवक सहायता प्राप्त करें। आप क्या जानना चाहेंगे?",
      how: "वाणी सरल चरणों में काम करती है: 1) अपने खाते में लॉगिन करें, 2) चुनें कि आप क्या करना चाहते हैं, 3) निर्देशित प्रक्रिया का पालन करें, 4) अपडेट और सूचनाएं प्राप्त करें। यह सभी के लिए उपयोग करना आसान है।",
      who: "कोई भी वाणी का उपयोग कर सकता है! यह उन सभी नागरिकों के लिए है जो नागरिक समस्याओं की रिपोर्ट करना चाहते हैं या सरकारी सेवाओं तक पहुंचना चाहते हैं।",
      free: "हाँ, वाणी का उपयोग पूरी तरह से मुफ्त है! मुद्दों की रिपोर्ट करने, शिकायतों को ट्रैक करने, या किसी भी सुविधा तक पहुंचने के लिए कोई शुल्क नहीं है।",
      default: "मैं नागरिक मुद्दों में मदद के लिए यहाँ हूँ। आप समस्याओं की रिपोर्ट कर सकते हैं, शिकायतों को ट्रैक कर सकते हैं, या मुझसे वाणी के बारे में सवाल पूछ सकते हैं। आप क्या जानना चाहेंगे?"
    },
    hinglish: {
      greeting: "Namaste! Main Vaani hoon, aapki civic assistant. Main aapko potholes, paani ki problem, ya garbage collection jaise issues report karne mein madad kar sakti hoon. Aapko kis cheez mein madad chahiye?",
      help: "Main aapko civic complaints file karne, issues track karne, aur government services access karne mein madad kar sakti hoon. Aap 'report an issue' ya 'track my complaint' jaise bol sakte hain. Aap kya karna chahenge?",
      vaani: "Vaani ek civic engagement platform hai jahan aap apne area mein road damage, water supply, ya garbage collection jaise problems report kar sakte hain. Aap complaints file kar sakte hain, unki status track kar sakte hain, aur volunteer support le sakte hain. Yeh bilkul free hai.",
      report: "Issue report karne ke liye: Pehle, 'report an issue' kahiye aur main aapke liye form khol dungi. Aap potholes, water leaks, broken streetlights, garbage issues, ya koi bhi civic problem report kar sakte hain.",
      track: "Apni complaint track karne ke liye: 'track my complaint' kahiye aur main aapko aapki sabhi reported issues ki status dikhaungi. Aap dekh sakte hain ki wo submitted hain, in progress hain, ya resolved hain.",
      services: "Vaani kai services provide karti hai: Civic issues report karein (roads, water, electricity, garbage), Complaint status track karein, Government scheme information access karein, Volunteer support lein. Aap kya jaanna chahenge?",
      how: "Vaani simple steps mein kaam karti hai: 1) Apne account mein login karein, 2) Choose karein ki aap kya karna chahte hain, 3) Guided process follow karein, 4) Updates aur notifications paayein. Yeh sabke liye easy hai.",
      who: "Koi bhi Vaani use kar sakta hai! Yeh un sabhi citizens ke liye hai jo civic problems report karna chahte hain ya government services access karna chahte hain.",
      free: "Haan, Vaani bilkul free hai! Issues report karne, complaints track karne, ya kisi bhi feature ko access karne ke liye koi charge nahi hai.",
      default: "Main civic issues mein help ke liye yahan hoon. Aap problems report kar sakte hain, complaints track kar sakte hain, ya mujhse Vaani ke baare mein questions pooch sakte hain. Aap kya jaanna chahenge?"
    }
  }
  
  const langResponses = responses[language] || responses.english
  
  // More specific keyword matching
  if (lowerMsg.match(/^(hello|hi|hey|namaste|नमस्ते)$/i)) {
    return langResponses.greeting
  }
  
  if (lowerMsg.includes('help') || lowerMsg.includes('madad') || lowerMsg.includes('मदद') || lowerMsg.includes('assist')) {
    return langResponses.help
  }
  
  if (lowerMsg.includes('what is vaani') || lowerMsg.includes('vaani kya hai') || lowerMsg.includes('वाणी क्या है') || lowerMsg.includes('about vaani') || lowerMsg.includes('tell me about')) {
    return langResponses.vaani
  }
  
  if (lowerMsg.includes('report') || lowerMsg.includes('complaint') || lowerMsg.includes('issue') || lowerMsg.includes('problem') || lowerMsg.includes('शिकायत') || lowerMsg.includes('समस्या') || lowerMsg.includes('file')) {
    return langResponses.report
  }
  
  if (lowerMsg.includes('track') || lowerMsg.includes('status') || lowerMsg.includes('check') || lowerMsg.includes('ट्रैक') || lowerMsg.includes('स्थिति')) {
    return langResponses.track
  }
  
  if (lowerMsg.includes('service') || lowerMsg.includes('feature') || lowerMsg.includes('provide') || lowerMsg.includes('सेवा') || lowerMsg.includes('offer')) {
    return langResponses.services
  }
  
  if (lowerMsg.includes('how') || lowerMsg.includes('work') || lowerMsg.includes('kaise') || lowerMsg.includes('कैसे')) {
    return langResponses.how
  }
  
  if (lowerMsg.includes('who') || lowerMsg.includes('kaun') || lowerMsg.includes('कौन') || lowerMsg.includes('eligib')) {
    return langResponses.who
  }
  
  if (lowerMsg.includes('free') || lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('charge') || lowerMsg.includes('मुफ्त') || lowerMsg.includes('शुल्क')) {
    return langResponses.free
  }
  
  return langResponses.default
}

// Stats endpoint
app.get("/stats", (req, res) => {
  const cacheStats = cache.getStats()
  const indexerStats = indexer.getStats()
  const uptime = process.uptime()
  
  res.json({
    uptime: `${Math.floor(uptime / 60)} minutes`,
    apiCalls: apiCallStats,
    cache: cacheStats,
    indexer: indexerStats,
    activeSessions: conversationMemory.size,
    performance: {
      cacheHitRate: ((apiCallStats.cached / apiCallStats.total) * 100).toFixed(2) + '%',
      trainingHitRate: ((apiCallStats.training / apiCallStats.total) * 100).toFixed(2) + '%',
      apiCallRate: ((apiCallStats.bedrock / apiCallStats.total) * 100).toFixed(2) + '%',
      costSavings: (((apiCallStats.cached + apiCallStats.training + apiCallStats.fallback) / apiCallStats.total) * 100).toFixed(2) + '%'
    }
  })
})

/**
 * Voice command endpoint - processes voice commands and returns actions or responses
 */
app.post("/voice-command", rateLimiter, async (req, res) => {
  try {
    const command = req.body.command
    const userId = req.body.userId || 'anonymous'
    
    console.log(`\n🎤 [Voice Command] Received: "${command}"`)
    
    if (!command || command.trim().length === 0) {
      return res.status(400).json({
        type: "response",
        content: "I didn't catch that. Please try again.",
        error: "EMPTY_COMMAND"
      })
    }

    const lowerCommand = command.toLowerCase().trim()
    console.log(`🔍 Testing against patterns: "${lowerCommand}"`)
    
    // STEP 1: Check for restricted actions FIRST
    const restrictedPatterns = [
      /\b(login|log in|sign in)\s+(me|now)?\b/i,
      /\b(signup|sign up|register|create account)\s+(me|now)?\b/i,
      /\bsign\s+me\s+up\b/i,
      /\b(open|go to|navigate to)\s+(youtube|google|facebook|twitter|instagram)\b/i,
      /\b(shut down|restart|reboot)\b/i,
      /\b(transfer money|pay|payment)\b/i,
      /\b(delete account|remove account)\b/i
    ]
    
    for (const pattern of restrictedPatterns) {
      if (pattern.test(lowerCommand)) {
        console.log(`🚫 Restricted action blocked`)
        return res.json({
          type: "response",
          content: "I'm sorry, I can only control features inside the Vaani platform and cannot perform this action.",
          restricted: true
        })
      }
    }
    
    // STEP 2: Detect if it's a question (should NOT trigger actions)
    const isQuestion = /^(what|who|when|where|why|how|can|could|would|should|is|are|do|does|tell|explain|kya|kaise|kab|kahan|kyun|batao|बताओ|क्या|कैसे|कब|कहाँ|क्यों)/i.test(lowerCommand)
    
    // STEP 3: Check for EXPLICIT navigation/action commands (only if NOT a question)
    if (!isQuestion) {
      const navigationActions = [
        { patterns: [/^(go to|open|navigate to)\s+home$/i, /^home page$/i], action: "navigate_home" },
        { patterns: [/^(go back|back|previous page)$/i], action: "navigate_back" },
        { patterns: [/^(go forward|forward|next page)$/i], action: "navigate_forward" },
        { patterns: [/^(open|show|go to)\s+dashboard$/i, /^my dashboard$/i, /^dashboard$/i], action: "open_dashboard" },
        { patterns: [/^(report|file|submit)\s+(an?\s+)?(issue|complaint|problem)$/i, /^report\s+(an?\s+)?issue$/i], action: "open_report_issue" },
        { patterns: [/^(track|check|view)\s+(my\s+)?(complaint|issue|status)$/i, /^track\s+(my\s+)?complaint$/i], action: "open_track_complaint" },
        { patterns: [/^(call|contact|speak to)\s+(volunteer|support|help)$/i, /^call volunteer$/i], action: "call_volunteer" },
        { patterns: [/^log\s*out$/i, /^sign out$/i, /^logout$/i], action: "logout_user" }
      ]
      
      for (const nav of navigationActions) {
        for (const pattern of nav.patterns) {
          if (pattern.test(lowerCommand)) {
            console.log(`✅ Action matched: ${nav.action}`)
            return res.json({
              type: "action",
              action: nav.action,
              parameters: {}
            })
          }
        }
      }
    }
    
    // STEP 4: Check for dashboard section navigation (only if NOT a question)
    if (!isQuestion) {
      const sectionPatterns = [
        { patterns: [/^(open|show|go to)\s+(report|reports)$/i], section: "report_issue" },
        { patterns: [/^(open|show|go to)\s+track$/i], section: "track_complaint" },
        { patterns: [/^(open|show|go to)\s+alerts?$/i], section: "alerts" },
        { patterns: [/^(open|show|go to|show)\s+(my\s+)?profile$/i], section: "profile" },
        { patterns: [/^(open|show|go to)\s+volunteer$/i], section: "volunteer_support" },
        { patterns: [/^(open|show|go to)\s+analytics$/i], section: "analytics" }
      ]
      
      for (const section of sectionPatterns) {
        for (const pattern of section.patterns) {
          if (pattern.test(lowerCommand)) {
            console.log(`✅ Section action matched: ${section.section}`)
            return res.json({
              type: "action",
              action: "change_dashboard_section",
              parameters: { section: section.section }
            })
          }
        }
      }
    }
    
    // STEP 5: Treat as conversational query (questions and general queries)
    console.log(`💬 Processing as conversational query: "${command}"`)
    const detectedLanguage = detectLanguage(command)
    
    // STEP 5.1: Check cache FIRST (fastest response)
    const cacheKey = `${detectedLanguage}:${command}`
    const cachedResponse = await cache.get(cacheKey)
    
    if (cachedResponse) {
      console.log(`💾 Cache HIT for voice command (${detectedLanguage})`)
      return res.json({
        type: "response",
        content: cachedResponse,
        language: detectedLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: detectedLanguage,
        source: "cache"
      })
    }
    
    // Get or create session for voice commands
    const voiceSessionId = `voice_${userId}`
    if (!conversationMemory.has(voiceSessionId)) {
      conversationMemory.set(voiceSessionId, {
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
    
    const voiceSession = conversationMemory.get(voiceSessionId)
    voiceSession.context.lastDetectedLanguage = detectedLanguage
    voiceSession.context.lastUpdate = Date.now()
    voiceSession.context.messageCount++
    
    // Track language history
    voiceSession.context.languageHistory.push(detectedLanguage)
    if (voiceSession.context.languageHistory.length > 5) {
      voiceSession.context.languageHistory.shift()
    }
    
    // Determine preferred language
    const languageCounts = {}
    voiceSession.context.languageHistory.forEach(lang => {
      languageCounts[lang] = (languageCounts[lang] || 0) + 1
    })
    
    const mostUsedLanguage = Object.keys(languageCounts).reduce((a, b) => 
      languageCounts[a] > languageCounts[b] ? a : b
    )
    
    if (languageCounts[mostUsedLanguage] >= 3) {
      voiceSession.context.preferredLanguage = mostUsedLanguage
    }
    
    const responseLanguage = detectedLanguage  // Use detected language for voice commands, not preferred
    
    console.log(`🎤 Voice - Detected: ${detectedLanguage}`)
    
    // STEP 5.2: Check exact match in training data
    const exactMatch = indexer.findExactMatch(command)
    if (exactMatch) {
      const matchLanguage = indexer.detectLanguageFromCategory(exactMatch.category)
      if (matchLanguage === detectedLanguage) {
        console.log(`📚 Training EXACT match for voice command (${detectedLanguage})`)
        
        // Cache the response for future use
        await cache.set(cacheKey, exactMatch.assistant, { 
          source: 'training_exact',
          language: detectedLanguage 
        })
        
        return res.json({
          type: "response",
          content: exactMatch.assistant,
          language: detectedLanguage,
          detectedLanguage: detectedLanguage,
          preferredLanguage: detectedLanguage,
          source: "training_exact"
        })
      }
    }
    
    // STEP 5.3: Check similar match in training data
    const similarMatches = indexer.findSimilar(command, detectedLanguage, 3)
    if (similarMatches.length > 0) {
      const bestMatch = similarMatches[0]
      console.log(`📚 Training SIMILAR match for voice command (${detectedLanguage}, score: ${(bestMatch.score || 0) * 100}%)`)
      
      // Cache the response for future use
      await cache.set(cacheKey, bestMatch.assistant, { 
        source: 'training_similar',
        language: detectedLanguage,
        score: bestMatch.score 
      })
      
      return res.json({
        type: "response",
        content: bestMatch.assistant,
        language: detectedLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: detectedLanguage,
        source: "training_similar"
      })
    }
    
    // Only call Bedrock if no training data found
    console.log(`🤖 No training match, calling Bedrock API`)
    
    try {
      // Enhanced prompt for better voice responses with preferred language
      const voicePrompt = `You are VAANI, a helpful voice assistant for a civic engagement platform in India.

CRITICAL RULES:
1. Give SHORT, CLEAR answers (2-3 sentences max for voice)
2. Be conversational and friendly
3. Focus on civic issues: roads, water, electricity, garbage, complaints
4. Respond in ${responseLanguage} language ONLY
5. Give SPECIFIC, RELEVANT answers to the EXACT question asked
6. NEVER give generic responses - answer the specific question
7. Don't mention you're an AI or assistant

User's SPECIFIC question: "${command}"

Provide a helpful, brief, SPECIFIC answer to THIS question:`

      const messages = [{
        role: 'user',
        content: [{ text: voicePrompt }]
      }]

      const payload = {
        messages: messages,
        inferenceConfig: {
          maxTokens: 200,
          temperature: 0.9,
          topP: 0.95
        }
      }

      const bedrockCommand = new InvokeModelCommand({
        modelId: "us.amazon.nova-lite-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload)
      })

      const response = await bedrockClient.send(bedrockCommand)
      const responseBody = JSON.parse(new TextDecoder().decode(response.body))
      
      let aiResponse = responseBody.output.message.content[0].text.trim()
      aiResponse = aiResponse.replace(/^(VAANI:|Assistant:|Answer:)/i, '').trim()
      
      console.log(`✅ Bedrock response: ${aiResponse.substring(0, 80)}...`)
      
      // Cache the Bedrock response for future use
      await cache.set(cacheKey, aiResponse, {
        source: 'bedrock_voice',
        language: responseLanguage
      })
      
      return res.json({
        type: "response",
        content: aiResponse,
        language: responseLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: responseLanguage,
        source: "bedrock"
      })
      
    } catch (apiError) {
      console.log(`⚠️ Bedrock Error: ${apiError.message}`)
      
      // Use improved fallback with preferred language
      const fallbackResponse = getFallbackResponse(command, responseLanguage)
      
      // Cache the fallback response too
      await cache.set(cacheKey, fallbackResponse, {
        source: 'fallback_voice',
        language: responseLanguage
      })
      
      return res.json({
        type: "response",
        content: fallbackResponse,
        language: responseLanguage,
        detectedLanguage: detectedLanguage,
        preferredLanguage: responseLanguage,
        source: "fallback"
      })
    }
    
  } catch (err) {
    console.log(`❌ Voice Command Error: ${err.message}`)
    res.status(500).json({
      type: "response",
      content: "I'm having trouble processing that. Please try again.",
      error: "SERVER_ERROR"
    })
  }
})

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    mode: "production-optimized",
    features: {
      languageDetection: true,
      dataIndexing: true,
      caching: true,
      rateLimiting: true,
      memoryOptimization: true,
      voiceCommands: true
    },
    languages: ["english", "hindi", "hinglish"],
    trainingData: indexer.getStats()
  })
})

// Clear conversation
app.post("/clear-conversation", (req, res) => {
  const sessionId = req.body.sessionId || req.body.userId || 'anonymous'
  conversationMemory.delete(sessionId)
  res.json({ success: true, message: "Conversation cleared" })
})

// Cleanup old sessions (every 15 minutes)
setInterval(() => {
  const fifteenMinutesAgo = Date.now() - (15 * 60 * 1000)
  let cleaned = 0
  
  for (const [sessionId, session] of conversationMemory.entries()) {
    if (session.context.lastUpdate < fifteenMinutesAgo) {
      conversationMemory.delete(sessionId)
      cleaned++
    }
  }
  
  if (cleaned > 0) {
    console.log(`🧹 Cleaned ${cleaned} inactive sessions`)
  }
}, 15 * 60 * 1000)

// Auto-save cache (every 5 minutes)
setInterval(async () => {
  await cache.persist()
}, 5 * 60 * 1000)

// Cleanup rate limiter (every minute)
setInterval(() => {
  const now = Date.now()
  for (const [userId, stats] of requestCounts.entries()) {
    if (now > stats.resetTime) {
      requestCounts.delete(userId)
    }
  }
}, 60 * 1000)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🎤 ========================================`)
  console.log(`   VAANI Production Server`)
  console.log(`   ========================================`)
  console.log(`   Port: ${PORT}`)
  console.log(`   Mode: High-Traffic Optimized`)
  console.log(`   Languages: English, Hindi, Hinglish`)
  console.log(`   Training Data: ${indexer.getStats().totalConversations} conversations`)
  console.log(`   Features:`)
  console.log(`   ✅ Language Detection`)
  console.log(`   ✅ Data Indexing`)
  console.log(`   ✅ Smart Caching`)
  console.log(`   ✅ Rate Limiting`)
  console.log(`   ✅ Memory Optimization`)
  console.log(`   ========================================\n`)
})

// Graceful shutdown - save cache before exit
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await cache.persist()
  console.log('✅ Cache saved')
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await cache.persist()
  console.log('✅ Cache saved')
  process.exit(0)
})
