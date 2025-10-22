import { NextRequest, NextResponse } from 'next/server';
import { serviceContainer } from '@/lib/services/ServiceContainer';

/**
 * Login API Route following SOLID principles:
 * - Single Responsibility: Only handles login authentication
 * - Dependency Inversion: Uses service abstractions
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get auth service from container
    const authService = serviceContainer.getAuthService();

    // Attempt login or register
    const result = await authService.loginOrRegister({ email, password, name });

    // Set HTTP-only cookie for token (more secure than localStorage)
    const response = NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
      isNewUser: !name // If no name was provided, it's likely a new user
    });

    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login/Register API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Authentication failed' },
      { status: 401 }
    );
  }
}