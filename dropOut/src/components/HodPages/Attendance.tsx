import React, { useState } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [filters, setFilters] = useState({
    course: 'All Courses',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    classSection: 'All Classes'
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExport = (type: string) => {
    console.log(`Exporting ${type}...`);
    // Add export logic here
  };

  return (
    <div className="attendance-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Attendance & Performance</h1>
        <button className="filters-btn">
          <span>Filters</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

      {/* Filters Section */}
      <div className="dashboard-section">
        <h2>Filters</h2>
        <div className="filters-grid">
          <div className="filter-item">
            <label>Course</label>
            <select 
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
            >
              <option>All Courses</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
              <option>History</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label>Start Date</label>
            <div className="date-input">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>
          
          <div className="filter-item">
            <label>End Date</label>
            <div className="date-input">
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>
          
          <div className="filter-item">
            <label>Class/Section</label>
            <select 
              value={filters.classSection}
              onChange={(e) => handleFilterChange('classSection', e.target.value)}
            >
              <option>All Classes</option>
              <option>Class 10A</option>
              <option>Class 10B</option>
              <option>Class 11A</option>
              <option>Class 11B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Trends Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Attendance Trends</h2>
          <div className="export-buttons">
            <button className="export-btn" onClick={() => handleExport('PDF')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              PDF
            </button>
            <button className="export-btn" onClick={() => handleExport('Excel')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
              </svg>
              Excel
            </button>
          </div>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-card attendance-card">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                <path d="M12 2c0 1-1 2-2 2s-2 1-2 2 1 2 2 2 2-1 2-2z"/>
                <path d="M12 22c0-1 1-2 2-2s2-1 2-2-1-2-2-2-2 1-2 2z"/>
              </svg>
            </div>
            <div className="metric-content">
              <h3>Average Attendance</h3>
              <div className="metric-value">87.5%</div>
            </div>
          </div>
          
          <div className="metric-card absences-card">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <div className="metric-content">
              <h3>Total Absences</h3>
              <div className="metric-value">234</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trends Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Performance Trends</h2>
          <div className="export-buttons">
            <button className="export-btn" onClick={() => handleExport('PDF')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              PDF
            </button>
            <button className="export-btn" onClick={() => handleExport('Excel')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
              </svg>
              Excel
            </button>
          </div>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-card gpa-card">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div className="metric-content">
              <h3>Average GPA</h3>
              <div className="metric-value">3.2</div>
            </div>
          </div>
          
          <div className="metric-card highest-card">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5,12 12,5 19,12"/>
              </svg>
            </div>
            <div className="metric-content">
              <h3>Highest Score</h3>
              <div className="metric-value">98%</div>
            </div>
          </div>
          
          <div className="metric-card lowest-card">
            <div className="metric-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19,12 12,19 5,12"/>
              </svg>
            </div>
            <div className="metric-content">
              <h3>Lowest Score</h3>
              <div className="metric-value">45%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options Section */}
      <div className="dashboard-section">
        <h2>Export Options</h2>
        <div className="export-options">
          <button className="export-option-btn pdf-btn" onClick={() => handleExport('PDF')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Export PDF
          </button>
          
          <button className="export-option-btn excel-btn" onClick={() => handleExport('Excel')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
            </svg>
            Export Excel
          </button>
          
          <button className="export-option-btn data-btn" onClick={() => handleExport('Raw Data')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Raw Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
