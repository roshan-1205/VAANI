# ✅ Deployment Checklist

## Before Starting

### Credentials Required:

- [ ] AWS Account login
- [ ] AWS Access Key ID (for AI backend)
- [ ] AWS Secret Access Key (for AI backend)
- [ ] Firebase Service Account JSON file
- [ ] GitHub access to roshan-1205/VAANI

---

## Part 1: Frontend (AWS Amplify) - 15 min

- [ ] Push code to GitHub
- [ ] Open AWS Amplify Console
- [ ] Create new app
- [ ] Connect GitHub repository
- [ ] Add environment variables
- [ ] Deploy
- [ ] Note down Amplify URL

**Amplify URL:** `_______________________________`

---

## Part 2: Backend (EC2) - 45 min

### EC2 Setup

- [ ] Open EC2 Console
- [ ] Launch Ubuntu 22.04 instance
- [ ] Choose t2.medium instance type
- [ ] Create key pair (save .pem file!)
- [ ] Configure security group (ports: 22, 80, 443, 5000, 8000)
- [ ] Launch instance
- [ ] Note down public IP

**EC2 Public IP:** `_______________________________`

**Key Pair File:** `_______________________________`

### Server Setup

- [ ] SSH to EC2
- [ ] Update system
- [ ] Install Node.js 20
- [ ] Install Python 3.11
- [ ] Install PM2
- [ ] Install Git
- [ ] Clone repository

### AI Backend (Node.js)

- [ ] Navigate to ai-backend folder
- [ ] Install npm dependencies
- [ ] Create .env file
- [ ] Add AWS credentials
- [ ] Start with PM2
- [ ] Test: `curl http://localhost:5000/health`

### FastAPI Backend

- [ ] Navigate to Backend folder
- [ ] Create virtual environment
- [ ] Install pip dependencies
- [ ] Add Firebase serviceAccountKey.json
- [ ] Create .env file
- [ ] Start with PM2
- [ ] Test: `curl http://localhost:8000/api/health`

### Nginx Setup

- [ ] Install Nginx
- [ ] Configure reverse proxy
- [ ] Enable site
- [ ] Restart Nginx
- [ ] Test: `curl http://YOUR_IP/health`

---

## Part 3: Connect Frontend to Backend

- [ ] Update VITE_API_BASE_URL in Amplify
- [ ] Set to: `http://YOUR_EC2_IP/api`
- [ ] Redeploy frontend
- [ ] Wait for deployment

---

## Part 4: Testing

### Backend Tests

- [ ] `curl http://YOUR_EC2_IP/health` → Returns "OK"
- [ ] `curl http://YOUR_EC2_IP/api/health` → Returns JSON
- [ ] `curl http://YOUR_EC2_IP/ai/health` → Returns JSON

### Frontend Tests

- [ ] Open Amplify URL
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Voice assistant works
- [ ] Authentication works
- [ ] Dashboard loads
- [ ] API calls successful

---

## Part 5: Monitoring

- [ ] Check PM2 status: `pm2 status`
- [ ] View logs: `pm2 logs`
- [ ] Check Nginx: `sudo systemctl status nginx`
- [ ] Setup PM2 startup: `pm2 startup`

---

## Credentials to Provide

### 1. AWS Credentials (for AI Backend)

```
AWS_ACCESS_KEY_ID=_______________________________
AWS_SECRET_ACCESS_KEY=_______________________________
```

### 2. Firebase Service Account JSON

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "...",
  ...
}
```

---

## Important Files Saved

- [ ] EC2 Key Pair (.pem file) - **KEEP SECURE!**
- [ ] AWS credentials - **KEEP SECURE!**
- [ ] Firebase service account - **KEEP SECURE!**

---

## Final URLs

**Frontend:** `https://main.xxxxxx.amplifyapp.com`

**Backend API:** `http://YOUR_EC2_IP/api`

**AI Backend:** `http://YOUR_EC2_IP/ai`

---

## Cost Summary

**AWS Amplify:** $0-5/month (free tier)

**EC2 t2.medium:** ~$33/month

**EC2 t2.micro:** $0/month (free tier for 12 months)

**Total:** $5-35/month

---

## Next Steps After Deployment

- [ ] Setup custom domain (optional)
- [ ] Setup SSL certificate (Let's Encrypt)
- [ ] Setup CloudWatch monitoring
- [ ] Setup automated backups
- [ ] Setup CI/CD pipeline
- [ ] Performance optimization

---

## Support

**Guide:** `COMPLETE-DEPLOYMENT-GUIDE.md`

**Issues:** Check logs with `pm2 logs`

---

**Ready? Start with Part 1!** 🚀

