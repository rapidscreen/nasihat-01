import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAuthService, IUser, ILoginCredentials, IOAuthUserData, IUserRepository } from '@/types/auth';

/**
 * Authentication Service implementation following SOLID principles:
 * - Single Responsibility: Only handles authentication logic
 * - Open/Closed: Easy to extend with new authentication methods
 * - Liskov Substitution: Can be substituted with any IAuthService implementation
 * - Interface Segregation: Clear separation of authentication concerns
 * - Dependency Inversion: Depends on abstractions (IUserRepository)
 */
export class AuthService implements IAuthService {
  private userRepository: IUserRepository;
  private jwtSecret: string;

  constructor(userRepository: IUserRepository, jwtSecret: string) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
  }

  async login(credentials: ILoginCredentials): Promise<{ user: IUser; token: string }> {
    try {
      // Find user by email
      const existingUser = await this.userRepository.findByEmail(credentials.email);
      
      if (existingUser) {
        // User exists - verify password and login
        if (existingUser.provider === 'email') {
          const isValidPassword = await this.verifyPassword(
            credentials.password,
            (existingUser as any).passwordHash
          );
          if (!isValidPassword) {
            throw new Error('Invalid credentials');
          }
        }

        // Generate JWT token
        const token = this.generateToken(existingUser.id);

        return {
          user: this.sanitizeUser(existingUser),
          token
        };
      } else {
        // User doesn't exist - create new user (auto-registration)
        const newUser = await this.createUser({
          email: credentials.email,
          name: this.extractNameFromEmail(credentials.email), // Extract name from email
          password: credentials.password,
          provider: 'email'
        });

        // Generate JWT token
        const token = this.generateToken(newUser.id);

        return {
          user: this.sanitizeUser(newUser),
          token
        };
      }
    } catch (error) {
      console.error('Login/Register error:', error);
      throw new Error(error instanceof Error ? error.message : 'Authentication failed');
    }
  }

  async loginOrRegister(credentials: ILoginCredentials & { name?: string }): Promise<{ user: IUser; token: string }> {
    try {
      // Find user by email
      const existingUser = await this.userRepository.findByEmail(credentials.email);
      
      if (existingUser) {
        // User exists - verify password and login
        if (existingUser.provider === 'email') {
          const isValidPassword = await this.verifyPassword(
            credentials.password,
            (existingUser as any).passwordHash
          );
          if (!isValidPassword) {
            throw new Error('Invalid credentials');
          }
        }

        // Generate JWT token
        const token = this.generateToken(existingUser.id);

        return {
          user: this.sanitizeUser(existingUser),
          token
        };
      } else {
        // User doesn't exist - create new user (auto-registration)
        const userName = credentials.name || this.extractNameFromEmail(credentials.email);
        
        const newUser = await this.createUser({
          email: credentials.email,
          name: userName,
          password: credentials.password,
          provider: 'email'
        });

        // Generate JWT token
        const token = this.generateToken(newUser.id);

        return {
          user: this.sanitizeUser(newUser),
          token
        };
      }
    } catch (error) {
      console.error('Login/Register error:', error);
      throw new Error(error instanceof Error ? error.message : 'Authentication failed');
    }
  }

  async loginWithLinkedIn(code: string): Promise<{ user: IUser; token: string }> {
    try {
      // This method will be called with the LinkedIn OAuth service
      // The actual implementation will be in the API route
      throw new Error('LinkedIn OAuth should be handled through API routes');
    } catch (error) {
      console.error('LinkedIn login error:', error);
      throw new Error('LinkedIn authentication failed');
    }
  }

  async handleLinkedInOAuth(oauthUserData: IOAuthUserData): Promise<{ user: IUser; token: string }> {
    try {
      // Check if user already exists
      let user = await this.userRepository.findByProvider('linkedin', oauthUserData.id);
      
      if (!user) {
        // Check if user exists with same email
        const existingUser = await this.userRepository.findByEmail(oauthUserData.email);
        if (existingUser) {
          throw new Error('User with this email already exists');
        }

        // Create new user
        user = await this.userRepository.create({
          email: oauthUserData.email,
          name: oauthUserData.name,
          avatar: oauthUserData.avatar,
          provider: 'linkedin',
          providerId: oauthUserData.id
        });
      }

      // Generate JWT token
      const token = this.generateToken(user.id);

      return {
        user: this.sanitizeUser(user),
        token
      };
    } catch (error) {
      console.error('LinkedIn OAuth handling error:', error);
      throw new Error('LinkedIn authentication failed');
    }
  }

  async logout(): Promise<void> {
    // In a JWT-based system, logout is typically handled client-side
    // by removing the token. For enhanced security, you could maintain
    // a blacklist of invalidated tokens in the database
    return Promise.resolve();
  }

  async getCurrentUser(token: string): Promise<IUser> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: string };
      const user = await this.userRepository.findById(decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      return this.sanitizeUser(user);
    } catch (error) {
      console.error('Get current user error:', error);
      throw new Error('Invalid token');
    }
  }

  async refreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: string };
      return this.generateToken(decoded.userId);
    } catch (error) {
      console.error('Refresh token error:', error);
      throw new Error('Invalid token');
    }
  }

  async createUser(userData: {
    email: string;
    name: string;
    password?: string;
    provider: 'email' | 'linkedin';
    providerId?: string;
    avatar?: string;
  }): Promise<IUser> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password for email-based users
      let passwordHash: string | undefined;
      if (userData.password && userData.provider === 'email') {
        passwordHash = await this.hashPassword(userData.password);
      }

      // Create user
      const newUser = await this.userRepository.create({
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar,
        provider: userData.provider,
        providerId: userData.providerId,
        ...(passwordHash && { passwordHash })
      } as any);

      return this.sanitizeUser(newUser);
    } catch (error) {
      console.error('Create user error:', error);
      throw new Error('Failed to create user');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.jwtSecret,
      { expiresIn: '7d' } // Token expires in 7 days
    );
  }

  private sanitizeUser(user: IUser): IUser {
    // Remove sensitive information before sending to client
    const { ...sanitizedUser } = user;
    delete (sanitizedUser as any).passwordHash;
    return sanitizedUser;
  }

  private extractNameFromEmail(email: string): string {
    // Extract name from email (e.g., john.doe@example.com -> John Doe)
    const localPart = email.split('@')[0];
    const name = localPart
      .split(/[._-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
    return name || 'User';
  }
}