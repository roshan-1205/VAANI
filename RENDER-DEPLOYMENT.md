# 🚀 Render.com Deployment Guide

## Why Render?
- ✅ Completely FREE
- ✅ No credit card required
- ✅ Automatic deployments from GitHub
- ✅ Easy setup (10 minutes)
- ✅ HTTPS included

---

## Step 1: Push to GitHub (Already Done ✅)

---

## Step 2: Create Render Account

1. Open: https://render.com/
2. Click **"Get Started"**
3. Sign up with **GitHub**
4. Authorize Render

---

## Step 3: Deploy AI Backend (Node.js)

### 1. Create New Web Service

1. Dashboard → Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: **roshan-1205/VAANI**
3. Click **"Connect"**

### 2. Configure Service

**Name:** `vaani-ai-backend`

**Region:** Oregon (US West)

**Branch:** `main`

**Root Directory:** `ai-backend`

**Runtime:** Node

**Build Command:**
```
npm install
```

**Start Command:**
```
node server-production.js
```

**Plan:** Free

### 3. Environment Variables

Click **"Advanced"** → Add Environment Variables:

```
NODE_ENV=production
PORT=10000
AWS_REGION=us-east-1
```

**⚠️ STOP HERE - I need AWS credentials:**
```
AWS_ACCESS_KEY_ID=_______________
AWS_SECRET_ACCESS_KEY=_______________
```

### 4. Create Web Service

Click **"Create Web Service"**

Wait 5-10 minutes for deployment.

**Note the URL:** `https://vaani-ai-backend.onrender.com`

---

## Step 4: Deploy FastAPI Backend

### 1. Create Another Web Service

1. Dashboard → Click **"New +"** → **"Web Service"**
2. Select same repository: **roshan-1205/VAANI**

### 2. Configure Service

**Name:** `vaani-fastapi-backend`

**Region:** Oregon (US West)

**Branch:** `main`

**Root Directory:** `Backend`

**Runtime:** Python 3

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Plan:** Free

### 3. Environment Variables

```
PORT=10000
```

**⚠️ STOP HERE - I need Firebase Service Account JSON**

You'll need to add `serviceAccountKey.json` content as environment variable.

### 4. Create Web Service

Click **"Create Web Service"**

Wait 5-10 minutes for deployment.

**Note the URL:** `https://vaani-fastapi-backend.onrender.com`

---

## Step 5: Update Frontend

After both backends are deployed, update frontend to use new URLs:

1. Firebase Console → Hosting → Environment variables
2. Or rebuild with new API URLs

---

## URLs Summary

**Frontend:** https://vaani-ai-assistant-419de.web.app

**AI Backend:** https://vaani-ai-backend.onrender.com

**FastAPI Backend:** https://vaani-fastapi-backend.onrender.com

---

## Important Notes

**Free Tier Limitations:**
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- 750 hours/month free (enough for 1 service 24/7)

**To keep services awake:**
- Use a cron job to ping every 10 minutes
- Or upgrade to paid plan ($7/month per service)

---

## Testing

```bash
# Test AI Backend
curl https://vaani-ai-backend.onrender.com/health

# Test FastAPI Backend
curl https://vaani-fastapi-backend.onrender.com/api/health
```

---

**Ready to deploy? Follow the steps above!** 🚀

