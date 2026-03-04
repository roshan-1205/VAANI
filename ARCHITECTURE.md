# VAANI - Serverless Architecture Documentation

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          VAANI Platform                                  │
│                   Voice-First Public Service Platform                    │
└─────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │   End User   │
                              │   (Browser)  │
                              └──────┬───────┘
                                     │
                                     │ HTTPS
                                     ▼
                    ┌────────────────────────────────┐
                    │      React Frontend (SPA)      │
                    │  - MediaRecorder API           │
                    │  - AWS Amplify SDK             │
                    │  - Audio Playback              │
                    └────────────┬───────────────────┘
                                 │
                                 │ REST API
                                 ▼
                    ┌────────────────────────────────┐
                    │   AWS Amplify Gen2 Backend     │
                    │   - API Gateway                │
                    │   - CloudFormation (IaC)       │
                    └────────────┬───────────────────┘
                                 │
                                 │ Invoke
                                 ▼
        ┌────────────────────────────────────────────────────┐
        │         AWS Lambda Function                        │
        │         (Python 3.11 Runtime)                      │
        │                                                    │
        │  ┌──────────────────────────────────────────┐    │
        │  │  FastAPI Application                     │    │
        │  │  - /voice endpoint                       │    │
        │  │  - /synthesize endpoint                  │    │
        │  │  - /health endpoint                      │    │
        │  └──────────────────────────────────────────┘    │
        │                                                    │
        │  ┌──────────────────────────────────────────┐    │
        │  │  Mangum Adapter                          │    │
        │  │  (FastAPI → Lambda Handler)              │    │
        │  └──────────────────────────────────────────┘    │
        └────────────┬───────────────┬──────────────┬───────┘
                     │               │              │
         ┌───────────┘               │              └──────────┐
         │                           │                         │
         ▼                           ▼                         ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Amazon         │      │  Amazon Polly   │      │  Amazon S3      │
│  Transcribe     │      │                 │      │                 │
│                 │      │  Neural Voices  │      │  Audio Bucket   │
│  Speech-to-Text │      │  Text-to-Speech │      │                 │
│                 │      │                 │      │  ├─ input/      │
│  - Job Creation │      │  - Synthesis    │      │  └─ output/     │
│  - Polling      │      │  - MP3 Output   │      │                 │
│  - Transcripts  │      │                 │      │  Lifecycle:     │
└─────────────────┘      └─────────────────┘      │  Delete after   │
                                                   │  1 day          │
                                                   └─────────────────┘
```

## Component Details

### 1. Frontend Layer (React)

**Technology Stack:**
- React 18+
- AWS Amplify JavaScript SDK
- MediaRecorder API (Web Audio API)
- Tailwind CSS

**Key Components:**
- `VoiceRecorder.jsx`: Main voice interaction component
  - Records audio using MediaRecorder
  - Converts audio to base64
  - Sends to Lambda via Amplify API
  - Plays audio response

**Data Flow:**
1. User clicks "Start Recording"
2. Browser requests microphone permission
3. MediaRecorder captures audio stream
4. User clicks "Stop Recording"
5. Audio blob converted to base64
6. POST request to `/voice` endpoint
7. Display transcription and response
8. Auto-play audio response

### 2. API Gateway Layer (AWS Amplify)

**Features:**
- Automatic HTTPS endpoints
- CORS configuration
- Request/response transformation
- Integration with Lambda

**Endpoints:**
- `POST /voice` - Main voice processing
- `POST /synthesize` - Text-to-speech only
- `GET /health` - Health check
- `POST /transcribe/status` - Check transcription status

### 3. Lambda Function Layer

**Configuration:**
- Runtime: Python 3.11
- Memory: 512 MB
- Timeout: 300 seconds (5 minutes)
- Handler: `handler.handler` (Mangum)

**Architecture:**
```
┌─────────────────────────────────────────────────────────┐
│                  Lambda Function                        │
│                                                         │
│  ┌───────────────────────────────────────────────┐    │
│  │  FastAPI Application Layer                    │    │
│  │                                                │    │
│  │  Routes:                                       │    │
│  │  - POST /voice                                 │    │
│  │  - POST /synthesize                            │    │
│  │  - POST /transcribe/status                     │    │
│  │  - GET /health                                 │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
│  ┌───────────────────────────────────────────────┐    │
│  │  Business Logic Layer                          │    │
│  │                                                │    │
│  │  Functions:                                    │    │
│  │  - upload_audio_to_s3()                        │    │
│  │  - start_transcription()                       │    │
│  │  - get_transcription_result()                  │    │
│  │  - process_text_with_ai()                      │    │
│  │  - synthesize_speech()                         │    │
│  │  - save_audio_to_s3()                          │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
│  ┌───────────────────────────────────────────────┐    │
│  │  AWS SDK Layer (Boto3)                         │    │
│  │                                                │    │
│  │  Clients:                                      │    │
│  │  - transcribe_client                           │    │
│  │  - polly_client                                │    │
│  │  - s3_client                                   │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
│  ┌───────────────────────────────────────────────┐    │
│  │  Mangum Adapter                                │    │
│  │  (Converts Lambda events to ASGI)             │    │
│  └───────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### 4. Voice Processing Flow

**Complete Request Flow:**

```
1. Audio Recording
   ├─ User speaks into microphone
   ├─ MediaRecorder captures audio
   └─ Audio blob created (WebM/MP4 format)

2. Audio Upload
   ├─ Convert blob to base64
   ├─ Send to Lambda via API Gateway
   └─ Lambda receives base64 audio

3. S3 Storage (Input)
   ├─ Decode base64 to bytes
   ├─ Generate unique filename
   ├─ Upload to S3: s3://bucket/input/{uuid}.webm
   └─ Return S3 URI

4. Transcription (Amazon Transcribe)
   ├─ Create transcription job
   │  ├─ Job name: vaani-{uuid}
   │  ├─ Media URI: S3 URI from step 3
   │  ├─ Language: en-US (configurable)
   │  └─ Format: webm
   ├─ Poll for completion (max 120 seconds)
   │  ├─ Check status every 2 seconds
   │  ├─ Status: IN_PROGRESS → COMPLETED
   │  └─ Fetch transcript JSON
   ├─ Extract transcribed text
   └─ Delete transcription job (cleanup)

5. AI Processing
   ├─ Receive transcribed text
   ├─ Process with AI model (placeholder)
   │  └─ TODO: Integrate OpenAI/Anthropic/Custom model
   └─ Generate response text

6. Speech Synthesis (Amazon Polly)
   ├─ Input: Response text
   ├─ Voice: Joanna (Neural engine)
   ├─ Format: MP3
   ├─ Language: en-US
   └─ Output: Audio stream (bytes)

7. S3 Storage (Output)
   ├─ Generate unique filename
   ├─ Upload to S3: s3://bucket/output/{uuid}.mp3
   ├─ Generate presigned URL (1 hour expiry)
   └─ Return URL

8. Response to Frontend
   ├─ Return JSON response:
   │  ├─ transcribed_text
   │  ├─ response_text
   │  ├─ audio_url (presigned)
   │  └─ job_name
   └─ Frontend plays audio automatically
```

### 5. IAM Security Model

**Principle: Least Privilege Access**

```
┌─────────────────────────────────────────────────────────┐
│              Lambda Execution Role                      │
└─────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Transcribe  │  │    Polly     │  │      S3      │
│   Policy     │  │   Policy     │  │   Policy     │
└──────────────┘  └──────────────┘  └──────────────┘
```

**Transcribe Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TranscribePermissions",
      "Effect": "Allow",
      "Action": [
        "transcribe:StartTranscriptionJob",
        "transcribe:GetTranscriptionJob",
        "transcribe:DeleteTranscriptionJob"
      ],
      "Resource": "*"
    }
  ]
}
```
*Note: Transcribe doesn't support resource-level permissions*

**Polly Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PollyPermissions",
      "Effect": "Allow",
      "Action": [
        "polly:SynthesizeSpeech"
      ],
      "Resource": "*"
    }
  ]
}
```
*Note: Polly doesn't support resource-level permissions*

**S3 Policy (Scoped):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3AudioBucketPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::vaani-audio-{account}-{region}",
        "arn:aws:s3:::vaani-audio-{account}-{region}/*"
      ]
    },
    {
      "Sid": "S3ListBucketPermission",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::vaani-audio-{account}-{region}"
      ]
    }
  ]
}
```

### 6. S3 Bucket Configuration

**Bucket Structure:**
```
vaani-audio-{account}-{region}/
├── input/
│   ├── {uuid1}.webm
│   ├── {uuid2}.webm
│   └── ...
└── output/
    ├── {uuid1}.mp3
    ├── {uuid2}.mp3
    └── ...
```

**Security Features:**
- Block all public access
- Server-side encryption (S3-managed)
- CORS enabled for frontend access
- Lifecycle policy: Delete after 1 day
- Versioning: Disabled (temporary files)

**Lifecycle Policy:**
```json
{
  "Rules": [
    {
      "Id": "DeleteTemporaryAudioFiles",
      "Status": "Enabled",
      "Expiration": {
        "Days": 1
      },
      "Filter": {
        "Prefix": ""
      }
    }
  ]
}
```

## Scalability

### Horizontal Scaling
- **Lambda**: Auto-scales to 1000 concurrent executions
- **API Gateway**: Auto-scales automatically
- **S3**: Unlimited storage and requests
- **Transcribe**: Regional service limits (check quotas)
- **Polly**: Regional service limits (check quotas)

### Performance Optimization
1. **Lambda Cold Start**: ~2-3 seconds (Python 3.11)
   - Mitigation: Provisioned concurrency for production
2. **Transcribe Latency**: ~10-30 seconds for short audio
   - Async processing with polling
3. **Polly Latency**: ~1-2 seconds
   - Fast synthesis with neural voices
4. **S3 Latency**: <100ms for uploads/downloads

### Cost Optimization
1. **S3 Lifecycle**: Auto-delete after 1 day
2. **Lambda Memory**: 512 MB (tune based on usage)
3. **Transcribe**: Delete jobs after completion
4. **Presigned URLs**: 1-hour expiry

## Monitoring and Observability

### CloudWatch Metrics
- Lambda invocations
- Lambda duration
- Lambda errors
- API Gateway requests
- API Gateway latency
- S3 bucket size

### CloudWatch Logs
- Lambda execution logs
- API Gateway access logs
- Structured logging with log levels

### Alarms (Recommended)
- Lambda error rate > 5%
- Lambda duration > 250 seconds
- API Gateway 5xx errors > 10
- S3 bucket size > 10 GB

## Disaster Recovery

### Backup Strategy
- S3 bucket: Temporary files (no backup needed)
- Lambda code: Stored in Amplify/CloudFormation
- Configuration: Infrastructure as Code (IaC)

### Recovery Time Objective (RTO)
- Lambda: <5 minutes (redeploy)
- S3: <1 minute (recreate bucket)
- API Gateway: <5 minutes (redeploy)

### Recovery Point Objective (RPO)
- No data loss (stateless architecture)
- Audio files are temporary (1-day retention)

## Security Considerations

### Data Protection
1. **In Transit**: HTTPS/TLS 1.2+
2. **At Rest**: S3 server-side encryption
3. **Audio Data**: Deleted after 1 day

### Authentication (Future)
- Add AWS Cognito for user authentication
- JWT tokens for API access
- Role-based access control (RBAC)

### Compliance
- GDPR: Data deletion after 1 day
- HIPAA: Not currently compliant (add encryption, audit logs)
- SOC 2: AWS services are SOC 2 compliant

## Future Enhancements

1. **AI Integration**
   - OpenAI GPT-4 for intelligent responses
   - Custom fine-tuned models
   - Multi-turn conversations

2. **Multi-Language Support**
   - Support 20+ languages
   - Language detection
   - Regional voice selection

3. **Real-Time Processing**
   - WebSocket support
   - Streaming transcription
   - Streaming synthesis

4. **Analytics**
   - User interaction tracking
   - Voice analytics
   - Performance metrics

5. **Advanced Features**
   - Speaker diarization
   - Sentiment analysis
   - Intent recognition
   - Custom vocabulary

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | User interface |
| API | AWS Amplify Gen2 | API Gateway, IaC |
| Compute | AWS Lambda (Python 3.11) | Serverless processing |
| Framework | FastAPI + Mangum | Web framework + adapter |
| Speech-to-Text | Amazon Transcribe | Voice transcription |
| Text-to-Speech | Amazon Polly | Voice synthesis |
| Storage | Amazon S3 | Audio file storage |
| IAM | AWS IAM | Security and permissions |
| Monitoring | CloudWatch | Logs and metrics |
| IaC | AWS CDK (via Amplify) | Infrastructure as Code |

## Conclusion

This serverless architecture provides:
- ✅ Fully managed infrastructure
- ✅ Auto-scaling capabilities
- ✅ Pay-per-use pricing
- ✅ High availability
- ✅ Security best practices
- ✅ Easy deployment and updates
- ✅ Production-ready structure
