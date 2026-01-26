// src/store/jobStore.js
import { create } from 'zustand';
import mockData from '../data/mock-data.json';

/**
 * Why Zustand?
 * - Minimal boilerplate compared to Redux
 * - No providers needed (unlike Context API)
 * - Great performance (only re-renders components that use changed state)
 * - Simple API that's easy to understand
 * - Perfect for medium-sized apps like this
 */

const useJobStore = create((set, get) => ({
  // Data
  allJobs: mockData.jobs,
  companies: mockData.companies,
  
  // UI State
  viewMode: 'grid', // 'grid' or 'list'
  currentPage: 1,
  itemsPerPage: 10,
  
  // Filter State
  filters: {
    jobType: '', // 'Remote', 'Hybrid', 'Onsite', or ''
    experienceLevel: '',
    skills: [], // array of skill strings
    salaryRange: [0, 200000], // min and max salary
    searchQuery: '',
  },
  
  // Sort State
  sortBy: 'date', // 'date', 'salary-desc', 'salary-asc'
  
  // Bookmarks (loaded from localStorage on init)
  bookmarkedJobs: JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]'),
  
  // Actions
  setViewMode: (mode) => set({ viewMode: mode }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setFilter: (filterType, value) => set((state) => ({
    filters: { ...state.filters, [filterType]: value },
    currentPage: 1, // Reset to first page when filtering
  })),
  
  setSortBy: (sortType) => set({ sortBy: sortType, currentPage: 1 }),
  
  clearAllFilters: () => set({
    filters: {
      jobType: '',
      experienceLevel: '',
      skills: [],
      salaryRange: [0, 200000],
      searchQuery: '',
    },
    sortBy: 'date',
    currentPage: 1,
  }),
  
  toggleBookmark: (jobId) => {
    const state = get();
    const isBookmarked = state.bookmarkedJobs.includes(jobId);
    const newBookmarks = isBookmarked
      ? state.bookmarkedJobs.filter(id => id !== jobId)
      : [...state.bookmarkedJobs, jobId];
    
    // Persist to localStorage
    localStorage.setItem('bookmarkedJobs', JSON.stringify(newBookmarks));
    
    set({ bookmarkedJobs: newBookmarks });
  },
  
  // Computed/Derived State (using selectors)
  getFilteredAndSortedJobs: () => {
    const state = get();
    const { allJobs, filters, sortBy } = state;
    
    // Step 1: Filter jobs
    let filtered = allJobs.filter(job => {
      // Filter by job type
      if (filters.jobType && job.jobType !== filters.jobType) {
        return false;
      }
      
      // Filter by experience level
      if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
        return false;
      }
      
      // Filter by skills (job must have ALL selected skills)
      if (filters.skills.length > 0) {
        const hasAllSkills = filters.skills.every(skill => 
          job.skills.includes(skill)
        );
        if (!hasAllSkills) return false;
      }
      
      // Filter by salary range
      if (job.salary < filters.salaryRange[0] || job.salary > filters.salaryRange[1]) {
        return false;
      }
      
      // Filter by search query (title or company name)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const company = state.companies.find(c => c.id === job.companyId);
        const companyName = company ? company.name.toLowerCase() : '';
        const titleMatch = job.title.toLowerCase().includes(query);
        const companyMatch = companyName.includes(query);
        
        if (!titleMatch && !companyMatch) return false;
      }
      
      return true;
    });
    
    // Step 2: Sort jobs
    if (sortBy === 'salary-desc') {
      filtered.sort((a, b) => b.salary - a.salary);
    } else if (sortBy === 'salary-asc') {
      filtered.sort((a, b) => a.salary - b.salary);
    } else {
      // Default: sort by date (newest first)
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }
    
    return filtered;
  },
  
  getPaginatedJobs: () => {
    const state = get();
    const filteredJobs = state.getFilteredAndSortedJobs();
    const { currentPage, itemsPerPage } = state;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      jobs: filteredJobs.slice(startIndex, endIndex),
      totalJobs: filteredJobs.length,
      totalPages: Math.ceil(filteredJobs.length / itemsPerPage),
    };
  },
  
  getCompanyById: (companyId) => {
    const state = get();
    return state.companies.find(c => c.id === companyId);
  },
}));

export default useJobStore;