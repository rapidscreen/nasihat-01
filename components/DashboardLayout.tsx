'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/components/ThemeProvider';
import { PoweredByRapidScreen } from '@/components/PoweredByRapidScreen';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const menuItems: MenuItem[] = [
    {
      href: '/dashboard/call',
      label: 'Call Nasihat',
      icon: (
        <img src="/icons/call.svg" alt="Call" className="w-5 h-5 icon-shadow" />
      )
    },
    {
      href: '/dashboard/jobs/all',
      label: 'Jobs',
      icon: (
        <img src="/icons/briefcase.svg" alt="Jobs" className="w-5 h-5 icon-shadow" />
      )
    },
    {
      href: '/dashboard/my-profile',
      label: 'My Profile',
      icon: (
        <img src="/icons/profile-circle.svg" alt="Profile" className="w-5 h-5 icon-shadow" />
      )
    }
  ];

  const handleSignOut = () => {
    // Add sign out logic here
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen ${
      isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
    }`}>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 sidebar-shadow ${isDarkMode ? '' : 'light-mode'} transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col border-r ${
        isDarkMode ? 'border-slate-700 bg-[#253140]' : 'border-gray-200 bg-white'
      }`}>
        {/* Logo and Brand Section */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-visible mr-3">
              <img 
                src={isDarkMode ? "/icons/nasihat.ai-dark-mode.svg" : "/icons/nasihat.ai-white-mode.svg"}
                alt="Nasihat.ai" 
                className={`w-full h-full object-cover ${isDarkMode ? 'nasihat-logo-glow' : 'nasihat-logo-glow-light'}`}
              />
            </div>
            <span className={`nasihat-brand-text ${
              isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
            }`}>
              NASIHAT
            </span>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={`lg:hidden p-2  ${
              isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#1b1b1b] hover:text-[#1b1b1b]'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Top Divider */}
        <hr className={`mx-4 transition-all duration-200 ${
          isDarkMode ? 'border-slate-600' : 'border-gray-200'
        }`} 
        style={{
          boxShadow: isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
        }} />

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              // Check if current path matches or starts with the menu item path
              const isActive = item.href === '/dashboard/jobs/all' 
                ? pathname.startsWith('/dashboard/jobs')
                : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg font-neue-haas ${
                      isActive
                        ? isDarkMode 
                          ? 'text-white bg-[#3a4553]' 
                          : 'text-[#005bd1] bg-[#f2f7fc]'
                        : isDarkMode
                          ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          : 'text-[#1b1b1b] hover:bg-gray-100 hover:text-[#1b1b1b]'
                    }`}
                  >
                    <span className={`mr-3 ${
                      isActive 
                        ? isDarkMode ? '' : ''
                        : isDarkMode ? '' : ''
                    }`} style={{
                      filter: isActive 
                        ? isDarkMode 
                          ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(197deg) brightness(105%) contrast(104%)'
                          : 'brightness(0) saturate(100%) invert(17%) sepia(99%) saturate(2143%) hue-rotate(212deg) brightness(97%) contrast(102%)'
                        : isDarkMode 
                          ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                          : 'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(413%) hue-rotate(201deg) brightness(93%) contrast(89%)'
                    }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Divider */}
        {/* <hr className="mx-4 border-slate-700" /> */}

        {/* Dark Mode Toggle */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <span className={` font-neue-haas font-medium text-sm leading-snug ${
              isDarkMode ? 'text-slate-300' : 'text-[#1b1b1b]'
            }`}>
              Dark Mode
            </span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={isDarkMode}
                onChange={handleThemeToggle}
                id="darkModeToggle"
              />
              <label 
                htmlFor="darkModeToggle" 
                className="flex items-center cursor-pointer"
              >
                <div 
                  className={`relative w-16 h-8 rounded-full overflow-hidden cursor-pointer transition-all duration-700 ${
                    isDarkMode ? 'metallic-toggle-active' : 'metallic-toggle-off'
                  }`}
                  style={{
                    background: isDarkMode 
                      ? 'linear-gradient(145deg, #253140 0%, #1e2833 40%, #192636 100%)'
                      : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 40%, #e9ecef 100%)',
                    boxShadow: isDarkMode 
                      ? 'inset 4px 4px 8px rgba(0,0,0,0.8), inset -4px -4px 8px rgba(255,255,255,0.02), inset 2px 2px 12px rgba(0,0,0,0.7), inset -2px -2px 6px rgba(255,255,255,0.01)'
                      : 'inset 3px 3px 6px rgba(0,0,0,0.4), inset -3px -3px 6px rgba(255,255,255,0.8), inset 1px 1px 8px rgba(0,0,0,0.2), inset -1px -1px 4px rgba(255,255,255,0.9)'
                  }}
                >
                  {/* Border glow */}
                  <div 
                    className="absolute inset-0 rounded-[inherit] transition-all duration-700"
                    style={{
                      padding: '3px',
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, #007BFF, #00BFFF, #007BFF)'
                        : 'linear-gradient(135deg, #d6d7d9, #b4b6b8, #d2d3d4)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      boxShadow: isDarkMode 
                        ? '0 0 12px rgba(0,123,255,0.4), 0 0 24px rgba(0,123,255,0.2)'
                        : '0 0 8px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.08)'
                    }}
                  />
                  
                  {/* Toggle Circle/Knob */}
                  <div 
                    className={`absolute w-7 h-7 rounded-full top-0.5 flex items-center justify-center transition-all duration-600 z-10 ${
                      isDarkMode ? 'left-0.5' : 'left-8'
                    }`}
                    style={{
                      background: isDarkMode 
                        ? 'radial-gradient(circle at 30% 30%, #161b24, #090d13)'
                        : 'linear-gradient(145deg, #d2d3d4 0%, #8c8f91 50%, #55585b 100%)',
                      boxShadow: isDarkMode 
                        ? 'inset 1px 1px 3px rgba(255,255,255,0.04), inset -1px -1px 4px rgba(0,0,0,0.85)'
                        : 'inset 1px 1px 2px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(0,0,0,0.4), 0 0 10px rgba(255,255,255,0.15)'
                    }}
                  >
                    {/* Sun glow effect */}
                    <div 
                      className="absolute w-4 h-4 rounded-full transition-opacity duration-600 z-0"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)',
                        opacity: isDarkMode ? 0 : 1
                      }}
                    />
                    
                    {/* Moon icon */}
                    <div 
                      className="absolute transition-all duration-500"
                      style={{
                        opacity: isDarkMode ? 1 : 0,
                        transform: isDarkMode ? 'scale(1)' : 'scale(0.8)'
                      }}
                    >
                      <svg 
                        width="12" 
                        height="12" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.8"
                        className="transition-all duration-600"
                        style={{
                          stroke: '#3da2ff'
                        }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M21 12.79A9 9 0 0112.21 3a7.5 7.5 0 109.79 9.79z"
                        />
                      </svg>
                    </div>
                    
                    {/* Sun icon */}
                    <div 
                      className="absolute transition-all duration-500"
                      style={{
                        opacity: isDarkMode ? 0 : 1,
                        transform: isDarkMode ? 'scale(0.8)' : 'scale(1)'
                      }}
                    >
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-all duration-600"
                      >
                        <path 
                          d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" 
                          stroke="#000000" 
                          strokeWidth="1.8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
                          stroke="#000000" 
                          strokeWidth="1.8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className={`mx-4 transition-all duration-200 ${
          isDarkMode ? 'border-slate-600' : 'border-gray-200'
        }`} 
        style={{
          boxShadow: isDarkMode 
            ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
        }} />

        {/* User Profile Section */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Profile Icon */}
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 metal-shadow avatar-icon-shadow">
                <img src={isDarkMode ? "/icons/avatar-icon.svg" : "/icons/avatar-icon-white-mode.svg"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <p className={`text-sm font-medium  font-neue-haas ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`}>
                  Danial Hadi
                </p>
                <p className={`text-xs  font-neue-haas ${
                  isDarkMode ? 'text-slate-400' : 'text-[#1b1b1b]'
                }`}>
                  danial@rapidscreen.io
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className={`p-2 ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#1b1b1b] hover:text-[#1b1b1b]'
              }`}
              title="Sign Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col overflow-hidden ${
        isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
      }`}>
        {/* Mobile header */}
        <header className={`lg:hidden shadow-sm border-b px-4 py-3 header-shadow ${
          isDarkMode ? 'border-slate-700 bg-[#253140]' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className={`p-2 ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#1b1b1b] hover:text-[#1b1b1b]'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className={`text-lg font-semibold  font-neue-haas ${
              isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
            }`}>
              NASIHAT
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${
          isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
        }`}>
          <div className="min-h-full flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <PoweredByRapidScreen />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
