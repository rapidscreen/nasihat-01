import { NextRequest, NextResponse } from 'next/server';
import { serviceContainer } from '@/lib/services/ServiceContainer';

/**
 * LinkedIn OAuth API Route following SOLID principles:
 * - Single Responsibility: Only handles LinkedIn OAuth authentication
 * - Dependency Inversion: Uses service abstractions
 */
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    // Get services from container
    const linkedInOAuthService = serviceContainer.getLinkedInOAuthService();
    const authService = serviceContainer.getAuthService();

    // Exchange code for access token
    const accessToken = await linkedInOAuthService.exchangeCodeForToken(code);

    // Get user data from LinkedIn
    const oauthUserData = await linkedInOAuthService.getUserData(accessToken);

    // Handle OAuth user creation/login
    const result = await authService.handleLinkedInOAuth(oauthUserData);

    // Set HTTP-only cookie for token
    const response = NextResponse.json({
      success: true,
      user: result.user,
      token: result.token
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
    console.error('LinkedIn OAuth API error:', error);
    return NextResponse.json(
      { error: 'LinkedIn authentication failed' },
      { status: 401 }
    );
  }
}

// GET endpoint to redirect to LinkedIn OAuth
export async function GET() {
  try {
    const linkedInOAuthService = serviceContainer.getLinkedInOAuthService();
    const authUrl = linkedInOAuthService.getAuthUrl();
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('LinkedIn OAuth redirect error:', error);
    return NextResponse.redirect('/login?error=Failed to initiate LinkedIn authentication');
  }
}