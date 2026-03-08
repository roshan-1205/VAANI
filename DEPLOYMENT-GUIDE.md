# 🚀 AWS Amplify Deployment Guide - VAANI

## GitHub se AWS Amplify Deployment

### Prerequisites
- ✅ AWS Account
- ✅ GitHub Repository: https://github.com/roshan-1205/VAANImai
- ✅ AWS Amplify access

---

## Step-by-Step Deployment Process

### 1️⃣ AWS Console Setup

1. **AWS Console mein login karein**
   - https://console.aws.amazon.com/

2. **AWS Amplify service open karein**
   - Search bar mein "Amplify" type karein
   - AWS Amplify select karein

3. **New App Create karein**
   - "Create new app" button click karein
   - "Host web app" select karein

### 2️⃣ GitHub Connection

1. **GitHub se connect karein**
   - "GitHub" option select karein
   - "Connect to GitHub" button click karein
   - GitHub authorization allow karein

2. **Repository select karein**
   - Repository: `roshan-1205/VAANImai`
   - Branch: `main` (ya aapka default branch)
   - "Next" click karein

### 3️⃣ Build Settings Configuration

Amplify automatically `amplify.yml` file detect karega jo maine create kiya hai.

**Build settings verify karein:**
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

### 4️⃣ Environment Variables Setup

**Important:** Deployment se pehle environment variables add karein:

1. **Advanced settings** expand karein
2. **Environment variables** section mein add karein:

```
VITE_API_URL=https://your-backend-url.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note:** `.env.example` file mein dekh sakte hain ki kaunse variables chahiye.

### 5️⃣ Deploy

1. **Review settings**
   - Sab settings check karein
   - "Save and deploy" click karein

2. **Deployment process**
   - Provision: AWS resources setup
   - Build: Application build hoga
   - Deploy: Live deployment
   - Verify: Health check

3. **Deployment time**: Approximately 5-10 minutes

### 6️⃣ Post-Deployment

**Deployment complete hone ke baad:**

1. **URL milega**: `https://main.xxxxxx.amplifyapp.com`
2. **Custom domain** add kar sakte hain (optional)
3. **SSL certificate** automatically provision hoga

---

## 🔄 Automatic Deployments

**GitHub se automatic deployment:**
- Jab bhi aap `main` branch mein push karenge
- Amplify automatically detect karega
- Naya build trigger hoga
- Updated app deploy hoga

**Branch-based deployments:**
- Multiple branches ke liye alag environments
- Preview deployments for pull requests

---

## 🛠️ Backend Deployment (Optional)

### AI Backend Deployment

**Option 1: AWS Lambda (Recommended)**
```bash
cd ai-backend
# Lambda function create karein AWS console se
# Code upload karein
# Environment variables set karein
```

**Option 2: EC2 Instance**
```bash
# EC2 instance launch karein
# Node.js install karein
# Application deploy karein
# PM2 se manage karein
```

### FastAPI Backend Deployment

**Option 1: AWS Lambda with API Gateway**
```bash
cd Backend
# Lambda function create karein
# API Gateway configure karein
```

**Option 2: AWS Elastic Beanstalk**
```bash
# Elastic Beanstalk application create karein
# Python environment select karein
# Code deploy karein
```

---

## 🔧 Troubleshooting

### Build Failures

**Issue: npm ci fails**
```bash
Solution: package-lock.json verify karein
```

**Issue: Build timeout**
```bash
Solution: Build settings mein timeout increase karein
Advanced settings > Build timeout > 30 minutes
```

**Issue: Environment variables missing**
```bash
Solution: Amplify console mein environment variables add karein
App settings > Environment variables
```

### Deployment Issues

**Issue: 404 errors on routes**
```bash
Solution: Redirects and rewrites add karein
Rewrites and redirects section mein:
Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
Target: /index.html
Type: 200 (Rewrite)
```

**Issue: API calls failing**
```bash
Solution: CORS configuration check karein backend mein
VITE_API_URL environment variable verify karein
```

---

## 📊 Monitoring

### Amplify Console Features

1. **Build logs**: Real-time build progress
2. **Access logs**: Traffic monitoring
3. **Metrics**: Performance analytics
4. **Alarms**: Set up notifications

### CloudWatch Integration

- Automatic logging
- Custom metrics
- Performance monitoring
- Error tracking

---

## 💰 Cost Estimation

**AWS Amplify Pricing:**
- Build minutes: $0.01 per minute
- Hosting: $0.15 per GB served
- Free tier: 1000 build minutes/month, 15 GB served/month

**Estimated monthly cost for VAANI:**
- Small traffic: $0-5
- Medium traffic: $5-20
- High traffic: $20-50

---

## 🔐 Security Best Practices

1. **Environment variables**: Sensitive data ko environment variables mein store karein
2. **HTTPS**: Amplify automatically SSL provide karta hai
3. **Access control**: IAM roles properly configure karein
4. **Secrets**: AWS Secrets Manager use karein sensitive credentials ke liye

---

## 📱 Custom Domain Setup (Optional)

1. **Domain add karein**
   - App settings > Domain management
   - "Add domain" click karein
   - Domain name enter karein

2. **DNS configuration**
   - Amplify DNS records provide karega
   - Apne domain provider mein add karein
   - Verification wait karein (24-48 hours)

3. **SSL certificate**
   - Automatically provision hoga
   - Free SSL certificate

---

## 🎯 Next Steps

1. ✅ GitHub repository ready hai
2. ✅ `amplify.yml` configuration file ready hai
3. ⏭️ AWS Console mein login karein
4. ⏭️ Amplify app create karein
5. ⏭️ GitHub connect karein
6. ⏭️ Environment variables add karein
7. ⏭️ Deploy karein!

---

## 📞 Support

**Issues face kar rahe hain?**
- AWS Amplify Documentation: https://docs.amplify.aws/
- GitHub Issues: https://github.com/roshan-1205/VAANImai/issues

---

## ✅ Deployment Checklist

- [ ] AWS Account ready
- [ ] GitHub repository accessible
- [ ] Environment variables prepared
- [ ] Firebase configuration ready
- [ ] Backend API URL ready
- [ ] `amplify.yml` file committed to GitHub
- [ ] AWS Amplify console access
- [ ] Domain name (optional)

---

**Happy Deploying! 🚀**

