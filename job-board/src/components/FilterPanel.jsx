// src/components/FilterPanel.jsx
import React from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useJobStore from '../store/jobStore';

/**
 * FilterPanel Component
 * 
 * Why react-select?
 * - Multi-select is complex to build from scratch
 * - Handles keyboard navigation, accessibility
 * - Customizable styling
 * - Industry standard component
 * 
 * Why rc-slider?
 * - HTML5 range input doesn't support dual handles (min/max)
 * - rc-slider provides professional range slider
 * - Touch-friendly for mobile
 * - Customizable appearance
 */
function FilterPanel() {
  const { filters, setFilter, clearAllFilters, allJobs } = useJobStore();

  // Extract unique skills from all jobs for the dropdown
  const allSkills = [...new Set(allJobs.flatMap(job => job.skills))].sort();
  const skillOptions = allSkills.map(skill => ({ value: skill, label: skill }));

  // Convert filter skills to react-select format
  const selectedSkills = filters.skills.map(skill => ({ value: skill, label: skill }));

  const handleSkillsChange = (selected) => {
    const skillValues = selected ? selected.map(option => option.value) : [];
    setFilter('skills', skillValues);
  };

  const handleSalaryChange = (value) => {
    setFilter('salaryRange', value);
  };

  // Count active filters for badge display
  const activeFiltersCount = 
    (filters.jobType ? 1 : 0) +
    (filters.experienceLevel ? 1 : 0) +
    (filters.skills.length > 0 ? 1 : 0) +
    ((filters.salaryRange[0] !== 0 || filters.salaryRange[1] !== 200000) ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>
          Filters 
          {activeFiltersCount > 0 && (
            <span className="filter-badge">{activeFiltersCount}</span>
          )}
        </h2>
        <button
          data-testid="clear-filters-btn"
          onClick={clearAllFilters}
          className="clear-filters-btn"
          disabled={activeFiltersCount === 0}
        >
          Clear All
        </button>
      </div>

      {/* Job Type Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Job Type</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              data-testid="filter-job-type-remote"
              name="jobType"
              checked={filters.jobType === 'Remote'}
              onChange={() => setFilter('jobType', 'Remote')}
            />
            <span>Remote</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              data-testid="filter-job-type-hybrid"
              name="jobType"
              checked={filters.jobType === 'Hybrid'}
              onChange={() => setFilter('jobType', 'Hybrid')}
            />
            <span>Hybrid</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="jobType"
              checked={filters.jobType === 'Onsite'}
              onChange={() => setFilter('jobType', 'Onsite')}
            />
            <span>Onsite</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="jobType"
              checked={filters.jobType === ''}
              onChange={() => setFilter('jobType', '')}
            />
            <span>All</span>
          </label>
        </div>
      </div>

      {/* Experience Level Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Experience Level</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="experienceLevel"
              checked={filters.experienceLevel === 'Internship'}
              onChange={() => setFilter('experienceLevel', 'Internship')}
            />
            <span>Internship</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="experienceLevel"
              checked={filters.experienceLevel === 'Junior'}
              onChange={() => setFilter('experienceLevel', 'Junior')}
            />
            <span>Junior</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="experienceLevel"
              checked={filters.experienceLevel === 'Mid'}
              onChange={() => setFilter('experienceLevel', 'Mid')}
            />
            <span>Mid-Level</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="experienceLevel"
              checked={filters.experienceLevel === 'Senior'}
              onChange={() => setFilter('experienceLevel', 'Senior')}
            />
            <span>Senior</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="experienceLevel"
              checked={filters.experienceLevel === ''}
              onChange={() => setFilter('experienceLevel', '')}
            />
            <span>All</span>
          </label>
        </div>
      </div>

      {/* Skills Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Skills</h3>
        <div data-testid="filter-skills">
          <Select
            isMulti
            value={selectedSkills}
            onChange={handleSkillsChange}
            options={skillOptions}
            placeholder="Select skills..."
            className="skills-select"
            classNamePrefix="select"
          />
        </div>
      </div>

      {/* Salary Range Filter */}
      <div className="filter-section">
        <h3 className="filter-title">Salary Range</h3>
        <div className="salary-labels">
          <span>${filters.salaryRange[0].toLocaleString()}</span>
          <span>${filters.salaryRange[1].toLocaleString()}</span>
        </div>
        <div data-testid="filter-salary-slider" className="salary-slider">
          <Slider
            range
            min={0}
            max={200000}
            step={5000}
            value={filters.salaryRange}
            onChange={handleSalaryChange}
            trackStyle={[{ backgroundColor: '#3b82f6' }]}
            handleStyle={[
              { borderColor: '#3b82f6', backgroundColor: '#fff' },
              { borderColor: '#3b82f6', backgroundColor: '#fff' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;