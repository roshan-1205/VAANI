import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * VAANI Data Schema
 * Define your data models here
 */
const schema = a.schema({
  // Example: Voice interaction history
  VoiceInteraction: a
    .model({
      userId: a.string(),
      transcribedText: a.string(),
      responseText: a.string(),
      audioUrl: a.string(),
      languageCode: a.string(),
      timestamp: a.datetime(),
      duration: a.integer(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
