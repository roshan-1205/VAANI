# 🚀 Commit and Deploy Instructions

## Step 1: Commit Files to GitHub

```bash
# Navigate to project directory
cd VAANI

# Check status
git status

# Add all new files
git add amplify.yml
git add DEPLOYMENT-GUIDE.md
git add AMPLIFY-DEPLOYMENT-HINDI.md
git add QUICK-DEPLOY.md
git add COMMIT-AND-DEPLOY.md

# Or add all at once
git add .

# Commit with message
git commit -m "Add AWS Amplify deployment configuration

- Add amplify.yml for build configuration
- Add comprehensive deployment guides (English & Hindi)
- Add quick reference guide
- Ready for AWS Amplify deployment from GitHub"

# Push to GitHub
git push origin main
```

---

## Step 2: Deploy on AWS Amplify

### Option A: Using AWS Console (Recommended for first time)

1. **Open AWS Console**
   ```
   https://console.aws.amazon.com/amplify
   ```

2. **Create New App**
   - Click "Create new app"
   - Select "Host web app"
   - Choose "GitHub"
   - Authorize AWS Amplify

3. **Select Repository**
   - Repository: `Aayush-2910/VAANI`
   - Branch: `main`
   - Click "Next"

4. **Configure Build**
   - Amplify will auto-detect `amplify.yml`
   - Verify build settings
   - Click "Next"

5. **Add Environment Variables**
   ```
   VITE_API_URL=your_backend_url
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

6. **Deploy**
   - Review settings
   - Click "Save and deploy"
   - Wait 5-10 minutes
   - Get your live URL!

### Option B: Using Amplify CLI

```bash
# Install Amplify CLI (if not installed)
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify in project
cd VAANI
amplify init

# Follow prompts:
# - Enter a name for the project: vaani
# - Enter a name for the environment: production
# - Choose your default editor: Visual Studio Code
# - Choose the type of app: javascript
# - What javascript framework: react
# - Source Directory Path: frontend/src
# - Distribution Directory Path: frontend/dist
# - Build Command: npm run build
# - Start Command: npm run dev

# Add hosting
amplify add hosting

# Select: Hosting with Amplify Console
# Select: Manual deployment

# Publish
amplify publish
```

---

## Step 3: Verify Deployment

### Check Build Status
```
1. Go to Amplify Console
2. Click on your app
3. Check build status:
   - Provision ✅
   - Build ✅
   - Deploy ✅
   - Verify ✅
```

### Test Live App
```
1. Click on the provided URL
2. Test features:
   - Homepage loads
   - Navigation works
   - Voice assistant works
   - Authentication works
   - Dashboard accessible
```

---

## Step 4: Setup Continuous Deployment

### Automatic Deployments
```
✅ Already configured!
Every push to 'main' branch will:
1. Trigger new build
2. Run tests (if configured)
3. Deploy automatically
4. Send notification
```

### Branch Deployments (Optional)
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and push
git push origin feature/new-feature

# Amplify can auto-deploy this branch too
# Configure in Amplify Console:
# App settings → General → Branch settings
```

---

## Step 5: Monitor Deployment

### View Logs
```
Amplify Console → Your App → Build History
- Click on any build
- View detailed logs
- Check for errors
```

### Setup Notifications
```
Amplify Console → Your App → Notifications
- Add email notifications
- Get alerts for:
  - Build success
  - Build failures
  - Deployment complete
```

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Check logs in Amplify Console
# Common issues:
1. Missing dependencies → Check package.json
2. Build errors → Test locally: npm run build
3. Environment variables → Verify in Amplify Console
```

### Environment Variables Not Working
```bash
# Solution:
1. Go to Amplify Console
2. App settings → Environment variables
3. Add/update variables
4. Redeploy: Actions → Redeploy this version
```

### 404 Errors on Routes
```bash
# Add rewrite rule:
1. App settings → Rewrites and redirects
2. Add rule:
   Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
   Target: /index.html
   Type: 200 (Rewrite)
3. Save
```

---

## 📊 Post-Deployment Checklist

- [ ] Build completed successfully
- [ ] App accessible via URL
- [ ] All routes working
- [ ] Voice assistant functional
- [ ] Authentication working
- [ ] Dashboard loading
- [ ] API calls successful
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain (optional)

---

## 🎯 Next Steps

### 1. Backend Deployment
```bash
# Deploy AI Backend to AWS Lambda
# Deploy FastAPI Backend to AWS
# Setup database
# Configure API Gateway
```

### 2. Custom Domain
```bash
# Purchase domain
# Configure DNS
# Add to Amplify
# Verify SSL
```

### 3. Monitoring
```bash
# Setup CloudWatch
# Configure alarms
# Enable error tracking
# Setup analytics
```

### 4. Optimization
```bash
# Enable caching
# Optimize images
# Minify assets
# Setup CDN
```

---

## 📞 Need Help?

**Documentation:**
- `DEPLOYMENT-GUIDE.md` - Detailed English guide
- `AMPLIFY-DEPLOYMENT-HINDI.md` - Detailed Hindi guide
- `QUICK-DEPLOY.md` - Quick reference

**Resources:**
- AWS Amplify Docs: https://docs.amplify.aws/
- GitHub Repo: https://github.com/Aayush-2910/VAANI
- AWS Support: https://console.aws.amazon.com/support/

---

## ✅ Summary

**Files Created:**
```
✅ amplify.yml - Build configuration
✅ DEPLOYMENT-GUIDE.md - Detailed guide
✅ AMPLIFY-DEPLOYMENT-HINDI.md - Hindi guide
✅ QUICK-DEPLOY.md - Quick reference
✅ COMMIT-AND-DEPLOY.md - This file
```

**Ready to Deploy:**
```bash
# 1. Commit to GitHub
git add .
git commit -m "Add AWS Amplify deployment configuration"
git push origin main

# 2. Deploy on AWS Amplify Console
# Follow steps in DEPLOYMENT-GUIDE.md

# 3. Get your live URL!
# https://main.xxxxxx.amplifyapp.com
```

---

**Happy Deploying! 🚀**

