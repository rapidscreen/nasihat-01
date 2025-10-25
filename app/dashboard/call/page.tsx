'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

export default function CallPage() {
  const [isListening, setIsListening] = useState(true);

  return (
    <DashboardLayout>
      <div className="h-full">
        {/* Header - Same as other pages */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700" style={{ backgroundColor: '#253140' }}>
          <h1 className="text-2xl font-medium text-white" style={{ 
            fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
          }}>
            Call Nasihat
          </h1>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden metal-shadow">
              <img src="/icons/avatar-icon.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Main Content - Voice Interface */}
        <div className="flex flex-col items-center justify-center h-full px-6 py-8 relative" style={{ backgroundColor: '#192636' }}>
          {/* Current Topic */}
          <div className="mb-8">
            <p className="text-slate-400 text-sm mb-2 text-center" style={{ 
              fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
            }}>
              Current Topic:
            </p>
            <div className="bg-slate-700 rounded-full px-4 py-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-200 text-sm" style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Getting to know you
              </span>
            </div>
          </div>

          {/* Voice Animation Circle */}
          <div className="relative mb-8">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative">
              {/* Outer glow rings */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
                  <div className="absolute inset-2 rounded-full border border-blue-300 animate-ping animation-delay-75"></div>
                </>
              )}
              
              {/* Inner glowing circle */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50"></div>
              
              {/* Center dot */}
              <div className="absolute w-16 h-16 rounded-full bg-blue-300 shadow-inner"></div>
            </div>
          </div>

          {/* Speaking Indicator */}
          {isListening && (
            <div className="mb-12">
              <span className="bg-slate-700 text-slate-200 px-4 py-2 rounded-full text-sm" style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Speaking
              </span>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            {/* Up Arrow */}
            <button className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>

            {/* Microphone */}
            <button className="w-12 h-12 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-colors">
              <img src="/microphone.svg" alt="Microphone" className="w-6 h-6 text-white" />
            </button>

            {/* Pause/Play */}
            <button className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </button>

            {/* Copy */}
            <button className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Warning */}
            <button className="w-12 h-12 bg-yellow-600 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </button>

            {/* End Call */}
            <button className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.7l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 right-6">
            <div className="text-slate-400 text-sm" style={{ 
              fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
            }}>
              POWERED BY <span className="text-orange-400 font-semibold">RAPID</span><span className="text-white font-semibold">SCREEN</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}