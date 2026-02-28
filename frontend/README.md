# Vaani - Voice-First Public Service Access Platform

**Vaani** (meaning "voice" in Hindi) is a complete end-to-end system for voice-based public service access built entirely on free and open-source technologies.

## Overview

Vaani enables citizens to access public services through voice calls on basic mobile phones, eliminating the need for smartphones, apps, or digital literacy. Designed as a scalable digital public utility for government and NGO adoption.

## Core Principles

- **Access-first, not app-first**: No installation barriers
- **Voice as primary interface**: Designed for low-literacy users  
- **Low-bandwidth optimized**: Works on basic mobile networks
- **AI as invisible support**: Trust and clarity over technology showcase
- **100% Open Source**: No licensing fees, full transparency

## Quick Start

```bash
# Clone the repository
git clone <[repository-ur](https://github.com/Aayush-2910/VAANI.git)l>
cd vaani

# Copy environment configuration
copy .env.example .env

# Start all services
docker-compose up -d

# Check service status
docker-compose ps
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete system design and data flow diagrams.

## Technology Stack

- **Telephony**: Asterisk/FreeSWITCH
- **Backend**: FastAPI (Python)
- **AI/NLU**: Rasa Open Source
- **STT**: Vosk, Mozilla DeepSpeech
- **TTS**: Coqui TTS, eSpeak NG
- **Database**: PostgreSQL
- **Cache/Queue**: Redis, Celery
- **Storage**: MinIO
- **Dashboard**: React.js + Tailwind CSS
- **Monitoring**: Prometheus + Grafana

## Project Structure

```
vaani/
├── backend/           # FastAPI backend
├── rasa/             # Conversational AI
├── vosk-server/      # Speech-to-Text
├── tts-server/       # Text-to-Speech
├── dashboard/        # React admin dashboard
├── monitoring/       # Prometheus + Grafana
└── docker-compose.yml
```

## Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)

## Getting Started

1. Install Docker and Docker Compose
2. Copy `.env.example` to `.env` and configure
3. Run `docker-compose up -d`
4. Access dashboard at http://localhost:3000

## License

Open Source - MIT License
