import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import crypto from "crypto"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"

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

    // Conversational system prompt
    const systemPrompt = `आप "Vaani" हैं - VAANI Platform की friendly AI assistant।

PERSONALITY:
• आप एक दोस्त की तरह बात करें, robot नहीं
• Warm, friendly, और helpful रहें
• Natural conversation करें - जैसे लोग बोलते हैं
• Short sentences use करें (voice के लिए)
• User की भावनाओं को समझें

LANGUAGE RULE (बहुत ज़रूरी):
• User की भाषा detect करें
• SAME भाषा में reply करें
• Hindi user → Hindi reply (Hinglish OK)
• English user → English reply
• Natural conversation style

CONVERSATION STYLE:
• Questions पूछें engagement के लिए
• Empathy दिखाएं: "मैं समझती हूं", "यह बुरा हुआ"
• Casual language OK: "अच्छा", "हाँ जी", "ठीक है"
• Follow-up naturally handle करें
• Context याद रखें

EMOTION HANDLING:
• Angry → Empathize first: "मैं समझती हूं, यह frustrating है"
• Confused → Patient: "कोई बात नहीं, मैं बताती हूं"
• Urgent → Quick solution दें
• Happy → Encourage करें

GREETING:
Current time: ${timeGreeting}
• पहली बार में time-based greeting
• बाद में directly respond करें

DOMAIN:
ONLY civic issues: सड़क, पानी, बिजली, कचरा, नाली, streetlights, complaints, VAANI platform

VOICE MODE:
• 10-15 words per sentence
• Natural speaking rhythm
• No complex formatting

${conversationContext}

अब user से naturally बात करें - जैसे एक दोस्त बात करता है!`

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
          temperature: 0.8, // Higher for more natural conversation
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

// Conversational fallback responses
function getConversationalFallback(message, history) {
  const lowerMsg = message.toLowerCase().trim()
  
  // Check if this is a follow-up
  const isFollowUp = history.length > 0
  
  // Greetings
  if (lowerMsg.match(/^(hello|hi|hey|नमस्ते|नमस्कार)$/i)) {
    return "नमस्ते! मैं VAANI हूं। 😊 मैं आपकी civic problems में मदद कर सकती हूं - जैसे सड़क, पानी, बिजली, कचरा वगैरह। आपको किस चीज़ में help चाहिए?"
  }
  
  if (lowerMsg.includes('help') || lowerMsg.includes('मदद') || lowerMsg.includes('सहायता')) {
    return "बिल्कुल, मैं आपकी मदद करूंगी! 😊 बताइए, क्या problem है? सड़क में गड्ढा? पानी नहीं आ रहा? या कुछ और?"
  }
  
  // Road issues
  if (lowerMsg.includes('road') || lowerMsg.includes('सड़क') || lowerMsg.includes('pothole') || lowerMsg.includes('गड्ढा')) {
    if (isFollowUp) {
      return "अच्छा, सड़क की problem है। यह कहाँ है? और कब से यह issue है?"
    }
    return "ओह, सड़क में problem है? 🛣️ यह तो बुरा हुआ। बताइए कहाँ है और कैसी problem है? मैं complaint file करने में help करूंगी।"
  }
  
  // Water issues
  if (lowerMsg.includes('water') || lowerMsg.includes('पानी') || lowerMsg.includes('paani')) {
    if (isFollowUp) {
      return "समझी। पानी की problem है। कितने दिनों से? और area कौनसा है?"
    }
    return "पानी की problem? 💧 यह तो serious है! कितने दिनों से नहीं आ रहा? या कोई और issue है?"
  }
  
  // Electricity
  if (lowerMsg.includes('electricity') || lowerMsg.includes('बिजली') || lowerMsg.includes('power')) {
    return "बिजली की problem? ⚡ यह तो बहुत परेशानी वाली बात है। क्या हो रहा है - बिजली नहीं आ रही या voltage issue है?"
  }
  
  // Garbage
  if (lowerMsg.includes('garbage') || lowerMsg.includes('कचरा') || lowerMsg.includes('waste')) {
    return "कचरे की problem? 🗑️ मैं समझती हूं, यह बहुत गंदा हो जाता है। कहाँ है यह problem? मैं complaint file करने में help करूंगी।"
  }
  
  // Complaint filing
  if (lowerMsg.includes('complaint') || lowerMsg.includes('शिकायत') || lowerMsg.includes('file')) {
    return "Complaint file करनी है? बहुत आसान है! 📝 पहले VAANI app में login करें, फिर 'File Complaint' पर click करें। मैं step by step बता सकती हूं। चाहिए?"
  }
  
  // Track status
  if (lowerMsg.includes('track') || lowerMsg.includes('status') || lowerMsg.includes('check')) {
    return "Complaint का status check करना है? 📊 VAANI app में login करें, फिर 'My Complaints' में जाएं। वहाँ सब दिख जाएगा। कोई specific complaint है?"
  }
  
  // Yes/No responses
  if (lowerMsg.match(/^(yes|हाँ|ha|haan|ok|okay|ठीक|theek)$/i)) {
    return "अच्छा! तो बताइए, आगे क्या करना है? मैं help करूंगी। 😊"
  }
  
  if (lowerMsg.match(/^(no|नहीं|nahi|na)$/i)) {
    return "कोई बात नहीं। अगर कुछ और help चाहिए तो बताइएगा! 😊"
  }
  
  // Default conversational response
  return "मैं आपकी बात समझ रही हूं। 😊 VAANI platform पर आप civic complaints file कर सकते हैं - सड़क, पानी, बिजली, कचरा जैसी problems के लिए। आपको किस चीज़ में specifically help चाहिए?"
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
