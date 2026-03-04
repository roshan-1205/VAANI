/**
 * AWS Amplify Configuration
 * This file configures Amplify for the VAANI frontend
 */

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

/**
 * Configure Amplify with backend outputs
 * This should be called once at app initialization
 */
export const configureAmplify = () => {
  Amplify.configure(outputs);
  
  console.log('✅ Amplify configured successfully');
  console.log('Region:', outputs.aws_project_region);
  console.log('API Endpoint:', outputs.custom?.voiceFunctionName || 'N/A');
};

/**
 * Get API configuration
 */
export const getApiConfig = () => {
  return {
    apiName: 'voiceApi',
    region: outputs.aws_project_region,
  };
};

export default configureAmplify;
