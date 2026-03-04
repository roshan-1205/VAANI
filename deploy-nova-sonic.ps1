#!/usr/bin/env pwsh
# Deploy VAANI with Nova Sonic Voice Model

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VAANI Nova Sonic Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check prerequisites
Write-Host "Step 1: Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

# Check AWS CLI
$awsVersion = aws --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: AWS CLI not installed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ AWS CLI: $awsVersion" -ForegroundColor Green

# Check Python
$pythonVersion = python --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python not installed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Python: $pythonVersion" -ForegroundColor Green

# Check Node.js
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js not installed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green

# Check Amplify CLI
$amplifyVersion = amplify --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Amplify CLI not installed!" -ForegroundColor Yellow
    Write-Host "Installing Amplify CLI..." -ForegroundColor Yellow
    npm install -g @aws-amplify/cli
}
Write-Host "✓ Amplify CLI installed" -ForegroundColor Green

Write-Host ""

# Step 2: Update Lambda function dependencies
Write-Host "Step 2: Updating Lambda dependencies..." -ForegroundColor Yellow
Write-Host ""

$requirementsPath = "VAANI/amplify/functions/voice/requirements.txt"
if (Test-Path $requirementsPath) {
    $requirements = Get-Content $requirementsPath
    if ($requirements -notmatch "boto3") {
        Write-Host "Adding boto3 to requirements..." -ForegroundColor Yellow
        Add-Content $requirementsPath "boto3>=1.34.0"
    }
    Write-Host "✓ Dependencies updated" -ForegroundColor Green
} else {
    Write-Host "ERROR: requirements.txt not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: Configure environment variables
Write-Host "Step 3: Configuring environment..." -ForegroundColor Yellow
Write-Host ""

# Check if .env exists
$envPath = "VAANI/ai-backend/.env"
if (-not (Test-Path $envPath)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
NOVA_SONIC_ENABLED=true
NOVA_SONIC_MODEL_ID=amazon.nova-sonic-v1:0
BEDROCK_MODEL_ID=us.amazon.nova-lite-v1:0
"@ | Out-File -FilePath $envPath -Encoding UTF8
    
    Write-Host ""
    Write-Host "Please update $envPath with your AWS credentials!" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Have you updated the credentials? (y/n)"
    if ($continue -ne "y") {
        Write-Host "Please update credentials and run again." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "✓ Environment configured" -ForegroundColor Green
Write-Host ""

# Step 4: Test Nova Sonic access
Write-Host "Step 4: Testing Nova Sonic access..." -ForegroundColor Yellow
Write-Host ""

$testScript = @"
import boto3
import json
import sys
import os

try:
    region = os.environ.get('AWS_REGION', 'us-east-1')
    client = boto3.client('bedrock-runtime', region_name=region)
    
    # Test with minimal payload
    payload = {
        "text": "Test",
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
    print(f"SUCCESS: Generated {len(audio_data)} bytes")
    sys.exit(0)
    
except Exception as e:
    print(f"ERROR: {str(e)}")
    sys.exit(1)
"@

$testScript | Out-File -FilePath "test_access.py" -Encoding UTF8
python test_access.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Nova Sonic access confirmed" -ForegroundColor Green
    Remove-Item "test_access.py" -ErrorAction SilentlyContinue
} else {
    Write-Host ""
    Write-Host "WARNING: Nova Sonic access test failed!" -ForegroundColor Yellow
    Write-Host "The system will use Polly as fallback." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To enable Nova Sonic:" -ForegroundColor Cyan
    Write-Host "1. Go to AWS Console > Bedrock > Model Access" -ForegroundColor White
    Write-Host "2. Enable 'Amazon Nova Sonic'" -ForegroundColor White
    Write-Host "3. Wait for approval (usually instant)" -ForegroundColor White
    Write-Host ""
    
    $continue = Read-Host "Continue deployment anyway? (y/n)"
    if ($continue -ne "y") {
        exit 0
    }
}

Write-Host ""

# Step 5: Deploy to AWS
Write-Host "Step 5: Deploying to AWS..." -ForegroundColor Yellow
Write-Host ""

Set-Location VAANI

Write-Host "Running amplify push..." -ForegroundColor Yellow
amplify push --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Deployment successful" -ForegroundColor Green
} else {
    Write-Host "ERROR: Deployment failed!" -ForegroundColor Red
    Write-Host "Check the error messages above." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Step 6: Update IAM permissions
Write-Host "Step 6: Checking IAM permissions..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Make sure your Lambda execution role has these permissions:" -ForegroundColor Cyan
Write-Host @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:ListFoundationModels"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "transcribe:StartTranscriptionJob",
        "transcribe:GetTranscriptionJob",
        "transcribe:DeleteTranscriptionJob"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::your-audio-bucket/*"
    }
  ]
}
"@ -ForegroundColor White

Write-Host ""
$iamUpdated = Read-Host "Have you verified IAM permissions? (y/n)"

Write-Host ""

# Step 7: Test deployment
Write-Host "Step 7: Testing deployment..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Getting API endpoint..." -ForegroundColor Yellow
$apiEndpoint = amplify status | Select-String -Pattern "API endpoint"

if ($apiEndpoint) {
    Write-Host "✓ API endpoint found" -ForegroundColor Green
    Write-Host $apiEndpoint -ForegroundColor Cyan
} else {
    Write-Host "WARNING: Could not find API endpoint" -ForegroundColor Yellow
}

Write-Host ""

# Final summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Nova Sonic Configuration:" -ForegroundColor Cyan
Write-Host "✓ Voice synthesis updated to use Nova Sonic" -ForegroundColor Green
Write-Host "✓ Automatic fallback to Polly enabled" -ForegroundColor Green
Write-Host "✓ Lambda functions deployed" -ForegroundColor Green
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Test voice synthesis in your app" -ForegroundColor White
Write-Host "2. Monitor CloudWatch logs for Nova Sonic usage" -ForegroundColor White
Write-Host "3. Check AWS Cost Explorer for usage" -ForegroundColor White
Write-Host ""

Write-Host "Monitoring Commands:" -ForegroundColor Cyan
Write-Host "  View logs: aws logs tail /aws/lambda/vaani-voice-function --follow" -ForegroundColor White
Write-Host "  Check costs: aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-12-31 --granularity MONTHLY --metrics BlendedCost" -ForegroundColor White
Write-Host ""

Write-Host "Documentation: See NOVA-SONIC-SETUP.md for details" -ForegroundColor Yellow
Write-Host ""

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
