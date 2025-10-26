'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/DashboardHeader';
import ToggleSwitch from '@/components/ToggleSwitch';
import { useTheme } from '@/components/ThemeProvider';

export default function MyProfilePage() {
  const [shareProfile, setShareProfile] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const { isDarkMode } = useTheme();

  // Trigger animation on load
  React.useEffect(() => {
    console.log('MyProfile component mounted');
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []); // Removed isDarkMode dependency

  const profileSections = [
    'shareProfile',
    'about', 
    'professional',
    'idealRole',
    'searchStrategy'
  ];

  return (
    <DashboardLayout>
      <div className="h-full">
        <DashboardHeader title="My Profile" />

        <div 
          className={`min-h-screen p-6 relative`} 
          style={{
            backgroundImage: isDarkMode 
              ? 'linear-gradient(to top, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 20%, rgba(59, 130, 246, 0.04) 40%, rgba(59, 130, 246, 0.02) 60%, rgba(59, 130, 246, 0.01) 80%, #192636 100%)'
              : 'linear-gradient(to top, rgba(251, 146, 60, 0.12) 0%, rgba(251, 191, 36, 0.08) 20%, rgba(253, 224, 71, 0.06) 40%, rgba(254, 240, 138, 0.04) 60%, rgba(254, 249, 195, 0.02) 80%, #fbfbfb 100%)',
            backgroundColor: isDarkMode ? '#192636' : '#fbfbfb',
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100vh',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Fixed glow overlay for consistent effect */}
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: isDarkMode 
                ? 'linear-gradient(to top, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 30%, rgba(59, 130, 246, 0.02) 50%, transparent 70%)'
                : 'linear-gradient(to top, rgba(251, 146, 60, 0.06) 0%, rgba(251, 191, 36, 0.04) 30%, rgba(253, 224, 71, 0.03) 50%, transparent 70%)',
              zIndex: 1
            }}
          />
          
          {/* Content container */}
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-4">
                {profileSections.map((section, index) => (
                  <div 
                    key={section}
                    className={`rounded-lg transition-transform duration-[1500ms] ease-out ${
                      isDarkMode 
                        ? 'job-card-glow'
                        : 'job-card-glow-light'
                    }`}
                    style={{
                      transform: isAnimating 
                        ? 'translateX(-100vw)' 
                        : 'translateX(0px)',
                      transitionDelay: isAnimating 
                        ? '0ms' 
                        : `${index * 200}ms`,
                      zIndex: profileSections.length - index,
                      position: 'relative',
                      opacity: isAnimating ? 0 : 1,
                      willChange: 'transform, opacity'
                    }}
                  >
                    <hr className={`mx-6 ${
                      isDarkMode ? 'border-slate-600' : 'border-gray-200'
                    }`} />

                    <div className="px-6 pt-4 pb-6">
                      {section === 'shareProfile' && (
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-lg font-semibold mb-2 font-neue-haas text-super-white">
                              Share Profile
                            </h2>
                            {/* HR after Share Profile title */}
                            <hr className={`w-40 mb-4 transition-all duration-200 ${
                              isDarkMode ? 'border-slate-600' : 'border-gray-200'
                            }`} 
                            style={{
                              boxShadow: isDarkMode 
                                ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                : '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                            }} />
                            <p className="text-sm font-neue-haas text-super-white">
                              Hiring managers who collaborate with Nasihat can view your profile if Nasihat thinks there's a fit.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <ToggleSwitch
                              isOn={shareProfile}
                              onToggle={() => setShareProfile(!shareProfile)}
                              size="small"
                              ariaLabel="Toggle profile sharing"
                            />
                          </div>
                        </div>
                      )}

                      {section === 'about' && (
                        <div className="flex items-start justify-between">
                          <div className="flex-1 pr-4">
                            <h2 className="text-lg font-semibold mb-4 font-neue-haas text-super-white">
                              About
                            </h2>
                            {/* HR after About title */}
                            <hr className={`w-40 mb-4 transition-all duration-200 ${
                              isDarkMode ? 'border-slate-600' : 'border-gray-200'
                            }`} 
                            style={{
                              boxShadow: isDarkMode 
                                ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                : '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                            }} />
                            <div className="flex items-start space-x-4 ">
                              <div className={`w-16 h-16 rounded-full overflow-hidden header-avatar-shadow ${
                                isDarkMode ? 'bg-slate-600' : 'bg-gray-100'
                              }`}>
                                <img src={isDarkMode ? "/icons/avatar-icon.svg" : "/icons/avatar-icon-white-mode.svg"} alt="Profile" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold font-neue-haas text-super-white">
                                  Danial Hadi | Product Designer
                                </h3>
                                <div className="flex items-center mt-2 space-x-4 text-sm font-neue-haas text-super-white">
                                  <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Kuala Lumpur, Malaysia</span>
                                  </div>
                                  <span>•</span>
                                  <span>In School</span>
                                  <span>•</span>
                                  <span>Graduating July 2026</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {section === 'professional' && (
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold font-neue-haas text-super-white">
                                  Professional Profile
                                </h2>
                                <span className="text-xs font-neue-haas text-super-white">Updated 4 days ago</span>
                              </div>
                              {/* HR after Professional Profile title */}
                              <hr className={`w-40 mb-4 transition-all duration-200 ${
                                isDarkMode ? 'border-slate-600' : 'border-gray-200'
                              }`} 
                              style={{
                                boxShadow: isDarkMode 
                                  ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                  : '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                              }} />
                              <p className="mb-4 font-neue-haas text-super-white">
                                Experienced Product Designer passionate about crafting intuitive human-centered experiences.
                              </p>
                              <ul className="space-y-2 font-neue-haas text-super-white">
                                <li className="flex items-start">
                                  <span className="mr-2 text-super-white">•</span>
                                  <span>Previously at <strong>Flowframe</strong>, led a team of product designers that innovated task completion by <strong>19%</strong>.</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-2 text-super-white">•</span>
                                  <span>Skilled in <strong>UX research, interaction design</strong>, and <strong>design systems</strong> that scale with product growth.</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-2 text-super-white">•</span>
                                  <span>Thrive in collaborative settings where complex challenges turn into clear, usable design solutions.</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {section === 'idealRole' && (
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold font-neue-haas text-super-white">
                                  Ideal Role
                                </h2>
                                <span className="text-xs font-neue-haas text-super-white">Updated 4 days ago</span>
                              </div>
                              {/* HR after Ideal Role title */}
                              <hr className={`w-40 mb-4 transition-all duration-200 ${
                                isDarkMode ? 'border-slate-600' : 'border-gray-200'
                              }`} 
                              style={{
                                boxShadow: isDarkMode 
                                  ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                  : '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                              }} />
                              <p className="mb-4 font-neue-haas text-super-white">
                                Looking for opportunities as a <strong>Senior or Lead Product Designer</strong> where design drives product direction.
                              </p>
                              <div className="mb-4">
                                <h4 className="font-medium mb-2 font-neue-haas text-super-white">What you value:</h4>
                                <ul className="space-y-2 font-neue-haas text-super-white">
                                  <li className="flex items-start">
                                    <span className="mr-2 text-super-white">•</span>
                                    <span>A balance between strategy and <strong>hands-on design</strong></span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2 text-super-white">•</span>
                                    <span>Close collaboration with <strong>product + engineering</strong></span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2 text-super-white">•</span>
                                    <span>Fast-moving, open feedback environments</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2 text-super-white">•</span>
                                    <span>Teams building products in <strong>tech, healthcare, or productivity</strong>, but open to new domains where design creates impact</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {section === 'searchStrategy' && (
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold font-neue-haas text-super-white">
                                  Search Strategy
                                </h2>
                                <span className="text-xs font-neue-haas text-super-white">Updated 4 days ago</span>
                              </div>
                              {/* HR after Search Strategy title */}
                              <hr className={`w-40 mb-4 transition-all duration-200 ${
                                isDarkMode ? 'border-slate-600' : 'border-gray-200'
                              }`} 
                              style={{
                                boxShadow: isDarkMode 
                                  ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                  : '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
                              }} />
                              <p className="mb-4 font-neue-haas text-super-white">
                                Focused on <strong>product-led teams</strong> that value design as a growth engine.
                              </p>
                              <div className="mb-4">
                                <h4 className="font-medium mb-2 font-neue-haas text-super-white">Priorities:</h4>
                                <ul className="space-y-2 font-neue-haas text-super-white">
                                  <li className="flex items-start">
                                    <span className="mr-2 text-super-white">•</span>
                                    <span>Roles in <strong>UX/UI and Product Design</strong></span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2 text-super-white">•</span>
                                    <span><strong>Remote or hybrid</strong> flexibility</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="mr-2 text-super-white">•</span>
                                    <span>Products exploring <strong>AI-enhanced user experiences</strong> or <strong>new design systems</strong></span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
