'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/components/ThemeProvider';

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    setIsTransitioning(true);
    toggleTheme();
    
    // Remove transition class after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);
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
    <div className={`flex h-screen theme-transition ${isTransitioning ? 'transitioning' : ''} ${
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
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
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
            className={`lg:hidden p-2 transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#1b1b1b] hover:text-[#1b1b1b]'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              // Check if current path matches or starts with the menu item path
              const isActive = item.href === '/dashboard/jobs' 
                ? pathname.startsWith('/dashboard/jobs')
                : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 font-neue-haas ${
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
            <span className={`transition-colors font-neue-haas font-medium text-sm leading-snug ${
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
                  className={`relative toggle-track-shadow w-16 h-8 rounded-full ${
                    isDarkMode ? 'bg-[#2a3441]' : 'bg-[#005bd1]'
                  }`}
                  style={{
                    transition: 'background-color 2s ease-in-out'
                  }}
                >
                  <div 
                    className={`absolute w-7 h-7 rounded-full top-0.5 flex items-center justify-center overflow-hidden ${
                      isDarkMode 
                        ? 'right-0.5 bg-[#3a4450]' 
                        : 'left-0.5 bg-white'
                    }`}
                    style={{
                      transition: 'all 2s ease-in-out',
                      boxShadow: isDarkMode 
                        ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.3)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.2)'
                    }}
                  >
                    <img 
                      src={isDarkMode ? "/icons/crescent-moon.svg" : "/icons/sun.svg"}
                      alt={isDarkMode ? "Moon" : "Sun"}
                      className={`${isDarkMode ? "w-full h-full" : "w-4 h-4 sun-icon-shadow"}`}
                      style={{
                        filter: isDarkMode ? 'brightness(0.7) contrast(0.8) opacity(0.85)' : 'none',
                        transition: 'all 2s ease-in-out, filter 2s ease-in-out'
                      }}
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className={`mx-4 metal-shadow sidebar-hr-shadow ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`} />

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
                <p className={`text-sm font-medium transition-colors font-neue-haas ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`}>
                  Danial Hadi
                </p>
                <p className={`text-xs transition-colors font-neue-haas ${
                  isDarkMode ? 'text-slate-400' : 'text-[#1b1b1b]'
                }`}>
                  danial@rapidscreen.io
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className={`p-2 transition-colors duration-200 ${
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
      <div className={`flex-1 flex flex-col overflow-hidden transition-colors duration-200 ${
        isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
      }`}>
        {/* Mobile header */}
        <header className={`lg:hidden shadow-sm border-b px-4 py-3 transition-colors duration-200 header-shadow ${
          isDarkMode ? 'border-slate-700 bg-[#253140]' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className={`p-2 transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-[#1b1b1b] hover:text-[#1b1b1b]'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className={`text-lg font-semibold transition-colors font-neue-haas ${
              isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
            }`}>
              NASIHAT
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto transition-colors duration-200 ${
          isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;