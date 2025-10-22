import { IOAuthService, IOAuthUserData } from '@/types/auth';

/**
 * LinkedIn OAuth Service implementation following SOLID principles:
 * - Single Responsibility: Only handles LinkedIn OAuth operations
 * - Open/Closed: Easy to extend with additional OAuth providers
 * - Liskov Substitution: Can be substituted with any IOAuthService implementation
 * - Interface Segregation: Implements only LinkedIn-specific OAuth operations
 * - Dependency Inversion: Depends on abstractions, not concrete implementations
 */
export class LinkedInOAuthService implements IOAuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  getAuthUrl(): string {
    const state = this.generateState();
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'openid profile email',
      state: state,
    });

    // Store state in session storage for CSRF protection (in a real app, use server-side session)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('linkedin_oauth_state', state);
    }

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token exchange failed: ${error}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('LinkedIn token exchange error:', error);
      throw new Error('Failed to exchange code for token');
    }
  }

  async getUserData(accessToken: string): Promise<IOAuthUserData> {
    try {
      // Fetch user profile
      const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const profileData = await profileResponse.json();

      return {
        id: profileData.sub,
        email: profileData.email,
        name: profileData.name,
        avatar: profileData.picture,
        provider: 'linkedin',
      };
    } catch (error) {
      console.error('LinkedIn user data fetch error:', error);
      throw new Error('Failed to fetch user data');
    }
  }

  private generateState(): string {
    // Generate a random state for CSRF protection
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Method to verify state parameter (should be called in the callback)
  verifyState(receivedState: string, expectedState: string): boolean {
    return receivedState === expectedState;
  }
}

/**
 * OAuth Service Factory following Factory pattern and SOLID principles:
 * - Single Responsibility: Only creates OAuth service instances
 * - Open/Closed: Easy to add new OAuth providers
 * - Dependency Inversion: Returns abstractions, not concrete implementations
 */
export class OAuthServiceFactory {
  static createLinkedInService(
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ): IOAuthService {
    return new LinkedInOAuthService(clientId, clientSecret, redirectUri);
  }

  // Easy to extend with other providers
  // static createGoogleService(...): IOAuthService { ... }
  // static createGitHubService(...): IOAuthService { ... }
}