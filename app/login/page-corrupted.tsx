'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { NasihatLogo } from '@/components/NasihatLogo';
import { BatikBackground } from '@/components/BatikBackground';
import { ROUTES, APP_CONSTANTS } from '@/utils/constants';
import { 
  loginUser, 
  loginWithLinkedIn, 
  clearError,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError 
} from '@/lib/redux/features/auth/authSlice';

/**
 * Login Page Component following SOLID principles:
 * - Single Responsibility: Only handles login UI and user interaction
 * - Open/Closed: Easy to extend with new authentication methods
 * - Dependency Inversion: Depends on Redux abstractions
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectAuthError);

  // Check for OAuth errors in URL params
  const oauthError = searchParams.get('error');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (isRegisterMode && !name)) {
      return;
    }

    try {
      await dispatch(loginUser({ email, password, name: isRegisterMode ? name : undefined })).unwrap();
      router.push('/dashboard');
    } catch (error) {
      // Error is already handled by Redux
      console.error('Authentication failed:', error);
    }
  };

  const handleLinkedInLogin = () => {
    // Get LinkedIn auth URL from our API
    window.location.href = '/api/auth/linkedin';
  };

  const handleClearError = () => {
    dispatch(clearError());
    // Also clear URL error params
    if (oauthError) {
      router.replace('/login');
    }
  };

  return (
    <BatikBackground className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Next Gen AI Badge Section */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1 w-16"></div>
          <span className="text-sm text-white/90 font-semibold px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">Next Gen AI</span>
          <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1 w-16"></div>
        </div>
      </div>

      {/* Error Display Section */}
      {(error || oauthError) && (
        <div className="flex justify-center mb-8 w-full max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 w-full">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">
                  Authentication Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error || oauthError}</p>
                </div>
                <div className="mt-2 flex">
                  <button
                    type="button"
                    className="text-sm bg-red-50 text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50 rounded-md px-2 py-1"
                    onClick={() => {
                      setError('');
                      setOauthError('');
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Login Form Section */}
      <div className="flex justify-center">
        <div className="bg-white shadow-xl border border-gray-100" style={{
          width: '596px',
          minHeight: '723px',
          borderRadius: '48px',
          padding: '48px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Form Content Container */}
          <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
            {/* Nasihat.ai Logo Section */}
            <div className="flex justify-center" style={{ marginBottom: '32px' }}>
              <img 
                src="/nasihat.ai.logo.png" 
                alt="Nasihat.ai Logo" 
                className="w-32 h-32"
              />
            </div>

            {/* Main Heading Section */}
            <div className="flex justify-center text-center" style={{ marginBottom: '32px' }}>
              <h1 style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '28px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '0',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Apa kabar, let's get you a <span style={{ color: '#4A90E2' }}>job<span style={{ color: '#4A90E2' }}>|</span></span>
              </h1>
            </div>
            
            {/* Get Started Button Section */}
            <div className="flex">
              <button
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                <svg className="w-4 h-4 mr-2" fill="#4A90E2" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 715 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                Get Started
              </button>
            </div>

            {/* Divider Section */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3">
                <span className="text-sm text-gray-500" style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}>Or</span>
              </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons Section */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col space-y-3">
                {/* LinkedIn Button */}
                <div className="flex">
                  <button
                    type="submit"
                    name="provider"
                    value="linkedin"
                    className="w-full flex items-center py-3 px-4 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with LinkedIn</span>
                    </div>
                  </button>
                </div>

                {/* Google Button */}
                <div className="flex">
                  <button
                    type="button"
                    className="w-full flex items-center py-3 px-4 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with Google</span>
                    </div>
                  </button>
                </div>

                {/* Apple Button */}
                <div className="flex">
                  <button
                    type="button"
                    className="w-full flex items-center py-3 px-4 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with Apple</span>
                    </div>
                  </button>
                </div>

                {/* Facebook Button */}
                <div className="flex">
                  <button
                    type="button"
                    className="w-full flex items-center py-3 px-4 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with Facebook</span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-center mt-8">
        <div className="text-center">
          <p className="mt-2 text-xs text-white/70" style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}>
            Powered by advanced AI technology for personalized advisory
          </p>
        </div>
      </div>
                  <button
                    onClick={handleClearError}
                    className="text-sm text-red-800 underline hover:text-red-600"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Login Form Card */}
        <div className="bg-white shadow-xl border border-gray-100" style={{
          width: '596px',
          minHeight: '723px',
          borderRadius: '48px',
          padding: '48px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
            {/* Nasihat.ai Logo at top of form */}
            <div className="flex justify-center" style={{ marginBottom: '32px' }}>
              <img 
                src="/nasihat.ai.logo.png" 
                alt="Nasihat.ai Logo" 
                className="w-32 h-32"
              />
            </div>

            {/* Main Heading */}
            <div className="text-center" style={{ marginBottom: '32px' }}>
              <h1 style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '28px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '0',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Apa khabar, let's get you a <span style={{ color: '#4A90E2' }}>job<span style={{ color: '#4A90E2' }}>|</span></span>
              </h1>
            </div>
            
            {/* Get Started Button */}
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                <svg className="w-4 h-4 mr-2" fill="#4A90E2" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 715 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                Get Started
              </button>
            </div>

            {/* Divider */}
            <div style={{ margin: '24px 0' }}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500" style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}>Or</span>
                </div>
              </div>
            </div>
            
            <form className="contents" onSubmit={handleEmailLogin}>
              <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Social Login Buttons */}
                <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                  {/* LinkedIn Login */}
                  <button
                    type="button"
                    onClick={handleLinkedInLogin}
                    disabled={isLoading}
                    className="w-full flex items-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with LinkedIn</span>
                    </div>
                  </button>

                  {/* Google Login */}
                  <button
                    type="button"
                    className="w-full flex items-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with Google</span>
                    </div>
                  </button>

                  {/* Apple Login */}
                  <button
                    type="button"
                    className="w-full flex items-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with Apple</span>
                    </div>
                  </button>

                  {/* Facebook Login */}
                  <button
                    type="button"
                    className="w-full flex items-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-center">
                      <span>Continue with Facebook</span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="mt-2 text-xs text-white/70" style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}>
            Powered by advanced AI technology for personalized advisory
          </p>
        </div>
      </div>

      {/* POWERED BY RAPIDSCREEN - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <span className="text-xs text-white/90 font-semibold px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20" style={{ 
          fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          POWERED BY RAPIDSCREEN
        </span>
      </div>
    </BatikBackground>
  );
}