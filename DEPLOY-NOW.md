# ⚡ Deploy NOW - 3 Steps Only

## Step 1: Push to GitHub

```bash
cd VAANI
git add .
git commit -m "Deploy config"
git push origin main
```

✅ Done? Go to Step 2

---

## Step 2: AWS Amplify Console

### Open this URL:
```
https://console.aws.amazon.com/amplify
```

### Click buttons in order:

1. **"Create new app"**
2. **"Host web app"**
3. **"GitHub"**
4. **"Connect to GitHub"** → Authorize
5. Select: **roshan-1205/VAANI**
6. Branch: **main**
7. **"Next"**
8. **"Next"** (build settings auto-detect)
9. **"Advanced settings"** expand karo

### Add these (copy-paste):

```
Variable: VITE_FIREBASE_API_KEY
Value: AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw

Variable: VITE_FIREBASE_AUTH_DOMAIN
Value: vanni-166b8.firebaseapp.com

Variable: VITE_FIREBASE_PROJECT_ID
Value: vanni-166b8

Variable: VITE_FIREBASE_STORAGE_BUCKET
Value: vanni-166b8.firebasestorage.app

Variable: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 961709941045

Variable: VITE_FIREBASE_APP_ID
Value: 1:961709941045:web:455ea47df23189d9976c7c

Variable: VITE_API_BASE_URL
Value: http://localhost:8000/api
```

10. **"Save and deploy"**

✅ Done? Go to Step 3

---

## Step 3: Wait & Get URL

- Wait 5-10 minutes
- Build complete hoga
- URL milega: `https://main.xxxxxx.amplifyapp.com`

✅ **LIVE!** 🎉

---

## Quick Fix: 404 Error

Agar routes pe 404 aaye:

```
1. Amplify Console → Your App
2. App settings → Rewrites and redirects
3. "Add rule"
4. Copy-paste:
   Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
   Target: /index.html
   Type: 200 (Rewrite)
5. Save
```

---

**Total Time: 15 minutes**

**Cost: FREE (Free tier)**

**That's it!** 🚀
