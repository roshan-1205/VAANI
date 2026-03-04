import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Bucket, BlockPublicAccess, BucketEncryption, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy, Duration } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi, Cors } from 'aws-cdk-lib/aws-apigateway';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * VAANI - AWS Amplify Gen2 Backend Configuration
 * Serverless voice-first public service platform
 */
const backend = defineBackend({
  auth,
  data,
});

// Create S3 bucket for temporary audio storage
const audioBucket = new Bucket(
  backend.createStack('VaaniStorage'),
  'VaaniAudioBucket',
  {
    bucketName: `vaani-audio-${backend.auth.resources.userPool.env.account}-${backend.auth.resources.userPool.env.region}`,
    encryption: BucketEncryption.S3_MANAGED,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    lifecycleRules: [
      {
        // Auto-delete temporary files after 1 day
        expiration: Duration.days(1),
        enabled: true,
      },
    ],
    cors: [
      {
        allowedMethods: [
          HttpMethods.GET,
          HttpMethods.PUT,
          HttpMethods.POST,
          HttpMethods.DELETE,
          HttpMethods.HEAD,
        ],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        maxAge: 3000,
      },
    ],
    removalPolicy: RemovalPolicy.DESTROY, // For dev/testing
    autoDeleteObjects: true, // For dev/testing
  }
);

// Create Python Lambda function using CDK
const voiceLambda = new Function(
  backend.createStack('VaaniVoiceFunction'),
  'VoiceProcessorFunction',
  {
    runtime: Runtime.PYTHON_3_11,
    handler: 'simple_handler.handler',
    code: Code.fromAsset('./amplify/functions/voice'),
    timeout: Duration.seconds(300),
    memorySize: 512,
    environment: {
      AUDIO_BUCKET_NAME: audioBucket.bucketName,
      AWS_REGION_NAME: backend.auth.resources.userPool.env.region,
      POWERTOOLS_SERVICE_NAME: 'vaani-voice',
      LOG_LEVEL: 'INFO',
    },
  }
);

// Grant S3 permissions to Lambda
audioBucket.grantReadWrite(voiceLambda);

// Add Transcribe permissions
voiceLambda.addToRolePolicy(
  new PolicyStatement({
    sid: 'TranscribePermissions',
    actions: [
      'transcribe:StartTranscriptionJob',
      'transcribe:GetTranscriptionJob',
      'transcribe:DeleteTranscriptionJob',
    ],
    resources: ['*'],
  })
);

// Add Polly permissions
voiceLambda.addToRolePolicy(
  new PolicyStatement({
    sid: 'PollyPermissions',
    actions: ['polly:SynthesizeSpeech'],
    resources: ['*'],
  })
);

// Create API Gateway for Lambda
const voiceApi = new LambdaRestApi(
  backend.createStack('VaaniVoiceAPI'),
  'VoiceAPI',
  {
    handler: voiceLambda,
    proxy: true,
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
      allowHeaders: ['*'],
    },
    description: 'VAANI Voice Processing API',
  }
);

// Export outputs
backend.addOutput({
  custom: {
    audioBucketName: audioBucket.bucketName,
    voiceFunctionName: voiceLambda.functionName,
    voiceFunctionArn: voiceLambda.functionArn,
    voiceApiUrl: voiceApi.url,
  },
});
