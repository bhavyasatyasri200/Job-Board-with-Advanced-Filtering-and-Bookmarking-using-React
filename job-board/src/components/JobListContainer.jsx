// src/components/JobListContainer.jsx
import React from 'react';
import JobCard from './JobCard';
import useJobStore from '../store/jobStore';

/**
 * JobListContainer Component
 * 
 * Why separate this?
 * - Manages the layout switching logic (grid vs list)
 * - Handles the container's responsive behavior
 * - Keeps JobCard component focused on single job display
 * - data-view-mode attribute for testing requirements
 */
function JobListContainer() {
  const { viewMode, getPaginatedJobs } = useJobStore();
  const { jobs, totalJobs } = getPaginatedJobs();

  if (jobs.length === 0) {
    return (
      <div className="no-results">
        <h3>No jobs found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="job-list-wrapper">
      <div className="results-count">
        Showing {jobs.length} of {totalJobs} jobs
      </div>
      
      <div
        data-testid="job-list-container"
        data-view-mode={viewMode}
        className={`job-list-container ${viewMode}-mode`}
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

export default JobListContainer;