// src/components/ViewToggle.jsx
import React from 'react';
import useJobStore from '../store/jobStore';

/**
 * ViewToggle Component
 * 
 * Why this component?
 * - Simple, reusable UI control
 * - Visual feedback for active state
 * - Accessible with proper ARIA labels
 * - Test IDs for automated testing
 */
function ViewToggle() {
  const { viewMode, setViewMode } = useJobStore();

  return (
    <div className="view-toggle">
      <button
        data-testid="grid-view-btn"
        onClick={() => setViewMode('grid')}
        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
        aria-label="Grid view"
        aria-pressed={viewMode === 'grid'}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="2" width="6" height="6" />
          <rect x="12" y="2" width="6" height="6" />
          <rect x="2" y="12" width="6" height="6" />
          <rect x="12" y="12" width="6" height="6" />
        </svg>
        Grid
      </button>
      
      <button
        data-testid="list-view-btn"
        onClick={() => setViewMode('list')}
        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
        aria-label="List view"
        aria-pressed={viewMode === 'list'}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="3" width="16" height="2" />
          <rect x="2" y="9" width="16" height="2" />
          <rect x="2" y="15" width="16" height="2" />
        </svg>
        List
      </button>
    </div>
  );
}

export default ViewToggle;