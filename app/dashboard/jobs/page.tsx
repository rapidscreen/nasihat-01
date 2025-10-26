'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/Button';
import { useTheme } from '@/components/ThemeProvider';

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();

  const jobs = [
    {
      id: 1,
      company: 'RapidScreen Technologies',
      logo: '/icons/nasihat.ai-dark-mode.svg',
      title: 'Product Designer',
      website: 'rapidscreen.my',
      postedTime: '4d ago',
      tags: ['Matched', 'Remote'],
      tagColors: ['bg-green-600', 'bg-slate-600'],
      status: 'Applied',
      description: 'This Product Design role at RapidScreen Technologies is a remote opportunity that aligns with your passion for creating intuitive, high-impact digital experiences. As a growing technology company, it offers room to shape design systems, improve user workflows, and directly influence product direction. While the company\'s focus on emerging AI technologies may be outside your usual domains, the role\'s emphasis on user experience, interface design, and cross-functional collaboration makes it a strong fit for your design strengths and problem-solving approach.'
    },
    {
      id: 2,
      company: 'Nestle',
      logo: '/icons/nasihat.ai-dark-mode.svg',
      title: 'Marketing Consultant',
      website: 'nestle.com',
      postedTime: '1d ago',
      tags: ['Matched', 'Selangor, Darul Ehsan, Malaysia'],
      tagColors: ['bg-green-600', 'bg-slate-600'],
      status: 'Apply',
      description: ''
    },
    {
      id: 3,
      company: 'Axiata',
      logo: '/icons/nasihat.ai-dark-mode.svg',
      title: 'User Experience Designer',
      website: 'axiata.com',
      postedTime: '1d ago',
      tags: ['Matched', 'Kuala Lumpur, Malaysia'],
      tagColors: ['bg-green-600', 'bg-slate-600'],
      status: 'Apply',
      description: ''
    }
  ];

  const tabs = ['All Jobs', 'Saved Jobs', 'Applied'];

  return (
    <DashboardLayout>
      <div className="h-full">
        {/* Header - Same as other pages */}
        <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-200 ${
          isDarkMode ? 'border-slate-700 bg-[#253140]' : 'border-gray-200 bg-white'
        }`}>
          <h1 className={`text-2xl font-medium transition-colors ${
            isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
          }`} style={{ 
            fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
          }}>
            Jobs
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-400'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`block w-64 pl-10 pr-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                }`}
                style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}
              />
            </div>

            {/* Notification Icon */}
            <button className={`p-2 transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.37-3.37a1.5 1.5 0 000-2.12L21 7V4a2 2 0 00-2-2H5a2 2 0 00-2 2v3l4.37 4.51a1.5 1.5 0 000 2.12L3 17h5m7 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Profile Icon */}
            <div className="w-10 h-10 rounded-full overflow-hidden metal-shadow">
              <img src={isDarkMode ? "/icons/avatar-icon.svg" : "/icons/avatar-icon-white-mode.svg"} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`p-6 transition-colors duration-200 ${
          isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
        }`}>
          <div className="max-w-6xl mx-auto">
            
            {/* Filter Tabs */}
            <div className="flex space-x-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? isDarkMode 
                        ? 'bg-slate-600 text-white'
                        : 'bg-white text-[#1b1b1b] border border-gray-200'
                      : isDarkMode
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  style={{ 
                    fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className={`rounded-lg p-6 border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 hover:bg-slate-650'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}>
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden ${
                        isDarkMode ? 'bg-slate-600' : 'bg-gray-100'
                      }`}>
                        <img src={job.logo} alt={job.company} className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`text-lg font-semibold transition-colors ${
                            isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                          }`} style={{ 
                            fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                          }}>
                            {job.company}
                          </h3>
                          <span className={`text-sm ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>{job.website}</span>
                          <span className={`text-sm ${
                            isDarkMode ? 'text-slate-500' : 'text-gray-400'
                          }`}>{job.postedTime}</span>
                        </div>
                        <h4 className={`text-xl font-bold mb-2 transition-colors ${
                          isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                        }`} style={{ 
                          fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                        }}>
                          {job.title}
                        </h4>
                      </div>
                    </div>
                    
                    <Button
                      variant={job.status === 'Applied' ? 'grey' : 'blue'}
                      disabled={job.status === 'Applied'}
                    >
                      {job.status}
                    </Button>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center space-x-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
                          index === 0 ? 'bg-[#2c664e]' : isDarkMode ? 'bg-slate-600' : 'bg-gray-500'
                        }`}
                        style={{ 
                          fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Job Description */}
                  {job.description && (
                    <p className={`text-sm leading-relaxed transition-colors ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-600'
                    }`} style={{ 
                      fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                    }}>
                      {job.description}
                    </p>
                  )}

                  {/* Action Buttons for jobs without description */}
                  {!job.description && (
                    <div className="flex items-center space-x-3 mt-4">
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-600 hover:bg-slate-500 text-slate-300 hover:text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <Button variant="blue">
                        Apply
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}