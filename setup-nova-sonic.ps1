#!/usr/bin/env pwsh
# VAANI Nova Sonic Setup Script
# This script configures Amazon Nova Sonic for voice synthesis

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VAANI Nova Sonic Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if AWS CLI is installed
Write-Host "Checking AWS CLI..." -ForegroundColor Yellow
$awsVersion = aws --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: AWS CLI not found!" -ForegroundColor Red
    Write-Host "Please install AWS CLI first: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}
Write-Host "AWS CLI found: $awsVersion" -ForegroundColor Green
Write-Host ""

# Check AWS credentials
Write-Host "Checking AWS credentials..." -ForegroundColor Yellow
$awsIdentity = aws sts get-caller-identity 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: AWS credentials not configured!" -ForegroundColor Red
    Write-Host "Run: aws configure" -ForegroundColor Yellow
    exit 1
}
Write-Host "AWS credentials configured" -ForegroundColor Green
Write-Host ""

# Check Bedrock access
Write-Host "Checking AWS Bedrock access..." -ForegroundColor Yellow
$bedrockModels = aws bedrock list-foundation-models --region us-east-1 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Cannot access Bedrock. Checking permissions..." -ForegroundColor Yellow
} else {
    Write-Host "Bedrock access confirmed" -ForegroundColor Green
}
Write-Host ""

# Request Nova Sonic model access
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Nova Sonic Model Access" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To use Amazon Nova Sonic, you need to request model access:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to AWS Console > Bedrock > Model Access" -ForegroundColor White
Write-Host "2. Find 'Amazon Nova Sonic' in the list" -ForegroundColor White
Write-Host "3. Click 'Request Access' or 'Enable'" -ForegroundColor White
Write-Host "4. Wait for approval (usually instant)" -ForegroundColor White
Write-Host ""
Write-Host "Direct link: https://console.aws.amazon.com/bedrock/home?region=us-east-1#/modelaccess" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Have you enabled Nova Sonic access? (y/n)"
if ($response -ne "y") {
    Write-Host ""
    Write-Host "Please enable Nova Sonic access first, then run this script again." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Updating Environment Variables" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Update .env file for ai-backend
$envPath = "VAANI/ai-backend/.env"
if (Test-Path $envPath) {
    Write-Host "Updating $envPath..." -ForegroundColor Yellow
    
    $envContent = Get-Content $envPath -Raw
    
    # Add Nova Sonic configuration
    if ($envContent -notmatch "NOVA_SONIC_ENABLED") {
        Add-Content $envPath "`n# Nova Sonic Configuration"
        Add-Content $envPath "NOVA_SONIC_ENABLED=true"
        Add-Content $envPath "NOVA_SONIC_MODEL_ID=amazon.nova-sonic-v1:0"
        Write-Host "Nova Sonic configuration added" -ForegroundColor Green
    } else {
        Write-Host "Nova Sonic already configured" -ForegroundColor Green
    }
} else {
    Write-Host "Creating $envPath..." -ForegroundColor Yellow
    @"
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# Nova Sonic Configuration
NOVA_SONIC_ENABLED=true
NOVA_SONIC_MODEL_ID=amazon.nova-sonic-v1:0

# Bedrock Configuration
BEDROCK_MODEL_ID=us.amazon.nova-lite-v1:0
"@ | Out-File -FilePath $envPath -Encoding UTF8
    Write-Host "Environment file created" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Testing Nova Sonic" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create test script
$testScript = @"
import boto3
import json
import sys

try:
    print("Initializing Bedrock Runtime client...")
    client = boto3.client('bedrock-runtime', region_name='us-east-1')
    
    print("Testing Nova Sonic model...")
    payload = {
        "text": "Hello, this is a test of Amazon Nova Sonic voice synthesis.",
        "voice": "Joanna",
        "languageCode": "en-US",
        "outputFormat": "mp3",
        "sampleRate": 24000,
        "engine": "generative"
    }
    
    response = client.invoke_model(
        modelId='amazon.nova-sonic-v1:0',
        contentType='application/json',
        accept='audio/mpeg',
        body=json.dumps(payload)
    )
    
    audio_data = response['body'].read()
    print(f"SUCCESS! Generated {len(audio_data)} bytes of audio")
    
    # Save test audio
    with open('test_nova_sonic.mp3', 'wb') as f:
        f.write(audio_data)
    print("Test audio saved as: test_nova_sonic.mp3")
    
    sys.exit(0)
    
except Exception as e:
    print(f"ERROR: {str(e)}")
    print("\nPossible issues:")
    print("1. Nova Sonic model access not enabled")
    print("2. AWS credentials not configured")
    print("3. Insufficient IAM permissions")
    print("\nPlease check AWS Console > Bedrock > Model Access")
    sys.exit(1)
"@

$testScript | Out-File -FilePath "test_nova_sonic.py" -Encoding UTF8

Write-Host "Running Nova Sonic test..." -ForegroundColor Yellow
python test_nova_sonic.py

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Nova Sonic Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your voice assistant is now using Amazon Nova Sonic!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Deploy the updated Lambda functions" -ForegroundColor White
    Write-Host "2. Test voice synthesis in your app" -ForegroundColor White
    Write-Host "3. Monitor CloudWatch logs for Nova Sonic usage" -ForegroundColor White
    Write-Host ""
    
    # Cleanup test file
    Remove-Item "test_nova_sonic.py" -ErrorAction SilentlyContinue
    
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Setup Failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check the error messages above." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common solutions:" -ForegroundColor Cyan
    Write-Host "1. Enable Nova Sonic in AWS Console > Bedrock > Model Access" -ForegroundColor White
    Write-Host "2. Verify AWS credentials: aws configure" -ForegroundColor White
    Write-Host "3. Check IAM permissions for Bedrock" -ForegroundColor White
    Write-Host ""
    
    # Keep test file for debugging
    Write-Host "Test script saved as: test_nova_sonic.py" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
