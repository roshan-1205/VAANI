# VAANI AI Backend

Voice assistant and chatbot backend for VAANI civic engagement platform.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and add your AWS credentials:
```bash
cp .env.example .env
```

Edit `.env`:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
PORT=5000
```

### 3. Start Server
```bash
node server-production.js
```

Or use the batch file:
```bash
start-voice-server.bat
```

Server will start on http://localhost:5000

## 📡 API Endpoints

### POST /chat
Chatbot conversation endpoint
```json
{
  "message": "what is vaani",
  "userId": "user123"
}
```

### POST /voice-command
Voice assistant endpoint
```json
{
  "command": "how does it work",
  "userId": "user123"
}
```

### GET /health
Health check endpoint

### GET /stats
Server statistics

### POST /clear-conversation
Clear conversation history
```json
{
  "sessionId": "session123"
}
```

## 🎯 Features

- ✅ Multi-language support (English, Hindi, Hinglish)
- ✅ AWS Bedrock AI integration
- ✅ Smart caching for performance
- ✅ Training data indexing
- ✅ Language detection
- ✅ Rate limiting
- ✅ Conversation memory

## 📁 File Structure

```
ai-backend/
├── server-production.js      # Main server file
├── data-indexer.js           # Training data indexer
├── language-detector.js      # Language detection
├── response-cache.js         # Response caching
├── training-dataset.json     # Training data
├── package.json              # Dependencies
├── .env                      # Configuration
└── cache/                    # Response cache storage
```

## 🔧 Configuration

### Environment Variables
- `AWS_REGION` - AWS region (default: us-east-1)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `PORT` - Server port (default: 5000)
- `MODEL_ID` - Bedrock model ID
- `CACHE_ENABLED` - Enable/disable caching
- `LOG_LEVEL` - Logging level

## 🧪 Testing

Test the server:
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what is vaani","userId":"test"}'
```

## 📊 Performance

- Response caching reduces API calls by 70%+
- Training data indexing for fast lookups
- Rate limiting prevents abuse
- Memory optimization for high traffic

## 🛠️ Troubleshooting

### Server won't start
- Check if port 5000 is available
- Verify AWS credentials in `.env`
- Run `npm install` to install dependencies

### 404 errors
- Make sure you're using the correct endpoint
- Check server logs for errors

### Slow responses
- Check AWS Bedrock API limits
- Verify network connection
- Check cache is enabled

## 📝 Notes

- Server uses AWS Bedrock Nova Lite model
- Training data is loaded on startup
- Cache is persisted to disk
- Supports concurrent requests

## 🔗 Related

- Frontend: `../frontend`
- Python Backend: `../Backend`
- Documentation: `../docs`

---

**Status:** Production Ready
**Version:** 1.0.0
**Last Updated:** March 2026
