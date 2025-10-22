import { NextRequest, NextResponse } from 'next/server';
import { serviceContainer } from '../../../../lib/services/ServiceContainer';

/**
 * Current User API Route following SOLID principles:
 * - Single Responsibility: Only handles getting current user data
 * - Dependency Inversion: Uses service abstractions
 */
export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header or cookie
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth-token')?.value;
    
    let token: string | null = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Get auth service from container
    const authService = serviceContainer.getAuthService();

    // Get current user
    const user = await authService.getCurrentUser(token);

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get current user API error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}