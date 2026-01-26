// src/pages/TrackerPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import useJobStore from '../store/jobStore';

/**
 * TrackerPage Component
 * 
 * Why a separate page?
 * - Dedicated view for bookmarked jobs
 * - Users can focus on jobs they're interested in
 * - Common pattern: main browse page + saved items page
 * - Think: Netflix browse vs My List, or shopping cart
 * 
 * Features:
 * - Shows only bookmarked jobs
 * - Empty state when no bookmarks
 * - Link back to browse all jobs
 */
function TrackerPage() {
  const { bookmarkedJobs, allJobs, viewMode } = useJobStore();

  // Filter jobs to only show bookmarked ones
  const bookmarkedJobsList = allJobs.filter(job => 
    bookmarkedJobs.includes(job.id)
  );

  return (
    <div className="tracker-page">
      <div className="tracker-header">
        <h1>Application Tracker</h1>
        <p className="tracker-subtitle">
          Track and manage your bookmarked jobs
        </p>
      </div>

      {bookmarkedJobsList.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h2>No bookmarked jobs yet</h2>
          <p>Start bookmarking jobs you're interested in to track them here</p>
          <Link to="/" className="browse-jobs-link">
            Browse All Jobs
          </Link>
        </div>
      ) : (
        <>
          <div className="tracker-stats">
            <span className="bookmark-count">
              {bookmarkedJobsList.length} {bookmarkedJobsList.length === 1 ? 'Job' : 'Jobs'} Bookmarked
            </span>
          </div>

          <div 
            className={`job-list-container ${viewMode}-mode`}
            data-view-mode={viewMode}
          >
            {bookmarkedJobsList.map(job => (
              <JobCard key={job.id} job={job} viewMode={viewMode} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TrackerPage;