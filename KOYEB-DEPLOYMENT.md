# 🚀 Koyeb Deployment Guide - FastAPI Backend

## Why Koyeb?
- ✅ Completely FREE
- ✅ No credit card required
- ✅ Better performance than Render
- ✅ No cold starts
- ✅ Automatic HTTPS
- ✅ Global CDN

---

## Step 1: Create Koyeb Account

1. Open: https://www.koyeb.com/
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Koyeb

---

## Step 2: Deploy FastAPI Backend

### 1. Create New App

1. Dashboard → Click **"Create App"**
2. Choose **"GitHub"**
3. Select repository: **roshan-1205/VAANI**
4. Click **"Next"**

### 2. Configure Deployment

**Builder:** Docker

**Dockerfile Path:** `Backend/Dockerfile`

**Branch:** `main`

**App Name:** `vaani-fastapi-backend`

**Region:** Washington, D.C. (us-east)

**Instance Type:** Free (Nano)

**Port:** `8000`

### 3. Environment Variables

Click **"Add Environment Variable"**:

```
PORT=8000
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
```

**⚠️ Firebase Service Account:**

Koyeb mein file upload nahi kar sakte, toh hum environment variable se handle karenge.

**Add this variable:**
```
FIREBASE_CREDENTIALS_JSON=[Your Firebase Service Account JSON here]
```

### 4. Health Check

**Path:** `/api/health`

**Port:** `8000`

### 5. Deploy

Click **"Deploy"**

Wait 3-5 minutes.

**URL:** `https://vaani-fastapi-backend-[your-org].koyeb.app`

---

## Step 3: Update Code for Environment Variable

Backend code ko update karna hoga to read Firebase credentials from environment variable instead of file.

---

## URLs Summary

**Frontend:** https://vaani-ai-assistant-419de.web.app

**AI Backend (Render):** https://vaani-mi1p.onrender.com

**FastAPI Backend (Koyeb):** https://vaani-fastapi-backend-xxx.koyeb.app

---

**Ready to deploy!** 🚀

