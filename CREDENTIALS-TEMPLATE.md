# 🔑 Credentials Template

## Credentials Required for Deployment

---

## 1. AWS Credentials (for AI Backend)

**Where to get:**
1. AWS Console → IAM → Users → Your User → Security Credentials
2. Create Access Key → Application running outside AWS
3. Copy both values

**Add to:** `ai-backend/.env`

```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
PORT=5000
NODE_ENV=production
```

**⚠️ Replace EXAMPLE values with your actual credentials!**

---

## 2. Firebase Service Account (for FastAPI Backend)

**Where to get:**
1. Firebase Console: https://console.firebase.google.com/
2. Select your project: **vanni-166b8**
3. Settings (⚙️) → Project settings
4. Service accounts tab
5. Click "Generate new private key"
6. Download JSON file

**Add to:** `Backend/serviceAccountKey.json`

```json
{
  "type": "service_account",
  "project_id": "vanni-166b8",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@vanni-166b8.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**⚠️ This is sensitive data - never commit to Git!**

---

## 3. EC2 Key Pair

**Created during EC2 setup:**
- Name: `vaani-backend-key.pem`
- **IMPORTANT:** Save this file securely!
- Set permissions: `chmod 400 vaani-backend-key.pem`

**Used for SSH:**
```bash
ssh -i vaani-backend-key.pem ubuntu@YOUR_EC2_IP
```

---

## 4. EC2 Public IP

**Get from EC2 Console:**
- After launching instance
- EC2 Dashboard → Instances → Select your instance
- Copy "Public IPv4 address"

**Example:** `54.123.45.67`

**Used in:**
- SSH connection
- Nginx configuration
- Frontend environment variable (VITE_API_BASE_URL)

---

## 5. Amplify URL

**Get after deployment:**
- AWS Amplify Console → Your App
- Copy the URL

**Example:** `https://main.d1234abcd5678.amplifyapp.com`

---

## Security Checklist

- [ ] Never commit `.env` files to Git
- [ ] Never commit `serviceAccountKey.json` to Git
- [ ] Keep `.pem` key file secure (chmod 400)
- [ ] Don't share AWS credentials
- [ ] Don't share Firebase service account
- [ ] Use environment variables for sensitive data
- [ ] Rotate credentials regularly

---

## Credentials Summary

| Credential | Where to Add | Purpose |
|------------|--------------|---------|
| AWS Access Key | `ai-backend/.env` | AWS Bedrock access |
| AWS Secret Key | `ai-backend/.env` | AWS Bedrock access |
| Firebase Service Account | `Backend/serviceAccountKey.json` | Authentication |
| EC2 Key Pair | Local machine | SSH access |
| EC2 Public IP | Nginx config, Frontend env | Backend URL |

---

## When You're Ready

**Provide these to me:**

1. **AWS Access Key ID:** `_______________________________`

2. **AWS Secret Access Key:** `_______________________________`

3. **Firebase Service Account JSON:** (paste entire JSON)

4. **EC2 Public IP:** (after creating instance)

---

**I'll help you configure everything!** 🔐

