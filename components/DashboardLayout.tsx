'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuItems: MenuItem[] = [
    {
      href: '/dashboard/call',
      label: 'Call Nasihat',
      icon: (
        <img src="/icons/call.svg" alt="Call" className="w-5 h-5" />
      )
    },
    {
      href: '/dashboard/jobs',
      label: 'Jobs',
      icon: (
        <img src="/icons/briefcase.svg" alt="Jobs" className="w-5 h-5" />
      )
    },
    {
      href: '/dashboard/my-profile',
      label: 'My Profile',
      icon: (
        <img src="/icons/profile-circle.svg" alt="Profile" className="w-5 h-5" />
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#192636' }}>
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
      } fixed inset-y-0 left-0 z-50 w-64 sidebar-shadow transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col border-r border-slate-700`} style={{ backgroundColor: '#253140' }}>
        {/* Logo and Brand Section */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <img 
              src="/icons/nasihat.ai-dark-mode.svg" 
              alt="Nasihat.ai" 
              className="w-12 h-12 mr-3 nasihat-logo-glow"
            />
            <span className="nasihat-brand-text">
              NASIHAT
            </span>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-200"
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
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    style={{ 
                      fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                      ...(isActive ? { backgroundColor: '#3a4553' } : {})
                    }}
                  >
                    <span className={`mr-3 ${isActive ? 'text-white' : 'text-slate-400'}`}>
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
            <span className="text-slate-300" style={{ 
              fontFamily: 'Neue Haas Grotesk Display Pro',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '145%',
              letterSpacing: '0%'
            }}>
              Dark Mode
            </span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                id="darkModeToggle"
              />
              <label 
                htmlFor="darkModeToggle" 
                className="flex items-center cursor-pointer"
              >
                <div className="relative metal-shadow" style={{
                  width: '64px',
                  height: '32px',
                  background: '#303c4b',
                  borderRadius: '42.6667px',
                  padding: '0'
                }}>
                  <div 
                    className="absolute transition-all duration-200 ease-in-out metal-toggle metal-shadow"
                    style={{
                      width: '26.67px',
                      height: '26.67px',
                      right: isDarkMode ? '2.67px' : 'calc(100% - 29.34px)',
                      top: '2.67px',
                      background: '#444f5d',
                      borderRadius: '26.6667px',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src="/icons/crescent-moon.svg" 
                      alt="Moon" 
                      style={{
                        width: '100%',
                        height: '100%',
                        filter: 'brightness(1.2)'
                      }}
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="mx-4 border-slate-700 metal-shadow" />

        {/* User Profile Section */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Profile Icon */}
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 metal-shadow">
                <img src="/icons/avatar-icon.svg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <p className="text-sm font-medium text-white" style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  Danial Hadi
                </p>
                <p className="text-xs text-slate-400" style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  danial@rapidscreen.io
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="p-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
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
      <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: '#192636' }}>
        {/* Mobile header */}
        <header className="lg:hidden shadow-sm border-b border-slate-700 px-4 py-3" style={{ backgroundColor: '#253140' }}>
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 text-slate-400 hover:text-slate-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className="text-lg font-semibold text-white" style={{ 
              fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
            }}>
              NASIHAT
            </h1>
            
            {/* <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center profile-icon-shadow">
              <span className="text-white text-sm font-semibold" style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                DH
              </span>
            </div> */}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto" style={{ backgroundColor: '#192636' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;