'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/DashboardHeader';
import Button from '@/components/Button';
import { useTheme } from '@/components/ThemeProvider';
import { jobsData, type Job } from '@/data/jobs';

export default function JobsFilterPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const filter = params.filter as string;
  const [searchQuery, setSearchQuery] = useState('');

  // Determine active tab based on filter parameter
  const getActiveTabFromFilter = () => {
    if (filter === 'saved') return 'Saved Jobs';
    if (filter === 'applied') return 'Applied';
    return 'All Jobs'; // Default for 'all' or any other value
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromFilter());

  // Update active tab when filter changes
  useEffect(() => {
    setActiveTab(getActiveTabFromFilter());
  }, [filter]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    let route = '/dashboard/jobs';
    
    if (tab === 'All Jobs') {
      route = '/dashboard/jobs/all';
    } else if (tab === 'Saved Jobs') {
      route = '/dashboard/jobs/saved';
    } else if (tab === 'Applied') {
      route = '/dashboard/jobs/applied';
    }
    
    router.push(route);
  };

  // Filter jobs based on active tab
  const getFilteredJobs = () => {
    if (activeTab === 'All Jobs') {
      return jobsData;
    } else if (activeTab === 'Saved Jobs') {
      return jobsData.filter(job => job.tags.includes('Saved') || job.isSaved);
    } else if (activeTab === 'Applied') {
      return jobsData.filter(job => job.status === 'Applied');
    }
    return jobsData;
  };

  const filteredJobs = getFilteredJobs();

  const tabs = ['All Jobs', 'Saved Jobs', 'Applied'];

  return (
    <DashboardLayout>
      <div className="h-full">
        {/* Header */}
        <DashboardHeader title="Jobs">
          {/* Enhanced Search Bar */}
          <div className="relative mr-8">
            <div className={`${isDarkMode ? 'search-bar-glow' : 'search-bar-glow-light'} rounded-full px-4 py-3 flex items-center space-x-3 w-[700px]`}>
              {/* Search Icon */}
              <div className="flex-shrink-0">
                <img 
                  src="/icons/search.svg" 
                  alt="Search" 
                  className="w-5 h-5 search-icon-style"
                  style={{
                    filter: isDarkMode 
                      ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                      : 'brightness(0) saturate(100%) invert(85%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                  }}
                />
              </div>
              
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent border-none outline-none placeholder-transparent font-neue-haas text-sm ${
                  isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                }`}
                style={{ 
                  fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
                }}
              />
              
              {/* Animated Placeholder */}
              {!searchQuery && (
                <div className="absolute left-12 pointer-events-none">
                  <span className={`font-neue-haas text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-500'
                  }`}>
                    Search jobs
                    <span className="typing-dots">
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </span>
                  </span>
                </div>
              )}
              
              {/* Filter Icon */}
              <div className="flex-shrink-0">
                <img 
                  src="/icons/filter-search.svg" 
                  alt="Filter" 
                  className="w-5 h-5 search-icon-style cursor-pointer"
                  style={{
                    filter: isDarkMode 
                      ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                      : 'brightness(0) saturate(100%) invert(85%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                  }}
                />
              </div>
            </div>
          </div>
        </DashboardHeader>

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
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'metal-shadow' : 'metal-shadow-light'} cursor-pointer ${
                    activeTab === tab
                      ? isDarkMode ? 'text-white' : 'text-white'
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ 
                    fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
                    backgroundColor: activeTab === tab 
                      ? (isDarkMode ? '#303b4a' : '#2563eb') 
                      : (isDarkMode ? '#192636' : '#f1f5f9')
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
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