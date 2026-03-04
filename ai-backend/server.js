import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import crypto from "crypto"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Initialize AWS Bedrock client with provided credentials
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

console.log("✓ AWS Bedrock client initialized")
console.log("✓ Region:", process.env.AWS_REGION || "us-east-1")

// Conversation memory - stores conversation history per session
const conversationMemory = new Map()
const MAX_CONVERSATION_HISTORY = 10

// Check if question is related to civic issues
function isCivicIssueRelated(message) {
  const lowerMsg = message.toLowerCase().trim()
  
  const civicKeywords = [
    // Greetings
    'hello', 'hi', 'hey', 'help', 'madad', 'सहायता', 'नमस्ते', 'नमस्कार',
    'kaise', 'कैसे', 'kya', 'क्या', 'ho', 'हो',
    
    // Civic infrastructure
    'road', 'सड़क', 'sadak', 'pothole', 'गड्ढा', 'street', 'गली',
    'water', 'पानी', 'paani', 'supply', 'tap', 'नल',
    'electricity', 'बिजली', 'bijli', 'power', 'current',
    'garbage', 'कचरा', 'kachra', 'waste', 'sanitation', 'स्वच्छता',
    'drainage', 'नाली', 'naali', 'sewer',
    'streetlight', 'light', 'बत्ती', 'batti',
    
    // Platform features
    'vaani', 'वाणी', 'login', 'complaint', 'शिकायत', 'shikayat',
    'voice', 'आवाज़', 'volunteer', 'track', 'status',
    'file', 'submit', 'report', 'problem', 'issue', 'समस्या'
  ]
  
  return civicKeywords.some(keyword => lowerMsg.includes(keyword))
}

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message
    const userId = req.body.userId || 'anonymous'
    const sessionId = req.body.sessionId || userId
    
    console.log("Received message:", userMsg, "from session:", sessionId)

    // Get or create conversation history
    if (!conversationMemory.has(sessionId)) {
      conversationMemory.set(sessionId, [])
    }
    const conversationHistory = conversationMemory.get(sessionId)

    // Check if civic-related
    if (!isCivicIssueRelated(userMsg)) {
      const offTopicResponse = {
        role: "assistant",
        content: "मुझे माफ़ करें, मैं केवल civic और सार्वजनिक सेवा के मुद्दों में मदद कर सकती हूं। मैं VAANI हूं - आपकी civic assistant। मैं सड़क, पानी, बिजली, सफाई, streetlights, drainage जैसी समस्याओं में मदद करती हूं। क्या आपको कोई civic problem है जिसमें मैं मदद कर सकूं?"
      }
      return res.json(offTopicResponse)
    }

    // Get current time for greeting
    const currentHour = new Date().getHours()
    let timeGreeting = ""
    if (currentHour >= 5 && currentHour < 12) {
      timeGreeting = "सुप्रभात (Good Morning)"
    } else if (currentHour >= 12 && currentHour < 17) {
      timeGreeting = "नमस्ते (Good Afternoon)"
    } else if (currentHour >= 17 && currentHour < 21) {
      timeGreeting = "शुभ संध्या (Good Evening)"
    } else {
      timeGreeting = "शुभ रात्रि (Good Night)"
    }

    // Build conversation context
    let conversationContext = ""
    if (conversationHistory.length > 0) {
      conversationContext = "\n\nपिछली बातचीत:\n"
      conversationHistory.slice(-5).forEach(msg => {
        conversationContext += `${msg.role === 'user' ? 'User' : 'VAANI'}: ${msg.content}\n`
      })
    }

    // Enhanced conversational system prompt - DIRECT ANSWERS ONLY
    const systemPrompt = `आप "Vaani" हैं - VAANI Platform की intelligent AI assistant।

================================
CRITICAL RULES (बहुत ज़रूरी)
================================

1. DIRECT ANSWERS ONLY
   • User ने जो पूछा है, EXACTLY वही बताओ
   • Extra information मत दो
   • Generic responses मत दो
   • "मैं मदद कर सकती हूं" जैसी bakwas मत बोलो
   • Straight to the point

2. NO REPETITION
   • हर response UNIQUE होना चाहिए
   • Same बात दोबारा मत बोलो
   • Context के हिसाब से respond करो

3. LANGUAGE DETECTION (STRICT)
   • User की भाषा detect करो
   • EXACTLY SAME भाषा में reply करो
   • अगर Hindi → ONLY Hindi reply
   • अगर English → ONLY English reply
   • अगर Hinglish → Hinglish OK
   • Language mix मत करो unless user ने किया

================================
RESPONSE STYLE
================================

SHORT & DIRECT:
• 1-2 sentences max
• No long explanations
• No bullet points
• No emojis (unless casual conversation)
• Natural speaking style

EXAMPLES OF GOOD RESPONSES:

User: "Complaint कैसे file करें?"
✅ GOOD: "App खोलो, login करो, फिर 'File Complaint' पर click करो।"
❌ BAD: "मैं आपकी मदद कर सकती हूं। VAANI platform पर आप complaint file कर सकते हैं..."

User: "How to file complaint?"
✅ GOOD: "Open app, login, then click 'File Complaint'."
❌ BAD: "I can help you with that. On VAANI platform you can file complaints..."

User: "पानी नहीं आ रहा"
✅ GOOD: "कितने दिनों से? और कहाँ रहते हो?"
❌ BAD: "मैं समझती हूं यह serious है। पानी की problems में मैं help कर सकती हूं..."

User: "Water not coming"
✅ GOOD: "Since how many days? And where do you live?"
❌ BAD: "I understand this is serious. I can help with water problems..."

================================
LANGUAGE EXAMPLES
================================

HINDI INPUT → HINDI OUTPUT:
User: "सड़क में गड्ढा है"
VAANI: "कहाँ है? कब से है?"

ENGLISH INPUT → ENGLISH OUTPUT:
User: "Road has pothole"
VAANI: "Where? Since when?"

HINGLISH INPUT → HINGLISH OUTPUT:
User: "Road mein problem hai"
VAANI: "Kahan hai? Kab se?"

================================
CONVERSATION CONTEXT
================================
${conversationContext}

अगर पिछली conversation है:
• उसका reference use करो
• Continuity maintain करो
• लेकिन फिर भी SHORT रहो

================================
DOMAIN: CIVIC ISSUES ONLY
================================
• सड़क, पानी, बिजली, कचरा, नाली, streetlights
• Complaints, tracking, VAANI platform
• अगर off-topic → "मैं केवल civic issues में help करती हूं।"

================================
REMEMBER
================================
• DIRECT answers only
• User की भाषा में reply
• SHORT responses (1-2 sentences)
• NO generic responses
• NO extra information
• Context aware रहो

अब user से बात करो - SHORT, DIRECT, और उनकी भाषा में!`

    try {
      // Build messages array with conversation history
      const messages = []
      
      // Add conversation history (last 5 messages)
      conversationHistory.slice(-5).forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: [{ text: msg.content }]
        })
      })
      
      // Add current user message
      messages.push({
        role: 'user',
        content: [{ text: `${systemPrompt}\n\nUser: ${userMsg}\n\nVAANI (respond naturally in user's language):` }]
      })

      const payload = {
        messages: messages,
        inferenceConfig: {
          maxTokens: 200,
          temperature: 0.9, // Higher for MORE variety and creativity
          topP: 0.95, // Higher for more diverse responses
          frequencyPenalty: 0.7, // Penalize repetition
          presencePenalty: 0.6 // Encourage new topics
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
      
      // Clean up response
      aiResponse = aiResponse.replace(/^(VAANI:|Assistant:)/i, '').trim()
      
      // Store in conversation history
      conversationHistory.push({ role: 'user', content: userMsg })
      conversationHistory.push({ role: 'assistant', content: aiResponse })
      
      // Keep only last MAX_CONVERSATION_HISTORY messages
      if (conversationHistory.length > MAX_CONVERSATION_HISTORY) {
        conversationHistory.splice(0, conversationHistory.length - MAX_CONVERSATION_HISTORY)
      }
      
      const responseData = {
        role: "assistant",
        content: aiResponse
      }
      
      console.log("Sending conversational response:", responseData)
      res.json(responseData)
      
    } catch (apiError) {
      console.log("Bedrock API Error:", apiError.message)
      
      // Fallback to simple conversational response
      const fallbackResponse = getConversationalFallback(userMsg, conversationHistory)
      
      // Store in history
      conversationHistory.push({ role: 'user', content: userMsg })
      conversationHistory.push({ role: 'assistant', content: fallbackResponse })
      
      res.json({
        role: "assistant",
        content: fallbackResponse
      })
    }

  } catch (err) {
    console.log("Server Error:", err.message)
    res.status(500).json({
      role: "assistant",
      content: "मुझे कुछ technical problem हो रही है। कृपया थोड़ी देर बाद try करें।"
    })
  }
})

// Clean, direct fallback responses - NO UNWANTED DATA
function getConversationalFallback(message, history) {
  const lowerMsg = message.toLowerCase().trim()
  
  // Detect language
  const isHindi = /[\u0900-\u097F]/.test(message) || 
                  lowerMsg.includes('hai') || lowerMsg.includes('kya') || 
                  lowerMsg.includes('kahan') || lowerMsg.includes('kaise')
  
  const isEnglish = /^[a-zA-Z\s]+$/.test(message) && 
                    !lowerMsg.includes('hai') && !lowerMsg.includes('kya')
  
  // Helper for varied responses
  const getVariedResponse = (responses) => {
    const lastResponse = history.length > 0 ? history[history.length - 1].content : ''
    const available = responses.filter(r => !lastResponse.includes(r.substring(0, 15)))
    return available[Math.floor(Math.random() * available.length)] || responses[0]
  }
  
  // Greetings - SHORT & DIRECT
  if (lowerMsg.match(/^(hello|hi|hey)$/i)) {
    return getVariedResponse([
      "Hi! What's the problem?",
      "Hello! How can I help?",
      "Hey! What issue?"
    ])
  }
  
  if (lowerMsg.match(/^(नमस्ते|नमस्कार|हेलो)$/i)) {
    return getVariedResponse([
      "हाँ बोलो, क्या problem है?",
      "नमस्ते! कैसे help करूं?",
      "हाँ जी, क्या हुआ?"
    ])
  }
  
  // Help - DIRECT
  if (lowerMsg === 'help' || lowerMsg === 'मदद') {
    if (isHindi) {
      return getVariedResponse([
        "क्या problem है?",
        "बताओ, क्या हुआ?",
        "किस चीज़ में help?"
      ])
    }
    return getVariedResponse([
      "What's the problem?",
      "Tell me, what happened?",
      "What do you need help with?"
    ])
  }
  
  // Road - DIRECT QUESTIONS
  if (lowerMsg.includes('road') || lowerMsg.includes('pothole')) {
    return getVariedResponse([
      "Where? Since when?",
      "Location? How long?",
      "Where is it?"
    ])
  }
  
  if (lowerMsg.includes('सड़क') || lowerMsg.includes('गड्ढा')) {
    return getVariedResponse([
      "कहाँ है? कब से?",
      "Location? कितने दिन से?",
      "कहाँ है यह?"
    ])
  }
  
  // Water - DIRECT
  if (lowerMsg.includes('water')) {
    return getVariedResponse([
      "Since how many days? Where?",
      "How long? Location?",
      "When did it stop?"
    ])
  }
  
  if (lowerMsg.includes('पानी')) {
    return getVariedResponse([
      "कितने दिन से? कहाँ?",
      "कब से? Location?",
      "कब बंद हुआ?"
    ])
  }
  
  // Electricity - DIRECT
  if (lowerMsg.includes('electricity') || lowerMsg.includes('power')) {
    return "What's the issue? No power?"
  }
  
  if (lowerMsg.includes('बिजली')) {
    return "क्या problem है? नहीं आ रही?"
  }
  
  // Garbage - DIRECT
  if (lowerMsg.includes('garbage') || lowerMsg.includes('waste')) {
    return "Where? Not collected?"
  }
  
  if (lowerMsg.includes('कचरा')) {
    return "कहाँ? नहीं उठा रहे?"
  }
  
  // Complaint - DIRECT
  if (lowerMsg.includes('complaint') || lowerMsg.includes('file')) {
    if (isHindi) {
      return "किस problem की complaint?"
    }
    return "Complaint for what problem?"
  }
  
  if (lowerMsg.includes('शिकायत')) {
    return "किस चीज़ की शिकायत?"
  }
  
  // Yes/No - CONTEXTUAL
  if (lowerMsg.match(/^(yes|हाँ|ok|ठीक)$/i)) {
    return isHindi ? "और?" : "And?"
  }
  
  if (lowerMsg.match(/^(no|नहीं)$/i)) {
    return isHindi ? "तो फिर?" : "Then?"
  }
  
  // Location responses
  if (lowerMsg.includes('sector') || lowerMsg.includes('block')) {
    return isHindi ? "OK। और?" : "OK. What else?"
  }
  
  // Default - MINIMAL
  if (isHindi) {
    return getVariedResponse([
      "समझा। और?",
      "OK। फिर?",
      "ठीक है। आगे?"
    ])
  }
  
  return getVariedResponse([
    "Got it. What else?",
    "OK. Then?",
    "Alright. Continue?"
  ])
}

// Clear old conversation memories periodically (every hour)
setInterval(() => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000)
  for (const [sessionId, history] of conversationMemory.entries()) {
    if (history.length === 0 || history[history.length - 1].timestamp < oneHourAgo) {
      conversationMemory.delete(sessionId)
      console.log(`Cleared conversation memory for session: ${sessionId}`)
    }
  }
}, 60 * 60 * 1000) // Run every hour

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    conversationalMode: true,
    activeSessions: conversationMemory.size
  })
})

// Clear conversation endpoint
app.post("/clear-conversation", (req, res) => {
  const sessionId = req.body.sessionId || req.body.userId || 'anonymous'
  conversationMemory.delete(sessionId)
  res.json({ success: true, message: "Conversation cleared" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🎤 VAANI Conversational AI Server running on port ${PORT}`)
  console.log(`✅ Conversation memory enabled`)
  console.log(`✅ Natural language processing active`)
})
