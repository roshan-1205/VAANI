# VAANI Deployment Script for Windows PowerShell
# Deploys the complete VAANI platform to AWS using Amplify Gen2

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  VAANI - AWS Amplify Gen2 Deployment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

function Print-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Print-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Print-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Yellow
}

# Check prerequisites
Write-Host "Step 1: Checking prerequisites..." -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Print-Success "Node.js installed: $nodeVersion"
} catch {
    Print-Error "Node.js is not installed. Please install Node.js 18.x or later."
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Print-Success "npm installed: $npmVersion"
} catch {
    Print-Error "npm is not installed. Please install npm."
    exit 1
}

# Check Python
try {
    $pythonVersion = python --version
    Print-Success "Python installed: $pythonVersion"
} catch {
    Print-Error "Python 3 is not installed. Please install Python 3.11 or later."
    exit 1
}

# Check AWS CLI
try {
    $awsVersion = aws --version
    Print-Success "AWS CLI installed: $awsVersion"
} catch {
    Print-Error "AWS CLI is not installed. Please install AWS CLI."
    exit 1
}

# Check AWS credentials
try {
    $awsAccount = aws sts get-caller-identity --query Account --output text
    $awsRegion = aws configure get region
    Print-Success "AWS credentials configured"
    Print-Info "Account: $awsAccount"
    Print-Info "Region: $awsRegion"
} catch {
    Print-Error "AWS credentials not configured. Run 'aws configure' first."
    exit 1
}

Write-Host ""
Write-Host "Step 2: Installing Amplify backend dependencies..." -ForegroundColor Cyan
Write-Host ""

Set-Location amplify
if (-not (Test-Path "node_modules")) {
    npm install
    Print-Success "Amplify dependencies installed"
} else {
    Print-Info "Amplify dependencies already installed"
}

Write-Host ""
Write-Host "Step 3: Installing frontend dependencies..." -ForegroundColor Cyan
Write-Host ""

Set-Location ../frontend
if (-not (Test-Path "node_modules")) {
    npm install
    Print-Success "Frontend dependencies installed"
} else {
    Print-Info "Frontend dependencies already installed"
}

# Check if aws-amplify is installed
try {
    npm list aws-amplify 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Print-Info "Installing aws-amplify..."
        npm install aws-amplify
        Print-Success "aws-amplify installed"
    }
} catch {
    Print-Info "Installing aws-amplify..."
    npm install aws-amplify
    Print-Success "aws-amplify installed"
}

Write-Host ""
Write-Host "Step 4: Deploying Amplify backend..." -ForegroundColor Cyan
Write-Host ""

Set-Location ../amplify

Print-Info "This will deploy:"
Print-Info "  - Lambda function (Python 3.11)"
Print-Info "  - S3 bucket for audio storage"
Print-Info "  - API Gateway endpoints"
Print-Info "  - IAM roles and policies"
Write-Host ""

# Ask for confirmation
$confirmation = Read-Host "Deploy to AWS Amplify sandbox? (y/n)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Print-Error "Deployment cancelled"
    exit 1
}

Print-Info "Starting Amplify sandbox deployment..."
Print-Info "This may take 5-10 minutes..."
Write-Host ""

# Deploy sandbox
try {
    npx ampx sandbox --once
    Print-Success "Amplify backend deployed successfully!"
} catch {
    Print-Error "Amplify deployment failed. Check the error messages above."
    exit 1
}

Write-Host ""
Write-Host "Step 5: Verifying deployment..." -ForegroundColor Cyan
Write-Host ""

# Check if amplify_outputs.json was generated
if (Test-Path "../amplify_outputs.json") {
    Print-Success "amplify_outputs.json generated"
} else {
    Print-Error "amplify_outputs.json not found. Deployment may have failed."
    exit 1
}

# Get Lambda function name
try {
    $lambdaFunction = aws lambda list-functions --query "Functions[?contains(FunctionName, 'vaani-voice')].FunctionName" --output text
    if ($lambdaFunction) {
        Print-Success "Lambda function deployed: $lambdaFunction"
    } else {
        Print-Error "Lambda function not found"
    }
} catch {
    Print-Error "Could not verify Lambda function"
}

# Get S3 bucket name
try {
    $s3Output = aws s3 ls | Select-String "vaani-audio"
    if ($s3Output) {
        $s3Bucket = ($s3Output -split '\s+')[2]
        Print-Success "S3 bucket created: $s3Bucket"
    } else {
        Print-Error "S3 bucket not found"
    }
} catch {
    Print-Error "Could not verify S3 bucket"
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Deployment Complete!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Print-Success "VAANI platform deployed successfully!"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Start frontend: cd frontend; npm run dev"
Write-Host "  2. Open browser: http://localhost:5173/voice"
Write-Host "  3. Test voice recording and processing"
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Yellow
if ($lambdaFunction) {
    Write-Host "  - View logs: aws logs tail /aws/lambda/$lambdaFunction --follow"
}
if ($s3Bucket) {
    Write-Host "  - List S3 files: aws s3 ls s3://$s3Bucket --recursive"
}
Write-Host "  - Delete sandbox: cd amplify; npx ampx sandbox delete"
Write-Host ""
Print-Info "See DEPLOYMENT-GUIDE.md for more information"
Write-Host ""
