'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/DashboardHeader';
import { useTheme } from '@/components/ThemeProvider';
import { jobsData, Job } from '@/data/jobs';

export default function JobsPage() {
  // Force refresh for logo changes
  const { filter } = useParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set(jobsData.map(job => job.id)));

  const getCompanyLogoUrl = (company: string) => {
    // Map known companies to their actual domains
    const companyDomainMap: { [key: string]: string } = {
      'rapidscreen technologies': 'rapidscreen.com',
      'rapidscreen': 'rapidscreen.com',
      'nestle': 'nestle.com',
      'axiata': 'axiata.com',
      'google': 'google.com',
      'meta': 'meta.com',
      'facebook': 'facebook.com',
      'microsoft': 'microsoft.com',
      'apple': 'apple.com',
      'amazon': 'amazon.com',
      'netflix': 'netflix.com',
      'uber': 'uber.com',
      'airbnb': 'airbnb.com',
      'spotify': 'spotify.com',
      'linkedin': 'linkedin.com',
      'twitter': 'twitter.com',
      'instagram': 'instagram.com',
      'youtube': 'youtube.com',
      'tiktok': 'tiktok.com',
      'shopee': 'shopee.com',
      'grab': 'grab.com',
      'gojek': 'gojek.com'
    };

    const companyKey = company.toLowerCase().trim();
    const domain = companyDomainMap[companyKey] || `${company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`;
    
    // Use Google's high-quality favicon service
    const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    console.log(`Logo URL for ${company}: ${logoUrl}`);
    return logoUrl;
  };

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const getActiveTabFromFilter = (filterParam: any) => {
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

  const handleTabClick = (tab: any) => {
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

  const getFilteredJobs = () => {
    let filtered = jobsData;
    
    if (filter === 'saved') {
      filtered = jobsData.filter(job => job.isSaved);
    } else if (filter === 'applied') {
      filtered = jobsData.filter(job => job.status === 'Applied');
    }
    
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

  const getStatusIcon = (tag: any) => {
    switch (tag) {
      case 'Matched':
        return '/icons/right-tick-green.svg';
      case 'Remote':
        return '/icons/location.svg';
      case 'Awaiting Feedback':
        return '/icons/clock.svg';
      default:
        return null;
    }
  };

  const getStatusTagColor = (tag: any) => {
    switch (tag) {
      case 'Matched':
        return '#1a5d4a'; // Deeper forest green for better chemistry
      case 'Remote':
        return '#2c4a5c'; // Muted blue-gray for harmony
      case 'Awaiting Feedback':
        return '#3d4b6b'; // Deeper blue-purple for sophistication
      default:
        return '#6b7280';
    }
  };

  return (
    <DashboardLayout>
      <div className="h-full">
        <DashboardHeader title="Jobs">
          <div className="relative mr-8">
            <div className={`${isDarkMode ? 'search-bar-glow bg-[#253140]' : 'search-bar-glow-light bg-white'} ${isDarkMode ? 'metal-shadow' : 'metal-shadow-light'} rounded-full px-4 py-3 flex items-center space-x-3 w-[700px]`}>
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

        <div 
          className={`min-h-screen p-6 transition-colors duration-200 relative ${
            isDarkMode ? 'bg-[#192636]' : 'bg-[#fbfbfb]'
          }`} 
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to top, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 20%, rgba(59, 130, 246, 0.04) 40%, rgba(59, 130, 246, 0.02) 60%, rgba(59, 130, 246, 0.01) 80%, #192636 100%)'
              : 'linear-gradient(to top, rgba(251, 146, 60, 0.12) 0%, rgba(251, 191, 36, 0.08) 20%, rgba(253, 224, 71, 0.06) 40%, rgba(254, 240, 138, 0.04) 60%, rgba(254, 249, 195, 0.02) 80%, #fbfbfb 100%)',
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100vh',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Fixed glow overlay for consistent effect */}
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              background: isDarkMode 
                ? 'linear-gradient(to top, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 30%, rgba(59, 130, 246, 0.02) 50%, transparent 70%)'
                : 'linear-gradient(to top, rgba(251, 146, 60, 0.06) 0%, rgba(251, 191, 36, 0.04) 30%, rgba(253, 224, 71, 0.03) 50%, transparent 70%)',
              zIndex: 1
            }}
          />
          
          {/* Content container */}
          <div className="relative z-10">
          <div className="max-w-6xl mx-auto">
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

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className={`rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'job-card-glow'
                    : 'job-card-glow-light'
                }`}>
                  <hr className={`mx-6 transition-colors duration-200 ${
                    isDarkMode ? 'border-slate-600' : 'border-gray-200'
                  }`} />

                  <div className="px-6 pt-4 pb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-transparent">
                        <img 
                          src={job.logo || getCompanyLogoUrl(job.company)} 
                          alt={job.company}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== '/icons/organization.svg') {
                              target.src = '/icons/organization.svg';
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm transition-colors font-neue-haas ${
                            isDarkMode ? 'text-slate-300' : 'text-gray-600'
                          }`}>
                            {job.company}
                          </p>
                          
                          <div className="flex items-center space-x-2">
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
                                className={`text-xs underline font-semibold hover:no-underline transition-colors font-neue-haas ${
                                  isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-500 hover:text-gray-700'
                                }`}
                              >
                                {job.website}
                              </a>
                            </div>
                            <span className={`text-xs transition-colors font-neue-haas ${
                              isDarkMode ? 'text-slate-400' : 'text-gray-500'
                            }`}>
                              • {job.postedTime}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center mb-3">
                          <h3 className={`text-lg font-semibold transition-colors font-neue-haas ${
                            isDarkMode ? 'text-white' : 'text-[#1b1b1b]'
                          }`}>
                            {job.title}
                          </h3>
                          <button
                            onClick={() => toggleJobExpansion(job.id)}
                            className="ml-2 p-1 hover:bg-opacity-10 hover:bg-gray-500 rounded transition-colors"
                          >
                            <img 
                              src={expandedJobs.has(job.id) ? "/icons/chevron-up.svg" : "/icons/arrow-down.svg"} 
                              alt={expandedJobs.has(job.id) ? "Collapse" : "Expand"} 
                              className="w-5 h-5"
                              style={{
                                filter: isDarkMode 
                                  ? 'brightness(0) saturate(100%) invert(100%)'
                                  : 'brightness(0) saturate(100%) invert(0%)'
                              }}
                            />
                          </button>
                        </div>

                        {/* Important Tags and Apply Button on same row */}
                        <div className="flex items-center justify-between mb-4 -ml-16">
                          <div className="flex flex-wrap gap-2">
                            {job.important_tags.map((tag, index) => {
                              const icon = getStatusIcon(tag);
                              return (
                                <div
                                  key={index}
                                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-white button-inner-glow"
                                  style={{ backgroundColor: getStatusTagColor(tag) }}
                                >
                                  {icon && (
                                    <img 
                                      src={icon} 
                                      alt={tag} 
                                      className="w-3 h-3"
                                      style={{ 
                                        filter: tag === 'Matched' 
                                          ? 'brightness(0) saturate(100%) invert(46%) sepia(95%) saturate(588%) hue-rotate(104deg) brightness(94%) contrast(86%)'
                                          : 'brightness(0) saturate(100%) invert(100%)'
                                      }}
                                    />
                                  )}
                                  <span className="font-neue-haas">{tag}</span>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {/* Standalone Bookmark Button */}
                            <button 
                              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors button-inner-glow cursor-pointer hover:bg-opacity-10 hover:bg-gray-500"
                              style={{ 
                                backgroundColor: 'transparent'
                              }}
                            >
                              <img 
                                src="/icons/bookmark.svg" 
                                alt="Bookmark" 
                                className="w-4 h-4"
                                style={{ 
                                  filter: isDarkMode 
                                    ? 'brightness(0) saturate(100%) invert(100%)' 
                                    : 'brightness(0) saturate(100%) invert(45%)'
                                }}
                              />
                            </button>

                            {/* Apply/Applied Button */}
                            <button 
                              className="px-4 py-2 rounded-full text-sm font-medium transition-colors font-neue-haas flex items-center space-x-2 button-inner-glow cursor-pointer hover:opacity-90"
                              style={{ 
                                backgroundColor: job.status === 'Apply' 
                                  ? '#005bd1'
                                  : '#e5e7eb',
                                color: job.status === 'Applied' ? '#1f2937' : '#ffffff'
                              }}
                            >
                              {job.status === 'Apply' && (
                                <img 
                                  src="/icons/edit.svg" 
                                  alt="Edit" 
                                  className="w-4 h-4"
                                  style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                                />
                              )}
                              {job.status === 'Applied' && (
                                <img 
                                  src="/icons/right-tick-green.svg" 
                                  alt="Applied" 
                                  className="w-4 h-4"
                                  style={{ filter: 'brightness(0) saturate(100%) invert(46%) sepia(95%) saturate(588%) hue-rotate(104deg) brightness(94%) contrast(86%)' }}
                                />
                              )}
                              <span>{job.status}</span>
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Content */}
                        {expandedJobs.has(job.id) && (
                          <div className="-ml-16">
                            {/* HR Separator */}
                            <hr className={`mb-4 transition-colors duration-200 ${
                              isDarkMode ? 'border-slate-600' : 'border-gray-200'
                            }`} />

                            {/* Job Description Container with Border */}
                            <div className={`p-4 rounded-lg border transition-colors duration-200 ${
                              isDarkMode 
                                ? 'border-slate-600 bg-slate-800/50' 
                                : 'border-gray-200 bg-gray-50/50'
                            }`}>
                              <p className={`text-sm leading-relaxed transition-colors font-neue-haas ${
                                isDarkMode ? 'text-slate-300' : 'text-gray-600'
                              }`}>
                                {job.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
      </div>
    </DashboardLayout>
  );
}