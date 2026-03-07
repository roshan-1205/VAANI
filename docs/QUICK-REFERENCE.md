# Quick Reference Guide

## 🚀 Start Server

```bash
cd ai-backend
node server-production.js
```

## 🧪 Test Voice Assistant

```bash
cd ai-backend
node test-voice-command.js
```

## 📊 Current Dataset

- **File**: `training-dataset.json`
- **Conversations**: 61 (Voice-60 optimized)
- **Languages**: Hinglish, Hindi, English
- **Status**: ✅ Active

## 🎤 Voice Commands That Work

### Civic Issues
- "Hello, mere area mein bahut bada pothole hai"
- "Paani nahi aa raha 3 din se"
- "Bijli bahut kam voltage mein aa rahi hai"
- "Kachra 5 din se nahi uthaya gaya"

### Platform Help
- "Tum kaun ho?"
- "VAANI kya hai?"
- "Complaint kaise file karte hain?"
- "Status kaise check karte hain?"

### Support
- "Main bahut pareshan hoon"
- "Yahan koi sunta hi nahi"
- "Mujhe samajh nahi aa raha kya karu"

## 🔧 Restore Original Dataset

```bash
cd ai-backend
copy training-dataset-backup-213.json training-dataset.json
```

## 📁 Important Files

- `ai-backend/training-dataset.json` - Active dataset
- `ai-backend/server-production.js` - Main server
- `frontend/src/components/VoiceCommandAssistant.jsx` - Voice UI
- `ai-backend/test-voice-command.js` - Test script

## ✅ Verification

All tests should pass:
- Training data matching: 100%
- Voice commands: Working
- Language detection: Accurate
- Response quality: Excellent

## 📞 Endpoints

- `/chat` - Text chat
- `/voice-command` - Voice commands
- `/health` - Health check
- `/stats` - Statistics

## 🎯 Status

✅ Production Ready
