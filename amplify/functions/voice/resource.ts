import { defineFunction } from '@aws-amplify/backend';

/**
 * VAANI Voice Function Resource Definition
 * Handles voice processing with Transcribe, Polly, and Nova Sonic
 */
export const voiceFunction = defineFunction({
  entry: './simple_handler.py',
  timeoutSeconds: 300, // 5 minutes for Transcribe polling
  memoryMB: 512,
  environment: {
    PYTHONPATH: '/var/task:/var/runtime',
    // Nova Sonic / Bedrock API Key
    AWS_ACCESS_KEY_ID: 'ABSKQmVkcm9ja0FQSUtleS02c3o4LWF0LTI3NDU5NTAyMTc2ODpOL1ZpWEluZEk4anh1ck9ucFZ2MzV0MkNUUGs4SmJVMW9DRU9CM3hhOXBGd3JULzNValpWK2pGWVNnaz0=',
    AWS_SECRET_ACCESS_KEY: 'ABSKQmVkcm9ja0FQSUtleS02c3o4LWF0LTI3NDU5NTAyMTc2ODpOL1ZpWEluZEk4anh1ck9ucFZ2MzV0MkNUUGs4SmJVMW9DRU9CM3hhOXBGd3JULzNValpWK2pGWVNnaz0=',
    AWS_REGION_NAME: 'us-east-1',
    // OpenAI API Key (for AI processing)
    OPENAI_API_KEY: 'sk-proj-SwimqMrmBJD6ixekq1xqHbPMhTY3GPNZ-4RJ3YvGuNYKGNHaSij-sp6TOwedFxrExVImMhvPmQT3BlbkFJwWR0QswLVQ8V3QET3C8TdgV0BhOx2NgXLro8Na8urHD0AJMFhsbYiuEOQEqakNYhFLa6LKdLsAYou',
  },
});

