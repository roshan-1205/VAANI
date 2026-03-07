import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Knowledge base for VAANI - Specific Q&A
const knowledgeBase = {
  // Introduction
  "your name": {
    english: "I am VAANI, your AI assistant for civic issues. I help citizens report problems and access government services.",
    hindi: "मैं वाणी हूं, नागरिक मुद्दों के लिए आपकी AI सहायक। मैं नागरिकों को समस्याओं की रिपोर्ट करने और सरकारी सेवाओं तक पहुंचने में मदद करती हूं।",
    hinglish: "Main VAANI hoon, civic issues ke liye aapki AI assistant. Main citizens ko problems report karne aur government services access karne mein help karti hoon."
  },
  "about yourself": {
    english: "I am VAANI - an AI-powered voice assistant built to help Indian citizens report civic issues like water problems, potholes, garbage, and electricity issues. I can guide you through reporting complaints on both VAANI platform and government portals.",
    hindi: "मैं वाणी हूं - एक AI-संचालित वॉयस असिस्टेंट जो भारतीय नागरिकों को पानी की समस्या, गड्ढे, कचरा और बिजली की समस्याओं जैसे नागरिक मुद्दों की रिपोर्ट करने में मदद करने के लिए बनाई गई है।",
    hinglish: "Main VAANI hoon - ek AI-powered voice assistant jo Indian citizens ko water problems, potholes, garbage aur electricity issues jaise civic issues report karne mein help karne ke liye banayi gayi hoon."
  },
  
  // Water Problem - Specific
  "water problem": {
    english: "For water supply issues, you have two options:\n\n1. Government Portal: Visit jaljeevanmission.gov.in or your state's water board website to file a complaint.\n\n2. VAANI Platform: Login to VAANI → Click 'Report Issue' → Select 'Water Supply Problem' → Add your location → Upload photo (optional) → Describe the issue → Submit. You'll get a tracking ID to monitor progress.",
    hindi: "पानी की आपूर्ति की समस्या के लिए, आपके पास दो विकल्प हैं:\n\n1. सरकारी पोर्टल: jaljeevanmission.gov.in या अपने राज्य के जल बोर्ड की वेबसाइट पर जाएं।\n\n2. वाणी प्लेटफॉर्म: वाणी में लॉगिन करें → 'रिपोर्ट इश्यू' पर क्लिक करें → 'पानी की आपूर्ति समस्या' चुनें → अपना स्थान जोड़ें → फोटो अपलोड करें → समस्या का वर्णन करें → सबमिट करें।",
    hinglish: "Paani ki supply ki problem ke liye, aapke paas do options hain:\n\n1. Government Portal: jaljeevanmission.gov.in ya apne state ke water board ki website par jao.\n\n2. VAANI Platform: VAANI mein login karo → 'Report Issue' click karo → 'Water Supply Problem' select karo → Location add karo → Photo upload karo → Problem describe karo → Submit karo."
  },
  
  // What is VAANI
  "what is vaani": {
    english: "VAANI is a civic engagement platform where you can report issues like potholes, water problems, garbage, and streetlights. You can track your complaints and get updates.",
    hindi: "वाणी एक नागरिक सेवा मंच है जहाँ आप गड्ढे, पानी की समस्या, कचरा और स्ट्रीटलाइट जैसी समस्याओं की रिपोर्ट कर सकते हैं।",
    hinglish: "VAANI ek civic engagement platform hai jahan aap potholes, paani ki problem, garbage aur streetlights jaise issues report kar sakte ho."
  },
  
  // How it works
  "how it works": {
    english: "Simple! Login to VAANI → Select issue type → Add location & photos → Describe problem → Submit. You'll get a tracking ID and notifications.",
    hindi: "सरल! वाणी में लॉगिन करें → समस्या का प्रकार चुनें → स्थान और फोटो जोड़ें → समस्या का वर्णन करें → सबमिट करें।",
    hinglish: "Simple! VAANI mein login karo → Issue type select karo → Location aur photos add karo → Problem describe karo → Submit karo."
  },
  
  // Default help
  "help": {
    english: "I can help you with:\n• Reporting water, electricity, road, or garbage issues\n• Guiding you to government portals\n• Explaining how to use VAANI\n• Tracking your complaints\n\nWhat problem are you facing?",
    hindi: "मैं आपकी मदद कर सकती हूं:\n• पानी, बिजली, सड़क या कचरे की समस्याओं की रिपोर्ट करने में\n• सरकारी पोर्टल पर मार्गदर्शन करने में\n• वाणी का उपयोग करने की व्याख्या करने में\n• आपकी शिकायतों को ट्रैक करने में\n\nआप किस समस्या का सामना कर रहे हैं?",
    hinglish: "Main aapki help kar sakti hoon:\n• Paani, bijli, sadak ya kachre ki problems report karne mein\n• Government portals par guide karne mein\n• VAANI use karne ka tarika batane mein\n• Aapki complaints track karne mein\n\nAap kis problem ka saamna kar rahe ho?"
  }
}

// Detect language
function detectLanguage(text) {
  const hindiPattern = /[\u0900-\u097F]/
  const lowerText = text.toLowerCase()
  
  // If contains Devanagari script, it's Hindi
  if (hindiPattern.test(text)) return 'hindi'
  
  // Check for common Hinglish words
  const hinglishWords = ['kya', 'hai', 'aap', 'tumhara', 'naam', 'baare', 'mai', 'bataye', 
                         'paani', 'nhi', 'nahi', 'aa', 'rha', 'kaise', 'kaam', 'karta', 
                         'chahiye', 'mujhe', 'madad', 'karo', 'kro', 'vaani']
  
  const hasHinglish = hinglishWords.some(word => lowerText.includes(word))
  if (hasHinglish) return 'hinglish'
  
  // Otherwise English
  return 'english'
}

// Find best match - More specific matching
function findBestMatch(userMessage) {
  const lowerMsg = userMessage.toLowerCase()
  
  // Introduction questions
  if (lowerMsg.includes('your name') || lowerMsg.includes('tumhara naam') || lowerMsg.includes('तुम्हारा नाम') || lowerMsg.includes('aapka naam')) {
    return 'your name'
  }
  if ((lowerMsg.includes('about') && lowerMsg.includes('you')) || 
      lowerMsg.includes('apne baare') || lowerMsg.includes('अपने बारे') ||
      lowerMsg.includes('batao') || lowerMsg.includes('बताओ')) {
    return 'about yourself'
  }
  
  // Water problem - SPECIFIC
  if ((lowerMsg.includes('water') || lowerMsg.includes('paani') || lowerMsg.includes('पानी')) && 
      (lowerMsg.includes('nahi') || lowerMsg.includes('नहीं') || lowerMsg.includes('problem') || 
       lowerMsg.includes('issue') || lowerMsg.includes('aa raha') || lowerMsg.includes('nhi'))) {
    return 'water problem'
  }
  
  // VAANI questions
  if (lowerMsg.includes('what') && (lowerMsg.includes('vaani') || lowerMsg.includes('वाणी'))) {
    return 'what is vaani'
  }
  if (lowerMsg.includes('how') && lowerMsg.includes('work')) {
    return 'how it works'
  }
  
  // Help
  if (lowerMsg.includes('help') || lowerMsg.includes('मदद') || lowerMsg.includes('madad')) {
    return 'help'
  }
  
  return 'help' // default
}

/**
 * Chat endpoint
 */
app.post("/chat", async (req, res) => {
  try {
    const { message, userId } = req.body
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        role: "assistant",
        content: "Please provide a message."
      })
    }

    console.log(`\n📩 User: ${message}`)

    const language = detectLanguage(message)
    const matchKey = findBestMatch(message)
    const response = knowledgeBase[matchKey][language]
    
    console.log(`🤖 VAANI (${language}): ${response}`)

    res.json({
      role: "assistant",
      content: response
    })

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    res.json({
      role: "assistant",
      content: "I'm here to help with civic issues. You can report problems, track complaints, or ask questions about VAANI."
    })
  }
})

/**
 * Voice command endpoint
 */
app.post("/voice-command", async (req, res) => {
  try {
    const { command, userId } = req.body
    
    if (!command || command.trim().length === 0) {
      return res.status(400).json({
        type: "response",
        content: "I didn't catch that. Please try again."
      })
    }

    console.log(`\n🎤 Voice: ${command}`)

    const language = detectLanguage(command)
    const matchKey = findBestMatch(command)
    const response = knowledgeBase[matchKey][language]
    
    console.log(`🤖 VAANI (${language}): ${response}`)

    res.json({
      type: "response",
      content: response
    })

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    res.json({
      type: "response",
      content: "I'm here to help! Ask me about VAANI, reporting issues, or tracking complaints."
    })
  }
})

/**
 * Health check
 */
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    mode: "local-knowledge-base"
  })
})

/**
 * Clear conversation
 */
app.post("/clear-conversation", (req, res) => {
  res.json({ success: true })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n🎤 ========================================`)
  console.log(`   VAANI AI Assistant (Local Mode)`)
  console.log(`   ========================================`)
  console.log(`   Port: ${PORT}`)
  console.log(`   Mode: Local Knowledge Base`)
  console.log(`   Languages: English, Hindi, Hinglish`)
  console.log(`   ========================================\n`)
})
