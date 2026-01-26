
import React, { useState, useEffect } from 'react';
import useJobStore from '../store/jobStore';
import useDebounce from '../hooks/UseDebounce';

function SearchBar() {
  const { filters, setFilter } = useJobStore();
  const [localSearchQuery, setLocalSearchQuery] = useState(filters.searchQuery);
  
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  useEffect(() => {
    setFilter('searchQuery', debouncedSearchQuery);
  }, [debouncedSearchQuery, setFilter]);

  const handleClear = () => {
    setLocalSearchQuery('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg 
          className="search-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          stroke="currentColor"
        >
          <circle cx="8" cy="8" r="6" strokeWidth="2" />
          <path d="M12 12l4 4" strokeWidth="2" strokeLinecap="round" />
        </svg>
        
        <input
          type="text"
          data-testid="search-input"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          placeholder="Search by job title or company..."
          className="search-input"
          aria-label="Search jobs"
        />
        
        {localSearchQuery && (
          <button
            onClick={handleClear}
            className="clear-search-btn"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
