// src/components/JobCard.jsx
import React from 'react';
import useJobStore from '../store/jobStore';

/**
 * JobCard Component
 * 
 * Why this approach?
 * - Each card is a reusable component
 * - Uses Zustand selectors to only re-render when bookmarks change
 * - Data-testid attributes for automated testing
 * - Responsive design using CSS Grid/Flexbox
 */
function JobCard({ job, viewMode }) {
  const { bookmarkedJobs, toggleBookmark, getCompanyById } = useJobStore();
  const company = getCompanyById(job.companyId);
  const isBookmarked = bookmarkedJobs.includes(job.id);

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent card click if we add navigation later
    toggleBookmark(job.id);
  };

  return (
    <div
      data-testid={`job-card-${job.id}`}
      className={`job-card ${viewMode}-view`}
    >
      <div className="job-card-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{company?.name || 'Unknown Company'}</p>
        </div>
        <button
          data-testid={`bookmark-btn-${job.id}`}
          data-bookmarked={isBookmarked}
          onClick={handleBookmarkClick}
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>

      <div className="job-details">
        <div className="job-info-row">
          <span className="info-label">📍 {job.location}</span>
          <span className="info-badge job-type">{job.jobType}</span>
        </div>
        
        <div className="job-info-row">
          <span className="info-label">💼 {job.experienceLevel}</span>
          <span className="info-label salary" data-testid="job-salary">
            💰 ${job.salary.toLocaleString()}
          </span>
        </div>

        <div className="skills-container">
          {job.skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>

        <div className="posted-date">
          Posted: {new Date(job.postedDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default JobCard;