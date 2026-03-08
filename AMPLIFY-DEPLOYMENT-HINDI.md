# 🚀 AWS Amplify Deployment - आसान हिंदी गाइड

## GitHub से AWS Amplify पर VAANI Deploy करें

---

## 📋 शुरू करने से पहले

आपके पास ये चीजें होनी चाहिए:
- ✅ AWS Account (अगर नहीं है तो https://aws.amazon.com/ पर बनाएं)
- ✅ GitHub Repository: https://github.com/Aayush-2910/VAANI.git
- ✅ Firebase Project (authentication के लिए)

---

## 🎯 Step-by-Step Deployment

### Step 1: AWS Console में Login करें

1. Browser में जाएं: https://console.aws.amazon.com/
2. अपने AWS credentials से login करें
3. Region select करें (जैसे: US East - N. Virginia)

### Step 2: AWS Amplify Service खोलें

1. AWS Console के top में **search bar** में type करें: `Amplify`
2. **AWS Amplify** service पर click करें
3. **"Get Started"** या **"Create new app"** button दिखेगा

### Step 3: New App Create करें

1. **"Create new app"** button पर click करें
2. दो options दिखेंगे:
   - **Host web app** ← ये select करें
   - Build an app
3. **"Host web app"** पर click करें

### Step 4: GitHub से Connect करें

1. **Git provider** select करें:
   - GitHub ← ये select करें
   - GitLab
   - Bitbucket
   - AWS CodeCommit

2. **"Connect to GitHub"** button पर click करें

3. GitHub authorization window खुलेगी:
   - अपने GitHub account से login करें
   - AWS Amplify को access allow करें
   - **"Authorize AWS Amplify"** पर click करें

### Step 5: Repository और Branch Select करें

1. **Repository** dropdown में:
   - `Aayush-2910/VAANI` select करें
   - अगर नहीं दिख रहा तो **"View GitHub permissions"** पर click करें

2. **Branch** select करें:
   - `main` (या जो भी आपका default branch है)

3. **"Next"** button पर click करें

### Step 6: Build Settings Configure करें

Amplify automatically आपकी `amplify.yml` file detect कर लेगा।

**Build settings verify करें:**
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
```

**अगर सब सही दिख रहा है:**
- **"Next"** button पर click करें

### Step 7: Environment Variables Add करें

⚠️ **बहुत Important Step!**

1. **"Advanced settings"** section को expand करें

2. **"Add environment variable"** पर click करें

3. ये variables add करें:

| Variable Name | Value |
|--------------|-------|
| `VITE_API_URL` | आपका backend URL (जैसे: `http://localhost:5000`) |
| `VITE_FIREBASE_API_KEY` | Firebase console से copy करें |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

**Firebase values कहां से लें:**
1. Firebase Console खोलें: https://console.firebase.google.com/
2. अपना project select करें
3. Settings (⚙️) > Project settings
4. "Your apps" section में scroll करें
5. Firebase SDK snippet में सारी values मिलेंगी

### Step 8: Review और Deploy

1. **सारी settings review करें:**
   - App name
   - Repository और branch
   - Build settings
   - Environment variables

2. **"Save and deploy"** button पर click करें

3. **Deployment शुरू हो जाएगी!** 🎉

### Step 9: Deployment Process देखें

Amplify 4 stages में deploy करता है:

1. **Provision** (1-2 minutes)
   - AWS resources setup हो रहे हैं
   - Build environment तैयार हो रहा है

2. **Build** (3-5 minutes)
   - Dependencies install हो रहे हैं
   - Application build हो रहा है
   - आप real-time logs देख सकते हैं

3. **Deploy** (1-2 minutes)
   - Built files upload हो रहे हैं
   - CDN पर distribute हो रहे हैं

4. **Verify** (30 seconds)
   - Health checks run हो रहे हैं
   - Application verify हो रहा है

**Total time:** लगभग 5-10 minutes

### Step 10: Live URL मिलेगा! 🎊

Deployment complete होने पर:

1. **URL दिखेगा:** `https://main.xxxxxx.amplifyapp.com`
2. इस URL पर click करें
3. आपका VAANI app live है! 🚀

---

## 🔄 Automatic Deployments

**अब जब भी आप code update करेंगे:**

1. GitHub पर code push करें:
   ```bash
   git add .
   git commit -m "Updated feature"
   git push origin main
   ```

2. Amplify automatically:
   - नया build trigger करेगा
   - Updated app deploy करेगा
   - आपको email notification भेजेगा

**कोई manual work नहीं!** 🎉

---

## 🛠️ Common Issues और Solutions

### Issue 1: Build Failed

**Error:** `npm ci failed`

**Solution:**
1. Amplify console में जाएं
2. Failed build पर click करें
3. Logs देखें
4. `package-lock.json` file check करें
5. Local में test करें: `cd frontend && npm ci && npm run build`

### Issue 2: Environment Variables Missing

**Error:** `VITE_API_URL is not defined`

**Solution:**
1. Amplify console में जाएं
2. App settings > Environment variables
3. Missing variables add करें
4. **"Redeploy this version"** पर click करें

### Issue 3: 404 Error on Routes

**Error:** Direct URL पर 404 error

**Solution:**
1. Amplify console में जाएं
2. App settings > Rewrites and redirects
3. Add rule:
   - Source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>`
   - Target: `/index.html`
   - Type: `200 (Rewrite)`
4. Save करें

### Issue 4: API Calls Failing

**Error:** `Network Error` या `CORS Error`

**Solution:**
1. Backend में CORS enable करें
2. `VITE_API_URL` environment variable check करें
3. Backend URL accessible है verify करें

---

## 📱 Custom Domain Add करें (Optional)

अगर आप अपना domain use करना चाहते हैं:

### Step 1: Domain Add करें

1. Amplify console में जाएं
2. App settings > Domain management
3. **"Add domain"** पर click करें
4. अपना domain name enter करें (जैसे: `vaani.com`)
5. **"Configure domain"** पर click करें

### Step 2: DNS Records Update करें

1. Amplify आपको DNS records देगा
2. अपने domain provider (GoDaddy, Namecheap, etc.) में login करें
3. DNS settings में जाएं
4. Amplify के दिए गए records add करें:
   - Type: `CNAME`
   - Name: `www` या `@`
   - Value: Amplify का URL

### Step 3: Verification Wait करें

- DNS propagation में 24-48 hours लग सकते हैं
- Amplify automatically SSL certificate provision करेगा
- Free HTTPS मिलेगा! 🔒

---

## 💰 Cost कितना आएगा?

**AWS Amplify Free Tier:**
- 1000 build minutes per month (FREE)
- 15 GB data transfer per month (FREE)
- 5 GB storage (FREE)

**VAANI के लिए estimated cost:**
- Small traffic (100-500 users/day): **₹0-400/month**
- Medium traffic (500-2000 users/day): **₹400-1500/month**
- High traffic (2000+ users/day): **₹1500-4000/month**

**Free tier में mostly FREE रहेगा!** 🎉

---

## 🔐 Security Tips

1. **Environment variables में sensitive data रखें**
   - API keys
   - Database credentials
   - Firebase config

2. **HTTPS automatically enabled है**
   - Free SSL certificate
   - Secure connections

3. **IAM roles properly configure करें**
   - Minimum permissions
   - Regular audits

---

## 📊 Monitoring और Analytics

### Amplify Console में:

1. **Build history:**
   - सारे builds की list
   - Success/failure status
   - Build logs

2. **Access logs:**
   - Traffic monitoring
   - User analytics
   - Error tracking

3. **Performance metrics:**
   - Page load times
   - API response times
   - Error rates

### CloudWatch Integration:

- Automatic logging
- Custom metrics
- Alarms set कर सकते हैं

---

## ✅ Deployment Checklist

Deploy करने से पहले check करें:

- [ ] AWS Account ready है
- [ ] GitHub repository accessible है
- [ ] `amplify.yml` file committed है
- [ ] Firebase project configured है
- [ ] Environment variables की list ready है
- [ ] Backend API deployed है (या local URL ready है)
- [ ] `.env.example` file check की है

---

## 🎯 Next Steps

Deployment के बाद:

1. **Testing:**
   - सारे features test करें
   - Mobile पर check करें
   - Different browsers में test करें

2. **Backend Deploy करें:**
   - AI backend को AWS Lambda पर deploy करें
   - FastAPI backend को deploy करें
   - Database setup करें

3. **Monitoring Setup:**
   - CloudWatch alarms
   - Error tracking
   - Performance monitoring

4. **Custom Domain:**
   - Domain purchase करें
   - DNS configure करें
   - SSL verify करें

---

## 📞 Help चाहिए?

**Resources:**
- AWS Amplify Docs: https://docs.amplify.aws/
- GitHub Issues: https://github.com/Aayush-2910/VAANI/issues
- AWS Support: https://console.aws.amazon.com/support/

**Common Commands:**
```bash
# Local testing
cd frontend
npm install
npm run dev

# Build testing
npm run build

# Check build output
ls -la dist/
```

---

## 🎊 Congratulations!

आपका VAANI app अब live है! 🚀

**Share करें:**
- URL copy करें
- Friends को भेजें
- Social media पर share करें

**Happy Deploying!** 🎉

---

**Made with ❤️ by VAANI Team**

