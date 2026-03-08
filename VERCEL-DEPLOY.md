# 🚀 Vercel Deployment (Alternative to AWS Amplify)

## Why Vercel?
- ✅ Completely FREE
- ✅ No credit card required
- ✅ Automatic deployments
- ✅ Fast CDN
- ✅ Easy setup (2 minutes)

---

## Step 1: Push to GitHub (Already Done ✅)

---

## Step 2: Deploy on Vercel

### 1. Open Vercel
```
https://vercel.com/
```

### 2. Sign Up / Login
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel

### 3. Import Project
- Click "Add New..." → "Project"
- Select "Import Git Repository"
- Find: **roshan-1205/VAANI**
- Click "Import"

### 4. Configure Project

**Framework Preset:** Vite

**Root Directory:** `frontend`

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

### 5. Environment Variables

Click "Environment Variables" and add:

```
VITE_FIREBASE_API_KEY=AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw
VITE_FIREBASE_AUTH_DOMAIN=vanni-166b8.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vanni-166b8
VITE_FIREBASE_STORAGE_BUCKET=vanni-166b8.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=961709941045
VITE_FIREBASE_APP_ID=1:961709941045:web:455ea47df23189d9976c7c
VITE_API_BASE_URL=http://localhost:8000/api
```

### 6. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Get URL: `https://vaani-xxxxx.vercel.app`

---

## ✅ Done!

**Vercel URL:** `https://vaani-xxxxx.vercel.app`

**Automatic Deployments:** Every push to main branch

**Cost:** FREE forever!

---

## Update Backend URL Later

After EC2 deployment:
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Update `VITE_API_BASE_URL` to `http://YOUR_EC2_IP/api`
4. Redeploy

---

**Vercel is easier and FREE!** 🎉
