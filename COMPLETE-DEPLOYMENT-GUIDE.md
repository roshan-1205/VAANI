# 🚀 Complete Deployment Guide - Frontend + Backend

## Overview

**Frontend:** AWS Amplify (React + Vite)
**Backend 1:** EC2 (Node.js AI Backend)
**Backend 2:** EC2 (FastAPI Authentication Backend)

**Total Time:** 45-60 minutes
**Cost:** ~$10-15/month (EC2 t2.micro free tier eligible)

---

# Part 1: Frontend Deployment (AWS Amplify) - 15 minutes

## Step 1.1: Push to GitHub

```bash
cd VAANI
git add .
git commit -m "Add deployment configuration"
git push origin main
```

## Step 1.2: AWS Amplify Console

1. Open: https://console.aws.amazon.com/amplify
2. Click **"Create new app"**
3. Select **"Host web app"**
4. Choose **"GitHub"**
5. Click **"Connect to GitHub"** → Authorize
6. Select repository: **roshan-1205/VAANI**
7. Select branch: **main**
8. Click **"Next"**

## Step 1.3: Build Settings (Auto-detected)

Build settings will be auto-detected from `amplify.yml`:
- Build command: `npm run build`
- Base directory: `frontend`
- Output directory: `frontend/dist`

Click **"Next"**

## Step 1.4: Environment Variables

Click **"Advanced settings"** and add:

```
VITE_FIREBASE_API_KEY=AIzaSyDXqMaStxNZnnUK8atg8G9Z5GVEKOREKiw
VITE_FIREBASE_AUTH_DOMAIN=vanni-166b8.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vanni-166b8
VITE_FIREBASE_STORAGE_BUCKET=vanni-166b8.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=961709941045
VITE_FIREBASE_APP_ID=1:961709941045:web:455ea47df23189d9976c7c
VITE_API_BASE_URL=http://localhost:8000/api
```

**Note:** We'll update `VITE_API_BASE_URL` after EC2 deployment

## Step 1.5: Deploy

1. Click **"Save and deploy"**
2. Wait 5-10 minutes
3. Note down the URL: `https://main.xxxxxx.amplifyapp.com`

✅ **Frontend Deployed!**

---

# Part 2: Backend Deployment (EC2) - 30-45 minutes

## Prerequisites

**You'll need:**
- AWS Account
- AWS Access Key ID
- AWS Secret Access Key
- SSH key pair (we'll create this)

---

## Step 2.1: Create EC2 Instance

### 1. Open EC2 Console
```
https://console.aws.amazon.com/ec2
```

### 2. Launch Instance

Click **"Launch Instance"**

**Name:** `vaani-backend`

**Application and OS Images:**
- Select: **Ubuntu Server 22.04 LTS**
- Architecture: **64-bit (x86)**

**Instance Type:**
- Select: **t2.medium** (recommended for Node.js + Python)
- Or **t2.small** (minimum, may be slow)

**Key pair:**
- Click **"Create new key pair"**
- Name: `vaani-backend-key`
- Type: **RSA**
- Format: **`.pem`** (for Mac/Linux) or **`.ppk`** (for Windows PuTTY)
- Click **"Create key pair"**
- **IMPORTANT:** Save this file securely! You'll need it to connect.

**Network Settings:**
- Click **"Edit"**
- **Auto-assign public IP:** Enable
- **Firewall (Security Groups):** Create new
  - Security group name: `vaani-backend-sg`
  - Description: `Security group for VAANI backend`
  
**Add these rules:**

| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| SSH | TCP | 22 | My IP | SSH access |
| Custom TCP | TCP | 5000 | Anywhere (0.0.0.0/0) | Node.js AI Backend |
| Custom TCP | TCP | 8000 | Anywhere (0.0.0.0/0) | FastAPI Backend |
| HTTP | TCP | 80 | Anywhere (0.0.0.0/0) | HTTP |
| HTTPS | TCP | 443 | Anywhere (0.0.0.0/0) | HTTPS |

**Storage:**
- **Size:** 20 GB (minimum)
- **Type:** gp3

### 3. Launch Instance

Click **"Launch instance"**

Wait 2-3 minutes for instance to start.

### 4. Note Down Details

Once running, note:
- **Public IPv4 address:** (e.g., `54.123.45.67`)
- **Public IPv4 DNS:** (e.g., `ec2-54-123-45-67.compute-1.amazonaws.com`)

✅ **EC2 Instance Created!**

---

## Step 2.2: Connect to EC2

### For Mac/Linux:

```bash
# Set permissions for key file
chmod 400 vaani-backend-key.pem

# Connect to EC2
ssh -i vaani-backend-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### For Windows (using PuTTY):

1. Open PuTTYgen
2. Load your `.ppk` file
3. Open PuTTY
4. Host Name: `ubuntu@YOUR_EC2_PUBLIC_IP`
5. Connection → SSH → Auth → Browse → Select `.ppk` file
6. Click **"Open"**

**Replace `YOUR_EC2_PUBLIC_IP` with your actual IP!**

---

## Step 2.3: Setup EC2 Server

Once connected, run these commands:

### 1. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js 20

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # Should show v20.x.x
npm --version
```

### 3. Install Python 3.11

```bash
# Install Python
sudo apt install -y python3.11 python3.11-venv python3-pip

# Verify
python3 --version  # Should show 3.11.x
```

### 4. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 5. Install Git

```bash
sudo apt install -y git
```

✅ **Server Setup Complete!**

---

## Step 2.4: Deploy AI Backend (Node.js)

### 1. Clone Repository

```bash
cd ~
git clone https://github.com/roshan-1205/VAANI.git
cd VAANI/ai-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

```bash
nano .env
```

**Paste this (I'll ask you for AWS keys):**

```env
# AWS Configuration
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY_HERE
AWS_REGION=us-east-1

# Server Configuration
PORT=5000
NODE_ENV=production
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

**⚠️ STOP HERE - I need your AWS credentials:**
- AWS Access Key ID
- AWS Secret Access Key

### 4. Start with PM2

```bash
pm2 start server-production.js --name vaani-ai-backend
pm2 save
pm2 startup
```

Copy the command PM2 shows and run it.

### 5. Test

```bash
curl http://localhost:5000/health
```

Should return: `{"status":"ok"}`

✅ **AI Backend Deployed!**

---

## Step 2.5: Deploy FastAPI Backend

### 1. Navigate to Backend

```bash
cd ~/VAANI/Backend
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Setup Firebase Service Account

**⚠️ STOP HERE - I need your Firebase Service Account JSON:**

```bash
nano serviceAccountKey.json
```

**Paste your Firebase service account JSON here**

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### 5. Create Environment File

```bash
nano .env
```

**Paste:**

```env
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
PORT=8000
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### 6. Start with PM2

```bash
# Deactivate venv first
deactivate

# Start with PM2
pm2 start "venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000" --name vaani-fastapi-backend
pm2 save
```

### 7. Test

```bash
curl http://localhost:8000/api/health
```

✅ **FastAPI Backend Deployed!**

---

## Step 2.6: Setup Nginx (Reverse Proxy)

### 1. Install Nginx

```bash
sudo apt install -y nginx
```

### 2. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/vaani
```

**Paste this:**

```nginx
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP;

    # AI Backend (Node.js)
    location /ai/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # FastAPI Backend
    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Health check
    location /health {
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
```

**Replace `YOUR_EC2_PUBLIC_IP` with your actual IP!**

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### 3. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/vaani /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Test

```bash
curl http://YOUR_EC2_PUBLIC_IP/health
curl http://YOUR_EC2_PUBLIC_IP/api/health
```

✅ **Nginx Configured!**

---

## Step 2.7: Check All Services

```bash
pm2 status
```

Should show:
```
┌─────┬──────────────────────────┬─────────┬─────────┐
│ id  │ name                     │ status  │ restart │
├─────┼──────────────────────────┼─────────┼─────────┤
│ 0   │ vaani-ai-backend         │ online  │ 0       │
│ 1   │ vaani-fastapi-backend    │ online  │ 0       │
└─────┴──────────────────────────┴─────────┴─────────┘
```

✅ **All Services Running!**

---

# Part 3: Connect Frontend to Backend

## Step 3.1: Update Frontend Environment Variables

1. Go to AWS Amplify Console
2. Select your app
3. Go to **App settings → Environment variables**
4. Update `VITE_API_BASE_URL`:

**Old value:**
```
http://localhost:8000/api
```

**New value:**
```
http://YOUR_EC2_PUBLIC_IP/api
```

**Replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 IP!**

## Step 3.2: Redeploy Frontend

1. In Amplify Console
2. Click **"Redeploy this version"**
3. Wait 5 minutes

✅ **Frontend Connected to Backend!**

---

# Part 4: Testing

## Test Backend

```bash
# From your local machine
curl http://YOUR_EC2_PUBLIC_IP/health
curl http://YOUR_EC2_PUBLIC_IP/api/health
```

## Test Frontend

1. Open your Amplify URL: `https://main.xxxxxx.amplifyapp.com`
2. Test voice assistant
3. Test authentication
4. Test dashboard

✅ **Everything Working!**

---

# Part 5: Monitoring & Maintenance

## View Logs

```bash
# SSH to EC2
ssh -i vaani-backend-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# View AI Backend logs
pm2 logs vaani-ai-backend

# View FastAPI logs
pm2 logs vaani-fastapi-backend

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Restart Services

```bash
# Restart AI Backend
pm2 restart vaani-ai-backend

# Restart FastAPI Backend
pm2 restart vaani-fastapi-backend

# Restart Nginx
sudo systemctl restart nginx
```

## Update Code

```bash
cd ~/VAANI
git pull origin main

# Update AI Backend
cd ai-backend
npm install
pm2 restart vaani-ai-backend

# Update FastAPI Backend
cd ../Backend
source venv/bin/activate
pip install -r requirements.txt
deactivate
pm2 restart vaani-fastapi-backend
```

---

# Summary

## URLs

**Frontend:** `https://main.xxxxxx.amplifyapp.com`
**Backend API:** `http://YOUR_EC2_PUBLIC_IP/api`
**AI Backend:** `http://YOUR_EC2_PUBLIC_IP/ai`

## Credentials Needed

- [ ] AWS Access Key ID
- [ ] AWS Secret Access Key
- [ ] Firebase Service Account JSON
- [ ] EC2 Key Pair (.pem file)

## Costs

**AWS Amplify:**
- Free tier: 1000 build minutes/month
- Estimated: $0-5/month

**EC2 t2.medium:**
- $0.0464/hour = ~$33/month
- Or use t2.micro (free tier): $0/month for 12 months

**Total:** ~$5-35/month

---

# Next Steps

1. ✅ Deploy frontend on Amplify
2. ✅ Create EC2 instance
3. ⏭️ Provide AWS credentials
4. ⏭️ Provide Firebase service account
5. ⏭️ Deploy backends
6. ⏭️ Connect frontend to backend
7. ⏭️ Test everything

---

**Ready to start? Let's begin with Part 1!** 🚀

