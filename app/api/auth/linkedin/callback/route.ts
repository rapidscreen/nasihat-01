import { NextRequest, NextResponse } from 'next/server';
import { serviceContainer } from '@/lib/services/ServiceContainer';

/**
 * LinkedIn OAuth Callback Handler following SOLID principles:
 * - Single Responsibility: Only handles LinkedIn OAuth callback
 * - Dependency Inversion: Uses service abstractions
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    // Handle OAuth errors
    if (error) {
      console.error('LinkedIn OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('LinkedIn authentication failed')}`, request.url)
      );
    }

    // Validate required parameters
    if (!code) {
      return NextResponse.redirect(
        new URL('/login?error=No authorization code received', request.url)
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

    // Create response and redirect to dashboard
    const response = NextResponse.redirect(new URL('/dashboard', request.url));

    // Set HTTP-only cookie for token
    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('LinkedIn OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent('LinkedIn authentication failed')}`, request.url)
    );
  }
}