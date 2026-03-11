# 🎙️ VAANI - Voice-First Civic Engagement Platform

<div align="center">

![VAANI Logo](https://img.shields.io/badge/VAANI-Voice%20Assistant-8b5cf6?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![AWS](https://img.shields.io/badge/AWS-Amplify-FF9900?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**AI-Powered Voice Assistant for Government Services & Civic Complaints**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

VAANI is a comprehensive voice-first platform designed to bridge the gap between citizens and government services. It leverages cutting-edge AI technology to provide multilingual voice assistance for filing civic complaints, tracking issues, and accessing government schemes.

### 🎯 Key Highlights

- **🗣️ Multilingual Support**: Seamlessly handles Hindi, English, and Hinglish
- **🎤 Voice-First Design**: Natural voice interactions powered by AWS Transcribe & Polly
- **🤖 AI-Powered**: Intelligent responses using AWS Bedrock Nova Sonic
- **📊 Real-Time Analytics**: Interactive dashboards with live data visualization
- **🔐 Secure Authentication**: Firebase-based user management
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **♿ Accessible**: WCAG-compliant design principles

---

## ✨ Features

### 🎙️ Voice Assistant
- **Natural Language Processing**: Understands context and intent
- **Multi-turn Conversations**: Maintains conversation history
- **Language Detection**: Automatically detects user's preferred language
- **Voice Commands**: Hands-free interaction for accessibility
- **Real-time Transcription**: Instant speech-to-text conversion
- **Neural Voice Synthesis**: Natural-sounding responses

### 📝 Civic Engagement
- **Complaint Filing**: Easy submission of civic issues
- **Issue Tracking**: Real-time status updates
- **Category Management**: Healthcare, Legal, Education, Welfare
- **Priority Handling**: Urgent issues flagged automatically
- **Historical Records**: Complete activity history

### 📊 Analytics & Insights
- **Interactive Charts**: Issue distribution and trends
- **Performance Metrics**: Resolution rates and response times
- **User Activity**: Comprehensive activity tracking
- **Admin Dashboard**: System-wide analytics and monitoring

### 🔒 Security & Privacy
- **Firebase Authentication**: Secure user management
- **Role-Based Access**: User and Admin roles
- **Data Encryption**: End-to-end security
- **Privacy Compliance**: GDPR-ready architecture

---

🎤 Supported Voice Queries

VAANI understands natural voice queries from citizens in English and Hinglish. Below are some example questions the assistant can handle.

👋 General Interaction

Tum kaun ho?

Vaani kya hai?

Tum kya madad kar sakte ho?

Namaste

Mujhe madad chahiye

Mai bahut pareshan hu

Mujhe kuch poochna hai

Aapka naam kya hai?

Dhanyavaad

Alvida

🏙️ Civic Issues & Complaints

Complaint kaise kare?

Complaint status kaise check kare?

Sadak tut gayi hai kya kare?

Street light kharab hai kya kare?

Pani nahi aa raha kya kare?

Kachra nahi uth raha kya kare?

Sewer overflow ho raha kya kare?

Bijli nahi aa rahi hai

👤 Account & System

Account kaise banaye?

🏛️ Government Schemes

Sarkari yojna kya hai?

Ujjwala yojna kya hai?

Ayushman card ke liye eligible kaun hai?

How to make Ayushman card?

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **Python** 3.11+ ([Download](https://www.python.org/))
- **AWS Account** with Bedrock access
- **Firebase Project** ([Setup Guide](https://firebase.google.com/))

### 1️⃣ Clone Repository

```bash
git clone https://github.com/roshan-1205/VAANI.git
cd VAANI
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

🌐 Frontend runs on: **http://localhost:5173**

### 3️⃣ AI Backend Setup (Node.js)

```bash
cd ai-backend
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your AWS credentials
# AWS_ACCESS_KEY_ID=your_key
# AWS_SECRET_ACCESS_KEY=your_secret
# AWS_REGION=us-east-1

# Start production server
npm run production
```

🚀 Backend runs on: **http://localhost:5000**

### 4️⃣ Python Backend Setup (Optional)

```bash
cd ai-backend-python
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start server
python server.py
```

🐍 Python server runs on: **http://localhost:8000**

### 5️⃣ FastAPI Backend Setup

```bash
cd Backend
pip install -r requirements.txt

# Configure Firebase
cp serviceAccountKey.json.example serviceAccountKey.json
# Add your Firebase credentials

# Start server
python -m uvicorn app.main:app --reload
```

⚡ FastAPI runs on: **http://localhost:8080**

---

## 📁 Project Structure

```
VAANI/
├── 📂 frontend/                 # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── user/          # User-specific components
│   │   │   │   ├── IssueCategoryChart.jsx
│   │   │   │   ├── IssueTrendChart.jsx
│   │   │   │   └── AIVoiceInteraction.jsx
│   │   │   └── admin/         # Admin components
│   │   ├── pages/             # Page components
│   │   │   ├── user/          # User dashboard pages
│   │   │   └── admin/         # Admin dashboard pages
│   │   ├── layout/            # Layout components
│   │   ├── context/           # React Context providers
│   │   ├── services/          # API services
│   │   └── styles/            # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── 📂 ai-backend/              # Node.js AI Backend
│   ├── server-production.js   # Production server
│   ├── server-bedrock-nova-sonic.js  # AWS Bedrock integration
│   ├── data-indexer.js        # Training data indexer
│   ├── language-detector.js   # Language detection
│   ├── response-cache.js      # Response caching
│   ├── training-dataset.json  # AI training data (61 conversations)
│   ├── package.json
│   └── cache/                 # Response cache storage
│
├── 📂 ai-backend-python/       # Python AI Backend (Alternative)
│   ├── server.py              # FastAPI server
│   ├── intent_classifier.py   # Intent classification
│   ├── language_detector.py   # Language detection
│   ├── data_indexer.py        # Data indexing
│   ├── requirements.txt
│   └── test_*.py              # Test suites
│
├── 📂 Backend/                 # FastAPI Authentication Backend
│   ├── app/
│   │   ├── routes/            # API routes
│   │   │   ├── auth.py        # Authentication endpoints
│   │   │   └── users.py       # User management
│   │   ├── models.py          # Data models
│   │   ├── config.py          # Configuration
│   │   └── firebase_admin.py  # Firebase integration
│   ├── requirements.txt
│   └── start.sh               # Startup script
│
├── 📂 amplify/                 # AWS Amplify Configuration
│   ├── backend.ts             # Backend configuration
│   ├── auth/                  # Auth resources
│   ├── data/                  # Data resources
│   └── functions/             # Lambda functions
│       └── voice/             # Voice processing Lambda
│
├── 📂 docs/                    # Documentation
│   ├── ARCHITECTURE.md        # System architecture
│   ├── VOICE-ASSISTANT-GUIDE.md
│   ├── AWS-QUOTA-INCREASE-GUIDE.md
│   └── PROJECT-STATUS.md
│
├── 📂 scripts/                 # Utility scripts
│   └── README.md
│
└── README.md                   # This file
```

---

## 🏗️ Architecture

### System Overview

```
┌─────────────┐
│   Browser   │
│  (React)    │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────────────────────┐
│     AWS Amplify API Gateway         │
└──────┬──────────────────────────────┘
       │
       ├─────────────┬─────────────┐
       ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Lambda  │  │   Node   │  │  FastAPI │
│  (Voice) │  │ Backend  │  │  Backend │
└──────────┘  └──────────┘  └──────────┘
       │             │             │
       ▼             ▼             ▼
┌──────────────────────────────────────┐
│  AWS Services & Firebase             │
│  • Transcribe  • Bedrock             │
│  • Polly       • S3                  │
│  • Firebase Auth                     │
└──────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18, Vite, Tailwind CSS | User interface |
| **UI Components** | Framer Motion, Recharts, Lucide Icons | Animations & visualizations |
| **Backend** | Node.js, Express, FastAPI | API servers |
| **AI/ML** | AWS Bedrock Nova Sonic | Natural language processing |
| **Voice** | AWS Transcribe, Polly | Speech-to-text & text-to-speech |
| **Authentication** | Firebase Auth | User management |
| **Storage** | AWS S3 | Audio file storage |
| **Deployment** | AWS Amplify, Lambda | Serverless infrastructure |
| **State Management** | React Context API | Global state |
| **Routing** | React Router v7 | Client-side routing |

---

## 📚 Documentation

### Core Documentation
- 📐 [**Architecture Guide**](docs/ARCHITECTURE.md) - System design and infrastructure
- 🎤 [**Voice Assistant Guide**](docs/VOICE-ASSISTANT-GUIDE.md) - Voice features and integration
- 🧪 [**Voice Assistant Testing**](docs/VOICE-ASSISTANT-TEST-GUIDE.md) - Testing procedures
- 📊 [**Project Status**](docs/PROJECT-STATUS.md) - Current development status
- ☁️ [**AWS Quota Guide**](docs/AWS-QUOTA-INCREASE-GUIDE.md) - AWS service limits

### Backend Documentation
- 📖 [**AI Backend README**](ai-backend/README.md) - Node.js backend setup
- 🐍 [**Python Backend README**](ai-backend-python/README.md) - Python backend setup
- ⚡ [**FastAPI Backend README**](Backend/README.md) - Authentication backend

### Training & Testing
- 🎓 [**Training Guide**](ai-backend/COMPLETE-TRAINING-GUIDE.md) - AI model training
- ✅ [**Test Summary**](ai-backend/COMPLETE-TEST-SUMMARY.md) - Test results
- 📝 [**Questions Guide**](ai-backend/COMPLETE-QUESTIONS-GUIDE.md) - Supported queries

---

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
npm run dev
# Open http://localhost:5173
# Test voice assistant, dashboards, and navigation
```

### Backend Testing

```bash
cd ai-backend

# Test training data
npm run test-training

# Test all languages
npm run test-languages

# Test voice commands
npm run test-voice

# Test government schemes
npm run test-govt-schemes

# Run all tests
npm run test-all
```

### Python Backend Testing

```bash
cd ai-backend-python

# Test language detection
python test_language_detection.py

# Test intent classification
python test_intent_classification.py

# Test complete system
python test_complete_system.py
```

---

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

#### AI Backend (.env)
```env
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
PORT=5000
```

#### FastAPI Backend (.env)
```env
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
PORT=8080
```

---

## 📊 Dataset

### Training Data
- **Active Dataset**: `training-dataset.json` (61 conversations)
- **Backup Dataset**: `training-dataset-backup-213.json` (213 conversations)
- **Languages**: Hindi, English, Hinglish
- **Categories**: Healthcare, Legal, Education, Welfare, Government Schemes

### Dataset Statistics
- ✅ **Training Accuracy**: 100%
- ✅ **Language Detection**: Working
- ✅ **Intent Classification**: Optimized
- ✅ **Response Cache**: Active

---

## 🎯 Current Status

### ✅ Completed Features
- [x] Voice assistant with multilingual support
- [x] User authentication and authorization
- [x] Admin and user dashboards
- [x] Interactive analytics charts
- [x] Issue tracking system
- [x] Responsive design (mobile, tablet, desktop)
- [x] AWS Amplify integration
- [x] Firebase authentication
- [x] Training data optimization (100% accuracy)
- [x] Response caching system
- [x] Language detection
- [x] Intent classification

### 🚧 In Progress
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-region deployment
- [ ] Performance optimization

### 🔮 Planned Features
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Advanced AI models
- [ ] Community forums
- [ ] Video support

---

## 🚀 Deployment

### AWS Amplify Deployment

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize project
amplify init

# Deploy backend
amplify push

# Deploy frontend
cd frontend
npm run build
amplify publish
```

### Manual Deployment

#### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

#### Backend (AWS Lambda)
```bash
cd amplify/functions/voice
# Deploy via Amplify or SAM
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure responsive design

---

## 📝 Scripts Reference

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### AI Backend Scripts
```bash
npm run production   # Start production server
npm run bedrock      # Start with Bedrock integration
npm run local        # Start local development server
npm run test-all     # Run all tests
npm run train-100    # Train with 100% accuracy
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Voice assistant not responding
- ✅ Check AWS credentials in `.env`
- ✅ Verify Bedrock access in AWS console
- ✅ Check browser microphone permissions

**Issue**: Authentication failing
- ✅ Verify Firebase configuration
- ✅ Check `serviceAccountKey.json`
- ✅ Ensure Firebase project is active

**Issue**: Charts not displaying
- ✅ Check console for errors
- ✅ Verify Recharts installation
- ✅ Clear browser cache

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by the VAANI Team

---

## 🙏 Acknowledgments

- AWS for cloud infrastructure
- Firebase for authentication
- React community for amazing tools
- Open source contributors

---

## 📞 Support

For support, email vaani.voice.assist@gmail.com or join our Slack channel.

---

<div align="center">

**[⬆ Back to Top](#-vaani---voice-first-civic-engagement-platform)**

Made with 💜 by VAANI Team

</div>
