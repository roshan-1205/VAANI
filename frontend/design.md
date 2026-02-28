# Vaani - Voice-First Public Service Access Platform - Design Document

## Feature Name
voice-platform-core

## Platform Name
Vaani

## Overview

This design document specifies the architecture, components, interfaces, and implementation approach for Vaani, a voice-first public service access platform. The system enables citizens to access government services through basic phone calls using open-source speech processing, AI dialogue management, and human escalation capabilities.

Vaani (meaning "voice" in Hindi) is designed for:
- **Accessibility**: No smartphone or digital literacy required
- **Inclusivity**: Multi-language support for regional languages
- **Reliability**: Works on 2G/3G networks with low bandwidth
- **Transparency**: Human escalation and audit trails
- **Scalability**: Microservices architecture supporting 100+ concurrent calls

## Architecture

### System Architecture Overview

The platform follows a microservices architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER ACCESS LAYER                         │
│  Basic Phone (IVR) │ WhatsApp Voice │ USSD/SMS (Optional)       │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    TELEPHONY & IVR LAYER                         │
│              Asterisk/FreeSWITCH (Open Source PBX)              │
│         Call Routing │ DTMF │ Audio Streaming │ SIP             │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                  API GATEWAY & SESSION LAYER                     │
│                    FastAPI Backend Service                       │
│    Authentication │ Session Management │ Request Routing        │
└─────┬──────────────────────┬──────────────────────┬─────────────┘
      │                      │                      │
      ▼                      ▼                      ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────────────┐
│   VOSK STT  │    │  RASA NLU    │    │   COQUI TTS/eSpeak  │
│   Service   │    │  Service     │    │      Service        │
│  (Speech→   │    │ (Intent &    │    │   (Text→Speech)     │
│   Text)     │    │  Dialogue)   │    │                     │
└─────────────┘    └──────────────┘    └─────────────────────┘
      │                      │                      │
      └──────────────────────┼──────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                          │
│   Service Orchestration │ Escalation Rules │ Case Management   │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      DATA LAYER                                  │
│  PostgreSQL (Sessions, Cases) │ Redis (Cache, Queue)            │
│  MinIO/FS (Audio Files, Logs)                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                  HUMAN-IN-THE-LOOP LAYER                         │
│    React Dashboard │ Volunteer Portal │ Admin Console           │
└─────────────────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Microservices Design**: Each service (STT, TTS, NLU, Backend) runs independently
2. **Stateless APIs**: Session state stored in Redis/PostgreSQL, not in service memory
3. **Async Processing**: Celery + Redis for background tasks and callbacks
4. **Horizontal Scalability**: Services can be replicated behind load balancers
5. **Fault Tolerance**: Graceful degradation and fallback mechanisms
6. **Low Coupling**: Services communicate via REST APIs and message queues

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Telephony | Asterisk/FreeSWITCH | PBX, call routing, SIP |
| Backend API | FastAPI (Python 3.11+) | REST API, webhooks, orchestration |
| Speech-to-Text | Vosk 0.3.45+ | Offline-capable STT |
| Text-to-Speech | Coqui TTS / eSpeak NG | Multi-language TTS |
| NLU/Dialogue | Rasa Open Source 3.x | Intent classification, dialogue |
| Language Detection | fastText | Automatic language identification |
| Database | PostgreSQL 15+ | Sessions, cases, audit logs |
| Cache/Queue | Redis 7+ | Session cache, Celery broker |
| Task Queue | Celery 5.3+ | Async tasks, reminders |
| Object Storage | MinIO / Local FS | Audio files, recordings |
| Dashboard | React.js + Tailwind CSS | Admin/volunteer interface |
| Deployment | Docker + Docker Compose | Containerization |
| Monitoring | Prometheus + Grafana | Metrics and observability |

## Components and Interfaces

### 1. Telephony Layer (Asterisk/FreeSWITCH)

**Responsibility**: Handle incoming calls, route to backend, stream audio

**Key Functions**:
- Accept incoming SIP/PSTN calls
- Capture caller ID for authentication
- Stream audio bidirectionally with backend
- Handle DTMF input for menu navigation
- Manage call state (active, on-hold, transferred)

**Interfaces**:
- **Input**: Incoming phone calls (SIP, PSTN)
- **Output**: Audio streams to/from backend via WebSocket or RTP
- **Configuration**: Dialplan for call routing

**API Endpoints**: N/A (PBX configuration-based)

### 2. Backend API Service (FastAPI)

**Responsibility**: Central orchestration, session management, business logic

**Key Functions**:
- Authenticate users via caller ID
- Create and manage session state
- Orchestrate STT → NLU → TTS pipeline
- Apply business rules and escalation logic
- Store conversation history
- Manage human escalation queue

**Interfaces**:

#### REST API Endpoints

```
POST /api/v1/calls/incoming
- Accept incoming call webhook from Asterisk
- Create session, authenticate user
- Return: session_id, greeting_audio_url

POST /api/v1/calls/{session_id}/audio
- Receive audio chunk from user
- Forward to Vosk STT service
- Return: transcribed_text, language_detected

POST /api/v1/calls/{session_id}/process
- Process user text input
- Call Rasa for intent/entities
- Execute business logic
- Return: response_text, action, escalation_needed

POST /api/v1/calls/{session_id}/synthesize
- Convert response text to speech
- Call TTS service
- Return: audio_url, audio_format

POST /api/v1/calls/{session_id}/escalate
- Escalate to human agent
- Add to escalation queue
- Return: queue_position, estimated_wait_time

GET /api/v1/calls/{session_id}/status
- Get current session status
- Return: state, conversation_history, escalation_status

POST /api/v1/calls/{session_id}/end
- End call session
- Save final state to database
- Return: call_summary

POST /api/v1/auth/otp/send
- Send voice OTP for verification
- Return: otp_id, expires_at

POST /api/v1/auth/otp/verify
- Verify OTP code
- Return: jwt_token, user_id
```

#### Admin/Dashboard Endpoints

```
GET /api/v1/admin/calls/active
- List all active calls
- Return: [{session_id, caller_id, duration, state}]

GET /api/v1/admin/calls/history
- Get call history with filters
- Query params: start_date, end_date, caller_id, status
- Return: paginated call records

GET /api/v1/admin/escalations/queue
- Get current escalation queue
- Return: [{case_id, caller_id, priority, wait_time}]

POST /api/v1/admin/escalations/{case_id}/assign
- Assign case to volunteer
- Body: {volunteer_id}
- Return: assignment confirmation

GET /api/v1/admin/metrics/realtime
- Get real-time system metrics
- Return: {active_calls, queue_length, avg_response_time}

GET /api/v1/admin/reports/export
- Export audit logs and reports
- Query params: format (csv, json), date_range
- Return: file download
```

**Data Models**:

```python
class Session:
    session_id: UUID
    caller_id: str
    language: str
    state: SessionState  # ACTIVE, ESCALATED, ENDED
    created_at: datetime
    updated_at: datetime
    conversation_history: List[ConversationTurn]
    metadata: Dict[str, Any]

class ConversationTurn:
    turn_id: int
    timestamp: datetime
    user_text: str
    user_audio_url: Optional[str]
    intent: str
    entities: Dict[str, Any]
    confidence: float
    system_response: str
    system_audio_url: Optional[str]

class EscalationCase:
    case_id: UUID
    session_id: UUID
    caller_id: str
    priority: Priority  # LOW, MEDIUM, HIGH, URGENT
    reason: str
    created_at: datetime
    assigned_to: Optional[UUID]  # volunteer_id
    status: CaseStatus  # QUEUED, ASSIGNED, IN_PROGRESS, RESOLVED
    resolution: Optional[str]

class User:
    user_id: UUID
    caller_id: str
    preferred_language: str
    verified: bool
    created_at: datetime
    last_call_at: datetime
```

### 3. Speech-to-Text Service (Vosk)

**Responsibility**: Convert audio to text in real-time

**Key Functions**:
- Accept audio streams (WebSocket or HTTP)
- Perform speech recognition using Vosk models
- Support multiple languages (en, hi, bn, ta, te, mr)
- Return transcribed text with confidence scores

**Interfaces**:

```
WebSocket /ws/stt
- Streaming audio input
- Real-time transcription output
- Message format: {audio: base64, language: str}
- Response: {text: str, confidence: float, final: bool}

POST /api/stt/transcribe
- Single audio file transcription
- Body: {audio: base64, language: str, format: str}
- Return: {text: str, confidence: float, language_detected: str}
```

**Configuration**:
- Model paths for each language
- Sample rate: 16kHz (optimized for telephony)
- Audio format: PCM, Opus, or Speex

### 4. Text-to-Speech Service (Coqui TTS / eSpeak NG)

**Responsibility**: Convert text to natural-sounding speech

**Key Functions**:
- Synthesize speech from text
- Support multiple languages and voices
- Optimize audio for low bandwidth
- Return audio in compressed format

**Interfaces**:

```
POST /api/tts/synthesize
- Body: {text: str, language: str, voice: str, format: str}
- Return: {audio: base64, format: str, duration: float}

GET /api/tts/voices
- List available voices per language
- Return: [{language: str, voice_id: str, name: str}]
```

**Configuration**:
- Voice models per language
- Output format: Opus (low bandwidth) or MP3
- Speech rate: 1.0 (adjustable)
- Sample rate: 16kHz or 22kHz

### 5. NLU/Dialogue Service (Rasa)

**Responsibility**: Understand user intent and manage conversation flow

**Key Functions**:
- Classify user intent from text
- Extract entities (document type, location, date)
- Manage dialogue state and context
- Generate appropriate responses
- Track conversation history

**Interfaces**:

```
POST /webhooks/rest/webhook
- Rasa standard webhook
- Body: {sender: session_id, message: str}
- Return: [{text: str, buttons: [], custom: {}}]

POST /model/parse
- Parse user message for intent/entities
- Body: {text: str, message_id: str}
- Return: {intent: {name: str, confidence: float}, entities: []}

GET /conversations/{session_id}/tracker
- Get conversation state
- Return: {slots: {}, latest_message: {}, events: []}

POST /conversations/{session_id}/tracker/events
- Update conversation state
- Body: {event: str, ...}
- Return: tracker state
```

**Training Data Structure**:
- Intents: birth_certificate, ration_card, pension, complaint, etc.
- Entities: document_type, location, date, person_name
- Stories: Conversation flow patterns
- Responses: Template responses per intent

### 6. Language Detection Service (fastText)

**Responsibility**: Automatically detect user's language

**Key Functions**:
- Detect language from text input
- Support 6 languages: en, hi, bn, ta, te, mr
- Return language code with confidence

**Interfaces**:

```
POST /api/lang/detect
- Body: {text: str}
- Return: {language: str, confidence: float, alternatives: []}
```

**Integration**: Called by backend before sending text to Rasa

### 7. Admin Dashboard (React.js)

**Responsibility**: Human oversight and case management

**Key Features**:
- Real-time call monitoring
- Escalation queue management
- Conversation transcript viewer
- Case assignment to volunteers
- System health metrics
- Report generation and export

**Pages**:
- `/dashboard` - Overview with metrics
- `/calls/active` - Active calls list
- `/calls/history` - Call history with search
- `/escalations` - Escalation queue
- `/cases/{case_id}` - Case details
- `/volunteers` - Volunteer management
- `/reports` - Analytics and exports
- `/settings` - System configuration

**User Roles**:
- **Admin**: Full access, system configuration
- **Volunteer**: Handle escalated cases, view assigned cases
- **Support**: View calls, assist users, no system config

### 8. Task Queue Service (Celery + Redis)

**Responsibility**: Async task processing and scheduling

**Key Tasks**:
- Send reminder callbacks
- Process audio files asynchronously
- Generate reports
- Clean up expired sessions
- Send notifications

**Task Examples**:

```python
@celery.task
def send_callback_reminder(session_id: str, delay_minutes: int):
    """Schedule callback reminder for user"""
    pass

@celery.task
def process_audio_file(audio_url: str, session_id: str):
    """Process and store audio file"""
    pass

@celery.task
def generate_daily_report():
    """Generate daily usage report"""
    pass

@celery.task
def cleanup_expired_sessions():
    """Remove sessions older than 60 minutes"""
    pass
```

## Data Models

### Database Schema (PostgreSQL)

#### Users Table
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    caller_id VARCHAR(20) UNIQUE NOT NULL,
    preferred_language VARCHAR(5) DEFAULT 'en',
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    last_call_at TIMESTAMP,
    metadata JSONB,
    CONSTRAINT users_caller_id_key UNIQUE (caller_id)
);

CREATE INDEX idx_users_caller_id ON users(caller_id);
CREATE INDEX idx_users_last_call ON users(last_call_at);

COMMENT ON TABLE users IS 'Vaani platform users identified by caller ID';
```

#### Sessions Table
```sql
CREATE TABLE sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    caller_id VARCHAR(20) NOT NULL,
    language VARCHAR(5) NOT NULL,
    state VARCHAR(20) NOT NULL, -- ACTIVE, ESCALATED, ENDED
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP,
    duration_seconds INTEGER,
    metadata JSONB
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_state ON sessions(state);
CREATE INDEX idx_sessions_created_at ON sessions(created_at);
```

#### Conversation Turns Table
```sql
CREATE TABLE conversation_turns (
    turn_id SERIAL PRIMARY KEY,
    session_id UUID REFERENCES sessions(session_id) ON DELETE CASCADE,
    turn_number INTEGER NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    user_text TEXT,
    user_audio_url TEXT,
    intent VARCHAR(100),
    entities JSONB,
    confidence FLOAT,
    system_response TEXT,
    system_audio_url TEXT,
    processing_time_ms INTEGER
);

CREATE INDEX idx_turns_session_id ON conversation_turns(session_id);
```

#### Escalation Cases Table
```sql
CREATE TABLE escalation_cases (
    case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(session_id),
    caller_id VARCHAR(20) NOT NULL,
    priority VARCHAR(10) NOT NULL, -- LOW, MEDIUM, HIGH, URGENT
    reason TEXT NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    assigned_to UUID REFERENCES users(user_id),
    assigned_at TIMESTAMP,
    status VARCHAR(20) NOT NULL, -- QUEUED, ASSIGNED, IN_PROGRESS, RESOLVED
    resolved_at TIMESTAMP,
    resolution TEXT,
    metadata JSONB
);

CREATE INDEX idx_cases_status ON escalation_cases(status);
CREATE INDEX idx_cases_assigned_to ON escalation_cases(assigned_to);
CREATE INDEX idx_cases_created_at ON escalation_cases(created_at);
```

#### Audit Logs Table
```sql
CREATE TABLE audit_logs (
    log_id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT NOW(),
    session_id UUID,
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100),
    details JSONB,
    ip_address INET,
    user_agent TEXT
);

CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_session_id ON audit_logs(session_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
```

### Redis Data Structures

#### Session Cache
```
Key: session:{session_id}
Type: Hash
TTL: 3600 seconds (1 hour)
Fields:
  - caller_id
  - language
  - state
  - last_activity
  - conversation_context (JSON)
```

#### Escalation Queue
```
Key: escalation:queue:{priority}
Type: Sorted Set
Score: timestamp (for FIFO ordering)
Members: case_id
```

#### Active Calls Counter
```
Key: metrics:active_calls
Type: String (integer)
Operations: INCR, DECR, GET
```

#### Rate Limiting
```
Key: ratelimit:{caller_id}:{window}
Type: String (counter)
TTL: 60 seconds
Max: 10 calls per minute
```

### Audio File Storage (MinIO/Local FS)

```
Bucket: vaani-audio
Structure:
  /recordings/{session_id}/{turn_number}_user.opus
  /recordings/{session_id}/{turn_number}_system.opus
  /logs/{date}/{session_id}.json
```

## Authentication and Security

### Authentication Flow

1. **Caller ID Recognition**:
   - Extract caller ID from SIP headers
   - Look up user in database
   - Create or retrieve user record

2. **Voice OTP (for sensitive operations)**:
   - Generate 6-digit OTP
   - Synthesize OTP via TTS
   - Play to user
   - Verify spoken OTP via STT
   - Issue JWT token on success

3. **JWT Token**:
   - Issued after OTP verification
   - Contains: user_id, caller_id, roles
   - Expires after 24 hours
   - Used for dashboard and API access

### Security Measures

1. **Encryption**:
   - TLS 1.3 for all API communication
   - AES-256 for data at rest (PostgreSQL encryption)
   - Encrypted audio storage

2. **Rate Limiting**:
   - 10 calls per minute per caller ID
   - 100 API requests per minute per IP
   - Exponential backoff on failed auth attempts

3. **Input Validation**:
   - Sanitize all text inputs
   - Validate audio format and size
   - SQL injection prevention (parameterized queries)
   - XSS prevention in dashboard

4. **Audit Logging**:
   - Log all API calls
   - Log all authentication attempts
   - Log all escalations and case assignments
   - Immutable audit trail

5. **Role-Based Access Control (RBAC)**:
   - Admin: Full system access
   - Volunteer: Case management only
   - Support: Read-only access
   - User: Own data only

## Error Handling

### Error Categories

1. **Speech Recognition Errors**:
   - Low confidence (< 0.5): Ask user to repeat
   - No speech detected: Prompt user to speak
   - Language mismatch: Offer language selection

2. **Intent Classification Errors**:
   - Low confidence (< 0.5): Ask clarifying questions
   - Unknown intent: Escalate to human or offer menu

3. **System Errors**:
   - Service unavailable: Retry with exponential backoff
   - Timeout: Inform user and offer callback
   - Database error: Log and return generic error message

4. **Network Errors**:
   - Audio stream interrupted: Buffer and resume
   - Connection lost: Attempt reconnection
   - High latency: Degrade quality gracefully

### Error Response Format

```json
{
  "error": {
    "code": "STT_LOW_CONFIDENCE",
    "message": "I couldn't understand that clearly. Could you please repeat?",
    "user_message": "मुझे समझ नहीं आया। कृपया दोहराएं।",
    "retry_allowed": true,
    "escalation_suggested": false
  }
}
```

### Graceful Degradation

1. **STT Failure**: Fall back to DTMF menu navigation
2. **TTS Failure**: Use pre-recorded audio files
3. **Rasa Failure**: Use rule-based intent matching
4. **Database Failure**: Use Redis cache for session state
5. **High Load**: Queue calls with estimated wait time


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies and consolidations:

**Redundancy Analysis**:
- Properties 1.2 and 7.4 both test language-specific responses → Consolidated into Property 1
- Properties 2.2 and 7.1 both test multi-language support → Consolidated into Property 2
- Properties 2.3 and 7.2 both test language detection → Consolidated into Property 3
- Properties 5.3 and 10.2 both test conversation persistence → Consolidated into Property 4
- Properties 9.1 and 9.2 both test dashboard data visibility → Consolidated into Property 5
- Properties 9.6 and 10.6 both test report export → Consolidated into Property 6

The following properties provide unique validation value and are retained:

### Session Management Properties

**Property 1: Language-Consistent Responses**
*For any* session with a detected or selected language L, all system responses (greetings, prompts, and replies) should be generated in language L.
**Validates: Requirements 1.2, 7.4**

**Property 2: Multi-Language Support**
*For any* supported language (en, hi, bn, ta, te, mr), the system should be able to process audio input in that language and generate audio output in that language.
**Validates: Requirements 2.2, 7.1**

**Property 3: Automatic Language Detection**
*For any* text input in a supported language, the language detection service should return a language code with confidence score.
**Validates: Requirements 2.3, 7.2**

**Property 4: Session Uniqueness**
*For any* two distinct incoming calls, the system should generate different session IDs.
**Validates: Requirements 5.1**

**Property 5: Session-Caller Association**
*For any* created session, retrieving the session should return the correct caller ID that initiated the call.
**Validates: Requirements 5.2**

**Property 6: Conversation Persistence**
*For any* conversation turn (user input and system response), the turn should be stored in the database and retrievable via the session ID.
**Validates: Requirements 5.3, 10.2**

**Property 7: Session Resumption**
*For any* caller ID that has a previous session, when that caller ID initiates a new call, the system should be able to retrieve the previous conversation history.
**Validates: Requirements 5.5**

### Speech Processing Properties

**Property 8: Audio Capture and Processing**
*For any* audio input received during an active session, the system should forward it to the STT service and receive transcribed text.
**Validates: Requirements 1.4**

**Property 9: Voice Response Generation**
*For any* system response text, the TTS service should generate audio output in the session's language.
**Validates: Requirements 1.5**

**Property 10: Low-Quality Audio Handling**
*For any* audio input (regardless of quality), the STT service should return a transcription result (even if confidence is low) rather than failing.
**Validates: Requirements 2.4**

**Property 11: Audio Bandwidth Constraint**
*For any* generated TTS audio file, the bitrate should be ≤ 64 kbps.
**Validates: Requirements 4.5, 8.2**

### Intent and Dialogue Properties

**Property 12: Service Request Recognition**
*For any* text input containing a defined service request type (birth certificate, ration card, pension, etc.), the NLU service should classify it with an intent matching that service type.
**Validates: Requirements 3.2**

**Property 13: Entity Extraction**
*For any* text input containing entities of type document_type, location, or date, the NLU service should extract those entities with their values.
**Validates: Requirements 3.3**

**Property 14: Context Preservation**
*For any* multi-turn conversation, entities and intents from previous turns should be accessible in the conversation tracker for subsequent turns.
**Validates: Requirements 3.4**

**Property 15: Clarification Handling**
*For any* conversation where the system asks a clarification question, the user's response should be processed in the context of that question.
**Validates: Requirements 3.5**

**Property 16: Language Switching**
*For any* session, if the detected language changes mid-conversation, all subsequent responses should be in the new language.
**Validates: Requirements 7.3**

**Property 17: Code-Mixing Robustness**
*For any* text input containing multiple languages, the system should still process it and return a response (even if confidence is lower).
**Validates: Requirements 7.6**

### Escalation Properties

**Property 18: Low-Confidence Escalation**
*For any* intent classification with confidence < 0.5, the system should trigger an escalation flow.
**Validates: Requirements 6.1**

**Property 19: User-Requested Escalation**
*For any* session state, if the user's input matches an escalation intent (e.g., "speak to human"), an escalation case should be created.
**Validates: Requirements 6.2**

**Property 20: Sensitive Topic Escalation**
*For any* input containing sensitive keywords or topics (as defined in configuration), an escalation case should be created.
**Validates: Requirements 6.3**

**Property 21: Escalation Queue Creation**
*For any* escalation trigger, a case record should be created in the database with status QUEUED.
**Validates: Requirements 6.4**

**Property 22: Wait Time Estimation**
*For any* escalation case, the system should return a wait time estimate based on current queue length and average handling time.
**Validates: Requirements 6.5**

**Property 23: Context Transfer to Agent**
*For any* escalation case that is assigned to a volunteer, the volunteer should have access to the complete conversation history from that session.
**Validates: Requirements 6.6**

### Dashboard and Admin Properties

**Property 24: Active Session Visibility**
*For any* session with state ACTIVE, it should appear in the list returned by the active calls API endpoint.
**Validates: Requirements 9.1, 9.2**

**Property 25: Transcript Access Control**
*For any* session, an authenticated admin user should be able to retrieve the full conversation transcript via the API.
**Validates: Requirements 9.3**

**Property 26: Case Assignment**
*For any* escalation case with status QUEUED, an admin should be able to assign it to a volunteer, changing its status to ASSIGNED.
**Validates: Requirements 9.4**

**Property 27: Report Export**
*For any* valid date range, the export API should return audit logs and call records for that period.
**Validates: Requirements 9.6, 10.6**

### Audit and Compliance Properties

**Property 28: Call Logging**
*For any* incoming call, an audit log entry should be created with timestamp, caller ID, and session ID.
**Validates: Requirements 10.1**

**Property 29: Audit Log Immutability**
*For any* audit log entry, attempts to update or delete it should fail (only INSERT operations allowed).
**Validates: Requirements 10.3**

**Property 30: Comprehensive Event Logging**
*For any* user action, system response, or escalation event, a corresponding audit log entry should be created.
**Validates: Requirements 10.5**

### Security Properties

**Property 31: Caller ID Extraction**
*For any* incoming call, the system should extract the caller ID from the call metadata and associate it with the session.
**Validates: Requirements 11.1**

**Property 32: OTP Generation for Sensitive Operations**
*For any* sensitive operation (as defined in configuration), the system should generate a voice OTP and require verification before proceeding.
**Validates: Requirements 11.2**

**Property 33: Rate Limiting**
*For any* caller ID, after N requests within a time window W, subsequent requests should be rejected with a rate limit error.
**Validates: Requirements 11.5**

### Integration Properties

**Property 34: Session State Continuity**
*For any* session, the state should be maintained across multiple conversation turns without loss of context.
**Validates: Requirements 1.6**

**Property 35: Greeting and Prompt Sequence**
*For any* new session, the system should send a greeting message followed by a prompt to speak, in that order.
**Validates: Requirements 1.2, 1.3**

## Testing Strategy

### Dual Testing Approach

This platform requires both **unit testing** and **property-based testing** for comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of service requests (e.g., "I need a birth certificate")
- Edge cases (empty input, malformed audio, invalid session IDs)
- Error conditions (service timeouts, database failures)
- Integration points (API endpoint contracts, database schema)
- Specific time-based behaviors (session expiration after 60 minutes, JWT expiration after 24 hours)

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs (language consistency, session uniqueness)
- Randomized testing across input space (random phone numbers, random text in different languages)
- Invariants (session state preservation, audit log immutability)
- Round-trip properties (language detection → TTS → STT should preserve meaning)

### Property-Based Testing Configuration

**Framework Selection**:
- **Python**: Use `hypothesis` library for property-based testing
- **Minimum iterations**: 100 per property test (due to randomization)
- **Shrinking**: Enable automatic test case minimization on failure

**Test Organization**:
```python
# Example property test structure
from hypothesis import given, strategies as st

@given(
    caller_id=st.text(min_size=10, max_size=15, alphabet=st.characters(whitelist_categories=('Nd',))),
    language=st.sampled_from(['en', 'hi', 'bn', 'ta', 'te', 'mr'])
)
def test_property_1_language_consistent_responses(caller_id, language):
    """
    Feature: voice-platform-core, Property 1: Language-Consistent Responses
    For any session with language L, all responses should be in language L
    """
    # Test implementation
    pass
```

**Test Tagging**:
Each property test must include a comment with:
- Feature name: `voice-platform-core`
- Property number and title
- Property statement

**Coverage Goals**:
- All 35 correctness properties implemented as property-based tests
- Edge cases covered by unit tests
- Integration tests for end-to-end flows
- Load tests for performance requirements (separate from property tests)

### Test Data Generation

**Generators for Property Tests**:
- `phone_number_generator`: Random valid phone numbers
- `audio_generator`: Random audio samples in different languages
- `text_generator`: Random text in supported languages
- `session_state_generator`: Random valid session states
- `intent_generator`: Random service request variations
- `entity_generator`: Random entities (dates, locations, document types)

**Mocking Strategy**:
- Mock external telephony system (Asterisk) for unit tests
- Use real Vosk/TTS/Rasa services for integration tests
- Mock database with in-memory SQLite for fast unit tests
- Use test containers (Docker) for integration tests

### Continuous Testing

**CI/CD Pipeline**:
1. **Pre-commit**: Run fast unit tests (< 30 seconds)
2. **PR validation**: Run all unit tests + property tests (< 5 minutes)
3. **Merge to main**: Run full test suite + integration tests (< 15 minutes)
4. **Nightly**: Run load tests and extended property tests (1000+ iterations)

**Test Metrics**:
- Code coverage: > 80% for core business logic
- Property test coverage: 100% of defined properties
- Integration test coverage: All API endpoints
- Performance test baseline: Track response times over time

## Implementation Approach

### Phase 1: Core Infrastructure (Week 1-2)

**Objectives**:
- Set up development environment
- Deploy core services (PostgreSQL, Redis, FastAPI)
- Implement basic session management
- Create database schema

**Deliverables**:
- Docker Compose configuration
- Database migrations
- Basic API endpoints (session create, get, update)
- Health check endpoints

### Phase 2: Speech Processing Integration (Week 3-4)

**Objectives**:
- Integrate Vosk STT service
- Integrate Coqui TTS service
- Implement language detection
- Set up audio streaming

**Deliverables**:
- Vosk service container with language models
- TTS service container with voice models
- Audio processing pipeline
- Language detection API

### Phase 3: NLU and Dialogue (Week 5-6)

**Objectives**:
- Train Rasa models with initial intents
- Implement dialogue management
- Create conversation flows
- Integrate with backend API

**Deliverables**:
- Rasa training data (intents, entities, stories)
- Trained Rasa models
- Dialogue state management
- Intent classification API integration

### Phase 4: Telephony Integration (Week 7-8)

**Objectives**:
- Set up Asterisk/FreeSWITCH
- Configure SIP trunking
- Implement call routing
- Connect telephony to backend

**Deliverables**:
- Asterisk dialplan configuration
- SIP trunk setup
- Audio streaming between Asterisk and backend
- Call state management

### Phase 5: Escalation and Dashboard (Week 9-10)

**Objectives**:
- Implement escalation logic
- Build admin dashboard (React)
- Create volunteer portal
- Implement case management

**Deliverables**:
- Escalation rules engine
- React dashboard with real-time updates
- Case assignment workflow
- Volunteer interface

### Phase 6: Security and Compliance (Week 11-12)

**Objectives**:
- Implement authentication (JWT, OTP)
- Add audit logging
- Implement rate limiting
- Security hardening

**Deliverables**:
- JWT authentication
- Voice OTP verification
- Comprehensive audit logs
- Rate limiting middleware
- Security documentation

### Phase 7: Testing and Optimization (Week 13-14)

**Objectives**:
- Write property-based tests
- Write unit tests
- Perform load testing
- Optimize performance

**Deliverables**:
- Complete test suite (unit + property tests)
- Load test results
- Performance optimization report
- Test coverage report

### Phase 8: Deployment and Monitoring (Week 15-16)

**Objectives**:
- Set up production environment
- Configure monitoring (Prometheus, Grafana)
- Deploy to production
- User acceptance testing

**Deliverables**:
- Production deployment
- Monitoring dashboards
- Deployment documentation
- UAT results and feedback

### Development Guidelines

**Code Organization**:
```
backend/
├── app/
│   ├── api/          # API endpoints
│   ├── core/         # Core business logic
│   ├── models/       # Database models
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # External service integrations
│   ├── utils/        # Utility functions
│   └── tests/        # Test files
│       ├── unit/
│       ├── property/
│       └── integration/
```

**Coding Standards**:
- Python: Follow PEP 8, use type hints
- FastAPI: Use Pydantic for validation
- Database: Use SQLAlchemy ORM
- Testing: pytest for unit tests, hypothesis for property tests
- Documentation: Docstrings for all public functions
- Error handling: Custom exception classes

**Git Workflow**:
- Feature branches: `feature/session-management`
- Bug fixes: `fix/audio-streaming-issue`
- Commit messages: Conventional commits format
- PR reviews: Required before merge
- CI/CD: Automated testing on all PRs

### Deployment Architecture

**Development Environment**:
- Docker Compose for local development
- Hot reload for backend and dashboard
- Local PostgreSQL and Redis
- Mock telephony for testing

**Staging Environment**:
- Kubernetes cluster (optional) or Docker Swarm
- Separate database instance
- Real telephony integration (test numbers)
- Monitoring enabled

**Production Environment**:
- High availability setup (multiple replicas)
- Load balancer (Nginx or cloud LB)
- Managed PostgreSQL (or self-hosted with replication)
- Redis cluster for high availability
- CDN for audio file delivery
- Backup and disaster recovery

**Scaling Strategy**:
- Horizontal scaling: Add more backend/STT/TTS replicas
- Database: Read replicas for reporting queries
- Redis: Cluster mode for high throughput
- Load balancing: Round-robin or least-connections
- Auto-scaling: Based on CPU/memory metrics

### Monitoring and Observability

**Metrics to Track**:
- Active calls count
- Average response time (STT, TTS, NLU, end-to-end)
- Intent classification accuracy
- Escalation rate
- Session duration
- Error rates by service
- Database query performance
- Redis cache hit rate

**Logging Strategy**:
- Structured logging (JSON format)
- Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
- Centralized logging (ELK stack or cloud logging)
- Log retention: 90 days minimum
- PII masking in logs

**Alerting Rules**:
- High error rate (> 5% of requests)
- Service unavailable (health check fails)
- High response time (> 5 seconds)
- Database connection pool exhausted
- Redis memory usage > 80%
- Escalation queue length > 50

**Dashboards**:
- Real-time call metrics
- Service health status
- Error rate trends
- Response time percentiles (p50, p95, p99)
- Resource utilization (CPU, memory, disk)
- Business metrics (calls per day, escalation rate)

## Risk Mitigation

### Technical Risks

**Risk 1: STT Accuracy Issues**
- **Mitigation**: Use confidence thresholds, offer DTMF fallback, escalate low-confidence cases
- **Monitoring**: Track STT confidence scores, alert on low averages

**Risk 2: High Latency**
- **Mitigation**: Optimize audio processing, use caching, implement async processing
- **Monitoring**: Track p95 response times, set SLA alerts

**Risk 3: Service Failures**
- **Mitigation**: Implement circuit breakers, retry logic, graceful degradation
- **Monitoring**: Health checks, automatic failover

**Risk 4: Database Bottlenecks**
- **Mitigation**: Query optimization, indexing, read replicas, caching
- **Monitoring**: Slow query logs, connection pool metrics

**Risk 5: Security Vulnerabilities**
- **Mitigation**: Regular security audits, input validation, rate limiting, encryption
- **Monitoring**: Failed auth attempts, unusual traffic patterns

### Operational Risks

**Risk 1: Insufficient Volunteer Coverage**
- **Mitigation**: Automated responses for common queries, queue management, callback system
- **Monitoring**: Queue length, wait times, abandoned calls

**Risk 2: Data Privacy Concerns**
- **Mitigation**: Encryption, access controls, audit logs, compliance documentation
- **Monitoring**: Access logs, data export requests

**Risk 3: Scalability Limits**
- **Mitigation**: Load testing, auto-scaling, capacity planning
- **Monitoring**: Resource utilization, concurrent call count

## Future Enhancements

### Phase 2 Features (6-12 months)
- USSD/SMS fallback interface for feature phones
- WhatsApp Business API integration
- Video call support for sign language users
- Offline mode with callback scheduling
- Advanced analytics and insights dashboard
- Multi-channel support (web widget, mobile app)

### Phase 3 Features (12-24 months)
- Predictive service recommendations based on user history
- Proactive notifications and reminders
- Payment gateway integration for fee collection
- Document upload via voice-guided flow
- Blockchain-based audit trail for transparency
- AI-powered sentiment analysis for quality monitoring

## Appendix

### Glossary

- **IVR**: Interactive Voice Response - automated telephony system
- **STT**: Speech-to-Text - converting audio to text
- **TTS**: Text-to-Speech - converting text to audio
- **NLU**: Natural Language Understanding - extracting meaning from text
- **PBX**: Private Branch Exchange - telephony switching system
- **SIP**: Session Initiation Protocol - VoIP signaling protocol
- **OTP**: One-Time Password - temporary authentication code
- **JWT**: JSON Web Token - authentication token format
- **RBAC**: Role-Based Access Control - permission system
- **WCAG**: Web Content Accessibility Guidelines

### References

- Rasa Documentation: https://rasa.com/docs/
- Vosk Documentation: https://alphacephei.com/vosk/
- Coqui TTS: https://github.com/coqui-ai/TTS
- FastAPI Documentation: https://fastapi.tiangolo.com/
- Asterisk Documentation: https://www.asterisk.org/
- Hypothesis (Property Testing): https://hypothesis.readthedocs.io/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Redis Documentation: https://redis.io/documentation

### API Response Examples

#### Session Creation Response
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "caller_id": "+919876543210",
  "language": "hi",
  "state": "ACTIVE",
  "greeting_audio_url": "https://storage/audio/greeting_hi.opus",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### Intent Classification Response
```json
{
  "intent": {
    "name": "request_birth_certificate",
    "confidence": 0.92
  },
  "entities": [
    {"entity": "document_type", "value": "birth certificate", "confidence": 0.95},
    {"entity": "location", "value": "Mumbai", "confidence": 0.88}
  ],
  "response_text": "मैं आपकी जन्म प्रमाणपत्र के लिए मदद कर सकता हूं। कृपया अपना पूरा नाम बताएं।",
  "action": "ask_full_name"
}
```

#### Escalation Response
```json
{
  "case_id": "660e8400-e29b-41d4-a716-446655440001",
  "status": "QUEUED",
  "priority": "MEDIUM",
  "queue_position": 3,
  "estimated_wait_time_minutes": 5,
  "message": "आपको एक सहायक से जोड़ा जा रहा है। कृपया प्रतीक्षा करें।"
}
```

