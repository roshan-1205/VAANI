# 🚀 AWS Amplify Deployment - roshan-1205/VAANI

## Repository Information
- **GitHub URL:** https://github.com/roshan-1205/VAANI
- **Current Repo:** roshan-1205/VAANImai (as per package.json)
- **Branch:** main

---

## ⚡ Quick Deploy (5 Minutes)

### Step 1: AWS Console Login
```
1. Open: https://console.aws.amazon.com/
2. Login with your AWS credentials
3. Region select करें: US East (N. Virginia) recommended
```

### Step 2: Open AWS Amplify
```
1. Search bar में "Amplify" type करें
2. "AWS Amplify" service select करें
3. "Create new app" button click करें
```

### Step 3: Connect GitHub
```
1. "Host web app" select करें
2. "GitHub" option choose करें
3. "Connect to GitHub" button click करें
4. GitHub authorization allow करें
5. Repository select करें: roshan-1205/VAANI (या VAANImai)
6. Branch: main
7. "Next" click करें
```

### Step 4: Build Configuration
```
Amplify automatically detect करेगा amplify.yml file

Verify करें:
✅ Build command: npm run build
✅ Base directory: frontend
✅ Output directory: frontend/dist
```

### Step 5: Environment Variables (IMPORTANT!)
```
Advanced settings में ये variables add करें:

VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Step 6: Deploy!
```
1. "Save and deploy" click करें
2. Wait 5-10 minutes
3. Live URL मिलेगा: https://main.xxxxxx.amplifyapp.com
```

---

## 📝 Detailed Steps in Hindi

### पहला कदम: Files को GitHub पर Push करें

```bash
# Project directory में जाएं
cd VAANI

# Check current status
git status

# सारी नई files add करें
git add amplify.yml
git add DEPLOYMENT-GUIDE.md
git add AMPLIFY-DEPLOYMENT-HINDI.md
git add QUICK-DEPLOY.md
git add COMMIT-AND-DEPLOY.md
git add AWS-AMPLIFY-DEPLOY-STEPS.md
git add .env.production.example

# या सब एक साथ
git add .

# Commit करें
git commit -m "Add AWS Amplify deployment configuration

- Add amplify.yml for automatic builds
- Add comprehensive deployment guides
- Add environment variable templates
- Ready for production deployment"

# GitHub पर push करें
git push origin main
```

### दूसरा कदम: AWS Amplify Console Setup

#### 1. AWS Console में Login
- URL: https://console.aws.amazon.com/
- अपने AWS credentials से login करें
- Region: **US East (N. Virginia)** recommended

#### 2. AWS Amplify Service खोलें
- Top search bar में **"Amplify"** type करें
- **AWS Amplify** service पर click करें
- Dashboard खुल जाएगा

#### 3. New App Create करें
- **"Create new app"** button पर click करें
- दो options दिखेंगे:
  - ✅ **Host web app** ← ये select करें
  - ❌ Build an app
- **"Host web app"** पर click करें

#### 4. GitHub Connection
- **Git provider** में **"GitHub"** select करें
- **"Connect to GitHub"** button click करें
- नई window खुलेगी GitHub authorization के लिए
- अपने GitHub account से login करें
- **"Authorize AWS Amplify"** पर click करें
- Permissions allow करें

#### 5. Repository Selection
- **Recently updated repositories** में दिखेगा
- **roshan-1205/VAANI** (या VAANImai) select करें
- अगर नहीं दिख रहा:
  - **"View GitHub permissions"** click करें
  - Repository access grant करें
  - Refresh करें
- **Branch:** `main` select करें
- **"Next"** button click करें

#### 6. App Settings Configure करें

**App name:**
```
vaani-production (या कोई भी नाम)
```

**Build settings:**
```yaml
Amplify automatically detect करेगा amplify.yml

Verify करें:
- Build command: npm run build
- Base directory: frontend
- Output directory: frontend/dist
```

**Advanced settings expand करें:**

#### 7. Environment Variables Add करें (बहुत Important!)

**ये variables add करें:**

| Variable | Value | कहां से लें |
|----------|-------|------------|
| `VITE_API_URL` | `http://localhost:5000` | Backend URL (बाद में update करें) |
| `VITE_FIREBASE_API_KEY` | `AIza...` | Firebase Console |
| `VITE_FIREBASE_AUTH_DOMAIN` | `project.firebaseapp.com` | Firebase Console |
| `VITE_FIREBASE_PROJECT_ID` | `your-project-id` | Firebase Console |
| `VITE_FIREBASE_STORAGE_BUCKET` | `project.appspot.com` | Firebase Console |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789` | Firebase Console |
| `VITE_FIREBASE_APP_ID` | `1:123:web:abc` | Firebase Console |

**Firebase values कैसे लें:**
1. https://console.firebase.google.com/ खोलें
2. अपना project select करें
3. Settings (⚙️) icon → **Project settings**
4. नीचे scroll करें **"Your apps"** section में
5. **"Firebase SDK snippet"** में **"Config"** select करें
6. सारी values copy करें

#### 8. Review और Deploy

- सारी settings एक बार check करें
- **"Save and deploy"** button पर click करें
- Deployment शुरू हो जाएगी! 🎉

#### 9. Deployment Process Monitor करें

**4 Stages होंगे:**

1. **Provision** (1-2 min)
   - AWS resources setup
   - Build environment preparation

2. **Build** (3-5 min)
   - `npm ci` running
   - `npm run build` executing
   - Real-time logs देख सकते हैं

3. **Deploy** (1-2 min)
   - Files uploading to CDN
   - Distribution setup

4. **Verify** (30 sec)
   - Health checks
   - Final verification

**Total time:** 5-10 minutes

#### 10. Success! Live URL मिलेगा 🎊

```
https://main.d1234abcd5678.amplifyapp.com
```

- इस URL पर click करें
- आपका VAANI app live है!
- URL copy करके share करें

---

## 🔄 Automatic Deployments

**अब से automatic deployment:**

```bash
# कोई भी change करें
git add .
git commit -m "Updated feature"
git push origin main

# Amplify automatically:
# ✅ Detects push
# ✅ Triggers build
# ✅ Deploys updates
# ✅ Sends notification
```

**Manual deployment trigger:**
```
Amplify Console → Your App → Redeploy this version
```

---

## 🛠️ Troubleshooting

### Build Failed - npm ci error

**Problem:** Dependencies install नहीं हो रहे

**Solution:**
```bash
# Local test करें
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build

# अगर successful हो तो:
git add package-lock.json
git commit -m "Update package-lock.json"
git push origin main
```

### Environment Variables Not Working

**Problem:** `VITE_API_URL is not defined`

**Solution:**
```
1. Amplify Console → App settings → Environment variables
2. सारे variables check करें
3. Missing variables add करें
4. "Redeploy this version" click करें
```

### 404 Error on Routes

**Problem:** Direct URL पर 404 error

**Solution:**
```
1. Amplify Console → App settings → Rewrites and redirects
2. "Add rule" click करें
3. Add:
   Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
   Target: /index.html
   Type: 200 (Rewrite)
4. Save
```

### CORS Error

**Problem:** API calls failing with CORS error

**Solution:**
```javascript
// Backend में CORS enable करें
// Node.js Express:
const cors = require('cors');
app.use(cors({
  origin: 'https://your-amplify-url.amplifyapp.com',
  credentials: true
}));
```

---

## 📱 Custom Domain (Optional)

### Step 1: Domain Add करें
```
1. Amplify Console → App settings → Domain management
2. "Add domain" click करें
3. Domain name enter करें (e.g., vaani.com)
4. "Configure domain" click करें
```

### Step 2: DNS Configure करें
```
1. Amplify DNS records provide करेगा
2. अपने domain provider में login करें
3. DNS settings में जाएं
4. Amplify के records add करें:
   - Type: CNAME
   - Name: www (या @)
   - Value: Amplify URL
5. Save करें
```

### Step 3: SSL Certificate
```
- Amplify automatically provision करेगा
- Free SSL certificate
- 24-48 hours में active हो जाएगा
```

---

## 💰 Cost Estimation

**AWS Amplify Free Tier:**
- ✅ 1000 build minutes/month
- ✅ 15 GB data transfer/month
- ✅ 5 GB storage

**VAANI के लिए:**
- Small traffic: **Free** (Free tier में)
- Medium traffic: **₹300-1000/month**
- High traffic: **₹1000-3000/month**

---

## ✅ Post-Deployment Checklist

- [ ] Build successful
- [ ] App accessible via URL
- [ ] Homepage loading
- [ ] Navigation working
- [ ] Voice assistant functional
- [ ] Authentication working
- [ ] Dashboard accessible
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Environment variables set

---

## 🎯 Next Steps

### 1. Backend Deployment
```bash
# AI Backend को AWS Lambda पर deploy करें
# FastAPI Backend को deploy करें
# Database setup करें
```

### 2. Update API URL
```
1. Backend deploy होने के बाद
2. Amplify Console → Environment variables
3. VITE_API_URL update करें
4. Redeploy करें
```

### 3. Testing
```
- सारे features test करें
- Mobile पर check करें
- Different browsers में test करें
- Performance check करें
```

### 4. Monitoring
```
- CloudWatch setup करें
- Error tracking enable करें
- Performance monitoring
- User analytics
```

---

## 📞 Support

**Documentation:**
- English: `DEPLOYMENT-GUIDE.md`
- Hindi: `AMPLIFY-DEPLOYMENT-HINDI.md`
- Quick: `QUICK-DEPLOY.md`

**Resources:**
- AWS Amplify: https://docs.amplify.aws/
- GitHub: https://github.com/roshan-1205/VAANI
- AWS Support: https://console.aws.amazon.com/support/

---

## 🎊 Summary

**Files Ready:**
```
✅ amplify.yml - Build config
✅ Deployment guides - Complete documentation
✅ Environment templates - Variable examples
```

**Deployment Steps:**
```
1. ✅ Push to GitHub
2. ⏭️ AWS Console setup
3. ⏭️ Connect GitHub
4. ⏭️ Configure build
5. ⏭️ Add environment variables
6. ⏭️ Deploy!
```

**Time Required:**
```
- GitHub push: 1 minute
- AWS setup: 3-5 minutes
- Deployment: 5-10 minutes
- Total: ~15 minutes
```

---

**Happy Deploying! 🚀**

**Repository:** https://github.com/roshan-1205/VAANI

