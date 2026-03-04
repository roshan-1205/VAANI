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

// In-memory cache for responses
const responseCache = new Map()

// Conversation memory - stores conversation history per user
const conversationMemory = new Map()

// Maximum conversation history to keep
const MAX_CONVERSATION_HISTORY = 10

// Function to generate cache key from message
function getCacheKey(message) {
  return crypto.createHash('md5').update(message.toLowerCase().trim()).digest('hex')
}

// Check if question is related to civic issues
function isCivicIssueRelated(message) {
  const lowerMsg = message.toLowerCase().trim()
  
  // Civic issue related keywords
  const civicKeywords = [
    // Basic greetings (allowed)
    'hello', 'hi', 'hey', 'help', 'madad', 'सहायता', 'नमस्ते', 'नमस्कार',
    
    // Civic infrastructure
    'road', 'सड़क', 'sadak', 'pothole', 'गड्ढा', 'गड्ढे', 'street', 'गली',
    'water', 'पानी', 'paani', 'supply', 'आपूर्ति', 'tap', 'नल',
    'electricity', 'बिजली', 'bijli', 'power', 'current', 'करंट',
    'garbage', 'कचरा', 'kachra', 'waste', 'कूड़ा', 'sanitation', 'स्वच्छता', 'swachhta',
    'drainage', 'नाली', 'naali', 'sewer', 'गंदा पानी', 'ganda paani',
    'streetlight', 'light', 'बत्ती', 'batti', 'रोशनी', 'roshni',
    
    // Public safety & services
    'safety', 'सुरक्षा', 'suraksha', 'police', 'पुलिस', 'emergency', 'आपातकाल',
    'complaint', 'शिकायत', 'shikayat', 'grievance', 'समस्या', 'samasya', 'problem', 'issue',
    'municipal', 'नगर', 'nagar', 'corporation', 'निगम', 'panchayat', 'पंचायत',
    
    // Government services
    'government', 'सरकार', 'sarkar', 'service', 'सेवा', 'seva', 'scheme', 'yojana', 'योजना',
    'certificate', 'प्रमाण', 'praman', 'document', 'दस्तावेज़',
    'ration', 'राशन', 'pension', 'पेंशन',
    
    // Platform features
    'vaani', 'वाणी', 'login', 'लॉगिन', 'complaint', 'शिकायत',
    'voice', 'आवाज़', 'awaaz', 'volunteer', 'स्वयंसेवक', 'swayamsevak', 'track', 'status',
    'file', 'submit', 'report', 'register', 'kaise', 'कैसे', 'kya', 'क्या'
  ]
  
  // Check if message contains any civic-related keyword
  return civicKeywords.some(keyword => lowerMsg.includes(keyword))
}

function getCivicIssueResponse(message) {
  const lowerMsg = message.toLowerCase().trim()
  
  // Greetings
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg === 'hey') {
    return "Hello! I'm VAANI, your civic assistant. 🏛️\n\nI help you with civic and public service issues like:\n• Roads & potholes (सड़क और गड्ढे)\n• Water supply (पानी की आपूर्ति)\n• Electricity issues (बिजली की समस्या)\n• Garbage & sanitation (कचरा और स्वच्छता)\n• Streetlights (सड़क की बत्तियां)\n• Drainage problems (नाली की समस्या)\n\n📱 You can:\n✓ Login and file complaints\n✓ Use voice input (no reading needed!)\n✓ Get help from volunteers\n✓ Track your complaint status\n\nHow can I help you today?"
  }
  
  if (lowerMsg.includes('help') || lowerMsg.includes('madad') || lowerMsg.includes('सहायता')) {
    return "I'm VAANI - here to help with civic issues! 🏛️\n\n📋 I can assist with:\n• Road damage & potholes\n• Water supply problems\n• Electricity issues\n• Garbage collection\n• Streetlight repairs\n• Drainage & sewage\n• Public safety concerns\n• Government service complaints\n\n📱 VAANI Platform Features:\n✓ File complaints easily\n✓ Voice input available (बोलकर शिकायत करें)\n✓ Volunteer assistance\n✓ Track complaint until resolved\n\nWhat civic issue can I help you with?"
  }
  
  // Platform/VAANI info
  if (lowerMsg.includes('vaani') || lowerMsg.includes('वाणी') || lowerMsg.includes('platform')) {
    return "Welcome to VAANI! 🎙️\n\nVAANI is your voice-powered civic complaint platform.\n\n✨ Key Features:\n• 📝 File civic complaints online\n• 🎤 Voice input for those who can't read/write\n• 👥 Get help from trained volunteers\n• 📊 Track complaint status in real-time\n• ⚡ Fast resolution of civic issues\n\n🏛️ Report Issues:\n• Roads, water, electricity\n• Garbage, drainage, streetlights\n• Public safety & government services\n\n🔐 Login to file your first complaint!\n\nWhat would you like to know?"
  }
  
  // Login/File complaint
  if (lowerMsg.includes('login') || lowerMsg.includes('file') || lowerMsg.includes('submit') || lowerMsg.includes('complaint')) {
    return "Filing a Complaint on VAANI 📝\n\n🔐 Step 1: Login\n• Click 'Login' button\n• Use email/phone/Google\n\n📋 Step 2: File Complaint\n• Select issue type\n• Describe the problem\n• Add location & photos\n\n🎤 Voice Input Available!\n• Can't read/write? No problem!\n• Use voice to describe your issue\n• We'll convert it to text\n\n👥 Need Help?\n• Volunteers are available\n• They'll guide you through the process\n\n📊 Track Status:\n• Monitor complaint progress\n• Get updates until resolved\n\nReady to file a complaint? Login now!"
  }
  
  // Voice feature
  if (lowerMsg.includes('voice') || lowerMsg.includes('आवाज़') || lowerMsg.includes('speak') || lowerMsg.includes('बोल')) {
    return "VAANI Voice Feature 🎤\n\n✨ Voice Input Benefits:\n• No need to read or write\n• Speak in your language\n• Easy for everyone\n• Fast complaint filing\n\n📱 How to Use:\n1. Login to VAANI\n2. Click 'File Complaint'\n3. Tap microphone icon 🎤\n4. Speak your issue clearly\n5. We'll convert to text\n6. Review & submit\n\n🗣️ Supported:\n• Hindi, English, regional languages\n• Clear voice recognition\n• Volunteer assistance available\n\nMaking civic complaints accessible for all!"
  }
  
  // Volunteer
  if (lowerMsg.includes('volunteer') || lowerMsg.includes('स्वयंसेवक')) {
    return "VAANI Volunteers 👥\n\n🤝 How Volunteers Help:\n• Guide you through complaint filing\n• Assist with voice input\n• Help those who can't read/write\n• Provide language support\n• Track complaint for you\n\n📞 Get Volunteer Help:\n1. Login to VAANI\n2. Click 'Need Help?'\n3. Connect with volunteer\n4. Get personalized assistance\n\n✨ Volunteers are trained to:\n• Handle all civic issues\n• Be patient & supportive\n• Ensure your complaint is filed correctly\n\nNeed volunteer assistance? Contact us!"
  }
  
  // Track status
  if (lowerMsg.includes('track') || lowerMsg.includes('status') || lowerMsg.includes('check')) {
    return "Track Your Complaint 📊\n\n🔍 How to Track:\n1. Login to VAANI\n2. Go to 'My Complaints'\n3. View all your complaints\n4. Check real-time status\n\n📈 Status Updates:\n• Submitted ✓\n• Under Review 🔍\n• Assigned to Department 📋\n• In Progress 🔧\n• Resolved ✅\n\n🔔 Notifications:\n• Get updates via SMS/email\n• Track until complete resolution\n• View department responses\n\n⏱️ Fast Resolution:\nWe ensure your civic issues are resolved quickly!\n\nLogin to track your complaints now!"
  }
  
  // Road issues
  if (lowerMsg.includes('road') || lowerMsg.includes('सड़क') || lowerMsg.includes('pothole') || lowerMsg.includes('गड्ढा')) {
    return "Road Issues & Potholes 🛣️\n\n📋 Common Problems:\n• Potholes (गड्ढे)\n• Broken roads (टूटी सड़कें)\n• Road cracks (दरारें)\n• Damaged footpaths (फुटपाथ)\n\n📱 How to Report:\n1. Login to VAANI\n2. Select 'Road Issue'\n3. Add location & photo\n4. Describe the problem\n5. Submit complaint\n\n🎤 Use voice input if needed!\n\n⏱️ Resolution Time:\n• Emergency: 24-48 hours\n• Regular: 3-7 days\n\n📊 Track your complaint status\n\nReady to report a road issue?"
  }
  
  // Water supply
  if (lowerMsg.includes('water') || lowerMsg.includes('पानी') || lowerMsg.includes('supply') || lowerMsg.includes('tap')) {
    return "Water Supply Issues 💧\n\n📋 Common Problems:\n• No water supply (पानी नहीं आ रहा)\n• Low pressure (कम दबाव)\n• Contaminated water (गंदा पानी)\n• Leaking pipes (पाइप लीक)\n• Irregular supply (अनियमित आपूर्ति)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Water Supply'\n3. Describe issue with voice/text\n4. Add location details\n5. Submit & track\n\n⏱️ Response Time: 24-48 hours\n\n🎤 Voice input available!\n👥 Volunteers can help!\n\nFile your water complaint now!"
  }
  
  // Electricity
  if (lowerMsg.includes('electricity') || lowerMsg.includes('बिजली') || lowerMsg.includes('power') || lowerMsg.includes('current')) {
    return "Electricity Issues ⚡\n\n📋 Common Problems:\n• Power outage (बिजली गुल)\n• Voltage fluctuation (वोल्टेज में उतार-चढ़ाव)\n• Damaged wires (तार टूटे हुए)\n• Meter problems (मीटर की समस्या)\n• Frequent power cuts (बार-बार कटौती)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Electricity Issue'\n3. Use voice/text to describe\n4. Add location & details\n5. Track until resolved\n\n⏱️ Response Time:\n• Emergency: 2-4 hours\n• Regular: 24-48 hours\n\n🎤 Voice complaint available!\n\nReport your electricity issue now!"
  }
  
  // Garbage/Sanitation
  if (lowerMsg.includes('garbage') || lowerMsg.includes('कचरा') || lowerMsg.includes('waste') || lowerMsg.includes('sanitation') || lowerMsg.includes('स्वच्छता')) {
    return "Garbage & Sanitation Issues 🗑️\n\n📋 Common Problems:\n• Garbage not collected (कचरा नहीं उठाया)\n• Overflowing bins (भरे हुए डिब्बे)\n• Littering (गंदगी फैली हुई)\n• Foul smell (बदबू)\n• Irregular collection (अनियमित संग्रह)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Garbage/Sanitation'\n3. Describe with voice/text\n4. Add photos & location\n5. Track complaint\n\n⏱️ Response: 24-48 hours\n\n🎤 Voice input available!\n👥 Get volunteer help!\n\nFile your sanitation complaint!"
  }
  
  // Streetlights
  if (lowerMsg.includes('streetlight') || lowerMsg.includes('light') || lowerMsg.includes('बत्ती') || lowerMsg.includes('रोशनी')) {
    return "Streetlight Issues 💡\n\n📋 Common Problems:\n• Lights not working (बत्ती नहीं जल रही)\n• Broken bulbs (टूटे बल्ब)\n• Damaged poles (खंभे टूटे)\n• Dim lighting (कम रोशनी)\n• Irregular timing (समय पर नहीं जलती)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Streetlight Issue'\n3. Use voice/text input\n4. Specify exact location\n5. Track repair status\n\n⏱️ Response: 24-72 hours\n\n🎤 Voice complaint available!\n\nReport streetlight issues now!"
  }
  
  // Drainage
  if (lowerMsg.includes('drainage') || lowerMsg.includes('नाली') || lowerMsg.includes('sewer') || lowerMsg.includes('drain')) {
    return "Drainage & Sewage Issues 🚰\n\n📋 Common Problems:\n• Blocked drains (नाली बंद)\n• Overflowing sewage (गंदा पानी बह रहा)\n• Foul smell (बदबू)\n• Broken manholes (मैनहोल टूटा)\n• Water logging (पानी जमा)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Drainage Issue'\n3. Describe with voice/text\n4. Add location & photos\n5. Track resolution\n\n⏱️ Response: 24-48 hours\n\n🎤 Voice input available!\n👥 Volunteers ready to help!\n\nFile your drainage complaint!"
  }
  
  // Public safety
  if (lowerMsg.includes('safety') || lowerMsg.includes('सुरक्षा') || lowerMsg.includes('emergency') || lowerMsg.includes('danger')) {
    return "Public Safety Concerns 🚨\n\n📋 Report Issues:\n• Unsafe areas (असुरक्षित क्षेत्र)\n• Broken infrastructure (टूटी संरचना)\n• Missing safety signs (संकेत नहीं)\n• Dangerous conditions (खतरनाक स्थिति)\n• Emergency situations (आपातकाल)\n\n📱 Report on VAANI:\n1. Login immediately\n2. Select 'Public Safety'\n3. Describe urgency\n4. Add location details\n5. Get priority response\n\n🚨 For immediate emergencies:\n• Police: 100\n• Ambulance: 108\n• Fire: 101\n\n⏱️ Priority Response: 2-24 hours\n\nReport safety concerns now!"
  }
  
  // Government services
  if (lowerMsg.includes('government') || lowerMsg.includes('सरकार') || lowerMsg.includes('service') || lowerMsg.includes('certificate')) {
    return "Government Service Complaints 🏛️\n\n📋 Report Issues:\n• Delayed services (सेवा में देरी)\n• Document problems (दस्तावेज़ समस्या)\n• Unresponsive officials (अधिकारी जवाब नहीं दे रहे)\n• Corruption concerns (भ्रष्टाचार)\n• Service denial (सेवा से इनकार)\n\n📱 Report on VAANI:\n1. Login to platform\n2. Select 'Government Service'\n3. Describe issue clearly\n4. Add relevant details\n5. Track complaint\n\n🎤 Voice input available!\n👥 Volunteer assistance!\n\n⏱️ Response: 3-7 days\n\nFile your complaint now!"
  }
  
  // Default civic response
  return "I'm VAANI - your civic assistant! 🏛️\n\nI can help you with:\n\n🛣️ Infrastructure:\n• Roads & potholes\n• Water supply\n• Electricity\n• Streetlights\n• Drainage\n\n🗑️ Sanitation:\n• Garbage collection\n• Waste management\n• Cleanliness issues\n\n🚨 Safety & Services:\n• Public safety\n• Government services\n• Municipal complaints\n\n📱 VAANI Features:\n✓ Easy complaint filing\n✓ Voice input (no reading needed!)\n✓ Volunteer support\n✓ Real-time tracking\n\nWhat civic issue can I help you with?"
}
app.post("/chat", async (req,res)=>{
  try{
    const userMsg = req.body.message
    const userId = req.body.userId || 'anonymous' // Get user ID from request
    const sessionId = req.body.sessionId || userId // Session ID for conversation tracking
    
    console.log("Received message:", userMsg, "from user:", userId)

    // Get or create conversation history for this session
    if (!conversationMemory.has(sessionId)) {
      conversationMemory.set(sessionId, [])
    }
    const conversationHistory = conversationMemory.get(sessionId)

    // Check if question is civic-related
    if (!isCivicIssueRelated(userMsg)) {
      console.log("Off-topic question detected")
      const offTopicResponse = {
        role: "assistant",
        content: "मुझे माफ़ करें, लेकिन मैं केवल civic और सार्वजनिक सेवा के मुद्दों में मदद कर सकती हूं। मैं VAANI हूं, आपकी civic assistant। मैं सड़क, पानी, बिजली, सफाई, streetlights, drainage, और सरकारी सेवाओं में मदद करती हूं। आप VAANI platform पर voice input से शिकायत दर्ज कर सकते हैं! कृपया मुझसे civic issues के बारे में पूछें। मैं आपकी कैसे मदद कर सकती हूं?"
      }
      
      return res.json(offTopicResponse)
    }

    // Get current time for greeting
    const currentHour = new Date().getHours()
    let timeGreeting = ""
    if (currentHour >= 5 && currentHour < 12) {
      timeGreeting = "Good Morning"
    } else if (currentHour >= 12 && currentHour < 17) {
      timeGreeting = "Good Afternoon"
    } else if (currentHour >= 17 && currentHour < 21) {
      timeGreeting = "Good Evening"
    } else {
      timeGreeting = "Good Night"
    }

    // Try AWS Bedrock Nova Sonic (only for civic-related questions)
    try {
      const systemPrompt = `You are "Vaani Voice", AI assistant of the Vaani Platform.
Your job is to help users ONLY with civic issues and platform guidance.

--------------------------------
LANGUAGE RULE (VERY IMPORTANT)
--------------------------------
ALWAYS detect user's language first.
Reply in EXACT same language.

If user speaks Hindi (हिंदी):
- Reply COMPLETELY in Hindi
- Use Devanagari script
- Natural Hindi conversation

If user speaks English:
- Reply in English

Examples:
User: "मुझे मदद चाहिए" → Reply in Hindi: "जी हाँ, मैं आपकी मदद करूंगी। आप किस civic समस्या के बारे में बात करना चाहते हैं?"
User: "सड़क में गड्ढा है" → Reply in Hindi: "मैं समझती हूं। आप VAANI पर शिकायत दर्ज कर सकते हैं। पहले login करें, फिर शिकायत दर्ज करें पर क्लिक करें।"
User: "I need help" → Reply in English: "Yes, I can help you. What civic issue would you like to talk about?"

DO NOT MIX languages.
DO NOT use English words in Hindi responses unless necessary.

--------------------------------
EMOTION RULE
--------------------------------
Detect emotion: angry, confused, urgent, neutral.

If angry:
Acknowledge frustration first, then give solution.
Example (Hindi): "मैं आपकी परेशानी समझती हूं। चलिए इसे जल्दी हल करते हैं।"
Example (English): "I understand your frustration. Let me help you resolve this quickly."

If confused:
Give simple step-by-step guidance.
Example (Hindi): "कोई बात नहीं। मैं आपको step by step बताती हूं।"
Example (English): "No problem. Let me guide you step by step."

If urgent:
Give short direct response.

Otherwise:
Stay professional and calm.

--------------------------------
GREETING RULE
--------------------------------
Greet only at session start.
Use time-based greeting:
Morning, Afternoon, Evening, Night.
Use user name if available.
Do not repeat greeting in every message.

Current time: ${timeGreeting}

Hindi greetings:
Morning: "सुप्रभात"
Afternoon: "नमस्ते"
Evening: "शुभ संध्या"
Night: "शुभ रात्रि"

--------------------------------
STRICT DOMAIN RULE
--------------------------------
You can ONLY answer about:
• Roads (सड़क)
• Garbage (कचरा)
• Drainage (नाली)
• Water supply (पानी की आपूर्ति)
• Street lights (बत्ती)
• Public sanitation (स्वच्छता)
• Complaint reporting (शिकायत दर्ज करना)
• Complaint tracking (शिकायत ट्रैक करना)
• Dashboard guidance (डैशबोर्ड मार्गदर्शन)
• Volunteer call support (स्वयंसेवक सहायता)

If question is outside civic topics:
Politely refuse and redirect.
Hindi: "क्षमा करें, मैं केवल civic समस्याओं में मदद कर सकती हूं। क्या आपको सड़क, पानी, बिजली या कचरे से संबंधित कोई समस्या है?"
English: "I apologize, but I can only help with civic issues. Do you have any problems related to roads, water, electricity, or garbage?"

--------------------------------
STYLE RULES
--------------------------------
Voice mode:
Short sentences.
Natural tone.
Under 50 words.

Chat mode:
Clear and structured.
No long paragraphs.

Never give political opinions.
Never answer unrelated questions.
Always stay inside Vaani platform domain.

REMEMBER: If user speaks Hindi, reply COMPLETELY in Hindi!`

      // Prepare request for Bedrock Nova Sonic
      const payload = {
        messages: [
          {
            role: "user",
            content: [
              {
                text: `${systemPrompt}\n\nUser: ${userMsg}\n\nAssistant:`
              }
            ]
          }
        ],
        inferenceConfig: {
          maxTokens: 150,
          temperature: 0.7,
          topP: 0.9
        }
      }

      const command = new InvokeModelCommand({
        modelId: "us.amazon.nova-lite-v1:0", // Nova Lite is faster and cheaper
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload)
      })

      const response = await bedrockClient.send(command)
      const responseBody = JSON.parse(new TextDecoder().decode(response.body))
      
      const aiResponse = responseBody.output.message.content[0].text.trim()
      
      const responseData = {
        role: "assistant",
        content: aiResponse
      }
      
      console.log("Sending Bedrock response:", responseData)
      
      // Cache the response
      responseCache.set(cacheKey, responseData)
      
      res.json(responseData)
    } catch (apiError) {
      console.log("Bedrock API Error:", apiError.message)
      
      // Fallback to civic-focused mock response
      console.log("Using civic mock response as fallback")
      const mockResponse = {
        role: "assistant",
        content: getCivicIssueResponse(userMsg)
      }
      
      // Cache the mock response
      responseCache.set(cacheKey, mockResponse)
      console.log("Sending mock response:", mockResponse)
      
      res.json(mockResponse)
    }

  }catch(err){
    console.log("Server Error:", err.message)
    res.status(500).json({
      role: "assistant",
      content: "I'm having trouble connecting right now. Please try again later."
    })
  }
})

// Endpoint to check cache stats (optional, for debugging)
app.get("/cache-stats", (req, res) => {
  res.json({
    cachedResponses: responseCache.size,
    message: "Cache is working to save API credits"
  })
})

app.listen(5000,()=>console.log("Server running on port 5000 with caching enabled"))