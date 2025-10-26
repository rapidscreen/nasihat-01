'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/DashboardHeader';
import { useTheme } from '@/components/ThemeProvider';

export default function MyProfilePage() {
  const [shareProfile, setShareProfile] = useState(true);
  const { isDarkMode } = useTheme();

  return (
    <DashboardLayout>
      <div className="h-full">
        {/* Header */}
        <DashboardHeader title="My Profile" />

        {/* Main Content */}
        <div className={`p-6 transition-colors duration-200 ${
          isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
        }`}>
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Share Profile Section */}
            <div className={`rounded-lg p-6 border transition-colors duration-200 ${
              isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-lg font-semibold mb-2 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                  }`} style={{ 
                    fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                  }}>
                    Share Profile
                  </h2>
                  <p className={`text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`} style={{ 
                    fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                  }}>
                    Hiring managers who collaborate with Nasihat can view your profile if Nasihat thinks there's a fit.
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={shareProfile}
                      onChange={(e) => setShareProfile(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 ${
                      isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
                    }`}></div>
                  </label>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className={`rounded-lg p-6 border transition-colors duration-200 ${
              isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-lg font-semibold mb-4 transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
              }`} style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                About
              </h2>
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-full overflow-hidden ${
                  isDarkMode ? 'bg-slate-600' : 'bg-gray-100'
                }`}>
                  <img src={isDarkMode ? "/icons/avatar-icon.svg" : "/icons/avatar-icon-white-mode.svg"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold transition-colors ${
                    isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                  }`} style={{ 
                    fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                  }}>
                    Danial Hadi | Product Designer
                  </h3>
                  <div className={`flex items-center mt-2 space-x-4 text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
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

            {/* Professional Profile Section */}
            <div className={`rounded-lg p-6 border transition-colors duration-200 ${
              isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`} style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  Professional Profile
                </h2>
                <span className={`text-xs transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`}>Updated 4 days ago</span>
              </div>
              <p className={`mb-4 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`} style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Experienced Product Designer passionate about crafting intuitive human-centered experiences.
              </p>
              <ul className={`space-y-2 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>•</span>
                  <span>Previously at <strong>Flowframe</strong>, led a team of product designers that innovated task completion by <strong>19%</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>•</span>
                  <span>Skilled in <strong>UX research, interaction design</strong>, and <strong>design systems</strong> that scale with product growth.</span>
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>•</span>
                  <span>Thrive in collaborative settings where complex challenges turn into clear, usable design solutions.</span>
                </li>
              </ul>
            </div>

            {/* Ideal Role Section */}
            <div className={`rounded-lg p-6 border transition-colors duration-200 ${
              isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`} style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  Ideal Role
                </h2>
                <span className={`text-xs transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`}>Updated 4 days ago</span>
              </div>
              <p className={`mb-4 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`} style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Looking for opportunities as a <strong>Senior or Lead Product Designer</strong> where design drives product direction.
              </p>
              <div className="mb-4">
                <h4 className={`font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`}>What you value:</h4>
                <ul className={`space-y-2 transition-colors ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  <li className="flex items-start">
                    <span className={`mr-2 transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>•</span>
                    <span>A balance between strategy and <strong>hands-on design</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>•</span>
                    <span>Close collaboration with <strong>product + engineering</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>•</span>
                    <span>Fast-moving, open feedback environments</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>•</span>
                    <span>Teams building products in <strong>tech, healthcare, or productivity</strong>, but open to new domains where design creates impact</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Search Strategy Section */}
            <div className={`rounded-lg p-6 border transition-colors duration-200 ${
              isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`} style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  Search Strategy
                </h2>
                <span className={`text-xs transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`}>Updated 4 days ago</span>
              </div>
              <p className={`mb-4 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`} style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Focused on <strong>product-led teams</strong> that value design as a growth engine.
              </p>
              <div className="mb-4">
                <h4 className={`font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`}>Priorities:</h4>
                <ul className={`space-y-2 transition-colors ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  <li className="flex items-start">
                    <span className={`mr-2 transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>•</span>
                    <span>Roles in <strong>UX/UI and Product Design</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>•</span>
                    <span><strong>Remote or hybrid</strong> flexibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`mr-2 transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>•</span>
                    <span>Products exploring <strong>AI-enhanced user experiences</strong> or <strong>new design systems</strong></span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}