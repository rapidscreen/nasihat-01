import { AuthService } from './AuthService';
import { UserRepository } from './UserRepository';
import { LinkedInOAuthService, OAuthServiceFactory } from './LinkedInOAuthService';
import { IAuthService, IUserRepository, IOAuthService } from '@/types/auth';

/**
 * Service Container following SOLID principles:
 * - Single Responsibility: Only manages service dependencies
 * - Open/Closed: Easy to extend with new services
 * - Dependency Inversion: Provides abstractions through interfaces
 * - Interface Segregation: Clear separation of service concerns
 */
export class ServiceContainer {
  private static instance: ServiceContainer;
  private userRepository: IUserRepository | null = null;
  private authService: IAuthService | null = null;
  private linkedInOAuthService: IOAuthService | null = null;

  private constructor() {}

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository();
    }
    return this.userRepository;
  }

  getAuthService(): IAuthService {
    if (!this.authService) {
      const jwtSecret = process.env.JWT_SECRET || 'your-fallback-secret-key';
      this.authService = new AuthService(this.getUserRepository(), jwtSecret);
    }
    return this.authService;
  }

  getLinkedInOAuthService(): IOAuthService {
    if (!this.linkedInOAuthService) {
      const clientId = process.env.LINKEDIN_CLIENT_ID || '';
      const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || '';
      const redirectUri = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/auth/linkedin/callback';
      
      this.linkedInOAuthService = OAuthServiceFactory.createLinkedInService(
        clientId,
        clientSecret,
        redirectUri
      );
    }
    return this.linkedInOAuthService;
  }

  // Method to reset services (useful for testing)
  reset(): void {
    this.userRepository = null;
    this.authService = null;
    this.linkedInOAuthService = null;
  }
}

// Export singleton instance
export const serviceContainer = ServiceContainer.getInstance();