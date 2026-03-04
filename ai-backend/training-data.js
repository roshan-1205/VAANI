// VAANI AI Training Data - Comprehensive Knowledge Base
// यह file AI को train करने के लिए है

export const VAANI_KNOWLEDGE_BASE = {
  // Platform Information
  platform: {
    name: "VAANI",
    fullName: "Voice-Activated Assistant for National Infrastructure",
    purpose: "Civic issues ko report karna aur track karna",
    features: [
      "Voice-based complaint filing",
      "Real-time tracking",
      "Multi-language support (Hindi, English)",
      "Volunteer coordination",
      "Admin dashboard",
      "Community forum"
    ]
  },

  // Common Civic Issues with Solutions
  civicIssues: {
    road: {
      keywords: ['road', 'सड़क', 'sadak', 'pothole', 'गड्ढा', 'गड्ढे', 'crack', 'damage', 'पोथोल', 'पॉटहोल', 'रोड'],
      types: [
        { issue: 'Pothole', hindi: 'गड्ढा', urgency: 'high' },
        { issue: 'Road crack', hindi: 'सड़क में दरार', urgency: 'medium' },
        { issue: 'Broken road', hindi: 'टूटी सड़क', urgency: 'high' },
        { issue: 'Uneven surface', hindi: 'असमान सतह', urgency: 'medium' }
      ],
      solutions: [
        "VAANI app में login करें",
        "'File Complaint' पर click करें",
        "Category में 'Road' select करें",
        "Location add करें (GPS या manually)",
        "Photo upload करें (optional but helpful)",
        "Description में detail दें",
        "Submit करें - आपको complaint ID मिलेगी"
      ],
      timeline: "Usually 7-15 days में resolve होता है",
      department: "Public Works Department (PWD)"
    },

    water: {
      keywords: ['water', 'पानी', 'paani', 'supply', 'tap', 'नल', 'leak', 'leakage'],
      types: [
        { issue: 'No water supply', hindi: 'पानी नहीं आ रहा', urgency: 'high' },
        { issue: 'Low pressure', hindi: 'कम pressure', urgency: 'medium' },
        { issue: 'Water leakage', hindi: 'पानी का रिसाव', urgency: 'high' },
        { issue: 'Dirty water', hindi: 'गंदा पानी', urgency: 'high' },
        { issue: 'Broken pipe', hindi: 'टूटा पाइप', urgency: 'high' }
      ],
      solutions: [
        "तुरंत VAANI पर complaint file करें",
        "Emergency के लिए: Water Department helpline भी call करें",
        "Photo लें अगर visible problem है",
        "Timing बताएं - कब से problem है",
        "Area के और लोगों से भी पूछें - collective complaint ज्यादा effective"
      ],
      timeline: "Emergency: 24-48 hours, Normal: 3-7 days",
      department: "Water Supply Department / Jal Board"
    },

    electricity: {
      keywords: ['electricity', 'बिजली', 'bijli', 'power', 'current', 'voltage', 'transformer'],
      types: [
        { issue: 'Power cut', hindi: 'बिजली गुल', urgency: 'high' },
        { issue: 'Low voltage', hindi: 'कम voltage', urgency: 'medium' },
        { issue: 'Transformer issue', hindi: 'Transformer की problem', urgency: 'high' },
        { issue: 'Wire hanging', hindi: 'तार लटक रहा है', urgency: 'critical' },
        { issue: 'Meter problem', hindi: 'Meter की problem', urgency: 'medium' }
      ],
      solutions: [
        "VAANI पर complaint file करें",
        "Dangerous situation (wire hanging) में तुरंत Electricity Board call करें",
        "Transformer number note करें अगर पता हो",
        "Area में कितने घरों में problem है - यह बताएं",
        "Timing pattern बताएं - पूरा दिन या specific time"
      ],
      timeline: "Emergency: 2-6 hours, Normal: 1-3 days",
      department: "Electricity Board / Power Distribution Company"
    },

    garbage: {
      keywords: ['garbage', 'कचरा', 'kachra', 'waste', 'trash', 'sanitation', 'स्वच्छता'],
      types: [
        { issue: 'Garbage not collected', hindi: 'कचरा नहीं उठाया', urgency: 'medium' },
        { issue: 'Overflowing bin', hindi: 'Bin overflow हो रहा', urgency: 'high' },
        { issue: 'Illegal dumping', hindi: 'गलत जगह कचरा', urgency: 'high' },
        { issue: 'No dustbin', hindi: 'Dustbin नहीं है', urgency: 'low' }
      ],
      solutions: [
        "VAANI पर complaint file करें with photo",
        "Location accurately mark करें",
        "कितने दिनों से problem है - बताएं",
        "Health hazard है तो urgency mention करें",
        "Ward number पता हो तो add करें"
      ],
      timeline: "1-3 days",
      department: "Municipal Corporation / Sanitation Department"
    },

    streetlight: {
      keywords: ['streetlight', 'street light', 'light', 'बत्ती', 'batti', 'lamp', 'pole', 'लाइट', 'स्ट्रीट', 'स्ट्रीटलाइट'],
      types: [
        { issue: 'Light not working', hindi: 'बत्ती नहीं जल रही', urgency: 'medium' },
        { issue: 'Broken pole', hindi: 'Pole टूटा हुआ', urgency: 'high' },
        { issue: 'Dim light', hindi: 'कम रोशनी', urgency: 'low' },
        { issue: 'Daytime on', hindi: 'दिन में जल रही', urgency: 'low' }
      ],
      solutions: [
        "VAANI पर complaint file करें",
        "Pole number note करें (usually pole पर लिखा होता है)",
        "Exact location बताएं - landmark के साथ",
        "कितनी lights affected हैं",
        "Safety issue है तो mention करें"
      ],
      timeline: "3-7 days",
      department: "Municipal Corporation / Electricity Department"
    },

    drainage: {
      keywords: ['drainage', 'नाली', 'naali', 'sewer', 'clog', 'block', 'overflow'],
      types: [
        { issue: 'Blocked drain', hindi: 'नाली बंद', urgency: 'high' },
        { issue: 'Overflow', hindi: 'Overflow हो रहा', urgency: 'high' },
        { issue: 'Bad smell', hindi: 'बदबू', urgency: 'medium' },
        { issue: 'Open manhole', hindi: 'खुला manhole', urgency: 'critical' }
      ],
      solutions: [
        "तुरंत VAANI पर complaint file करें",
        "Open manhole CRITICAL है - तुरंत report करें",
        "Photo जरूर लें",
        "Rainy season में यह priority issue है",
        "Health department को भी inform करें अगर बहुत serious है"
      ],
      timeline: "Emergency: 24 hours, Normal: 2-5 days",
      department: "Municipal Corporation / Drainage Department"
    }
  },

  // How to use VAANI Platform
  howToUse: {
    registration: {
      steps: [
        "VAANI website/app खोलें",
        "'Sign Up' पर click करें",
        "Email और password enter करें",
        "Mobile number verify करें (OTP आएगा)",
        "Basic details भरें (Name, Address)",
        "Submit करें - आप login हो जाएंगे"
      ],
      tips: [
        "Valid email use करें - updates के लिए",
        "Strong password रखें",
        "Mobile number accurate हो - OTP के लिए"
      ]
    },

    fileComplaint: {
      steps: [
        "Login करें VAANI में",
        "Dashboard पर 'File Complaint' button click करें",
        "Issue category select करें (Road, Water, etc.)",
        "Location add करें - GPS use करें या manually type करें",
        "Problem की details लिखें - clear और specific",
        "Photo upload करें (optional but recommended)",
        "Urgency level select करें",
        "Submit करें",
        "Complaint ID save करें - tracking के लिए"
      ],
      tips: [
        "Clear photos लें - problem दिखनी चाहिए",
        "Detailed description दें - जितना detail उतना better",
        "Landmark mention करें - location identify करने में आसानी",
        "Time/date बताएं कब problem start हुई",
        "अगर multiple issues हैं तो separate complaints file करें"
      ]
    },

    trackComplaint: {
      steps: [
        "Login करें",
        "'My Complaints' section में जाएं",
        "अपनी complaints की list दिखेगी",
        "किसी भी complaint पर click करें details के लिए",
        "Status देखें: Pending, In Progress, Resolved",
        "Updates और comments पढ़ें",
        "Resolved होने पर feedback दें"
      ],
      statuses: {
        pending: "अभी review हो रहा है - 24-48 hours में update आएगा",
        inProgress: "Department काम कर रहा है - जल्द resolve होगा",
        resolved: "Problem solve हो गया - feedback दें",
        rejected: "Complaint reject हुआ - reason check करें"
      }
    },

    voiceFeature: {
      steps: [
        "Dashboard पर mic icon पर click करें",
        "'Allow' करें microphone access",
        "Mic icon फिर से click करें - recording start होगी",
        "Clearly बोलें अपनी problem",
        "Stop करें जब done हो",
        "AI आपकी बात समझेगा और respond करेगा",
        "Follow instructions जो AI दे"
      ],
      tips: [
        "Quiet जगह में बोलें - background noise कम हो",
        "Clearly और slowly बोलें",
        "Hindi या English - दोनों work करती है",
        "Short sentences में बोलें",
        "Specific details दें"
      ]
    }
  },

  // Common Questions & Answers
  faq: {
    "क्या VAANI free है?": "हाँ, VAANI पूरी तरह से free है। कोई charges नहीं।",
    "कितने दिन में complaint resolve होगी?": "यह issue type पर depend करता है। Emergency: 24-48 hours, Normal: 3-15 days। आप track कर सकते हैं।",
    "क्या मैं anonymous complaint file कर सकता हूं?": "नहीं, accountability के लिए registration जरूरी है। लेकिन आपकी details private रहती हैं।",
    "Complaint reject क्यों हुई?": "Reasons हो सकते हैं: incomplete information, duplicate complaint, या issue VAANI के scope में नहीं। Details check करें।",
    "क्या मैं multiple complaints file कर सकता हूं?": "हाँ, जितनी चाहें उतनी complaints file करें। हर issue के लिए separate complaint बेहतर है।",
    "Volunteer कैसे बनें?": "Dashboard में 'Become Volunteer' option है। Apply करें, verification के बाद आप volunteer बन जाएंगे।",
    "क्या मैं दूसरों की complaints देख सकता हूं?": "हाँ, Community section में area की complaints देख सकते हैं। Privacy के लिए personal details hidden रहती हैं।",
    "Emergency में क्या करें?": "Life-threatening emergency में 100/112 call करें। VAANI पर भी urgent complaint file करें।",
    "Photo upload जरूरी है?": "Compulsory नहीं, लेकिन highly recommended। Photo से complaint जल्दी resolve होती है।",
    "Status update कैसे मिलेगा?": "Email, SMS, और app notification से। 'My Complaints' में भी check कर सकते हैं।"
  },

  // Emotional Intelligence Responses
  emotions: {
    angry: {
      responses: [
        "मैं समझती हूं, यह बहुत frustrating है। 😔 मैं आपकी पूरी मदद करूंगी।",
        "आपका गुस्सा सही है। यह problem होनी ही नहीं चाहिए। चलिए इसे solve करते हैं।",
        "मैं आपकी परेशानी समझ सकती हूं। आइए जल्दी से complaint file करें।"
      ]
    },
    confused: {
      responses: [
        "कोई बात नहीं, मैं step by step बताती हूं। बिल्कुल आसान है। 😊",
        "Don't worry! मैं आपको guide करूंगी। एक-एक step समझाती हूं।",
        "Confusion होना normal है। मैं सब clear कर देती हूं।"
      ]
    },
    urgent: {
      responses: [
        "समझी, यह urgent है। तुरंत complaint file करते हैं। 🚨",
        "Emergency situation है। मैं quick process बताती हूं।",
        "Urgent case है। Priority के साथ handle करेंगे।"
      ]
    },
    satisfied: {
      responses: [
        "बहुत अच्छा! 😊 खुशी हुई मदद करके। कुछ और चाहिए तो बताइएगा।",
        "Great! Problem solve हो गई। Feedback देना मत भूलिएगा।",
        "Perfect! अगर कभी और help चाहिए तो मैं यहीं हूं।"
      ]
    },
    thankful: {
      responses: [
        "आपका स्वागत है! 😊 यही तो मेरा काम है।",
        "कोई बात नहीं! मदद करके अच्छा लगा।",
        "Pleasure! कभी भी help चाहिए तो बताइएगा।"
      ]
    }
  },

  // Conversation Starters
  greetings: {
    morning: [
      "सुप्रभात! 🌅 मैं VAANI हूं। आज किस problem में मदद करूं?",
      "Good morning! आपका दिन शुभ हो। कोई civic issue है?",
      "नमस्ते! सुबह की शुरुआत अच्छी हो। बताइए, क्या help चाहिए?"
    ],
    afternoon: [
      "नमस्ते! 🌞 मैं VAANI हूं। कैसे मदद कर सकती हूं?",
      "Good afternoon! कोई civic problem है जो solve करनी है?",
      "शुभ दोपहर! बताइए, किस चीज़ में help चाहिए?"
    ],
    evening: [
      "शुभ संध्या! 🌆 मैं VAANI हूं। कैसी मदद करूं?",
      "Good evening! आज कोई issue report करना है?",
      "नमस्ते! शाम की शुरुआत अच्छी हो। क्या help चाहिए?"
    ],
    night: [
      "शुभ रात्रि! 🌙 मैं VAANI हूं। कैसे मदद करूं?",
      "Good night! रात में भी मैं available हूं। बताइए।",
      "नमस्ते! देर रात तक काम? कोई urgent issue है?"
    ]
  },

  // Follow-up Questions
  followUps: {
    location: [
      "यह कहाँ है? Area या landmark बताइए।",
      "Location क्या है? GPS use कर सकते हैं।",
      "किस area में है यह problem?"
    ],
    duration: [
      "कब से यह problem है?",
      "कितने दिनों से हो रहा है?",
      "यह issue कब start हुआ?"
    ],
    severity: [
      "कितना serious है? Emergency है क्या?",
      "Problem की severity कैसी है?",
      "यह urgent है या normal complaint?"
    ],
    details: [
      "थोड़ा और detail में बताइए।",
      "कुछ और information दे सकते हैं?",
      "Exactly क्या problem है?"
    ]
  }
}

// Helper function to get random response
export function getRandomResponse(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to detect emotion
export function detectEmotion(message) {
  const lowerMsg = message.toLowerCase()
  
  if (lowerMsg.match(/urgent|emergency|तुरंत|जल्दी|critical/i)) return 'urgent'
  if (lowerMsg.match(/angry|frustrated|गुस्सा|परेशान|fed up/i)) return 'angry'
  if (lowerMsg.match(/confused|समझ नहीं|don't understand|कैसे/i)) return 'confused'
  if (lowerMsg.match(/thank|धन्यवाद|shukriya|शुक्रिया/i)) return 'thankful'
  if (lowerMsg.match(/good|great|अच्छा|बढ़िया|perfect/i)) return 'satisfied'
  
  return 'neutral'
}

// Helper function to get issue category
export function detectIssueCategory(message) {
  const lowerMsg = message.toLowerCase()
  const kb = VAANI_KNOWLEDGE_BASE.civicIssues
  
  for (const [category, data] of Object.entries(kb)) {
    if (data.keywords.some(keyword => lowerMsg.includes(keyword))) {
      return category
    }
  }
  
  return null
}
