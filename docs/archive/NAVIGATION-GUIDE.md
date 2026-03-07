# VAANI Navigation Guide

Quick reference for finding files and running commands.

## 🎯 I Want To...

### Start the Application
```powershell
# Start everything
.\scripts\maintenance\START-ALL-SERVICES.ps1

# Or start individually
cd frontend && npm run dev          # Frontend (port 5173)
cd Backend && python main.py        # Backend (port 8000)
cd ai-backend && node server-enhanced.js  # AI (port 3001)
```

### Configure Firebase
1. Open: `frontend/src/config/firebase.js`
2. Update your Firebase credentials
3. Enable Firestore in Firebase Console
4. Set security rules (see QUICK-START.md)

### Fix Authentication Issues
1. Check: `frontend/src/services/authService.js`
2. Verify: `frontend/src/context/AuthContext.jsx`
3. Test: `frontend/src/pages/LoginPage.jsx`

### Deploy to AWS
```powershell
.\scripts\deployment\deploy.ps1
```

### Run Tests
```powershell
.\scripts\testing\TEST-VAANI.ps1
```

### Check Logs
```powershell
.\scripts\maintenance\CHECK-LOGS.ps1
```

### Setup AWS Credentials
```powershell
.\scripts\setup\configure-aws.ps1
```

## 📍 Common File Locations

### Authentication
- Login Page: `frontend/src/pages/LoginPage.jsx`
- Signup Page: `frontend/src/pages/SignupPage.jsx`
- Auth Service: `frontend/src/services/authService.js`
- Auth Context: `frontend/src/context/AuthContext.jsx`
- Backend Auth: `Backend/app/routes/auth.py`

### Dashboards
- User Dashboard: `frontend/src/pages/UserDashboard.jsx`
- Admin Dashboard: `frontend/admin-dashboard/src/pages/Dashboard.js`

### Configuration
- Firebase Config: `frontend/src/config/firebase.js`
- Backend Config: `Backend/app/config.py`
- AI Config: `ai-backend/.env`

### API Routes
- Auth Routes: `Backend/app/routes/auth.py`
- Admin Routes: `Backend/app/routes/admin.py`
- User Routes: `Backend/app/routes/user.py`

### Voice Features
- Voice Component: `frontend/src/components/AIVoiceInteraction.jsx`
- Lambda Handler: `amplify/functions/voice/handler.py`
- Voice Setup: `scripts/setup/setup-nova-sonic.ps1`

## 🔍 Finding Things

### By Feature

**Authentication**
```
frontend/src/
├── pages/LoginPage.jsx
├── pages/SignupPage.jsx
├── services/authService.js
└── context/AuthContext.jsx

Backend/app/routes/auth.py
```

**Voice Assistant**
```
frontend/src/components/AIVoiceInteraction.jsx
ai-backend/server-enhanced.js
amplify/functions/voice/handler.py
```

**Admin Features**
```
frontend/admin-dashboard/
Backend/app/routes/admin.py
```

**AI/ML**
```
ai-backend/
├── server-enhanced.js
├── server-conversational.js
└── training-data.js
```

### By Technology

**React/Frontend**
- `frontend/src/`
- `frontend/admin-dashboard/src/`
- `frontend/user-dashboard/src/`

**Python/Backend**
- `Backend/`
- `amplify/functions/voice/`

**Node.js/AI**
- `ai-backend/`

**AWS/Cloud**
- `amplify/`
- `scripts/deployment/`

## 🚀 Quick Commands

### Development
```powershell
# Start all services
.\scripts\maintenance\START-ALL-SERVICES.ps1

# Start frontend only
cd frontend
npm run dev

# Start backend only
cd Backend
python main.py

# Start AI backend only
cd ai-backend
node server-enhanced.js
```

### Testing
```powershell
# All tests
.\scripts\testing\TEST-VAANI.ps1

# AI tests
.\scripts\testing\TEST-ENHANCED-AI.ps1

# Voice tests
.\scripts\testing\test-voice-setup.ps1
```

### Maintenance
```powershell
# Check status
.\scripts\maintenance\CHECK-ALL-SERVICES.ps1

# View logs
.\scripts\maintenance\CHECK-LOGS.ps1

# Restart
.\scripts\maintenance\RESTART-VAANI.ps1

# Fix issues
.\scripts\maintenance\COMPLETE-FIX.ps1
```

### Deployment
```powershell
# Standard deploy
.\scripts\deployment\deploy.ps1

# With Nova Sonic
.\scripts\deployment\deploy-nova-sonic.ps1

# Quick deploy
.\scripts\deployment\DEPLOY-NOW.ps1
```

## 📚 Documentation Map

| Topic | File |
|-------|------|
| Getting Started | `QUICK-START.md` |
| Project Overview | `README.md` |
| File Structure | `PROJECT-STRUCTURE.md` |
| Architecture | `docs/ARCHITECTURE.md` |
| Deployment | `docs/DEPLOYMENT-GUIDE.md` |
| Testing | `docs/TESTING-GUIDE.md` |
| Troubleshooting | `docs/TROUBLESHOOTING.md` |
| Complete Setup | `docs/COMPLETE-SETUP-GUIDE.md` |
| Scripts Guide | `scripts/README.md` |

## 🎓 Learning Path

1. **Day 1**: Read `README.md` and `QUICK-START.md`
2. **Day 2**: Follow `docs/START-HERE-FINAL.md`
3. **Day 3**: Understand `docs/ARCHITECTURE.md`
4. **Day 4**: Practice with `docs/TESTING-GUIDE.md`
5. **Day 5**: Deploy using `docs/DEPLOYMENT-GUIDE.md`

## 🆘 Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Can't start services | `scripts/maintenance/COMPLETE-FIX.ps1` |
| Firebase offline error | Check `QUICK-START.md` → Firebase section |
| Import errors | Run `npm install` in respective directory |
| AWS issues | `scripts/setup/configure-aws.ps1` |
| Voice not working | `scripts/testing/test-voice-setup.ps1` |

## 💡 Pro Tips

1. **Always run scripts from VAANI root directory**
2. **Check logs first**: `.\scripts\maintenance\CHECK-LOGS.ps1`
3. **Keep .env files updated** but never commit them
4. **Use QUICK-START.md** for common issues
5. **Read script output** - it contains helpful info

## 🔗 External Resources

- Firebase Console: https://console.firebase.google.com
- AWS Console: https://console.aws.amazon.com
- Amplify Docs: https://docs.amplify.aws
- React Docs: https://react.dev
