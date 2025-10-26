'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/DashboardHeader';
import { useTheme } from '@/components/ThemeProvider';
import { jobsData, Job } from '@/data/jobs';

export default function JobsPage() {
  const { filter } = useParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());

  // Function to get active tab based on filter
  const getActiveTabFromFilter = (filterParam: string | string[] | undefined): string => {
    if (Array.isArray(filterParam)) {
      filterParam = filterParam[0];
    }
    
    switch (filterParam) {
      case 'all':
        return 'All Jobs';
      case 'saved':
        return 'Saved Jobs';
      case 'applied':
        return 'Applied';
      default:
        return 'All Jobs';
    }
  };

  // Function to handle tab clicks
  const handleTabClick = (tab: string) => {
    let route = '/dashboard/jobs/all';
    
    switch (tab) {
      case 'All Jobs':
        route = '/dashboard/jobs/all';
        break;
      case 'Saved Jobs':
        route = '/dashboard/jobs/saved';
        break;
      case 'Applied':
        route = '/dashboard/jobs/applied';
        break;
    }
    
    router.push(route);
  };

  // Filter jobs based on current filter
  const getFilteredJobs = (): Job[] => {
    let filtered = jobsData;
    
    if (filter === 'saved') {
      filtered = jobsData.filter(job => job.isSaved);
    } else if (filter === 'applied') {
      filtered = jobsData.filter(job => job.status === 'Applied');
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const filteredJobs = getFilteredJobs();
  const activeTab = getActiveTabFromFilter(filter);
  const tabs = ['All Jobs', 'Saved Jobs', 'Applied'];

  // Function to toggle job expansion
  const toggleJobExpansion = (jobId: number) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedJobs(newExpanded);
  };

  // Function to get status tag icon
  const getStatusIcon = (tag: string) => {
    switch (tag) {
      case 'Matched':
        return '/icons/right-tick-green.svg';
      case 'Remote':
        return '/icons/location.svg';
      case 'Awaiting Feedback':
        return '/icons/loading.svg';
      default:
        return null;
    }
  };

  // Function to get status tag color
  const getStatusTagColor = (tag: string) => {
    switch (tag) {
      case 'Matched':
        return 'bg-green-600';
      case 'Remote':
        return 'bg-slate-600';
      case 'Awaiting Feedback':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

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
                <div key={job.id} className={`rounded-lg border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 hover:bg-slate-650'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}>
                  {/* Top Section - Important Tags and Applied Button */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                      {/* Important Tags */}
                      <div className="flex flex-wrap gap-2">
                        {job.important_tags.map((tag, index) => {
                          const icon = getStatusIcon(tag);
                          return (
                            <div
                              key={index}
                              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusTagColor(tag)}`}
                            >
                              {icon && (
                                <img 
                                  src={icon} 
                                  alt={tag} 
                                  className="w-3 h-3"
                                  style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                                />
                              )}
                              <span>{tag}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Status Button */}
                      <button 
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-neue-haas ${
                          job.status === 'Apply' 
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : job.status === 'Applied'
                            ? 'bg-gray-600 text-white'
                            : job.status === 'Reviewing'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        {job.status}
                      </button>
                    </div>
                  </div>

                  {/* HR Separator */}
                  <hr className={`transition-colors duration-200 ${
                    isDarkMode ? 'border-slate-600' : 'border-gray-200'
                  }`} />

                  {/* Job Details Container */}
                  <div className="p-6 pt-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {/* Company Logo */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <img 
                            src={job.logo || '/icons/organization.svg'} 
                            alt={job.company}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/icons/organization.svg';
                            }}
                          />
                        </div>
                        
                        {/* Job Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-semibold transition-colors font-neue-haas ${
                            isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                          }`}>
                            {job.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className={`text-sm transition-colors font-neue-haas ${
                              isDarkMode ? 'text-slate-300' : 'text-gray-600'
                            }`}>
                              {job.company}
                            </p>
                            {/* Website Link */}
                            <div className="flex items-center space-x-1">
                              <img 
                                src="/icons/link.svg" 
                                alt="Website" 
                                className="w-3 h-3"
                                style={{
                                  filter: isDarkMode 
                                    ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                                    : 'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(413%) hue-rotate(201deg) brightness(93%) contrast(89%)'
                                }}
                              />
                              <a 
                                href={`https://${job.website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`text-xs hover:underline transition-colors font-neue-haas ${
                                  isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-500 hover:text-gray-700'
                                }`}
                              >
                                {job.website}
                              </a>
                            </div>
                          </div>
                          <p className={`text-xs mt-1 transition-colors font-neue-haas ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>
                            {job.postedTime}
                          </p>
                        </div>
                      </div>
                      
                      {/* Right side actions */}
                      <div className="flex items-center space-x-3">
                        {/* Bookmark for unapplied jobs */}
                        {job.status === 'Apply' && (
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <img 
                              src="/icons/bookmark.svg" 
                              alt="Save Job" 
                              className="w-5 h-5"
                              style={{
                                filter: job.isSaved 
                                  ? (isDarkMode 
                                    ? 'brightness(0) saturate(100%) invert(39%) sepia(97%) saturate(1175%) hue-rotate(210deg) brightness(98%) contrast(101%)'
                                    : 'brightness(0) saturate(100%) invert(39%) sepia(97%) saturate(1175%) hue-rotate(210deg) brightness(98%) contrast(101%)')
                                  : (isDarkMode 
                                    ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                                    : 'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(413%) hue-rotate(201deg) brightness(93%) contrast(89%)')
                              }}
                            />
                          </button>
                        )}
                        
                        {/* Toggle Button */}
                        <button 
                          onClick={() => toggleJobExpansion(job.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-100'
                          }`}
                        >
                          <img 
                            src={expandedJobs.has(job.id) ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}
                            alt="Toggle Details" 
                            className="w-5 h-5"
                            style={{
                              filter: isDarkMode 
                                ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                                : 'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(413%) hue-rotate(201deg) brightness(93%) contrast(89%)'
                            }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Job Details (when not expanded) */}
                    {!expandedJobs.has(job.id) && (
                      <div className="flex items-center space-x-4 text-sm">
                        {job.location && (
                          <div className="flex items-center space-x-1">
                            <img 
                              src="/icons/location.svg" 
                              alt="Location" 
                              className="w-4 h-4"
                              style={{
                                filter: isDarkMode 
                                  ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                                  : 'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(413%) hue-rotate(201deg) brightness(93%) contrast(89%)'
                              }}
                            />
                            <span className={`transition-colors font-neue-haas ${
                              isDarkMode ? 'text-slate-300' : 'text-gray-600'
                            }`}>
                              {job.location}
                            </span>
                          </div>
                        )}
                        {job.salary && (
                          <span className={`transition-colors font-neue-haas ${
                            isDarkMode ? 'text-slate-300' : 'text-gray-600'
                          }`}>
                            {job.salary}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded Job Details */}
                  {expandedJobs.has(job.id) && (
                    <div className={`border-t px-6 py-4 transition-colors duration-200 ${
                      isDarkMode ? 'border-slate-600 bg-slate-750' : 'border-gray-200 bg-gray-50'
                    }`}>
                      {/* Location and Salary */}
                      <div className="flex items-center space-x-6 mb-4 text-sm">
                        {job.location && (
                          <div className="flex items-center space-x-1">
                            <img 
                              src="/icons/location.svg" 
                              alt="Location" 
                              className="w-4 h-4"
                              style={{
                                filter: isDarkMode 
                                  ? 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(851%) hue-rotate(201deg) brightness(97%) contrast(90%)'
                                  : 'brightness(0) saturate(100%) invert(45%) sepia(6%) saturate(413%) hue-rotate(201deg) brightness(93%) contrast(89%)'
                              }}
                            />
                            <span className={`transition-colors font-neue-haas ${
                              isDarkMode ? 'text-slate-300' : 'text-gray-600'
                            }`}>
                              {job.location}
                            </span>
                          </div>
                        )}
                        {job.salary && (
                          <span className={`transition-colors font-neue-haas ${
                            isDarkMode ? 'text-slate-300' : 'text-gray-600'
                          }`}>
                            {job.salary}
                          </span>
                        )}
                        {job.jobType && (
                          <span className={`px-2 py-1 rounded text-xs font-medium transition-colors font-neue-haas ${
                            isDarkMode ? 'bg-slate-600 text-slate-200' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {job.jobType}
                          </span>
                        )}
                      </div>

                      {/* Job Description */}
                      <div>
                        <h4 className={`font-medium mb-2 transition-colors font-neue-haas ${
                          isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                        }`}>
                          Job Description
                        </h4>
                        <p className={`text-sm leading-relaxed transition-colors font-neue-haas ${
                          isDarkMode ? 'text-slate-300' : 'text-gray-600'
                        }`}>
                          {job.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className={`text-center py-12 transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`}>
                  <p className="font-neue-haas">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}