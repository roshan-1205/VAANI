# ⚡ Quick Deploy Reference - VAANI

## 🚀 5-Minute Deployment

### Prerequisites
```bash
✅ AWS Account
✅ GitHub Repo: https://github.com/roshan-1205/VAANI
✅ Firebase Config Ready
```

---

## 📝 Quick Steps

### 1. AWS Console
```
https://console.aws.amazon.com/
→ Search "Amplify"
→ Create new app
→ Host web app
```

### 2. Connect GitHub
```
→ Select GitHub
→ Authorize AWS Amplify
→ Select: roshan-1205/VAANImai
→ Branch: main
```

### 3. Environment Variables
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Deploy
```
→ Review settings
→ Save and deploy
→ Wait 5-10 minutes
→ Get URL: https://main.xxxxxx.amplifyapp.com
```

---

## 🔧 Files Created

```
VAANI/
├── amplify.yml                    ← Build configuration
├── DEPLOYMENT-GUIDE.md            ← Detailed English guide
├── AMPLIFY-DEPLOYMENT-HINDI.md    ← Detailed Hindi guide
└── QUICK-DEPLOY.md                ← This file
```

---

## 📋 Build Configuration (amplify.yml)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd frontend
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: frontend/dist
    files:
      - '**/*'
  cache:
    paths:
      - frontend/node_modules/**/*
```

---

## 🔄 Auto Deployment

```bash
# Push to GitHub
git add .
git commit -m "Update"
git push origin main

# Amplify automatically:
# ✅ Detects changes
# ✅ Triggers build
# ✅ Deploys updates
```

---

## 🛠️ Common Fixes

### Build Failed
```bash
# Check logs in Amplify console
# Verify package-lock.json
# Test locally: npm ci && npm run build
```

### 404 on Routes
```
Add rewrite rule:
Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
Target: /index.html
Type: 200 (Rewrite)
```

### CORS Error
```bash
# Enable CORS in backend
# Verify VITE_API_URL
# Check backend accessibility
```

---

## 💰 Cost

**Free Tier:**
- 1000 build minutes/month
- 15 GB transfer/month
- 5 GB storage

**Estimated:**
- Small: $0-5/month
- Medium: $5-20/month
- High: $20-50/month

---

## 📱 Custom Domain (Optional)

```
1. App settings → Domain management
2. Add domain → Enter domain name
3. Update DNS records at domain provider
4. Wait 24-48 hours for propagation
5. Free SSL automatically provisioned
```

---

## ✅ Checklist

- [ ] AWS Account
- [ ] GitHub access
- [ ] amplify.yml committed
- [ ] Environment variables ready
- [ ] Firebase configured
- [ ] Backend URL ready

---

## 🎯 Next Steps

1. ✅ Deploy frontend (this guide)
2. ⏭️ Deploy AI backend to Lambda
3. ⏭️ Deploy FastAPI backend
4. ⏭️ Setup monitoring
5. ⏭️ Add custom domain

---

## 📞 Resources

- **Detailed Guide:** `DEPLOYMENT-GUIDE.md`
- **Hindi Guide:** `AMPLIFY-DEPLOYMENT-HINDI.md`
- **AWS Docs:** https://docs.amplify.aws/
- **GitHub:** https://github.com/roshan-1205/VAANImai

---

**Ready to deploy? Follow the steps above! 🚀**

