import { NextRequest, NextResponse } from 'next/server';
import { serviceContainer } from '@/lib/services/ServiceContainer';

/**
 * Logout API Route following SOLID principles:
 * - Single Responsibility: Only handles user logout
 * - Dependency Inversion: Uses service abstractions
 */
export async function POST(request: NextRequest) {
  try {
    // Get auth service from container
    const authService = serviceContainer.getAuthService();

    // Perform logout (mainly for potential token blacklisting in the future)
    await authService.logout();

    // Clear the auth cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Immediately expire the cookie
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}