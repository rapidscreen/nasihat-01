/**
 * Application constants following SOLID principles
 */

export const APP_CONSTANTS = {
  APP_NAME: 'Nasihat.ai',
  APP_DESCRIPTION: 'AI-Powered Advisory Platform',
  
  // Authentication
  JWT_EXPIRY: '7d',
  SESSION_TIMEOUT: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  
  // UI
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 200,
  
  // LinkedIn OAuth
  LINKEDIN_SCOPE: 'r_liteprofile r_emailaddress',
  
  // API endpoints
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      LINKEDIN: '/api/auth/linkedin',
    }
  }
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRIVACY: '/privacy',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];