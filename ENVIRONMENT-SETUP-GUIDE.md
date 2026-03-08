# 🔑 Environment Variables Setup Guide - VAANI

## 📋 Complete Step-by-Step Guide

---

## Part 1: Local Development Setup

### Step 1: Create .env File in Frontend

```bash
cd VAANI/frontend
```

**Create file:** `.env`

```env
# Firebase Configuration (Already in your project)
VITE_FIREBASE_API_KEY=AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw
VITE_FIREBASE_AUTH_DOMAIN=vanni-166b8.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vanni-166b8
VITE_FIREBASE_STORAGE_BUCKET=vanni-166b8.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=961709941045
VITE_FIREBASE_APP_ID=1:961709941045:web:455ea47df23189d9976c7c
VITE_FIREBASE_MEASUREMENT_ID=G-595S3494MT

# Backend API URL (Update after backend deployment)
VITE_API_BASE_URL=http://localhost:8000/api
```

### Step 2: Update Firebase Config to Use Environment Variables

**File:** `frontend/src/config/firebase.js`

Replace hardcoded values with environment variables:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
```

### Step 3: Test Locally

```bash
cd frontend
npm run dev
```

**Verify:**
- ✅ App loads without errors
- ✅ Firebase authentication works
- ✅ No console errors

---

## Part 2: AWS Amplify Environment Variables

### Step 1: AWS Amplify Console में Login करें

```
URL: https://console.aws.amazon.com/amplify
```

### Step 2: App Create करने के दौरान

**"Configure build settings" page पर:**

1. **"Advanced settings"** section को expand करें
2. **"Add environment variable"** button पर click करें

### Step 3: Variables Add करें

**एक-एक करके ये variables add करें:**

#### Variable 1: Firebase API Key
```
Key:   VITE_FIREBASE_API_KEY
Value: AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw
```

#### Variable 2: Firebase Auth Domain
```
Key:   VITE_FIREBASE_AUTH_DOMAIN
Value: vanni-166b8.firebaseapp.com
```

#### Variable 3: Firebase Project ID
```
Key:   VITE_FIREBASE_PROJECT_ID
Value: vanni-166b8
```

#### Variable 4: Firebase Storage Bucket
```
Key:   VITE_FIREBASE_STORAGE_BUCKET
Value: vanni-166b8.firebasestorage.app
```

#### Variable 5: Firebase Messaging Sender ID
```
Key:   VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 961709941045
```

#### Variable 6: Firebase App ID
```
Key:   VITE_FIREBASE_APP_ID
Value: 1:961709941045:web:455ea47df23189d9976c7c
```

#### Variable 7: Firebase Measurement ID
```
Key:   VITE_FIREBASE_MEASUREMENT_ID
Value: G-595S3494MT
```

#### Variable 8: Backend API URL
```
Key:   VITE_API_BASE_URL
Value: http://localhost:8000/api
```

**Note:** Backend deploy होने के बाद इसे update करेंगे

---

## Part 3: Visual Guide - AWS Console में कैसे Add करें

### Screenshot Guide (Text Description)

#### Screen 1: Advanced Settings
```
┌─────────────────────────────────────────┐
│  Configure build settings               │
├─────────────────────────────────────────┤
│                                         │
│  App name: vaani-production            │
│                                         │
│  ▼ Advanced settings                   │
│                                         │
│  Environment variables                  │
│  ┌─────────────────────────────────┐  │
│  │ [+ Add environment variable]    │  │
│  └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### Screen 2: Adding Variables
```
┌─────────────────────────────────────────┐
│  Environment variables                  │
├─────────────────────────────────────────┤
│                                         │
│  Variable 1                             │
│  Key:   [VITE_FIREBASE_API_KEY      ]  │
│  Value: [AIzaSyDXqMaStxNZnnUK8atg...] │
│                                         │
│  [+ Add environment variable]           │
│                                         │
│  Variable 2                             │
│  Key:   [VITE_FIREBASE_AUTH_DOMAIN  ]  │
│  Value: [vanni-166b8.firebaseapp.com]  │
│                                         │
│  [+ Add environment variable]           │
│                                         │
└─────────────────────────────────────────┘
```

---

## Part 4: Copy-Paste Ready Format

### For AWS Amplify Console

**सारे variables एक साथ (copy करने के लिए):**

```
VITE_FIREBASE_API_KEY=AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw
VITE_FIREBASE_AUTH_DOMAIN=vanni-166b8.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vanni-166b8
VITE_FIREBASE_STORAGE_BUCKET=vanni-166b8.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=961709941045
VITE_FIREBASE_APP_ID=1:961709941045:web:455ea47df23189d9976c7c
VITE_FIREBASE_MEASUREMENT_ID=G-595S3494MT
VITE_API_BASE_URL=http://localhost:8000/api
```

**Note:** AWS Amplify में एक-एक variable separately add करना होगा

---

## Part 5: After Deployment - Update Variables

### जब Backend Deploy हो जाए

#### Step 1: Backend URL पाएं
```
Example: https://api.vaani.com
या
https://your-backend.amazonaws.com
```

#### Step 2: Amplify Console में Update करें

```
1. AWS Amplify Console खोलें
2. अपनी app select करें
3. App settings → Environment variables
4. VITE_API_BASE_URL को edit करें
5. नया URL enter करें
6. Save करें
```

#### Step 3: Redeploy करें

```
1. Same page पर
2. "Redeploy this version" button पर click करें
3. Wait 5-10 minutes
4. Updated app live हो जाएगा
```

---

## Part 6: Verification Checklist

### Local Development
- [ ] `.env` file created in `frontend/` folder
- [ ] All variables added
- [ ] `firebase.js` updated to use env variables
- [ ] App runs locally: `npm run dev`
- [ ] Firebase authentication works
- [ ] No console errors

### AWS Amplify
- [ ] All 8 environment variables added
- [ ] Values copied correctly (no extra spaces)
- [ ] Build successful
- [ ] App deployed
- [ ] Firebase works on live site
- [ ] No console errors on live site

---

## Part 7: Troubleshooting

### Issue 1: Firebase Not Working

**Error:** `Firebase: Error (auth/invalid-api-key)`

**Solution:**
```
1. Check VITE_FIREBASE_API_KEY value
2. Verify no extra spaces
3. Redeploy app
```

### Issue 2: Environment Variables Not Loading

**Error:** `import.meta.env.VITE_FIREBASE_API_KEY is undefined`

**Solution:**
```
1. Verify variable names start with VITE_
2. Check spelling (case-sensitive)
3. Restart dev server: npm run dev
4. For Amplify: Redeploy app
```

### Issue 3: API Calls Failing

**Error:** `Network Error` or `404`

**Solution:**
```
1. Check VITE_API_BASE_URL value
2. Verify backend is running
3. Check CORS settings in backend
4. Update URL after backend deployment
```

### Issue 4: Build Fails on Amplify

**Error:** `Environment variable not found`

**Solution:**
```
1. Go to Amplify Console
2. App settings → Environment variables
3. Verify all 8 variables are added
4. Check for typos in variable names
5. Redeploy
```

---

## Part 8: Security Best Practices

### ✅ Do's

1. **Use environment variables** for all sensitive data
2. **Never commit** `.env` file to Git
3. **Add `.env` to `.gitignore`**
4. **Use different values** for development and production
5. **Rotate keys** periodically

### ❌ Don'ts

1. **Don't hardcode** credentials in source code
2. **Don't commit** `.env` files
3. **Don't share** `.env` files publicly
4. **Don't use** production keys in development
5. **Don't expose** API keys in client-side code (unavoidable for Firebase)

---

## Part 9: Quick Reference Table

| Variable | Purpose | Where to Get | Required |
|----------|---------|--------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase authentication | Firebase Console | ✅ Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Firebase Console | ✅ Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console | ✅ Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage | Firebase Console | ✅ Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging | Firebase Console | ✅ Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Firebase Console | ✅ Yes |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics | Firebase Console | ⚠️ Optional |
| `VITE_API_BASE_URL` | Backend API URL | Your backend | ✅ Yes |

---

## Part 10: Commands Summary

### Local Setup
```bash
# Create .env file
cd frontend
touch .env

# Edit .env file (use your editor)
nano .env
# or
code .env

# Test locally
npm run dev
```

### Git Commands
```bash
# Make sure .env is in .gitignore
echo ".env" >> .gitignore

# Commit changes (without .env)
git add .
git commit -m "Update Firebase config to use environment variables"
git push origin main
```

---

## ✅ Final Checklist

**Before Deployment:**
- [ ] Local `.env` file created
- [ ] `firebase.js` updated to use env variables
- [ ] Tested locally
- [ ] `.env` added to `.gitignore`
- [ ] Changes committed to GitHub

**During AWS Amplify Setup:**
- [ ] All 8 environment variables added
- [ ] Values verified (no typos)
- [ ] No extra spaces in values
- [ ] Saved successfully

**After Deployment:**
- [ ] Build successful
- [ ] App accessible
- [ ] Firebase authentication works
- [ ] No console errors
- [ ] Backend URL updated (after backend deployment)

---

## 🎯 Next Steps

1. ✅ Setup environment variables (this guide)
2. ⏭️ Update `firebase.js` to use env variables
3. ⏭️ Test locally
4. ⏭️ Commit to GitHub
5. ⏭️ Deploy on AWS Amplify with env variables
6. ⏭️ Verify deployment
7. ⏭️ Update backend URL after backend deployment

---

**Environment Variables Setup Complete! 🎉**

