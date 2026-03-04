#!/bin/bash

###############################################################################
# VAANI Deployment Script
# Deploys the complete VAANI platform to AWS using Amplify Gen2
###############################################################################

set -e  # Exit on error

echo "=========================================="
echo "  VAANI - AWS Amplify Gen2 Deployment"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check prerequisites
echo "Step 1: Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18.x or later."
    exit 1
fi
NODE_VERSION=$(node --version)
print_success "Node.js installed: $NODE_VERSION"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi
NPM_VERSION=$(npm --version)
print_success "npm installed: $NPM_VERSION"

# Check Python
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.11 or later."
    exit 1
fi
PYTHON_VERSION=$(python3 --version)
print_success "Python installed: $PYTHON_VERSION"

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install AWS CLI."
    exit 1
fi
AWS_VERSION=$(aws --version)
print_success "AWS CLI installed: $AWS_VERSION"

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi
AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region)
print_success "AWS credentials configured"
print_info "Account: $AWS_ACCOUNT"
print_info "Region: $AWS_REGION"

echo ""
echo "Step 2: Installing Amplify backend dependencies..."
echo ""

cd amplify
if [ ! -d "node_modules" ]; then
    npm install
    print_success "Amplify dependencies installed"
else
    print_info "Amplify dependencies already installed"
fi

echo ""
echo "Step 3: Installing frontend dependencies..."
echo ""

cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
    print_success "Frontend dependencies installed"
else
    print_info "Frontend dependencies already installed"
fi

# Check if aws-amplify is installed
if ! npm list aws-amplify &> /dev/null; then
    print_info "Installing aws-amplify..."
    npm install aws-amplify
    print_success "aws-amplify installed"
fi

echo ""
echo "Step 4: Deploying Amplify backend..."
echo ""

cd ../amplify

print_info "This will deploy:"
print_info "  - Lambda function (Python 3.11)"
print_info "  - S3 bucket for audio storage"
print_info "  - API Gateway endpoints"
print_info "  - IAM roles and policies"
echo ""

# Ask for confirmation
read -p "Deploy to AWS Amplify sandbox? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Deployment cancelled"
    exit 1
fi

print_info "Starting Amplify sandbox deployment..."
print_info "This may take 5-10 minutes..."
echo ""

# Deploy sandbox
npx ampx sandbox --once

if [ $? -eq 0 ]; then
    print_success "Amplify backend deployed successfully!"
else
    print_error "Amplify deployment failed. Check the error messages above."
    exit 1
fi

echo ""
echo "Step 5: Verifying deployment..."
echo ""

# Check if amplify_outputs.json was generated
if [ -f "../amplify_outputs.json" ]; then
    print_success "amplify_outputs.json generated"
else
    print_error "amplify_outputs.json not found. Deployment may have failed."
    exit 1
fi

# Get Lambda function name
LAMBDA_FUNCTION=$(aws lambda list-functions --query "Functions[?contains(FunctionName, 'vaani-voice')].FunctionName" --output text)
if [ -n "$LAMBDA_FUNCTION" ]; then
    print_success "Lambda function deployed: $LAMBDA_FUNCTION"
else
    print_error "Lambda function not found"
fi

# Get S3 bucket name
S3_BUCKET=$(aws s3 ls | grep vaani-audio | awk '{print $3}')
if [ -n "$S3_BUCKET" ]; then
    print_success "S3 bucket created: $S3_BUCKET"
else
    print_error "S3 bucket not found"
fi

echo ""
echo "=========================================="
echo "  Deployment Complete!"
echo "=========================================="
echo ""
print_success "VAANI platform deployed successfully!"
echo ""
echo "Next steps:"
echo "  1. Start frontend: cd frontend && npm run dev"
echo "  2. Open browser: http://localhost:5173/voice"
echo "  3. Test voice recording and processing"
echo ""
echo "Useful commands:"
echo "  - View logs: aws logs tail /aws/lambda/$LAMBDA_FUNCTION --follow"
echo "  - List S3 files: aws s3 ls s3://$S3_BUCKET --recursive"
echo "  - Delete sandbox: cd amplify && npx ampx sandbox delete"
echo ""
print_info "See DEPLOYMENT-GUIDE.md for more information"
echo ""
