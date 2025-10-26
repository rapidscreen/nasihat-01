'use client';

import React from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface DashboardHeaderProps {
  title: string;
  children?: React.ReactNode; // For additional content like search bar, notifications, etc.
}

export default function DashboardHeader({ title, children }: DashboardHeaderProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-200 header-shadow ${
      isDarkMode ? 'border-slate-700 bg-[#253140]' : 'border-gray-200 bg-white'
    }`}>
      <h1 className={`text-2xl font-medium transition-colors duration-200 font-neue-haas ${
        isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
      }`}>
        {title}
      </h1>
      
      <div className="flex items-center space-x-3">
        {/* Additional content (search bar, notifications, etc.) */}
        {children}
        
        {/* Profile Avatar - Always present */}
        <div className="w-10 h-10 rounded-full overflow-hidden metal-shadow header-avatar-shadow">
          <img 
            src={isDarkMode ? "/icons/avatar-icon.svg" : "/icons/avatar-icon-white-mode.svg"} 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
}