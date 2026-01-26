// src/components/Pagination.jsx
import React from 'react';
import useJobStore from '../store/jobStore';

/**
 * Pagination Component
 * 
 * Why client-side pagination?
 * - All data is already loaded (mock data)
 * - Improves UX by breaking large lists into manageable pages
 * - Reduces DOM nodes, improving performance
 * - Common pattern in data-heavy applications
 * 
 * Implementation:
 * - Shows page numbers with ellipsis for large page counts
 * - Previous/Next buttons
 * - Disabled states when at boundaries
 */
function Pagination() {
  const { currentPage, setCurrentPage, getPaginatedJobs } = useJobStore();
  const { totalPages } = getPaginatedJobs();

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show max 5 page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div data-testid="pagination-controls" className="pagination-controls">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-btn"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="page-numbers">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`page-number ${currentPage === page ? 'active' : ''}`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        data-testid="pagination-next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-btn"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;