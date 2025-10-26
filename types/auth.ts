/**
 * Authentication interfaces following SOLID principles:
 * - Interface Segregation: Clear separation of concerns
 * - Dependency Inversion: High-level modules depend on abstractions
 */

export interface IUser {
  id: string;
  email: string;
  name: string;
  linkedinId?: string;
  provider?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginCredentials {
  email: string;
  password: string;
  name?: string; // For registration
}

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface IOAuthUserData {
  id: string;
  email: string;
  name: string;
  picture?: string;
  avatar?: string;
}

// Service interfaces
export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByLinkedInId(linkedinId: string): Promise<IUser | null>;
  findByProvider(provider: string, providerId: string): Promise<IUser | null>;
  create(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser>;
  update(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
}

export interface IAuthService {
  authenticateUser(credentials: ILoginCredentials): Promise<{ user: IUser; token: string }>;
  authenticateWithOAuth(oauthData: IOAuthUserData, provider: string): Promise<{ user: IUser; token: string }>;
  validateToken(token: string): Promise<IUser | null>;
  refreshToken(token: string): Promise<string | null>;
  revokeToken(token: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  handleLinkedInOAuth(oauthUserData: IOAuthUserData): Promise<{ user: IUser; token: string }>;
  getCurrentUser(token: string): Promise<IUser>;
  login(credentials: ILoginCredentials): Promise<{ user: IUser; token: string }>;
  loginOrRegister(credentials: ILoginCredentials & { name?: string }): Promise<{ user: IUser; token: string }>;
  loginWithLinkedIn(code: string): Promise<{ user: IUser; token: string }>;
  logout(): Promise<void>;
}

export interface IOAuthService {
  exchangeCodeForToken(code: string): Promise<string>;
  getUserData(accessToken: string): Promise<IOAuthUserData>;
  getAuthUrl(): string;
}