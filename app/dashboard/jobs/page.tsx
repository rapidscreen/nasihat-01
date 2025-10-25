'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [searchQuery, setSearchQuery] = useState('');

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
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700" style={{ backgroundColor: '#253140' }}>
          <h1 className="text-2xl font-medium text-white" style={{ 
            fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
          }}>
            Jobs
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-64 pl-10 pr-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}
              />
            </div>

            {/* Notification Icon */}
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.37-3.37a1.5 1.5 0 000-2.12L21 7V4a2 2 0 00-2-2H5a2 2 0 00-2 2v3l4.37 4.51a1.5 1.5 0 000 2.12L3 17h5m7 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Profile Icon */}
            <div className="w-10 h-10 rounded-full overflow-hidden metal-shadow">
              <img src="/icons/avatar-icon.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6" style={{ backgroundColor: '#192636' }}>
          <div className="max-w-6xl mx-auto">
            
            {/* Filter Tabs */}
            <div className="flex space-x-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-slate-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
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
                <div key={job.id} className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:bg-slate-650 transition-colors duration-200">
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
                        <img src={job.logo} alt={job.company} className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-white" style={{ 
                            fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                          }}>
                            {job.company}
                          </h3>
                          <span className="text-slate-400 text-sm">{job.website}</span>
                          <span className="text-slate-500 text-sm">{job.postedTime}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2" style={{ 
                          fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                        }}>
                          {job.title}
                        </h4>
                      </div>
                    </div>
                    
                    <button 
                      className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                        job.status === 'Applied' 
                          ? 'bg-slate-600 text-slate-300 cursor-default' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      style={{ 
                        fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                      }}
                      disabled={job.status === 'Applied'}
                    >
                      {job.status}
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center space-x-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${job.tagColors[index]}`}
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
                    <p className="text-slate-300 text-sm leading-relaxed" style={{ 
                      fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                    }}>
                      {job.description}
                    </p>
                  )}

                  {/* Action Buttons for jobs without description */}
                  {!job.description && (
                    <div className="flex items-center space-x-3 mt-4">
                      <button className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-slate-300 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        style={{ 
                          fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                        }}
                      >
                        Apply
                      </button>
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