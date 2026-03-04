import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"
import { 
  VAANI_KNOWLEDGE_BASE, 
  getRandomResponse, 
  detectEmotion, 
  detectIssueCategory 
} from "./training-data.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Initialize AWS Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
})

// Conversation memory with enhanced context
const conversationMemory = new Map()
const MAX_CONVERSATION_HISTORY = 15

// Enhanced civic issue detection
function isCivicIssueRelated(message) {
  const lowerMsg = message.toLowerCase().trim()
  
  console.log(`🔍 Checking civic relevance for: "${lowerMsg}"`)
  
  // Check against knowledge base
  const kb = VAANI_KNOWLEDGE_BASE.civicIssues
  for (const [category, data] of Object.entries(kb)) {
    if (data.keywords.some(keyword => lowerMsg.includes(keyword))) {
      console.log(`✅ Matched category: ${category}`)
      return true
    }
  }
  
  // Platform-related keywords
  const platformKeywords = [
    'vaani', 'वाणी', 'login', 'complaint', 'शिकायत', 'track', 'status',
    'file', 'submit', 'report', 'volunteer', 'help', 'मदद', 'सहायता',
    'hello', 'hi', 'hey', 'नमस्ते', 'नमस्कार', 'kaise', 'कैसे'
  ]
  
  const matched = platformKeywords.some(keyword => lowerMsg.includes(keyword))
  console.log(`Platform keyword matched: ${matched}`)
  
  return matched
}

// Get contextual greeting
function getContextualGreeting() {
  const hour = new Date().getHours()
  const kb = VAANI_KNOWLEDGE_BASE.greetings
  
  if (hour >= 5 && hour < 12) return getRandomResponse(kb.morning)
  if (hour >= 12 && hour < 17) return getRandomResponse(kb.afternoon)
  if (hour >= 17 && hour < 21) return getRandomResponse(kb.evening)
  return getRandomResponse(kb.night)
}

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message
    const userId = req.body.userId || 'anonymous'
    const sessionId = req.body.sessionId || userId
    
    console.log("📩 Received:", userMsg, "| Session:", sessionId)

    // Initialize conversation history
    if (!conversationMemory.has(sessionId)) {
      conversationMemory.set(sessionId, {
        messages: [],
        context: {
          issueCategory: null,
          emotion: 'neutral',
          stage: 'greeting', // greeting, identifying, helping, resolving
          lastUpdate: Date.now()
        }
      })
    }
    
    const session = conversationMemory.get(sessionId)
    const { messages: conversationHistory, context } = session

    // Update context
    context.emotion = detectEmotion(userMsg)
    context.lastUpdate = Date.now()
    
    const issueCategory = detectIssueCategory(userMsg)
    if (issueCategory) {
      context.issueCategory = issueCategory
      context.stage = 'helping'
    }

    // Check if civic-related
    if (!isCivicIssueRelated(userMsg)) {
      const offTopicResponse = {
        role: "assistant",
        content: "मुझे माफ़ करें, मैं केवल civic और सार्वजनिक सेवा के मुद्दों में मदद कर सकती हूं। 😊 मैं VAANI हूं - आपकी civic assistant। मैं सड़क, पानी, बिजली, सफाई, streetlights, drainage जैसी समस्याओं में मदद करती हूं। क्या आपको कोई civic problem है?"
      }
      return res.json(offTopicResponse)
    }

    // Build enhanced system prompt with knowledge base
    const systemPrompt = buildEnhancedPrompt(userMsg, context, conversationHistory)

    try {
      // Build messages for Bedrock
      const messages = []
      
      // Add recent conversation history
      conversationHistory.slice(-6).forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: [{ text: msg.content }]
        })
      })
      
      // Add current message with system prompt
      messages.push({
        role: 'user',
        content: [{ text: `${systemPrompt}\n\nUser: ${userMsg}\n\nVAANI:` }]
      })

      const payload = {
        messages: messages,
        inferenceConfig: {
          maxTokens: 250,
          temperature: 0.85,
          topP: 0.92
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
      
      // Store in conversation history
      conversationHistory.push({ role: 'user', content: userMsg })
      conversationHistory.push({ role: 'assistant', content: aiResponse })
      
      // Maintain history limit
      if (conversationHistory.length > MAX_CONVERSATION_HISTORY) {
        conversationHistory.splice(0, conversationHistory.length - MAX_CONVERSATION_HISTORY)
      }
      
      console.log("✅ AI Response:", aiResponse.substring(0, 100) + "...")
      res.json({ role: "assistant", content: aiResponse })
      
    } catch (apiError) {
      console.log("⚠️ Bedrock Error:", apiError.message)
      
      // Enhanced fallback with knowledge base
      const fallbackResponse = getEnhancedFallback(userMsg, context, conversationHistory)
      
      conversationHistory.push({ role: 'user', content: userMsg })
      conversationHistory.push({ role: 'assistant', content: fallbackResponse })
      
      res.json({ role: "assistant", content: fallbackResponse })
    }

  } catch (err) {
    console.log("❌ Server Error:", err.message)
    res.status(500).json({
      role: "assistant",
      content: "मुझे कुछ technical problem हो रही है। 😔 कृपया थोड़ी देर बाद try करें।"
    })
  }
})

// Build enhanced prompt with knowledge base
function buildEnhancedPrompt(userMsg, context, history) {
  const kb = VAANI_KNOWLEDGE_BASE
  const { emotion, issueCategory, stage } = context
  
  let prompt = `आप "VAANI" हैं - एक intelligent, friendly, और helpful AI assistant।

🎯 CORE IDENTITY:
• आप civic issues solve करने में expert हैं
• आप एक दोस्त की तरह बात करती हैं - warm और caring
• आप हमेशा solution-oriented रहती हैं
• आप user की भावनाओं को समझती हैं

🗣️ LANGUAGE INTELLIGENCE:
• User की भाषा detect करें (Hindi/English/Hinglish)
• SAME भाषा में naturally respond करें
• Code-mixing OK है (जैसे लोग बोलते हैं)
• Voice-friendly: 10-15 words per sentence

😊 EMOTIONAL INTELLIGENCE:
Current emotion: ${emotion}
`

  // Add emotion-specific guidance
  if (emotion !== 'neutral' && kb.emotions[emotion]) {
    prompt += `\nUser ${emotion} feel कर रहा है। ${getRandomResponse(kb.emotions[emotion].responses)}\n`
  }

  // Add issue-specific knowledge
  if (issueCategory && kb.civicIssues[issueCategory]) {
    const issueData = kb.civicIssues[issueCategory]
    prompt += `\n📋 ISSUE DETECTED: ${issueCategory.toUpperCase()}
Department: ${issueData.department}
Timeline: ${issueData.timeline}

SOLUTION STEPS:
${issueData.solutions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

इन steps को naturally conversation में weave करें।
`
  }

  // Add conversation context
  if (history.length > 0) {
    prompt += `\n💬 CONVERSATION CONTEXT:\n`
    history.slice(-4).forEach(msg => {
      prompt += `${msg.role === 'user' ? 'User' : 'VAANI'}: ${msg.content}\n`
    })
  }

  prompt += `\n✨ RESPONSE GUIDELINES:
• Natural conversation - robot नहीं
• Empathy दिखाएं
• Actionable steps दें
• Follow-up questions पूछें जहाँ जरूरी हो
• Encouraging रहें
• Short, clear sentences (voice के लिए)

अब user से naturally बात करें:`

  return prompt
}

// Enhanced fallback with knowledge base
function getEnhancedFallback(message, context, history) {
  const lowerMsg = message.toLowerCase().trim()
  const kb = VAANI_KNOWLEDGE_BASE
  const { emotion, issueCategory } = context
  
  console.log(`🔍 Fallback - Emotion: ${emotion}, Category: ${issueCategory}, Message: ${lowerMsg}`)
  
  // First-time greeting
  if (history.length === 0 && lowerMsg.match(/^(hello|hi|hey|नमस्ते|नमस्कार|हाय|हेलो)$/i)) {
    return getContextualGreeting()
  }
  
  // Greetings with name
  if (lowerMsg.match(/^(hello|hi|hey|नमस्ते|नमस्कार|हाय|हेलो)/i)) {
    return "नमस्ते! 😊 मैं VAANI हूं - आपकी civic assistant। मैं सड़क, पानी, बिजली, कचरा, streetlights, drainage जैसी problems में मदद करती हूं। आपको किस चीज़ में help चाहिए?"
  }
  
  // Issue-specific response (PRIORITY)
  if (issueCategory) {
    const issueData = kb.civicIssues[issueCategory]
    
    // Different responses based on issue type
    if (issueCategory === 'road') {
      return `सड़क की problem है? 🛣️ मैं समझती हूं, यह बहुत परेशानी वाली बात है।\n\n${issueData.department} इसे handle करता है और usually ${issueData.timeline} में resolve हो जाता है।\n\nComplaint file करने के लिए:\n1. VAANI app में login करें\n2. 'File Complaint' पर click करें\n3. 'Road' category select करें\n4. Location add करें (GPS या manually)\n5. Photo upload करें\n6. Details लिखें और submit करें\n\nयह problem कहाँ है? Area बताइए।`
    }
    
    if (issueCategory === 'water') {
      return `पानी की problem? 💧 यह तो बहुत serious issue है!\n\n${issueData.department} इसे handle करता है। Emergency cases में ${issueData.timeline} में action लेते हैं।\n\nतुरंत करें:\n1. VAANI पर complaint file करें\n2. अगर बहुत urgent है तो Water Department helpline भी call करें\n3. Photo लें अगर visible problem है\n4. कितने दिनों से problem है - यह mention करें\n\nक्या हो रहा है exactly? कितने दिनों से?`
    }
    
    if (issueCategory === 'electricity') {
      return `बिजली की problem? ⚡ मैं समझती हूं, यह बहुत frustrating है।\n\n${issueData.department} इसे handle करता है। ${issueData.timeline} में usually resolve हो जाता है।\n\nComplaint file करने के लिए:\n1. VAANI app में login करें\n2. 'Electricity' category select करें\n3. Problem type बताएं (power cut, low voltage, etc.)\n4. Area और timing details दें\n5. Transformer number अगर पता हो\n\nक्या problem है - पूरी बिजली गुल है या voltage कम है?`
    }
    
    if (issueCategory === 'garbage') {
      return `कचरे की problem? 🗑️ यह तो health के लिए भी खतरनाक हो सकता है।\n\n${issueData.department} इसे handle करता है और ${issueData.timeline} में action लेते हैं।\n\nComplaint file करने के लिए:\n1. VAANI app में login करें\n2. 'Garbage/Sanitation' select करें\n3. Location accurately mark करें\n4. Photo जरूर upload करें\n5. कितने दिनों से problem है - बताएं\n\nयह problem कहाँ है? कितने दिनों से?`
    }
    
    if (issueCategory === 'streetlight') {
      return `Streetlight की problem? 💡 रात में यह safety issue भी बन सकता है।\n\n${issueData.department} इसे handle करता है। ${issueData.timeline} में usually fix हो जाता है।\n\nComplaint file करने के लिए:\n1. VAANI app में login करें\n2. 'Streetlight' category select करें\n3. Pole number note करें (pole पर लिखा होता है)\n4. Exact location बताएं - landmark के साथ\n5. कितनी lights affected हैं\n\nकौनसी streetlight? Pole number या landmark बताइए।`
    }
    
    if (issueCategory === 'drainage') {
      return `Drainage की problem? 🚰 यह तो बहुत serious है, especially rainy season में।\n\n${issueData.department} इसे handle करता है। Emergency में ${issueData.timeline} में action लेते हैं।\n\nतुरंत करें:\n1. VAANI पर complaint file करें\n2. Photo जरूर लें\n3. अगर open manhole है तो CRITICAL mark करें\n4. Health hazard है तो mention करें\n\nक्या problem है - नाली बंद है या overflow हो रहा है?`
    }
    
    // Default issue response
    const issueType = issueData.types[0]
    return `${issueType.hindi} की problem है? 😔 ${issueData.department} इसे handle करता है।\n\nComplaint file करने के लिए VAANI app में login करें और 'File Complaint' पर click करें। मैं guide करूंगी। कहाँ है यह problem?`
  }
  
  // Emotional response
  if (emotion !== 'neutral' && kb.emotions[emotion]) {
    const emotionResponse = getRandomResponse(kb.emotions[emotion].responses)
    return emotionResponse + " बताइए, exactly क्या problem है? सड़क, पानी, बिजली, या कुछ और?"
  }
  
  // Help request
  if (lowerMsg.includes('help') || lowerMsg.includes('मदद') || lowerMsg.includes('कैसे') || lowerMsg.includes('सहायता')) {
    return "बिल्कुल मदद करूंगी! 😊 VAANI पर आप civic complaints file कर सकते हैं:\n\n🛣️ सड़क की problems (pothole, crack, etc.)\n💧 पानी की issues (no supply, leakage, etc.)\n⚡ बिजली की problems (power cut, voltage, etc.)\n🗑️ कचरा/सफाई (garbage collection, etc.)\n💡 Streetlights (not working, broken, etc.)\n🚰 Drainage (blocked, overflow, etc.)\n\nकौनसी problem है आपकी? Detail में बताइए।"
  }
  
  // Complaint filing
  if (lowerMsg.includes('complaint') || lowerMsg.includes('शिकायत') || lowerMsg.includes('file') || lowerMsg.includes('कंप्लेंट')) {
    return "Complaint file करना बहुत आसान है! 📝\n\n1. VAANI app/website पर login करें\n2. 'File Complaint' button click करें\n3. Problem category select करें (Road, Water, etc.)\n4. Location add करें (GPS या manually)\n5. Details और photo add करें\n6. Submit करें\n\nBas! आपको complaint ID मिल जाएगी। कौनसी problem के लिए complaint file करनी है?"
  }
  
  // Track status
  if (lowerMsg.includes('track') || lowerMsg.includes('status') || lowerMsg.includes('check') || lowerMsg.includes('स्टेटस')) {
    return "Complaint track करना easy है! 📊\n\n1. VAANI में login करें\n2. 'My Complaints' section खोलें\n3. अपनी complaints की list दिखेगी\n4. किसी पर भी click करें details के लिए\n\nStatus types:\n✅ Resolved - Problem solve हो गया\n🔄 In Progress - काम चल रहा है\n⏳ Pending - Review हो रहा है\n\nकोई specific complaint check करनी है?"
  }
  
  // FAQ check
  for (const [question, answer] of Object.entries(kb.faq)) {
    const questionWords = question.toLowerCase().split(' ')
    if (questionWords.some(word => lowerMsg.includes(word) && word.length > 3)) {
      return answer + "\n\nकुछ और पूछना है?"
    }
  }
  
  // Default helpful response
  return "मैं आपकी बात समझ रही हूं। 😊 VAANI platform पर आप civic problems report कर सकते हैं और track कर सकते हैं।\n\nमैं इन चीज़ों में help कर सकती हूं:\n• Complaint file करना\n• Status track करना\n• Platform use करना सिखाना\n• Civic issues की information\n\nThoda aur detail में बताइए, किस चीज़ में specifically help चाहिए? सड़क, पानी, बिजली, या कुछ और?"
}

// Health check with stats
app.get("/health", (req, res) => {
  const stats = {
    status: "healthy",
    mode: "enhanced-conversational",
    activeSessions: conversationMemory.size,
    knowledgeBase: {
      civicIssues: Object.keys(VAANI_KNOWLEDGE_BASE.civicIssues).length,
      faqEntries: Object.keys(VAANI_KNOWLEDGE_BASE.faq).length,
      emotionTypes: Object.keys(VAANI_KNOWLEDGE_BASE.emotions).length
    },
    uptime: process.uptime()
  }
  res.json(stats)
})

// Clear conversation
app.post("/clear-conversation", (req, res) => {
  const sessionId = req.body.sessionId || req.body.userId || 'anonymous'
  conversationMemory.delete(sessionId)
  res.json({ success: true, message: "Conversation cleared" })
})

// Get knowledge base info (for debugging)
app.get("/knowledge-base", (req, res) => {
  const summary = {
    civicIssues: Object.keys(VAANI_KNOWLEDGE_BASE.civicIssues),
    platformFeatures: VAANI_KNOWLEDGE_BASE.platform.features,
    faqCount: Object.keys(VAANI_KNOWLEDGE_BASE.faq).length,
    emotionTypes: Object.keys(VAANI_KNOWLEDGE_BASE.emotions)
  }
  res.json(summary)
})

// Cleanup old sessions (every 30 minutes)
setInterval(() => {
  const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000)
  let cleaned = 0
  
  for (const [sessionId, session] of conversationMemory.entries()) {
    if (session.context.lastUpdate < thirtyMinutesAgo) {
      conversationMemory.delete(sessionId)
      cleaned++
    }
  }
  
  if (cleaned > 0) {
    console.log(`🧹 Cleaned ${cleaned} inactive sessions`)
  }
}, 30 * 60 * 1000)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🎤 ========================================`)
  console.log(`   VAANI Enhanced AI Server`)
  console.log(`   ========================================`)
  console.log(`   Port: ${PORT}`)
  console.log(`   Mode: Enhanced Conversational`)
  console.log(`   Knowledge Base: ✅ Loaded`)
  console.log(`   Civic Issues: ${Object.keys(VAANI_KNOWLEDGE_BASE.civicIssues).length}`)
  console.log(`   FAQ Entries: ${Object.keys(VAANI_KNOWLEDGE_BASE.faq).length}`)
  console.log(`   Emotion Types: ${Object.keys(VAANI_KNOWLEDGE_BASE.emotions).length}`)
  console.log(`   ========================================\n`)
})
