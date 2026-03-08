# 📝 Git Commands for Deployment

## Quick Commit & Push

```bash
# Navigate to project
cd VAANI

# Check status
git status

# Add all deployment files
git add .

# Commit with detailed message
git commit -m "Add AWS Amplify deployment configuration

✅ Added Files:
- amplify.yml: Build configuration for AWS Amplify
- DEPLOYMENT-GUIDE.md: Comprehensive English deployment guide
- AMPLIFY-DEPLOYMENT-HINDI.md: Complete Hindi deployment guide
- QUICK-DEPLOY.md: Quick 5-minute reference guide
- AWS-AMPLIFY-DEPLOY-STEPS.md: Repository-specific deployment steps
- COMMIT-AND-DEPLOY.md: Step-by-step commit instructions
- DEPLOYMENT-SUMMARY.md: Complete deployment summary
- .env.production.example: Production environment variables template
- GIT-COMMANDS.md: This file with git commands

🚀 Features:
- Automatic builds on push to main branch
- Environment variable configuration
- CDN distribution
- HTTPS enabled by default
- Continuous deployment ready

📖 Documentation:
- English and Hindi guides included
- Troubleshooting section added
- Cost estimation provided
- Post-deployment checklist included

🔧 Configuration:
- Frontend build: Vite + React
- Base directory: frontend
- Output directory: frontend/dist
- Node.js caching enabled

Ready for AWS Amplify deployment from GitHub!
Repository: https://github.com/roshan-1205/VAANI"

# Push to GitHub
git push origin main
```

---

## Alternative: Step-by-Step

```bash
# 1. Check current status
git status

# 2. Add specific files
git add amplify.yml
git add DEPLOYMENT-GUIDE.md
git add AMPLIFY-DEPLOYMENT-HINDI.md
git add QUICK-DEPLOY.md
git add AWS-AMPLIFY-DEPLOY-STEPS.md
git add COMMIT-AND-DEPLOY.md
git add DEPLOYMENT-SUMMARY.md
git add .env.production.example
git add GIT-COMMANDS.md
git add package.json

# 3. Commit
git commit -m "Add AWS Amplify deployment configuration"

# 4. Push
git push origin main
```

---

## Verify Push

```bash
# Check if push was successful
git log --oneline -1

# Check remote status
git remote -v

# Verify branch
git branch
```

---

## If You Need to Update

```bash
# Make changes to files
# Then:

git add .
git commit -m "Update deployment configuration"
git push origin main
```

---

## Check GitHub

After pushing, verify on GitHub:
```
https://github.com/roshan-1205/VAANI
```

You should see:
- ✅ New files in repository
- ✅ Latest commit message
- ✅ amplify.yml in root directory

---

## Next: AWS Amplify Deployment

After successful push:
1. Open AWS Console: https://console.aws.amazon.com/amplify
2. Follow steps in: `AWS-AMPLIFY-DEPLOY-STEPS.md`
3. Deploy in ~10 minutes!

---

## Troubleshooting

### Push Rejected
```bash
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### Authentication Issues
```bash
# Check remote URL
git remote -v

# If HTTPS, you may need personal access token
# If SSH, check SSH keys
```

### Merge Conflicts
```bash
# Pull and resolve conflicts
git pull origin main

# Fix conflicts in files
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

---

**Ready to push? Run the commands above!** 🚀

