# VAANI - Testing Guide

Complete guide for testing the VAANI voice platform.

## Pre-Deployment Testing

### 1. Prerequisites Check

```bash
# Check all required tools
node --version    # Should be 18.x+
npm --version     # Should be 9.x+
python --version  # Should be 3.11.x
aws --version     # AWS CLI installed

# Verify AWS credentials
aws sts get-caller-identity
```

### 2. Dependency Installation

```bash
# Backend dependencies
cd amplify
npm install

# Frontend dependencies
cd ../frontend
npm install aws-amplify
```

## Deployment Testing

### 1. Deploy to Sandbox

```bash
cd amplify
npx ampx sandbox
```

**Expected Output:**
```
✔ Building resources...
✔ Deploying Lambda function...
✔ Creating S3 bucket...
✔ Configuring IAM policies...
✔ Sandbox deployed successfully!

Resources:
  - Lambda: vaani-voice-processor-xxxxx
  - S3 Bucket: vaani-audio-{account}-{region}
  - API Gateway: https://xxxxx.execute-api.{region}.amazonaws.com
```

### 2. Verify Resources

```bash
# Check Lambda function
aws lambda get-function --function-name vaani-voice-processor

# Check S3 bucket
aws s3 ls | grep vaani-audio

# Check CloudFormation stack
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE | grep amplify
```

## API Testing

### 1. Health Check

```bash
# Get API Gateway URL from amplify_outputs.json
API_URL="https://xxxxx.execute-api.us-east-1.amazonaws.com"

# Test health endpoint
curl $API_URL/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000000",
  "services": {
    "transcribe": "available",
    "polly": "available",
    "s3": "available"
  }
}
```

### 2. Text-to-Speech Test

```bash
# Test synthesis endpoint
curl -X POST $API_URL/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello from VAANI voice assistant",
    "voice_id": "Joanna",
    "language_code": "en-US"
  }' \
  --output test-output.mp3

# Play the audio (macOS)
afplay test-output.mp3

# Play the audio (Linux)
mpg123 test-output.mp3

# Play the audio (Windows)
start test-output.mp3
```

### 3. Voice Processing Test (with sample audio)

First, create a test audio file or use an existing one:

```bash
# Record a test audio (macOS)
sox -d test-input.wav trim 0 5

# Convert to base64
base64 test-input.wav > test-audio-base64.txt

# Test voice endpoint
curl -X POST $API_URL/voice \
  -H "Content-Type: application/json" \
  -d "{
    \"audio_base64\": \"$(cat test-audio-base64.txt)\",
    \"language_code\": \"en-US\",
    \"voice_id\": \"Joanna\"
  }"
```

**Expected Response:**
```json
{
  "success": true,
  "transcribed_text": "what services are available",
  "response_text": "You said: what services are available. This is a placeholder response.",
  "audio_url": "https://vaani-audio-xxx.s3.amazonaws.com/output/xxx.mp3?...",
  "job_name": "vaani-abc123def456"
}
```

## Frontend Testing

### 1. Start Development Server

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 2. Browser Testing

Open `http://localhost:5173/voice` in your browser.

#### Test Checklist:

- [ ] Page loads without errors
- [ ] "Start Recording" button is visible
- [ ] Click "Start Recording"
  - [ ] Browser requests microphone permission
  - [ ] Button changes to "Stop Recording"
  - [ ] Button shows animation (pulsing)
- [ ] Speak: "Hello, what services are available?"
- [ ] Click "Stop Recording"
  - [ ] Processing indicator appears
  - [ ] "Processing your voice..." message shown
- [ ] Wait for response (10-30 seconds)
  - [ ] Transcribed text appears in blue box
  - [ ] Response text appears in green box
  - [ ] Audio player appears
  - [ ] Audio plays automatically
- [ ] Click "Play Again" button
  - [ ] Audio plays again

### 3. Browser Console Testing

Open browser DevTools (F12) and check:

```javascript
// Check Amplify configuration
console.log(window.Amplify);

// Check for errors
// Should see no red errors in console
```

### 4. Network Testing

In browser DevTools → Network tab:

1. Start recording and stop
2. Check for POST request to `/voice`
3. Verify:
   - Status: 200 OK
   - Response time: 10-30 seconds
   - Response body contains `success: true`

## Component Testing

### 1. VoiceRecorder Component

```javascript
// Test in browser console
const recorder = document.querySelector('.voice-recorder-container');
console.log(recorder); // Should not be null
```

### 2. MediaRecorder API

```javascript
// Test microphone access
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    console.log('✓ Microphone access granted');
    stream.getTracks().forEach(track => track.stop());
  })
  .catch(err => {
    console.error('✗ Microphone access denied:', err);
  });
```

### 3. Audio Playback

```javascript
// Test audio element
const audio = document.querySelector('audio');
console.log('Audio element:', audio);
console.log('Can play MP3:', audio.canPlayType('audio/mpeg'));
```

## Lambda Function Testing

### 1. View Logs

```bash
# Tail Lambda logs in real-time
aws logs tail /aws/lambda/vaani-voice-processor --follow

# View recent logs
aws logs tail /aws/lambda/vaani-voice-processor --since 1h
```

### 2. Invoke Lambda Directly

```bash
# Create test event
cat > test-event.json << EOF
{
  "body": "{\"audio_base64\":\"test\",\"language_code\":\"en-US\",\"voice_id\":\"Joanna\"}"
}
EOF

# Invoke Lambda
aws lambda invoke \
  --function-name vaani-voice-processor \
  --payload file://test-event.json \
  response.json

# View response
cat response.json
```

### 3. Check Lambda Metrics

```bash
# Get Lambda metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=vaani-voice-processor \
  --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 300 \
  --statistics Sum
```

## S3 Testing

### 1. List Bucket Contents

```bash
# List all files
aws s3 ls s3://vaani-audio-{account}-{region}/ --recursive

# List input files
aws s3 ls s3://vaani-audio-{account}-{region}/input/

# List output files
aws s3 ls s3://vaani-audio-{account}-{region}/output/
```

### 2. Download Test File

```bash
# Download a generated audio file
aws s3 cp s3://vaani-audio-{account}-{region}/output/{file-id}.mp3 ./test-download.mp3

# Play it
afplay test-download.mp3  # macOS
```

### 3. Check Lifecycle Policy

```bash
# Get bucket lifecycle configuration
aws s3api get-bucket-lifecycle-configuration \
  --bucket vaani-audio-{account}-{region}
```

**Expected Output:**
```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 1
      },
      "ID": "DeleteTemporaryAudioFiles",
      "Status": "Enabled"
    }
  ]
}
```

## Transcribe Testing

### 1. List Transcription Jobs

```bash
# List recent jobs
aws transcribe list-transcription-jobs --max-results 10
```

### 2. Get Job Details

```bash
# Get specific job
aws transcribe get-transcription-job \
  --transcription-job-name vaani-{job-id}
```

## Polly Testing

### 1. Test Voice Synthesis

```bash
# Synthesize test speech
aws polly synthesize-speech \
  --text "Hello from VAANI" \
  --output-format mp3 \
  --voice-id Joanna \
  --engine neural \
  polly-test.mp3

# Play it
afplay polly-test.mp3  # macOS
```

### 2. List Available Voices

```bash
# List all Polly voices
aws polly describe-voices --language-code en-US
```

## Performance Testing

### 1. Measure End-to-End Latency

```bash
# Time the complete flow
time curl -X POST $API_URL/voice \
  -H "Content-Type: application/json" \
  -d @test-request.json
```

**Expected Times:**
- Total: 10-30 seconds
- Upload: <1 second
- Transcribe: 5-20 seconds
- AI Processing: <1 second
- Polly: 1-3 seconds
- S3 Save: <1 second

### 2. Load Testing (Optional)

```bash
# Install Apache Bench
# macOS: brew install httpd
# Linux: apt-get install apache2-utils

# Run load test (10 concurrent requests)
ab -n 10 -c 2 -p test-request.json -T application/json $API_URL/voice
```

## Error Testing

### 1. Test Invalid Input

```bash
# Test with empty audio
curl -X POST $API_URL/voice \
  -H "Content-Type: application/json" \
  -d '{"audio_base64":"","language_code":"en-US"}'

# Expected: 400 Bad Request
```

### 2. Test Missing Parameters

```bash
# Test without required fields
curl -X POST $API_URL/voice \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected: 422 Unprocessable Entity
```

### 3. Test Large Audio

```bash
# Test with very large audio (>10MB)
# Should handle gracefully or return appropriate error
```

## Monitoring Testing

### 1. CloudWatch Dashboard

1. Go to AWS Console → CloudWatch
2. Create dashboard with:
   - Lambda invocations
   - Lambda errors
   - Lambda duration
   - API Gateway requests
   - S3 bucket size

### 2. Set Up Alarms

```bash
# Create alarm for Lambda errors
aws cloudwatch put-metric-alarm \
  --alarm-name vaani-lambda-errors \
  --alarm-description "Alert on Lambda errors" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=FunctionName,Value=vaani-voice-processor
```

## Cleanup Testing

### 1. Verify Auto-Cleanup

```bash
# Upload a test file
echo "test" > test.txt
aws s3 cp test.txt s3://vaani-audio-{account}-{region}/test.txt

# Check after 24 hours - should be deleted automatically
```

### 2. Manual Cleanup

```bash
# Delete all files in bucket
aws s3 rm s3://vaani-audio-{account}-{region}/ --recursive

# Delete sandbox
cd amplify
npx ampx sandbox delete
```

## Troubleshooting Tests

### Common Issues to Test

1. **Microphone Permission Denied**
   - Test: Deny permission in browser
   - Expected: Error message displayed

2. **Network Timeout**
   - Test: Disconnect internet during processing
   - Expected: Timeout error after 5 minutes

3. **Invalid Audio Format**
   - Test: Send non-audio data
   - Expected: Transcribe error handled gracefully

4. **S3 Access Denied**
   - Test: Remove S3 permissions temporarily
   - Expected: Clear error message

## Test Checklist

### Pre-Deployment
- [ ] All prerequisites installed
- [ ] AWS credentials configured
- [ ] Dependencies installed

### Deployment
- [ ] Sandbox deploys successfully
- [ ] Lambda function created
- [ ] S3 bucket created
- [ ] IAM policies attached
- [ ] amplify_outputs.json generated

### API Testing
- [ ] Health endpoint returns 200
- [ ] Synthesis endpoint works
- [ ] Voice endpoint processes audio
- [ ] Error handling works

### Frontend Testing
- [ ] Page loads without errors
- [ ] Recording starts/stops
- [ ] Audio uploads successfully
- [ ] Transcription displays
- [ ] Response plays automatically

### Integration Testing
- [ ] End-to-end flow works
- [ ] Audio quality is good
- [ ] Latency is acceptable
- [ ] Errors are handled gracefully

### Performance Testing
- [ ] Response time < 30 seconds
- [ ] Concurrent requests work
- [ ] No memory leaks

### Security Testing
- [ ] HTTPS enforced
- [ ] CORS configured correctly
- [ ] IAM permissions are minimal
- [ ] No sensitive data in logs

## Success Criteria

✅ All API endpoints return expected responses  
✅ Frontend can record and process voice  
✅ Audio quality is clear and natural  
✅ End-to-end latency < 30 seconds  
✅ No errors in CloudWatch logs  
✅ S3 lifecycle policy working  
✅ IAM permissions are least-privilege  
✅ Cost is within expected range  

## Next Steps After Testing

1. Add authentication (Cognito)
2. Implement real AI model
3. Add analytics tracking
4. Set up CI/CD pipeline
5. Deploy to production
6. Monitor and optimize

---

**Testing complete? Deploy to production!**
