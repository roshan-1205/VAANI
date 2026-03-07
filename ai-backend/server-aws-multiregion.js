import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Multi-region configuration for automatic fallback
const AWS_REGIONS = [
  "us-east-1",      // Primary
  "us-west-2",      // Fallback 1
  "eu-west-1",      // Fallback 2
  "ap-southeast-1"  // Fallback 3
]

let currentRegionIndex = 0
let bedrockClient = null

// Initialize Bedrock client with current region
function initializeBedrockClient() {
  const region = AWS_REGIONS[currentRegionIndex]
  bedrockClient = new BedrockRuntimeClient({
    region: region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })
  console.log(`🌍 Using AWS Region: ${region}`)
  return region
}

// Switch to next region on quota exceeded
function switchToNextRegion() {
  currentRegionIndex = (currentRegionIndex + 1) % AWS_REGIONS.length
  const newRegion = initializeBedrockClient()
  console.log(`🔄 Switched to region: ${newRegion}`)
  return newRegion
}

// Initialize with first region
initializeBedrockClient()

// System prompt for VAANI
const SYSTEM_PROMPT = `You are VAANI, a helpful AI assistant for a civic engagement platform in India.

Your role:
- Help citizens report civic issues (potholes, water problems, garbage, electricity, etc.)
- Provide information about government services and schemes
- Guide users on how to use the VAANI platform
- Answer questions in a friendly, conversational manner

Guidelines:
- Keep responses SHORT and CLEAR (2-3 sentences max)
- Be helpful and supportive
- If asked about VAANI, explain it's a platform to report civic issues and track complaints
- Support multiple languages (English, Hindi, Hinglish)
- Don't mention you're an AI, just be helpful

Remember: You're here to help citizens engage with civic services easily.`

/**
 * Call Bedrock with automatic region fallback
 */
async function callBedrockWithFallback(payload, maxRetries = 3) {
  let lastError = null
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
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
      
      return {
        success: true,
        response: aiResponse,
        region: AWS_REGIONS[currentRegionIndex]
      }
      
    } catch (err) {
      lastError = err
      
      // Check if it's a quota/throttling error
      if (err.name === 'ThrottlingException' || 
          err.message.includes('quota') || 
          err.message.includes('limit') ||
          err.message.includes('throttl')) {
        
        console.log(`⚠️ Quota exceeded in ${AWS_REGIONS[currentRegionIndex]}`)
        
        // Try next region
        if (attempt < maxRetries - 1) {
          switchToNextRegion()
          console.log(`🔄 Retrying with new region...`)
          continue
        }
      }
      
      // If not quota error or last retry, throw
      throw err
    }
  }
  
  throw lastError
}

/**
 * Main chat endpoint
 */
app.post("/chat", async (req, res) => {
  try {
    const { message, userId } = req.body
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        role: "assistant",
        content: "Please provide a message.",
        error: "EMPTY_MESSAGE"
      })
    }

    console.log(`\n📩 User: ${message}`)

    // Call AWS Bedrock with automatic region fallback
    const payload = {
      messages: [
        {
          role: "user",
          content: [{ 
            text: `${SYSTEM_PROMPT}\n\nUser: ${message}\n\nVAANI:` 
          }]
        }
      ],
      inferenceConfig: {
        maxTokens: 200,
        temperature: 0.7,
        topP: 0.9
      }
    }

    try {
      const result = await callBedrockWithFallback(payload)
      
      console.log(`🤖 VAANI (${result.region}): ${result.response}`)

      res.json({
        role: "assistant",
        content: result.response,
        region: result.region
      })
      
    } catch (apiError) {
      console.error(`❌ All regions failed: ${apiError.message}`)
      
      // Fallback response
      res.json({
        role: "assistant",
        content: "I'm here to help with civic issues. You can report problems, track complaints, or ask questions about VAANI. What would you like to know?",
        fallback: true
      })
    }

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    res.status(500).json({
      role: "assistant",
      content: "Technical issue occurred. Please try again.",
      error: "SERVER_ERROR"
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

    const payload = {
      messages: [
        {
          role: "user",
          content: [{ 
            text: `${SYSTEM_PROMPT}\n\nUser asked: ${command}\n\nVAANI (respond in a conversational way):` 
          }]
        }
      ],
      inferenceConfig: {
        maxTokens: 150,
        temperature: 0.8,
        topP: 0.9
      }
    }

    try {
      const result = await callBedrockWithFallback(payload)
      
      console.log(`🤖 VAANI (${result.region}): ${result.response}`)

      res.json({
        type: "response",
        content: result.response,
        region: result.region
      })
      
    } catch (apiError) {
      console.error(`❌ All regions failed: ${apiError.message}`)
      
      res.json({
        type: "response",
        content: "I'm here to help! You can ask me about VAANI, report issues, or get information about civic services.",
        fallback: true
      })
    }

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    res.json({
      type: "response",
      content: "I'm having trouble processing that. Please try again."
    })
  }
})

/**
 * Health check with region info
 */
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    mode: "multi-region-bedrock",
    model: "amazon-nova-lite",
    currentRegion: AWS_REGIONS[currentRegionIndex],
    availableRegions: AWS_REGIONS
  })
})

/**
 * Manually switch region (for testing)
 */
app.post("/switch-region", (req, res) => {
  const newRegion = switchToNextRegion()
  res.json({
    success: true,
    newRegion: newRegion,
    message: `Switched to ${newRegion}`
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
  console.log(`   VAANI AI Assistant (Multi-Region)`)
  console.log(`   ========================================`)
  console.log(`   Port: ${PORT}`)
  console.log(`   Model: AWS Bedrock Nova Lite`)
  console.log(`   Mode: Multi-Region Auto-Fallback`)
  console.log(`   Regions: ${AWS_REGIONS.join(', ')}`)
  console.log(`   Current: ${AWS_REGIONS[currentRegionIndex]}`)
  console.log(`   ========================================\n`)
})
