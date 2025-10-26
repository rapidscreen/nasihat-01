'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { NasihatLogo } from '@/components/NasihatLogo';
import { BatikBackground } from '@/components/BatikBackground';
import { PoweredByRapidScreen } from '@/components/PoweredByRapidScreen';
import { ROUTES, APP_CONSTANTS } from '@/utils/constants';
import { 
  loginUser, 
  loginWithLinkedIn, 
  clearError,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError 
} from '@/lib/redux/features/auth/authSlice';

// Animation styles
const animationStyles = `
  @keyframes slideInFromTop {
    0% { transform: translateY(-100vh); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideInFromLeft {
    0% { transform: translateX(-100vw); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInFromRight {
    0% { transform: translateX(100vw); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes logoAppear {
    0% { opacity: 0; transform: translateY(-50vh) scale(0.3); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes typewriter {
    0% { 
      width: 0; 
      opacity: 0; 
      transform: translateX(-50vw);
    }
    50% { 
      opacity: 1; 
      transform: translateX(0);
    }
    100% { 
      width: 100%; 
      opacity: 1; 
      transform: translateX(0);
    }
  }
  
  @keyframes infiniteTyping {
    /* Typing phase - 0% to 40% */
    0% { content: "Apa khabar, |"; }
    2% { content: "Apa khabar, l|"; }
    4% { content: "Apa khabar, le|"; }
    6% { content: "Apa khabar, let|"; }
    8% { content: "Apa khabar, let'|"; }
    10% { content: "Apa khabar, let's|"; }
    12% { content: "Apa khabar, let's |"; }
    14% { content: "Apa khabar, let's g|"; }
    16% { content: "Apa khabar, let's ge|"; }
    18% { content: "Apa khabar, let's get|"; }
    20% { content: "Apa khabar, let's get |"; }
    22% { content: "Apa khabar, let's get y|"; }
    24% { content: "Apa khabar, let's get yo|"; }
    26% { content: "Apa khabar, let's get you|"; }
    28% { content: "Apa khabar, let's get you |"; }
    30% { content: "Apa khabar, let's get you a|"; }
    32% { content: "Apa khabar, let's get you a |"; }
    34% { content: "Apa khabar, let's get you a j|"; }
    36% { content: "Apa khabar, let's get you a jo|"; }
    38% { content: "Apa khabar, let's get you a job|"; }
    
    /* Pause with blinking cursor - 40% to 55% */
    40% { content: "Apa khabar, let's get you a job|"; }
    42% { content: "Apa khabar, let's get you a job"; }
    44% { content: "Apa khabar, let's get you a job|"; }
    46% { content: "Apa khabar, let's get you a job"; }
    48% { content: "Apa khabar, let's get you a job|"; }
    50% { content: "Apa khabar, let's get you a job"; }
    52% { content: "Apa khabar, let's get you a job|"; }
    54% { content: "Apa khabar, let's get you a job"; }
    55% { content: "Apa khabar, let's get you a job|"; }
    
    /* Word-by-word backspacing - 55% to 100% */
    60% { content: "Apa khabar, let's get you a |"; }
    65% { content: "Apa khabar, let's get you |"; }
    70% { content: "Apa khabar, let's get |"; }
    75% { content: "Apa khabar, let's |"; }
    80% { content: "Apa khabar, |"; }
    85% { content: "Apa khabar, |"; }
    100% { content: "Apa khabar, |"; }
  }
  
  @keyframes blinkCursor {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .animate-slideInFromTop {
    animation: slideInFromTop 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(-100vh);
  }
  
  .animate-slideInFromLeft {
    animation: slideInFromLeft 0.8s ease-out forwards;
    opacity: 0;
    transform: translateX(-100vw);
  }
  
  .animate-slideInFromRight {
    animation: slideInFromRight 0.8s ease-out forwards;
    opacity: 0;
    transform: translateX(100vw);
  }
  
  .animate-fadeIn {
    animation: fadeIn 1s ease-out forwards;
    opacity: 0;
  }
  
  .animate-logoAppear {
    animation: logoAppear 1s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
    transform: translateY(-50vh) scale(0.3);
  }
  
  .animate-typewriter {
    animation: typewriter 1.5s ease-out forwards;
    animation-fill-mode: forwards;
    opacity: 0;
    transform: translateX(-50vw);
  }
  
  .animate-staticTypewriter {
    animation: typewriter 1.5s ease-out forwards;
    animation-fill-mode: forwards;
    opacity: 0;
    transform: translateX(-50vw);
  }
  
  .animate-infiniteTypewriter::after {
    content: "Apa khabar, |";
    animation: infiniteTyping 8s linear infinite;
    animation-delay: 0s;
  }
  
  /* Special styling for the job word and cursor */
  .animate-infiniteTypewriter::after {
    content: "Apa khabar, |";
    animation: infiniteTyping 8s linear infinite;
    animation-delay: 0s;
  }
  
  /* Color styling handled in keyframes with spans */
  .job-blue { color: #4A90E2; }
  .cursor-blue { color: #4A90E2; }
  }
`;

/**
 * Login Page Component following SOLID principles:
 * - Single Responsibility: Only handles login UI and user interaction
 * - Open/Closed: Easy to extend with new authentication methods
 * - Dependency Inversion: Depends on Redux abstractions
 */
// Login component that uses search params
function LoginPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState('');
  const [oauthError, setOauthError] = useState('');
  const [typedText, setTypedText] = useState('Apa khabar, ');
  const [showCursor, setShowCursor] = useState(true);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const authError = useAppSelector(selectAuthError);

  // Check for OAuth errors in URL params
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setOauthError(errorParam);
    }
  }, [searchParams]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const provider = formData.get('provider') as string;
    
    if (provider === 'linkedin') {
      await handleLinkedInLogin();
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isRegisterMode && !name) {
      setError('Please enter your name');
      return;
    }

    try {
      const userData = isRegisterMode 
        ? { email, password, name }
        : { email, password };
      
      await dispatch(loginUser(userData)).unwrap();
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      await dispatch(loginWithLinkedIn()).unwrap();
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'LinkedIn authentication failed');
    }
  };

  // Inject animation styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = animationStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    const baseText = "Apa khabar, ";
    const dynamicText = "let's get you a job";
    const words = dynamicText.split(' ');
    let isTyping = true;
    let wordIndex = 0;
    let charIndex = 0;
    
    const typeAnimation = () => {
      if (isTyping) {
        // Typing phase
        if (wordIndex < words.length) {
          const currentWord = words[wordIndex];
          if (charIndex <= currentWord.length) {
            let typedPart = '';
            for (let i = 0; i <= wordIndex; i++) {
              if (i < wordIndex) {
                typedPart += words[i] + ' ';
              } else {
                typedPart += currentWord.substring(0, charIndex);
              }
            }
            setTypedText(baseText + typedPart);
            charIndex++;
          } else {
            charIndex = 0;
            wordIndex++;
            if (wordIndex < words.length) {
              setTypedText(baseText + words.slice(0, wordIndex).join(' ') + ' ');
            }
          }
          
          if (wordIndex >= words.length && charIndex === 0) {
            // Finished typing, wait 3 seconds then start backspacing
            setTimeout(() => {
              isTyping = false;
              wordIndex = words.length - 1;
            }, 3000);
          }
        }
      } else {
        // Backspacing phase - word by word
        if (wordIndex >= 0) {
          const textToShow = words.slice(0, wordIndex).join(' ');
          setTypedText(baseText + (textToShow ? textToShow + ' ' : ''));
          wordIndex--;
        } else {
          // Reset for next cycle
          isTyping = true;
          wordIndex = 0;
          charIndex = 0;
        }
      }
    };

    const interval = setInterval(typeAnimation, 150);
    
    return () => clearInterval(interval);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <BatikBackground className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Next Gen AI Badge Section - Animation from top to bottom */}
      <div className="flex items-center justify-center mb-8 animate-slideInFromTop">
        <div className="flex items-center justify-center space-x-2">
          <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1 w-16"></div>
          <span className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-105" style={{
            fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '145%',
            letterSpacing: '0%',
            color: '#FFFFFF',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 20px 50px rgba(0, 0, 0, 0.3), 0 12px 32px rgba(0, 0, 0, 0.25), 0 6px 16px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15), 0 8px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(0, 0, 0, 0.5)',
            textShadow: '0 6px 12px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>Next Generation AI Technology</span>
          <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1 w-16"></div>
        </div>
      </div>

      {/* Error Display Section */}
      {(error || oauthError || authError) && (
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
                  <p>{error || oauthError || authError}</p>
                </div>
                <div className="mt-2 flex">
                  <button
                    type="button"
                    className="text-sm bg-red-50 text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50 rounded-md px-2 py-1"
                    onClick={() => {
                      setError('');
                      setOauthError('');
                      dispatch(clearError());
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
      <div className="flex justify-center animate-fadeIn">
        <div className="shadow-xl border border-gray-100" style={{
          width: '596px',
          minHeight: '723px',
          borderRadius: '48px',
          padding: '48px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(248, 250, 252, 0.85)'
        }}>
          {/* Form Content Container */}
          <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
            {/* Nasihat.ai Logo Section - Light Bulb with Blue Animation */}
            <div className="flex justify-center animate-logoAppear" style={{ marginBottom: '32px' }}>
              <img 
                src="/icons/nasihat-icon-main-page.svg" 
                alt="Nasihat.ai Logo" 
                className="w-32 h-32 nasihat-lightbulb-glow transition-all duration-1000 hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(74, 144, 226, 0.7)) drop-shadow(0 0 80px rgba(74, 144, 226, 0.4)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.3)) brightness(1.1)'
                }}
              />
            </div>

            {/* Main Heading Section - JavaScript-based typing animation */}
            <div className="flex justify-center text-center" style={{ marginBottom: '32px' }}>
              <h1 style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '28px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '0',
                lineHeight: '1.2',
                display: 'block',
                position: 'relative',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
              }}>
                {typedText.split(' ').map((word, index) => {
                  if (word === 'job') {
                    return <span key={index} style={{ color: '#4A90E2' }}>job </span>;
                  }
                  return word + ' ';
                })}
                <span style={{ color: '#4A90E2', opacity: showCursor ? 1 : 0 }}>|</span>
              </h1>
            </div>
            
            {/* Get Started Button Section - Animation from top to bottom */}
            <div className="flex animate-slideInFromTop" style={{ animationDelay: '0.5s' }}>
              <button
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                <img 
                  src="/microphone.svg" 
                  alt="Microphone" 
                  className="w-6 h-6 mr-2"
                />
                Get Started
              </button>
            </div>

            {/* Divider Section */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-black" style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}></div>
              <div className="px-3 flex">
                <span className="text-sm text-black" style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)'
                }}>Or</span>
              </div>
              <div className="flex-1 border-t border-black" style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}></div>
            </div>

            {/* Social Login Buttons Section */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col space-y-3">

                {/* Google Button */}
                <div className="flex animate-slideInFromLeft" style={{ animationDelay: '0.4s' }}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-full text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ 
                      fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>

                {/* Apple Button */}
                <div className="flex animate-slideInFromLeft" style={{ animationDelay: '0.6s' }}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-full text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ 
                      fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#000000">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span>Continue with Apple</span>
                  </button>
                </div>

                {/* Facebook Button */}
                <div className="flex animate-slideInFromLeft" style={{ animationDelay: '0.8s' }}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-full text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    style={{ 
                      fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Continue with Facebook</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section - Typing animation */}
      <div className="flex justify-center mt-8 animate-typewriter" style={{ animationDelay: '1.2s' }}>
        <div className="text-center">
          <p className="mt-2 text-xs text-white/70" style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}>
            {/* Powered by advanced AI technology for personalized advisory */}
          </p>
        </div>
      </div>
      </div>
      
      <PoweredByRapidScreen />
    </BatikBackground>
  );
}

// Main export with Suspense wrapper
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}