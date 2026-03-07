# VAANI Project Structure

## 📂 Complete Directory Layout

```
VAANI/
│
├── 📄 README.md                    # Main project documentation
├── 📄 QUICK-START.md              # Quick start guide
├── 📄 PROJECT-STRUCTURE.md        # This file
├── 📄 package.json                # Root dependencies
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 frontend/                   # React Frontend Application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── context/             # React context
│   │   ├── config/              # Configuration files
│   │   └── App.jsx              # Main app component
│   ├── public/                  # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── 📁 frontend/admin-dashboard/   # Admin Dashboard (Separate App)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
├── 📁 frontend/user-dashboard/    # User Dashboard (Separate App)
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
│
├── 📁 Backend/                    # FastAPI Backend Server
│   ├── app/
│   │   ├── routes/              # API routes
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   ├── admin.py         # Admin endpoints
│   │   │   └── user.py          # User endpoints
│   │   ├── models.py            # Data models
│   │   ├── config.py            # Configuration
│   │   ├── dependencies.py      # Dependencies
│   │   └── firebase_admin.py    # Firebase admin SDK
│   ├── main.py                  # FastAPI app entry
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables
│
├── 📁 ai-backend/                 # AI/ML Services
│   ├── server-enhanced.js       # Enhanced AI server
│   ├── server-conversational.js # Conversational AI
│   ├── training-data.js         # Training data
│   ├── package.json
│   └── .env
│
├── 📁 amplify/                    # AWS Amplify Configuration
│   ├── auth/                    # Auth resources
│   ├── data/                    # Data resources
│   ├── functions/               # Lambda functions
│   │   └── voice/              # Voice processing Lambda
│   │       ├── handler.py      # Main handler
│   │       ├── simple_handler.py
│   │       └── requirements.txt
│   ├── backend.ts               # Backend configuration
│   └── package.json
│
├── 📁 scripts/                    # Utility Scripts
│   ├── 📁 deployment/            # Deployment Scripts
│   │   ├── deploy.ps1           # Main deployment
│   │   ├── deploy.sh            # Linux deployment
│   │   ├── deploy-nova-sonic.ps1
│   │   ├── deploy-openai.ps1
│   │   └── DEPLOY-NOW.ps1
│   │
│   ├── 📁 setup/                 # Setup & Configuration
│   │   ├── configure-aws.ps1
│   │   ├── setup-nova-sonic.ps1
│   │   ├── set-real-credentials.ps1
│   │   ├── update-credentials.ps1
│   │   ├── bootstrap-cdk.ps1
│   │   ├── fix-vite-error.ps1
│   │   └── fix-voice-deploy.ps1
│   │
│   ├── 📁 testing/               # Testing Scripts
│   │   ├── TEST-VAANI.ps1
│   │   ├── TEST-ENHANCED-AI.ps1
│   │   ├── RUN-AI-TESTS.ps1
│   │   ├── test-voice-setup.ps1
│   │   ├── test-lambda-api.ps1
│   │   ├── test-openai-local.py
│   │   ├── test-conversation.js
│   │   └── test-hindi-ai.js
│   │
│   ├── 📁 maintenance/           # Daily Operations
│   │   ├── START-ALL-SERVICES.ps1
│   │   ├── START-ALL-VAANI.ps1
│   │   ├── START-SMOOTH-VAANI.ps1
│   │   ├── START-ALL-DASHBOARDS.ps1
│   │   ├── START-FRONTEND.ps1
│   │   ├── START-VOICE-ASSISTANT.ps1
│   │   ├── START-ENHANCED-AI.ps1
│   │   ├── RESTART-VAANI.ps1
│   │   ├── CHECK-ALL-SERVICES.ps1
│   │   ├── CHECK-LOGS.ps1
│   │   └── COMPLETE-FIX.ps1
│   │
│   └── README.md                # Scripts documentation
│
└── 📁 docs/                      # Documentation
    ├── ARCHITECTURE.md          # System architecture
    ├── DEPLOYMENT-GUIDE.md      # Deployment guide
    ├── TESTING-GUIDE.md         # Testing procedures
    ├── START-HERE-FINAL.md      # Getting started
    ├── TROUBLESHOOTING.md       # Common issues
    ├── COMPLETE-SETUP-GUIDE.md  # Complete setup
    ├── CREATE-TEST-USERS.md     # Test user creation
    └── README-AMPLIFY-GEN2.md   # Amplify Gen2 info
```

## 🎯 Key Components

### Frontend Applications
- **Main Frontend** (`frontend/`) - Primary user interface
- **Admin Dashboard** (`frontend/admin-dashboard/`) - Admin panel
- **User Dashboard** (`frontend/user-dashboard/`) - User-specific dashboard

### Backend Services
- **FastAPI Backend** (`Backend/`) - REST API server
- **AI Backend** (`ai-backend/`) - AI/ML processing
- **AWS Lambda** (`amplify/functions/`) - Serverless functions

### Infrastructure
- **AWS Amplify** - Cloud infrastructure
- **Firebase** - Authentication & Firestore
- **AWS Bedrock** - AI models (Nova Sonic, Nova Lite)

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `frontend/src/config/firebase.js` | Firebase configuration |
| `Backend/.env` | Backend environment variables |
| `Backend/app/config.py` | Backend configuration |
| `ai-backend/.env` | AI service configuration |
| `amplify/backend.ts` | AWS Amplify backend config |

## 🚀 Entry Points

| Service | Entry Point | Port |
|---------|------------|------|
| Frontend | `frontend/src/main.jsx` | 5173 |
| Admin Dashboard | `frontend/admin-dashboard/src/index.js` | 3000 |
| User Dashboard | `frontend/user-dashboard/src/index.js` | 3002 |
| Backend API | `Backend/main.py` | 8000 |
| AI Backend | `ai-backend/server-enhanced.js` | 3001 |

## 📦 Dependencies

### Frontend
- React 18
- React Router
- Vite
- Firebase SDK
- Tailwind CSS

### Backend
- FastAPI
- Firebase Admin SDK
- Python 3.9+
- Uvicorn

### AI Backend
- Node.js 18+
- Express
- AWS SDK
- OpenAI SDK (optional)

## 🔐 Security Files (Not in Git)

These files should NEVER be committed:
- `Backend/.env`
- `ai-backend/.env`
- `Backend/serviceAccountKey.json`
- Any `*credentials*.json` files
- `.env.local` files

## 📝 Important Notes

1. **Scripts are organized by purpose** - Check `scripts/README.md` for details
2. **Documentation is centralized** - All docs in `docs/` folder
3. **Each service has its own dependencies** - Run `npm install` in each directory
4. **Environment variables are required** - Copy `.env.example` to `.env` and configure

## 🎓 Getting Started

1. Read `README.md` for overview
2. Follow `QUICK-START.md` for setup
3. Check `docs/START-HERE-FINAL.md` for detailed guide
4. Use `scripts/maintenance/START-ALL-SERVICES.ps1` to run

## 🆘 Need Help?

- **Quick issues**: `QUICK-START.md`
- **Setup problems**: `docs/COMPLETE-SETUP-GUIDE.md`
- **Errors**: `docs/TROUBLESHOOTING.md`
- **Architecture questions**: `docs/ARCHITECTURE.md`
