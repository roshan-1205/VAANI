# 🎤 Vaani Voice Assistant Guide

## Overview

The Vaani Voice Assistant is an intelligent voice-controlled interface that allows users to navigate the platform and get civic information using natural voice commands. It combines speech recognition, natural language processing, and text-to-speech capabilities.

## Features

### ✅ Core Capabilities

1. **Voice Navigation**
   - Navigate to different pages
   - Switch dashboard sections
   - Go back/forward in history

2. **Platform Actions**
   - Report issues
   - Track complaints
   - Call volunteer support
   - Logout (allowed)

3. **Conversational AI**
   - Answer civic-related questions
   - Provide information about Vaani platform
   - Multi-language support (English, Hindi, Hinglish)

4. **Security**
   - Restricted actions (login, signup, external sites)
   - Platform-only control
   - No sensitive operations via voice

## How It Works

### Architecture

```
User Voice → Speech Recognition → Command Processing → Action/Response
                                          ↓
                                    AI Backend
                                          ↓
                                  Text-to-Speech
```

### Components

1. **VoiceCommandAssistant.jsx** - Frontend component
2. **server-production.js** - Backend endpoint `/voice-command`
3. **Speech Recognition API** - Browser native
4. **Speech Synthesis API** - Browser native

## Usage

### Starting the Voice Assistant

1. Click the microphone button
2. Grant microphone permissions if prompted
3. Speak your command clearly
4. Wait for Vaani to respond

### Example Commands

#### Navigation Commands
```
"Go to home"
"Open dashboard"
"Go back"
"Go forward"
"Show my profile"
```

#### Action Commands
```
"Report an issue"
"Track my complaint"
"Call volunteer"
"Open analytics"
"Logout"
```

#### Information Queries
```
"What is Vaani?"
"How do I report a problem?"
"What services are available?"
"Tell me about government schemes"
```

## Supported Actions

### ✅ Allowed Actions

| Command Pattern | Action | Description |
|----------------|--------|-------------|
| "go to home" | navigate_home | Navigate to home page |
| "go back" | navigate_back | Go to previous page |
| "go forward" | navigate_forward | Go to next page |
| "open dashboard" | open_dashboard | Open user dashboard |
| "report issue" | open_report_issue | Open report issue page |
| "track complaint" | open_track_complaint | Open complaint tracking |
| "call volunteer" | call_volunteer | Connect to volunteer support |
| "logout" | logout_user | Logout from platform |

### ❌ Restricted Actions

The voice assistant will NOT perform:
- Login/Signup operations
- Opening external websites (YouTube, Google, etc.)
- System-level commands (shutdown, restart)
- Financial transactions
- Account deletion
- Any action outside Vaani platform

## API Endpoint

### POST /voice-command

**Request:**
```json
{
  "command": "open dashboard",
  "userId": "user123"
}
```

**Response (Action):**
```json
{
  "type": "action",
  "action": "open_dashboard",
  "parameters": {}
}
```

**Response (Conversational):**
```json
{
  "type": "response",
  "content": "Vaani is a civic engagement platform...",
  "language": "english",
  "source": "bedrock"
}
```

**Response (Restricted):**
```json
{
  "type": "response",
  "content": "I'm sorry, I can only control features inside the Vaani platform...",
  "restricted": true
}
```

## Language Support

The voice assistant supports:
- **English** - Full support
- **Hindi** - Full support
- **Hinglish** - Full support

Language is automatically detected from the user's speech.

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge (Recommended)
- ✅ Safari (iOS 14.5+)
- ✅ Firefox (limited)

### Required APIs
- Web Speech API (Speech Recognition)
- Speech Synthesis API (Text-to-Speech)

## Setup Instructions

### 1. Frontend Setup

The component is already integrated in `UserDashboard.jsx`:

```jsx
import VoiceCommandAssistant from '../components/VoiceCommandAssistant';

// In your component
<VoiceCommandAssistant />
```

### 2. Backend Setup

The endpoint is already added to `server-production.js`. Ensure the server is running:

```bash
cd VAANI/ai-backend
npm start
```

### 3. Environment Variables

Ensure these are set in `.env`:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
PORT=5000
```

## Customization

### Adding New Commands

Edit `server-production.js`:

```javascript
const navigationActions = [
  { 
    patterns: [/\byour pattern\b/i], 
    action: "your_action" 
  }
]
```

### Adding New Sections

```javascript
const sectionPatterns = [
  { 
    patterns: [/\byour section\b/i], 
    section: "your_section" 
  }
]
```

### Styling

Modify `VoiceCommandAssistant.css` to customize appearance.

## Troubleshooting

### Microphone Not Working
- Check browser permissions
- Ensure HTTPS connection (required for mic access)
- Try different browser

### Commands Not Recognized
- Speak clearly and slowly
- Check if command is in allowed list
- Verify backend is running

### No Voice Response
- Check browser audio settings
- Ensure speakers/headphones connected
- Try refreshing page

### Backend Errors
- Check server logs
- Verify AWS credentials
- Ensure port 5000 is available

## Security Considerations

1. **No Authentication via Voice** - Login/signup must be done manually
2. **Platform-Only Control** - Cannot access external sites
3. **Rate Limiting** - 100 requests per minute per user
4. **Input Validation** - All commands are validated
5. **Restricted Actions** - Sensitive operations blocked

## Performance

- **Response Time**: < 2 seconds
- **Cache Hit Rate**: ~60-70%
- **Language Detection**: Instant
- **Speech Recognition**: Real-time

## Future Enhancements

- [ ] Multi-step conversations
- [ ] Voice-based form filling
- [ ] Custom wake word ("Hey Vaani")
- [ ] Offline mode
- [ ] Voice biometrics
- [ ] Regional language support

## Testing

### Manual Testing

1. Start backend: `cd VAANI/ai-backend && npm start`
2. Start frontend: `cd VAANI/frontend && npm start`
3. Navigate to dashboard
4. Click microphone button
5. Test commands from examples above

### Automated Testing

```bash
# Test voice command endpoint
curl -X POST http://localhost:5000/voice-command \
  -H "Content-Type: application/json" \
  -d '{"command": "open dashboard", "userId": "test"}'
```

## Support

For issues or questions:
- Check troubleshooting section
- Review browser console for errors
- Check backend logs
- Ensure all dependencies installed

## Credits

- Speech Recognition: Web Speech API
- AI Backend: AWS Bedrock (Nova Lite)
- Text-to-Speech: Speech Synthesis API
- UI Icons: Lucide React

---

**Version**: 1.0.0  
**Last Updated**: 2026-03-05  
**Status**: Production Ready ✅
