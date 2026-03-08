# 🚀 Railway.app Complete Deployment Guide

## Why Railway?
- ✅ GitHub se automatic deploy
- ✅ Free $5 credit/month
- ✅ No credit card for trial
- ✅ Easy setup (5 minutes)
- ✅ Better than Render (no cold starts)

---

## Current Status:
✅ **Frontend:** Firebase - `https://vaani-ai-assistant-419de.web.app`
⏭️ **AI Backend:** Railway pe deploy karenge
⏭️ **FastAPI Backend:** Railway pe deploy karenge

---

# Step 1: Railway Account Create karein

1. Open: **https://railway.app/**
2. Click **"Login"** ya **"Start a New Project"**
3. **"Login with GitHub"** select karein
4. Authorize Railway
5. Email verify karein (check inbox)

---

# Step 2: AI Backend Deploy karein (Node.js)

## 2.1 New Project Create karein

1. Dashboard → **"New Project"**
2. **"Deploy from GitHub repo"**
3. Select repository: **roshan-1205/VAANI**
4. Railway automatically detect karega

## 2.2 Configure Service

Railway automatically detect kar lega, but verify karein:

**Service Name:** `vaani-ai-backend`

**Root Directory:** `ai-backend`

**Start Command:** `node server-production.js`

**Build Command:** `npm install`

## 2.3 Environment Variables

Service settings → **Variables** tab:

```
NODE_ENV=production
PORT=5000
AWS_REGION=us-east-1
```

**⚠️ AWS Credentials (provide karein):**
```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## 2.4 Deploy

Click **"Deploy"**

Wait 2-3 minutes.

**URL milega:** `https://vaani-ai-backend-production.up.railway.app`

---

# Step 3: FastAPI Backend Deploy karein

## 3.1 Add New Service

Same project mein:

1. Click **"+ New"**
2. **"GitHub Repo"**
3. Same repository: **roshan-1205/VAANI**
4. **"Add Service"**

## 3.2 Configure Service

**Service Name:** `vaani-fastapi-backend`

**Root Directory:** `Backend`

**Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Build Command:** `pip install -r requirements.txt`

## 3.3 Environment Variables

```
PORT=8000
```

**⚠️ Firebase Service Account:**

Option 1: Environment Variable
```
FIREBASE_CREDENTIALS_JSON={"type":"service_account",...}
```

Option 2: Skip for now (authentication temporarily disabled)

## 3.4 Deploy

Click **"Deploy"**

Wait 2-3 minutes.

**URL milega:** `https://vaani-fastapi-backend-production.up.railway.app`

---

# Step 4: Update Frontend

Firebase frontend ko update karein to use Railway backend URLs:

## 4.1 Update Environment Variables

Frontend mein API URLs update karein:

```
VITE_API_BASE_URL=https://vaani-fastapi-backend-production.up.railway.app/api
VITE_AI_API_URL=https://vaani-ai-backend-production.up.railway.app
```

## 4.2 Rebuild Frontend

```bash
cd frontend
npm run build
firebase deploy --only hosting
```

---

# Step 5: Test Everything

## Test AI Backend
```bash
curl https://vaani-ai-backend-production.up.railway.app/health
```

## Test FastAPI Backend
```bash
curl https://vaani-fastapi-backend-production.up.railway.app/api/health
```

## Test Frontend
Open: `https://vaani-ai-assistant-419de.web.app`

---

# URLs Summary

**Frontend:** https://vaani-ai-assistant-419de.web.app

**AI Backend:** https://vaani-ai-backend-production.up.railway.app

**FastAPI Backend:** https://vaani-fastapi-backend-production.up.railway.app

---

# Cost

**Railway Free Tier:**
- $5 credit/month
- 500 hours execution time
- Enough for 2 services running 24/7

**After free tier:**
- ~$5-10/month per service

---

# Monitoring

**Railway Dashboard:**
- Real-time logs
- Metrics
- Deployments history
- Environment variables

---

**Ready to deploy? Follow the steps above!** 🚀

