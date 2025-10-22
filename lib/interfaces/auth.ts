/**
 * Authentication interfaces following SOLID principles:
 * - Interface Segregation: Separate interfaces for different concerns
 * - Dependency Inversion: High-level modules depend on abstractions
 */

// Base user interface
export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'linkedin' | 'email';
  providerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication state interface
export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

// Login credentials interface
export interface ILoginCredentials {
  email: string;
  password: string;
}

// OAuth user data interface
export interface IOAuthUserData {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'linkedin';
}

// Auth service interface (Dependency Inversion)
export interface IAuthService {
  login(credentials: ILoginCredentials): Promise<{ user: IUser; token: string }>;
  loginOrRegister(credentials: ILoginCredentials & { name?: string }): Promise<{ user: IUser; token: string }>;
  loginWithLinkedIn(code: string): Promise<{ user: IUser; token: string }>;
  handleLinkedInOAuth(oauthUserData: IOAuthUserData): Promise<{ user: IUser; token: string }>;
  logout(): Promise<void>;
  getCurrentUser(token: string): Promise<IUser>;
  refreshToken(token: string): Promise<string>;
}

// Database service interface (Dependency Inversion)
export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByProvider(provider: string, providerId: string): Promise<IUser | null>;
  create(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser>;
  update(id: string, userData: Partial<IUser>): Promise<IUser>;
  delete(id: string): Promise<void>;
}

// OAuth service interface (Dependency Inversion)
export interface IOAuthService {
  getAuthUrl(): string;
  exchangeCodeForToken(code: string): Promise<string>;
  getUserData(token: string): Promise<IOAuthUserData>;
}