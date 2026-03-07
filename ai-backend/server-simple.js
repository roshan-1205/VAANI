import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Initialize AWS Bedrock
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

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
 * Main chat endpoint - sends user message to AWS Bedrock
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

    // Call AWS Bedrock
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
    
    console.log(`🤖 VAANI: ${aiResponse}`)

    res.json({
      role: "assistant",
      content: aiResponse
    })

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    
    // Fallback response if Bedrock fails
    res.json({
      role: "assistant",
      content: "I'm here to help with civic issues. You can report problems, track complaints, or ask questions about VAANI. What would you like to know?"
    })
  }
})

/**
 * Voice command endpoint - same as chat but for voice
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

    // Call AWS Bedrock
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

    const bedrockCommand = new InvokeModelCommand({
      modelId: "us.amazon.nova-lite-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload)
    })

    const response = await bedrockClient.send(bedrockCommand)
    const responseBody = JSON.parse(new TextDecoder().decode(response.body))
    
    let aiResponse = responseBody.output.message.content[0].text.trim()
    aiResponse = aiResponse.replace(/^(VAANI:|Assistant:)/i, '').trim()
    
    console.log(`🤖 VAANI: ${aiResponse}`)

    res.json({
      type: "response",
      content: aiResponse
    })

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    
    // Fallback
    res.json({
      type: "response",
      content: "I'm here to help! You can ask me about VAANI, report issues, or get information about civic services."
    })
  }
})

/**
 * Health check
 */
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    mode: "simple-bedrock",
    model: "amazon-nova-lite"
  })
})

/**
 * Clear conversation (for compatibility)
 */
app.post("/clear-conversation", (req, res) => {
  res.json({ success: true })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n🎤 ========================================`)
  console.log(`   VAANI AI Assistant (Simple Mode)`)
  console.log(`   ========================================`)
  console.log(`   Port: ${PORT}`)
  console.log(`   Model: AWS Bedrock Nova Lite`)
  console.log(`   Mode: Direct AI Responses`)
  console.log(`   ========================================\n`)
})
