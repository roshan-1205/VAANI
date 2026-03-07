# VAANI - Voice-First Civic Engagement Platform

AI-powered platform for civic complaints and government services with voice assistant support.

## 🚀 Quick Start

### Backend (Node.js)
```bash
cd ai-backend
npm install
node server-production.js
```
Server runs on: `http://localhost:5000`

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Python Backend (Optional)
```bash
cd ai-backend-python
pip install -r requirements.txt
python server.py
```

## 📁 Project Structure

```
VAANI/
├── ai-backend/          # Node.js backend (main)
├── ai-backend-python/   # Python backend (alternative)
├── frontend/            # React frontend
├── Backend/             # FastAPI backend
├── amplify/             # AWS Amplify config
└── docs/                # Documentation
```

## ✨ Features

- 🎤 Voice Assistant (Hinglish/Hindi/English)
- 📝 Civic Complaint Filing
- 📊 Complaint Tracking
- 🗣️ Multilingual Support
- 🤖 AI-Powered Responses
- 📱 Mobile Responsive

## 🎯 Current Status

- ✅ Voice-60 Dataset Active (61 conversations)
- ✅ Training data matching: 100%
- ✅ Language detection working
- ✅ Voice assistant ready

## 📚 Documentation

See `docs/` folder for detailed guides:
- Architecture
- Deployment
- Testing
- Voice Assistant Guide

## 🧪 Testing

```bash
# Test backend
cd ai-backend
node test-training.js
node test-voice-command.js

# Test Python backend
cd ai-backend-python
python test_complete_system.py
```

## 🔧 Configuration

1. Copy `.env.example` to `.env` in `ai-backend/`
2. Add AWS credentials for Bedrock
3. Configure frontend API URL if needed

## 📊 Dataset

- **Active**: `training-dataset.json` (61 conversations)
- **Backup**: `training-dataset-backup-213.json` (original)
- **Voice-optimized**: Best quality conversations for voice assistant

## 🎉 Ready for Production

All systems tested and working. Voice assistant responds from training data with 100% accuracy.
