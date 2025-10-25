'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

export default function MyProfilePage() {
  const [shareProfile, setShareProfile] = useState(true);

  return (
    <DashboardLayout>
      <div className="h-full">
        {/* Header - Same as other pages */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700" style={{ backgroundColor: '#253140' }}>
          <h1 className="text-2xl font-medium text-white" style={{ 
            fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
          }}>
            My Profile
          </h1>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden metal-shadow">
              <img src="/icons/avatar-icon.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6" style={{ backgroundColor: '#192636' }}>
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Share Profile Section */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-2" style={{ 
                    fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                  }}>
                    Share Profile
                  </h2>
                  <p className="text-slate-400 text-sm" style={{ 
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
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h2 className="text-lg font-semibold text-white mb-4" style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                About
              </h2>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-slate-600 rounded-full overflow-hidden">
                  <img src="/icons/avatar-icon.svg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ 
                    fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                  }}>
                    Danial Hadi | Product Designer
                  </h3>
                  <div className="flex items-center text-slate-400 mt-2 space-x-4 text-sm">
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
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white" style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  Professional Profile
                </h2>
                <span className="text-xs text-slate-400">Updated 4 days ago</span>
              </div>
              <p className="text-slate-300 mb-4" style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Experienced Product Designer passionate about crafting intuitive human-centered experiences.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-slate-400 mr-2">•</span>
                  <span>Previously at <strong>Flowframe</strong>, led a team of product designers that innovated task completion by <strong>19%</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-400 mr-2">•</span>
                  <span>Skilled in <strong>UX research, interaction design</strong>, and <strong>design systems</strong> that scale with product growth.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-400 mr-2">•</span>
                  <span>Thrive in collaborative settings where complex challenges turn into clear, usable design solutions.</span>
                </li>
              </ul>
            </div>

            {/* Ideal Role Section */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white" style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  Ideal Role
                </h2>
                <span className="text-xs text-slate-400">Updated 4 days ago</span>
              </div>
              <p className="text-slate-300 mb-4" style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Looking for opportunities as a <strong>Senior or Lead Product Designer</strong> where design drives product direction.
              </p>
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">What you value:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">•</span>
                    <span>A balance between strategy and <strong>hands-on design</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">•</span>
                    <span>Close collaboration with <strong>product + engineering</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">•</span>
                    <span>Fast-moving, open feedback environments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">•</span>
                    <span>Teams building products in <strong>tech, healthcare, or productivity</strong>, but open to new domains where design creates impact</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Search Strategy Section */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white" style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}>
                  Search Strategy
                </h2>
                <span className="text-xs text-slate-400">Updated 4 days ago</span>
              </div>
              <p className="text-slate-300 mb-4" style={{ 
                fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
              }}>
                Focused on <strong>product-led teams</strong> that value design as a growth engine.
              </p>
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Priorities:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">•</span>
                    <span>Roles in <strong>UX/UI and Product Design</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">•</span>
                    <span><strong>Remote or hybrid</strong> flexibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">•</span>
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