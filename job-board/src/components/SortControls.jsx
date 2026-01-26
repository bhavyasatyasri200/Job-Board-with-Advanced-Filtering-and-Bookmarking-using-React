// src/components/SortControls.jsx
import React from 'react';
import useJobStore from '../store/jobStore';

/**
 * SortControls Component
 * 
 * Why separate sorting?
 * - Keeps concerns separated (filtering vs sorting)
 * - Makes it easy to add more sort options later
 * - Clear UI affordance for sorting functionality
 */
function SortControls() {
  const { sortBy, setSortBy } = useJobStore();

  return (
    <div className="sort-controls">
      <label htmlFor="sort-select" className="sort-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-select"
      >
        <option value="date">Date Posted (Newest)</option>
        <option value="salary-desc" data-testid="sort-salary-desc">
          Salary (High to Low)
        </option>
        <option value="salary-asc">Salary (Low to High)</option>
      </select>
    </div>
  );
}

export default SortControls;