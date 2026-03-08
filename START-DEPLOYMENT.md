# 🚀 START DEPLOYMENT - Quick Guide

## Overview

**Time:** 60 minutes
**Cost:** $5-35/month
**Difficulty:** Medium

---

## What We'll Deploy

```
┌─────────────────────────────────────────┐
│         AWS Amplify (Frontend)          │
│         React + Vite + Tailwind         │
│    https://main.xxxxx.amplifyapp.com    │
└─────────────────┬───────────────────────┘
                  │
                  │ API Calls
                  ▼
┌─────────────────────────────────────────┐
│         EC2 Instance (Backend)          │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Nginx (Reverse Proxy)          │   │
│  │  Port 80                        │   │
│  └──────┬──────────────────┬───────┘   │
│         │                  │           │
│         ▼                  ▼           │
│  ┌─────────────┐    ┌─────────────┐   │
│  │ Node.js AI  │    │  FastAPI    │   │
│  │ Backend     │    │  Auth       │   │
│  │ Port 5000   │    │  Port 8000  │   │
│  └─────────────┘    └─────────────┘   │
│                                         │
│  http://YOUR_EC2_IP                    │
└─────────────────────────────────────────┘
```

---

## Prerequisites

### 1. Accounts
- [ ] AWS Account
- [ ] GitHub account
- [ ] Firebase project

### 2. Credentials
- [ ] AWS Access Key ID
- [ ] AWS Secret Access Key
- [ ] Firebase Service Account JSON

### 3. Tools
- [ ] Terminal/Command Prompt
- [ ] SSH client (built-in on Mac/Linux, PuTTY for Windows)
- [ ] Text editor

---

## Step-by-Step Process

### Phase 1: Frontend (15 minutes)

**Goal:** Deploy React app on AWS Amplify

**Steps:**
1. Push code to GitHub
2. Create Amplify app
3. Connect GitHub
4. Add environment variables
5. Deploy

**Guide:** `DEPLOY-NOW.md`

**Result:** `https://main.xxxxx.amplifyapp.com`

---

### Phase 2: EC2 Setup (15 minutes)

**Goal:** Create and configure EC2 instance

**Steps:**
1. Launch EC2 instance (Ubuntu 22.04, t2.medium)
2. Create key pair
3. Configure security group
4. Note public IP
5. SSH to instance

**Guide:** `COMPLETE-DEPLOYMENT-GUIDE.md` → Part 2.1-2.2

**Result:** SSH access to EC2

---

### Phase 3: Server Setup (15 minutes)

**Goal:** Install required software

**Steps:**
1. Update system
2. Install Node.js 20
3. Install Python 3.11
4. Install PM2
5. Install Git
6. Install Nginx
7. Clone repository

**Quick Method:** Run `ec2-setup-script.sh`

**Guide:** `COMPLETE-DEPLOYMENT-GUIDE.md` → Part 2.3

**Result:** Server ready for deployment

---

### Phase 4: Backend Deployment (15 minutes)

**Goal:** Deploy both backends

**Steps:**

**AI Backend (Node.js):**
1. Install dependencies
2. Create `.env` with AWS credentials
3. Start with PM2

**FastAPI Backend:**
1. Create virtual environment
2. Install dependencies
3. Add Firebase service account
4. Start with PM2

**Nginx:**
1. Configure reverse proxy
2. Enable site
3. Restart Nginx

**Guide:** `COMPLETE-DEPLOYMENT-GUIDE.md` → Part 2.4-2.6

**Result:** Both backends running

---

### Phase 5: Connect & Test (10 minutes)

**Goal:** Connect frontend to backend

**Steps:**
1. Update frontend environment variable
2. Redeploy frontend
3. Test all endpoints
4. Test frontend features

**Guide:** `COMPLETE-DEPLOYMENT-GUIDE.md` → Part 3-4

**Result:** Fully working application

---

## Quick Commands Reference

### SSH to EC2
```bash
ssh -i vaani-backend-key.pem ubuntu@YOUR_EC2_IP
```

### Run Setup Script
```bash
cd ~
wget https://raw.githubusercontent.com/roshan-1205/VAANI/main/ec2-setup-script.sh
bash ec2-setup-script.sh
```

### Start AI Backend
```bash
cd ~/VAANI/ai-backend
pm2 start server-production.js --name vaani-ai-backend
```

### Start FastAPI Backend
```bash
cd ~/VAANI/Backend
pm2 start "venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000" --name vaani-fastapi-backend
```

### Check Status
```bash
pm2 status
pm2 logs
```

### Save PM2 Processes
```bash
pm2 save
pm2 startup
```

---

## Files You Need

### Read First:
1. **START-DEPLOYMENT.md** (this file)
2. **DEPLOYMENT-CHECKLIST.md** (track progress)
3. **CREDENTIALS-TEMPLATE.md** (prepare credentials)

### During Deployment:
4. **COMPLETE-DEPLOYMENT-GUIDE.md** (detailed steps)
5. **DEPLOY-NOW.md** (frontend quick deploy)

### Helper Files:
6. **ec2-setup-script.sh** (automated setup)
7. **ENV-VARIABLES.txt** (copy-paste env vars)

---

## Credentials Needed

### Before Starting, Prepare:

**1. AWS Credentials**
```
AWS_ACCESS_KEY_ID=_______________
AWS_SECRET_ACCESS_KEY=_______________
```

**2. Firebase Service Account**
- Download JSON from Firebase Console
- Keep file ready

**3. EC2 Key Pair**
- Will be created during EC2 setup
- Save `.pem` file securely

---

## Cost Breakdown

| Service | Instance | Cost/Month |
|---------|----------|------------|
| AWS Amplify | - | $0-5 (free tier) |
| EC2 | t2.micro | $0 (free tier 12 months) |
| EC2 | t2.small | ~$17 |
| EC2 | t2.medium | ~$33 |
| **Total** | | **$5-35** |

**Recommendation:** Start with t2.medium for better performance

---

## Troubleshooting

### Build Failed on Amplify
- Check build logs
- Verify environment variables
- Test locally: `npm run build`

### Can't SSH to EC2
- Check security group (port 22 open)
- Verify key file permissions: `chmod 400 key.pem`
- Check public IP

### Backend Not Starting
- Check logs: `pm2 logs`
- Verify credentials in `.env`
- Check port availability: `sudo netstat -tulpn`

### Frontend Can't Connect to Backend
- Verify VITE_API_BASE_URL
- Check EC2 security group (ports 5000, 8000 open)
- Test backend: `curl http://YOUR_EC2_IP/api/health`

---

## Success Checklist

- [ ] Frontend deployed on Amplify
- [ ] EC2 instance running
- [ ] Both backends running (pm2 status shows online)
- [ ] Nginx configured and running
- [ ] Frontend can call backend APIs
- [ ] Voice assistant works
- [ ] Authentication works
- [ ] Dashboard loads

---

## Next Steps After Deployment

1. **Custom Domain** (optional)
   - Purchase domain
   - Configure DNS
   - Add SSL certificate

2. **Monitoring**
   - Setup CloudWatch
   - Configure alarms
   - Enable logging

3. **Backups**
   - Setup automated backups
   - Database backups
   - Code backups

4. **Optimization**
   - Enable caching
   - Optimize images
   - CDN configuration

---

## Support

**Stuck? Check:**
1. `COMPLETE-DEPLOYMENT-GUIDE.md` - Detailed steps
2. `DEPLOYMENT-CHECKLIST.md` - Track progress
3. PM2 logs: `pm2 logs`
4. Nginx logs: `sudo tail -f /var/log/nginx/error.log`

---

## Ready to Start?

### Step 1: Prepare Credentials
Read: `CREDENTIALS-TEMPLATE.md`

### Step 2: Start Frontend Deployment
Read: `DEPLOY-NOW.md`

### Step 3: Start Backend Deployment
Read: `COMPLETE-DEPLOYMENT-GUIDE.md`

### Step 4: Track Progress
Use: `DEPLOYMENT-CHECKLIST.md`

---

**Let's deploy VAANI! 🚀**

**Estimated Time:** 60 minutes
**Difficulty:** Medium
**Result:** Fully deployed application

---

**When you're ready, provide:**
1. AWS Access Key ID
2. AWS Secret Access Key
3. Firebase Service Account JSON

**I'll guide you through each step!** 🎯

