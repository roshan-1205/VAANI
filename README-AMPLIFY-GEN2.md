# VAANI - AWS Amplify Gen2 Serverless Platform

> Voice-First Public Service Platform built with AWS Amplify Gen2, Lambda, Transcribe, and Polly

## Overview

VAANI is a production-ready, serverless voice-first platform that enables natural voice interactions for public services. Built entirely on AWS serverless technologies with Infrastructure as Code (IaC) using AWS Amplify Gen2.

### Key Features

✅ **Fully Serverless** - No servers to manage, auto-scaling, pay-per-use  
✅ **Voice-to-Text** - Amazon Transcribe with multi-language support  
✅ **Text-to-Voice** - Amazon Polly neural voices for natural speech  
✅ **FastAPI Backend** - Modern Python web framework adapted for Lambda  
✅ **React Frontend** - Modern SPA with MediaRecorder API  
✅ **Infrastructure as Code** - Complete AWS CDK via Amplify Gen2  
✅ **Least-Privilege IAM** - Security best practices built-in  
✅ **Auto-Cleanup** - S3 lifecycle policies for cost optimization  
✅ **Production-Ready** - Error handling, logging, monitoring  

## Architecture

```
React Frontend → API Gateway → Lambda (FastAPI) → Transcribe/Polly/S3
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Quick Start

```bash
# 1. Install dependencies
cd amplify && npm install
cd ../frontend && npm install aws-amplify

# 2. Deploy backend
cd ../amplify
npx ampx sandbox

# 3. Start frontend
cd ../frontend
npm run dev
```

See [QUICK-START.md](./QUICK-START.md) for detailed quick start guide.

## Complete Documentation

| Document | Description |
|----------|-------------|
| [QUICK-START.md](./QUICK-START.md) | 10-minute setup guide |
| [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) | Complete deployment instructions |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture and design |

## Project Structure

```
VAANI/
├── amplify/                          # AWS Amplify Gen2 Backend
│   ├── backend.ts                    # Main backend configuration
│   ├── auth/resource.ts              # Cognito authentication
│   ├── data/resource.ts              # Data models (DynamoDB)
│   └── functions/voice/
│       ├── resource.ts               # Lambda function definition
│       ├── handler.py                # FastAPI + Mangum handler
│       └── requirements.txt          # Python dependencies
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── VoiceRecorder.jsx    # Voice recording component
│   │   ├── pages/
│   │   │   └── VoiceAssistantPage.jsx
│   │   └── App.jsx
│   └── package.json
│
├── amplify_outputs.json              # Generated Amplify config
├── ARCHITECTURE.md                   # Architecture documentation
├── DEPLOYMENT-GUIDE.md               # Deployment guide
└── QUICK-START.md                    # Quick start guide
```

## Technology Stack

### Backend
- **AWS Lambda** - Serverless compute (Python 3.11)
- **FastAPI** - Modern Python web framework
- **Mangum** - ASGI adapter for Lambda
- **Amazon Transcribe** - Speech-to-text
- **Amazon Polly** - Text-to-speech (Neural voices)
- **Amazon S3** - Audio file storage
- **AWS Amplify Gen2** - Infrastructure as Code

### Frontend
- **React 18** - UI framework
- **AWS Amplify SDK** - API integration
- **MediaRecorder API** - Audio recording
- **Tailwind CSS** - Styling

## API Endpoints

### POST /voice
Main voice processing endpoint.

**Request:**
```json
{
  "audio_base64": "base64_encoded_audio",
  "language_code": "en-US",
  "voice_id": "Joanna"
}
```

**Response:**
```json
{
  "success": true,
  "transcribed_text": "What services are available?",
  "response_text": "Here are the available services...",
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

**Response:** Binary audio/mpeg data

### GET /health
Health check endpoint.

## Voice Processing Flow

1. **Record Audio** - User speaks into microphone (MediaRecorder)
2. **Upload to S3** - Audio stored temporarily in S3
3. **Transcribe** - Amazon Transcribe converts speech to text
4. **AI Processing** - Process text with AI model (customizable)
5. **Synthesize** - Amazon Polly converts response to speech
6. **Store & Return** - Audio saved to S3, presigned URL returned
7. **Play Response** - Frontend plays audio automatically

## IAM Permissions (Least Privilege)

The Lambda function has minimal required permissions:

- **Transcribe**: Start/Get/Delete transcription jobs
- **Polly**: Synthesize speech only
- **S3**: Read/Write to specific bucket only

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete IAM policy details.

## Cost Optimization

- **S3 Lifecycle**: Auto-delete files after 1 day
- **Lambda**: 512 MB memory, 5-minute timeout
- **Transcribe**: Jobs deleted after completion
- **Presigned URLs**: 1-hour expiry

**Estimated Cost**: $25-100/month for moderate usage

## Security Features

✅ HTTPS/TLS encryption in transit  
✅ S3 server-side encryption at rest  
✅ Block all public S3 access  
✅ Least-privilege IAM policies  
✅ CORS configuration  
✅ Input validation  
✅ Automatic data cleanup (1-day retention)  

## Monitoring

### CloudWatch Logs
```bash
aws logs tail /aws/lambda/vaani-voice-processor --follow
```

### CloudWatch Metrics
- Lambda invocations, duration, errors
- API Gateway requests, latency
- S3 bucket size

## Development

### Local Testing

```bash
# Start sandbox environment
cd amplify
npx ampx sandbox

# In another terminal, start frontend
cd frontend
npm run dev
```

### Update Lambda Function

Edit `amplify/functions/voice/handler.py` and save. Amplify sandbox will auto-deploy.

### Add AI Integration

Replace the placeholder in `handler.py`:

```python
def process_text_with_ai(text: str) -> str:
    # TODO: Integrate your AI model here
    # Example: OpenAI, Anthropic, Bedrock, etc.
    
    # OpenAI example:
    # response = openai.ChatCompletion.create(
    #     model="gpt-4",
    #     messages=[{"role": "user", "content": text}]
    # )
    # return response.choices[0].message.content
    
    return f"You said: {text}. This is a placeholder response."
```

## Deployment

### Development (Sandbox)
```bash
cd amplify
npx ampx sandbox
```

### Production
```bash
cd amplify
npx ampx pipeline-deploy --branch main
```

Or use AWS Amplify Console for CI/CD with Git integration.

## Troubleshooting

### Common Issues

**Issue**: Microphone not working  
**Solution**: Ensure HTTPS and browser permissions granted

**Issue**: "AUDIO_BUCKET_NAME not set"  
**Solution**: Redeploy sandbox: `npx ampx sandbox --once`

**Issue**: Transcription timeout  
**Solution**: Increase Lambda timeout in `resource.ts`

**Issue**: Access Denied errors  
**Solution**: Check IAM policies in CloudFormation console

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for more troubleshooting.

## Scaling

- **Lambda**: Auto-scales to 1000 concurrent executions
- **API Gateway**: Auto-scales automatically
- **S3**: Unlimited storage and requests
- **Transcribe/Polly**: Regional service limits (check quotas)

## Future Enhancements

- [ ] Multi-language support (20+ languages)
- [ ] Real-time streaming (WebSocket)
- [ ] Speaker diarization
- [ ] Sentiment analysis
- [ ] Custom vocabulary
- [ ] User authentication (Cognito)
- [ ] Conversation history
- [ ] Analytics dashboard

## Contributing

This is a hackathon-optimized but production-structured project. Contributions welcome!

## License

[Your License Here]

## Support

- AWS Amplify: https://docs.amplify.aws/
- Amazon Transcribe: https://docs.aws.amazon.com/transcribe/
- Amazon Polly: https://docs.aws.amazon.com/polly/
- FastAPI: https://fastapi.tiangolo.com/

## Credits

Built with ❤️ using AWS Amplify Gen2, Lambda, Transcribe, and Polly.

---

**Ready to deploy? Start with [QUICK-START.md](./QUICK-START.md)!**
