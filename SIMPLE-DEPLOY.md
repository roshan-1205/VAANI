# 🚀 Simple AWS Amplify Deployment

## Step 1: GitHub pe Push karo (2 minutes)

```bash
cd VAANI
git add .
git commit -m "Add deployment config"
git push origin main
```

---

## Step 2: AWS Amplify pe Deploy karo (10 minutes)

### 1. AWS Console kholo
```
https://console.aws.amazon.com/amplify
```

### 2. New App banao
- **"Create new app"** click karo
- **"Host web app"** select karo
- **"GitHub"** select karo
- **"Connect to GitHub"** click karo
- GitHub authorize karo

### 3. Repository select karo
- Repository: **roshan-1205/VAANI**
- Branch: **main**
- **"Next"** click karo

### 4. Build settings (auto-detect hoga)
- Sab kuch as-is rahne do
- **"Next"** click karo

### 5. Environment Variables add karo

**"Advanced settings"** expand karo aur ye add karo:

```
VITE_FIREBASE_API_KEY=AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw
VITE_FIREBASE_AUTH_DOMAIN=vanni-166b8.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vanni-166b8
VITE_FIREBASE_STORAGE_BUCKET=vanni-166b8.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=961709941045
VITE_FIREBASE_APP_ID=1:961709941045:web:455ea47df23189d9976c7c
VITE_API_BASE_URL=http://localhost:8000/api
```

### 6. Deploy karo
- **"Save and deploy"** click karo
- 5-10 minutes wait karo
- **Live URL milega!** 🎉

---

## Done! ✅

URL milega: `https://main.xxxxxx.amplifyapp.com`

---

## Agar koi issue ho:

### Build fail ho jaye
```
Amplify Console → Build logs dekho
Error fix karo aur redeploy karo
```

### 404 error aaye routes pe
```
App settings → Rewrites and redirects
Add rule:
  Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
  Target: /index.html
  Type: 200
```

---

**That's it! Simple! 🚀**
