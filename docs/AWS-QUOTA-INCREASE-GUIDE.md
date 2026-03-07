# AWS Bedrock Quota Increase Guide

## 🚨 URGENT: Project Requires AWS Services

Your VAANI project needs AWS Bedrock to work. Current daily limit exceeded.

## ✅ SOLUTION 1: Request Quota Increase (5-10 minutes)

### Step 1: Open AWS Console
1. Login: https://console.aws.amazon.com/
2. Region: **us-east-1** (same as your config)

### Step 2: Go to Service Quotas
1. Search "Service Quotas" in top search bar
2. Click "Service Quotas"

### Step 3: Find Bedrock Quotas
1. In left sidebar: Click "AWS services"
2. Search: "Bedrock"
3. Click "Amazon Bedrock"

### Step 4: Request Increase for Nova Lite
1. Find: "Tokens per minute for Amazon Nova Lite"
2. Click on it
3. Click "Request quota increase" button
4. Enter new value:
   - Current: 10,000 tokens/minute (default)
   - Request: **100,000 tokens/minute**
5. Use case: "Educational project - VAANI civic engagement platform"
6. Click "Request"

### Step 5: Request Daily Limit Increase
1. Find: "Daily request quota for Amazon Nova Lite"
2. Click "Request quota increase"
3. Request: **10,000 requests/day** (from current limit)
4. Click "Request"

### ⏱️ Timeline:
- Auto-approved: 5-15 minutes (usually)
- Manual review: 1-2 business days (rare)

### 📧 You'll receive email when approved!

---

## ✅ SOLUTION 2: Use Multiple AWS Regions (IMMEDIATE)

If quota increase takes time, use region rotation:

### Available Regions for Nova Lite:
- us-east-1 (current - limit reached)
- us-west-2 (fresh quota)
- eu-west-1 (fresh quota)
- ap-southeast-1 (fresh quota)

### How to Switch:
1. Change in `.env`: `AWS_REGION=us-west-2`
2. Restart server
3. Each region has separate quota!

---

## ✅ SOLUTION 3: Use AWS Free Tier Optimization

### Current Usage Pattern:
- Each request: ~150-200 tokens
- Daily limit: ~1000 requests
- You're hitting limit fast

### Optimization:
1. Enable caching (already done ✅)
2. Use training data for common questions (reduces API calls)
3. Implement rate limiting per user

---

## 🎯 IMMEDIATE ACTION PLAN

### Option A: Quick Fix (2 minutes)
```bash
# Change region in .env
AWS_REGION=us-west-2
```
Restart server - fresh quota immediately!

### Option B: Proper Fix (10 minutes)
1. Request quota increase (steps above)
2. Wait for approval email
3. Continue with increased limits

### Option C: Hybrid (BEST)
1. Switch to us-west-2 NOW (immediate relief)
2. Request quota increase for us-east-1
3. Use region rotation if needed

---

## 📊 After Quota Increase

You'll be able to handle:
- 100,000 tokens/minute = ~500 requests/minute
- 10,000 requests/day = enough for testing + demo

---

## 🆘 If Quota Request Denied

Use this justification:
```
Project: VAANI - Voice-first Civic Engagement Platform
Purpose: Educational/Academic project for Smart India Hackathon
Expected Usage: 5,000-10,000 requests/day during development
Users: 100-500 test users
Duration: 3 months development + 6 months deployment
Reason: Building AI-powered voice assistant for Indian citizens to report civic issues
```

---

## ✅ Verification

After increase approved, test:
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","userId":"test"}'
```

Should work without errors!

---

**PRIORITY: Do Option A (region switch) RIGHT NOW, then request quota increase!**
