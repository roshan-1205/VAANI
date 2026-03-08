#!/bin/bash

# VAANI Backend Setup Script for EC2
# Run this after SSH to EC2: bash ec2-setup-script.sh

echo "🚀 VAANI Backend Setup Starting..."
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Update System
echo -e "${YELLOW}Step 1: Updating system...${NC}"
sudo apt update && sudo apt upgrade -y
echo -e "${GREEN}✅ System updated${NC}"
echo ""

# Step 2: Install Node.js 20
echo -e "${YELLOW}Step 2: Installing Node.js 20...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
echo -e "${GREEN}✅ Node.js installed: $(node --version)${NC}"
echo ""

# Step 3: Install Python 3.11
echo -e "${YELLOW}Step 3: Installing Python 3.11...${NC}"
sudo apt install -y python3.11 python3.11-venv python3-pip
echo -e "${GREEN}✅ Python installed: $(python3 --version)${NC}"
echo ""

# Step 4: Install PM2
echo -e "${YELLOW}Step 4: Installing PM2...${NC}"
sudo npm install -g pm2
echo -e "${GREEN}✅ PM2 installed${NC}"
echo ""

# Step 5: Install Git
echo -e "${YELLOW}Step 5: Installing Git...${NC}"
sudo apt install -y git
echo -e "${GREEN}✅ Git installed${NC}"
echo ""

# Step 6: Install Nginx
echo -e "${YELLOW}Step 6: Installing Nginx...${NC}"
sudo apt install -y nginx
echo -e "${GREEN}✅ Nginx installed${NC}"
echo ""

# Step 7: Clone Repository
echo -e "${YELLOW}Step 7: Cloning VAANI repository...${NC}"
cd ~
if [ -d "VAANI" ]; then
    echo "Repository already exists, pulling latest changes..."
    cd VAANI
    git pull origin main
else
    git clone https://github.com/roshan-1205/VAANI.git
    cd VAANI
fi
echo -e "${GREEN}✅ Repository ready${NC}"
echo ""

# Step 8: Setup AI Backend
echo -e "${YELLOW}Step 8: Setting up AI Backend (Node.js)...${NC}"
cd ~/VAANI/ai-backend
npm install
echo -e "${GREEN}✅ AI Backend dependencies installed${NC}"
echo ""

# Step 9: Setup FastAPI Backend
echo -e "${YELLOW}Step 9: Setting up FastAPI Backend...${NC}"
cd ~/VAANI/Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
echo -e "${GREEN}✅ FastAPI Backend dependencies installed${NC}"
echo ""

echo "=================================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=================================="
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Create AI Backend .env file:"
echo "   cd ~/VAANI/ai-backend"
echo "   nano .env"
echo "   Add AWS credentials"
echo ""
echo "2. Create FastAPI serviceAccountKey.json:"
echo "   cd ~/VAANI/Backend"
echo "   nano serviceAccountKey.json"
echo "   Paste Firebase service account JSON"
echo ""
echo "3. Start AI Backend:"
echo "   cd ~/VAANI/ai-backend"
echo "   pm2 start server-production.js --name vaani-ai-backend"
echo ""
echo "4. Start FastAPI Backend:"
echo "   cd ~/VAANI/Backend"
echo "   pm2 start \"venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000\" --name vaani-fastapi-backend"
echo ""
echo "5. Configure Nginx:"
echo "   sudo nano /etc/nginx/sites-available/vaani"
echo "   (Copy config from COMPLETE-DEPLOYMENT-GUIDE.md)"
echo ""
echo "6. Enable Nginx site:"
echo "   sudo ln -s /etc/nginx/sites-available/vaani /etc/nginx/sites-enabled/"
echo "   sudo nginx -t"
echo "   sudo systemctl restart nginx"
echo ""
echo "7. Save PM2 processes:"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
echo -e "${GREEN}Happy Deploying! 🚀${NC}"
