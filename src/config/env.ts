import { z } from 'zod';

// Default values for development
const defaultEnv = {
  VITE_FIREBASE_API_KEY: 'dummy-api-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'dummy-auth-domain',
  VITE_FIREBASE_PROJECT_ID: 'dummy-project-id',
  VITE_FIREBASE_STORAGE_BUCKET: 'dummy-storage-bucket',
  VITE_FIREBASE_MESSAGING_SENDER_ID: 'dummy-sender-id',
  VITE_FIREBASE_APP_ID: 'dummy-app-id',
  VITE_APP_NAME: 'Quest Matrix',
  VITE_APP_URL: 'https://viva-vts.vercel.app',
  VITE_APP_DESCRIPTION: 'Interactive learning platform for CAPS curriculum',
  VITE_ENABLE_ANALYTICS: 'false',
  VITE_ENABLE_OFFLINE_MODE: 'false',
};

const envSchema = z.object({
  // Firebase Configuration
  VITE_FIREBASE_API_KEY: z.string().min(1).default(defaultEnv.VITE_FIREBASE_API_KEY),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1).default(defaultEnv.VITE_FIREBASE_AUTH_DOMAIN),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1).default(defaultEnv.VITE_FIREBASE_PROJECT_ID),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1).default(defaultEnv.VITE_FIREBASE_STORAGE_BUCKET),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1).default(defaultEnv.VITE_FIREBASE_MESSAGING_SENDER_ID),
  VITE_FIREBASE_APP_ID: z.string().min(1).default(defaultEnv.VITE_FIREBASE_APP_ID),

  // Application Configuration
  VITE_APP_NAME: z.string().default(defaultEnv.VITE_APP_NAME),
  VITE_APP_URL: z.string().url().default(defaultEnv.VITE_APP_URL),
  VITE_APP_DESCRIPTION: z.string().default(defaultEnv.VITE_APP_DESCRIPTION),

  // Feature Flags
  VITE_ENABLE_ANALYTICS: z.string().transform((val) => val === 'true').default('false'),
  VITE_ENABLE_OFFLINE_MODE: z.string().transform((val) => val === 'true').default('false'),

  // API Configuration
  VITE_API_URL: z.string().url().optional(),
  VITE_API_VERSION: z.string().optional(),

  // Third Party Services
  VITE_GOOGLE_ANALYTICS_ID: z.string().optional(),
  VITE_SENTRY_DSN: z.string().optional(),
});

// Merge default values with actual environment variables
const envVars = {
  ...defaultEnv,
  ...import.meta.env,
};

// Validate environment variables
const env = envSchema.parse(envVars);

export default env; 