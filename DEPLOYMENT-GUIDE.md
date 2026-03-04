# VAANI - AWS Amplify Gen2 Deployment Guide

Complete guide for deploying VAANI voice-first platform using AWS Amplify Gen2 serverless architecture.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         VAANI Architecture                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   React      │
│   Frontend   │──────┐
└──────────────┘      │
                      │ HTTPS
                      ▼
              ┌───────────────┐
              │  API Gateway  │
              │  (Amplify)    │
              └───────────────┘
                      │
                      ▼
              ┌───────────────────────────────────┐
              │   Lambda Function (Python 3.11)   │
              │   - FastAPI + Mangum              │
              │   - Voice Processing Logic        │
              └───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐
│   Amazon     │ │  Amazon  │ │    S3    │
│  Transcribe  │ │  Polly   │ │  Bucket  │
│              │ │          │ │          │
│ Speech-to-   │ │ Text-to- │ │  Audio   │
│   Text       │ │  Speech  │ │ Storage  │
└──────────────┘ └──────────┘ └──────────┘
```

## Prerequisites

### Required Software
- Node.js 18.x or later
- npm 9.x or later
- Python 3.11
- AWS CLI configured with credentials
- Git

### AWS Account Requirements
- Active AWS account
- IAM user with AdministratorAccess or equivalent permissions
- AWS CLI configured: `aws configure`

### Verify Prerequisites
```bash
# Check Node.js version
node --version  # Should be 18.x or higher

# Check npm version
npm --version   # Should be 9.x or higher

# Check Python version
python --version  # Should be 3.11.x

# Check AWS CLI
aws --version
aws sts get-caller-identity  # Verify AWS credentials
```

## Project Structure

```
VAANI/
├── amplify/
│   ├── backend.ts                    # Main backend configuration
│   ├── auth/
│   │   └── resource.ts              # Cognito auth configuration
│   ├── data/
│   │   └── resource.ts              # Data/API configuration
│   ├── functions/
│   │   └── voice/
│   │       ├── resource.ts          # Lambda function definition
│   │       ├── handler.py           # FastAPI + Mangum handler
│   │       └── requirements.txt     # Python dependencies
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── VoiceRecorder.jsx   # Voice recording component
│   │   └── App.jsx
│   └── package.json
└── amplify_outputs.json             # Generated after deployment
```

## Step-by-Step Deployment

### Step 1: Initialize Amplify Project

If starting fresh:
```bash
cd VAANI
npm create amplify@latest
```

If using existing project:
```bash
cd VAANI/amplify
npm install
```

### Step 2: Install Dependencies

```bash
# Install Amplify backend dependencies
cd amplify
npm install

# Install frontend dependencies
cd ../frontend
npm install aws-amplify
```

### Step 3: Configure AWS Credentials

Ensure AWS credentials are configured:
```bash
aws configure
# Enter:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (e.g., us-east-1)
# - Default output format (json)
```

### Step 4: Deploy to Sandbox Environment

The sandbox is a personal development environment:

```bash
cd VAANI/amplify
npx ampx sandbox
```

This will:
- Create CloudFormation stacks
- Deploy Lambda function with Python dependencies
- Create S3 bucket for audio storage
- Set up IAM roles and policies
- Generate `amplify_outputs.json`

**Expected Output:**
```
✔ Deploying resources...
✔ Lambda function deployed: vaani-voice-processor
✔ S3 bucket created: vaani-audio-{account}-{region}
✔ IAM policies attached
✔ API Gateway configured

Sandbox URL: https://xxxxx.execute-api.us-east-1.amazonaws.com
```

### Step 5: Configure Frontend

Update your frontend to use Amplify:

```javascript
// frontend/src/main.jsx or index.js
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);
```

### Step 6: Test Voice Functionality

1. Start frontend development server:
```bash
cd frontend
npm run dev
```

2. Open browser to `http://localhost:5173` (or your dev server URL)

3. Test voice recording:
   - Click "Start Recording"
   - Speak a question
   - Click "Stop Recording"
   - Wait for transcription and response
   - Listen to audio response

### Step 7: Deploy to Production

When ready for production:

```bash
cd VAANI/amplify

# Deploy to production branch
npx ampx pipeline-deploy --branch main --app-id <your-app-id>
```

Or use Amplify Console:
1. Go to AWS Amplify Console
2. Connect your Git repository
3. Configure build settings
4. Deploy

## Environment Variables

The Lambda function uses these environment variables (automatically set by Amplify):

- `AUDIO_BUCKET_NAME`: S3 bucket for audio storage
- `AWS_REGION_NAME`: AWS region
- `LOG_LEVEL`: Logging level (INFO, DEBUG, ERROR)
- `POWERTOOLS_SERVICE_NAME`: Service name for logging

## IAM Permissions

The Lambda function has least-privilege permissions:

### Transcribe Permissions
```json
{
  "Effect": "Allow",
  "Action": [
    "transcribe:StartTranscriptionJob",
    "transcribe:GetTranscriptionJob",
    "transcribe:DeleteTranscriptionJob"
  ],
  "Resource": "*"
}
```

### Polly Permissions
```json
{
  "Effect": "Allow",
  "Action": [
    "polly:SynthesizeSpeech"
  ],
  "Resource": "*"
}
```

### S3 Permissions
```json
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "s3:PutObject",
    "s3:DeleteObject"
  ],
  "Resource": [
    "arn:aws:s3:::vaani-audio-*",
    "arn:aws:s3:::vaani-audio-*/*"
  ]
}
```

## API Endpoints

### POST /voice
Main voice processing endpoint.

**Request:**
```json
{
  "audio_base64": "base64_encoded_audio_data",
  "language_code": "en-US",
  "voice_id": "Joanna"
}
```

**Response:**
```json
{
  "success": true,
  "transcribed_text": "What is the weather today?",
  "response_text": "You said: What is the weather today? This is a placeholder response.",
  "audio_url": "https://s3.amazonaws.com/...",
  "job_name": "vaani-abc123"
}
```

### POST /synthesize
Text-to-speech synthesis.

**Request:**
```json
{
  "text": "Hello, welcome to VAANI",
  "voice_id": "Joanna",
  "language_code": "en-US"
}
```

**Response:**
Binary audio/mpeg data

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00",
  "services": {
    "transcribe": "available",
    "polly": "available",
    "s3": "available"
  }
}
```

## Monitoring and Debugging

### CloudWatch Logs

View Lambda logs:
```bash
aws logs tail /aws/lambda/vaani-voice-processor --follow
```

Or in AWS Console:
1. Go to CloudWatch
2. Navigate to Log Groups
3. Find `/aws/lambda/vaani-voice-processor`

### Common Issues

#### Issue: "AUDIO_BUCKET_NAME not set"
**Solution:** Redeploy sandbox to ensure environment variables are set:
```bash
npx ampx sandbox --once
```

#### Issue: "Transcription timeout"
**Solution:** Increase Lambda timeout in `resource.ts`:
```typescript
timeoutSeconds: 300, // Increase to 5 minutes
```

#### Issue: "Access Denied" errors
**Solution:** Verify IAM policies are attached:
```bash
aws lambda get-function --function-name vaani-voice-processor
```

#### Issue: Audio format not supported
**Solution:** Ensure MediaRecorder uses supported format:
```javascript
const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
  ? 'audio/webm' 
  : 'audio/mp4';
```

## Cost Optimization

### S3 Lifecycle Policy
Audio files are automatically deleted after 1 day (configured in `backend.ts`).

### Lambda Optimization
- Memory: 512 MB (adjust based on usage)
- Timeout: 300 seconds (5 minutes)
- Consider provisioned concurrency for production

### Transcribe Optimization
- Use appropriate language models
- Delete transcription jobs after completion (handled automatically)

### Estimated Costs (Monthly)
- Lambda: ~$5-20 (depending on usage)
- S3: ~$1-5 (with lifecycle policy)
- Transcribe: ~$10-50 (pay per minute)
- Polly: ~$5-20 (pay per character)
- API Gateway: ~$3-10

**Total: ~$25-100/month** for moderate usage

## Security Best Practices

1. **CORS Configuration**: Update allowed origins in production
2. **API Authentication**: Add Cognito authentication for production
3. **Input Validation**: Validate audio size and format
4. **Rate Limiting**: Implement API throttling
5. **Encryption**: S3 bucket uses server-side encryption
6. **Secrets Management**: Use AWS Secrets Manager for sensitive data

## Scaling Considerations

### Lambda Scaling
- Concurrent executions: 1000 (default)
- Increase if needed via AWS Support

### S3 Scaling
- Automatically scales
- Consider CloudFront for global distribution

### API Gateway Scaling
- Automatically scales
- Monitor throttling limits

## Next Steps

1. **Integrate AI Model**: Replace placeholder in `process_text_with_ai()`
2. **Add Authentication**: Implement Cognito user authentication
3. **Multi-language Support**: Add more language codes
4. **Custom Voices**: Configure Polly neural voices
5. **Analytics**: Add CloudWatch metrics and dashboards
6. **CI/CD**: Set up automated deployments

## Troubleshooting Commands

```bash
# Check Lambda function
aws lambda get-function --function-name vaani-voice-processor

# List S3 buckets
aws s3 ls | grep vaani-audio

# Test Lambda locally (if using SAM)
sam local invoke vaani-voice-processor

# View CloudFormation stacks
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE

# Delete sandbox (cleanup)
npx ampx sandbox delete
```

## Support and Resources

- [AWS Amplify Gen2 Documentation](https://docs.amplify.aws/react/)
- [Amazon Transcribe Documentation](https://docs.aws.amazon.com/transcribe/)
- [Amazon Polly Documentation](https://docs.aws.amazon.com/polly/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Mangum Documentation](https://mangum.io/)

## License

This project is part of the VAANI platform.
