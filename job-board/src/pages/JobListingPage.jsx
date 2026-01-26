import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ViewToggle from '../components/ViewToggle';
import SortControls from '../components/SortControls';
import JobListContainer from '../components/JobListContainer';
import Pagination from '../components/Pagination';

function JobListingsPage() {
  return (
    <div className="job-listings-page">
      <aside className="sidebar">
        <FilterPanel />
      </aside>

      <main className="main-content">
        <div className="search-section">
          <SearchBar />
        </div>

        <div className="controls-bar">
          <ViewToggle />
          <SortControls />
        </div>

        <JobListContainer />

        <Pagination />
      </main>
    </div>
  );
}

export default JobListingsPage;