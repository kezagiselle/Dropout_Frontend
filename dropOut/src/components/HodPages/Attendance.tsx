import React, { useState } from 'react';
import { useTheme } from '../Hod';
import './Attendance.css';

const Attendance = () => {
  const { theme } = useTheme();
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
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-b border-gray-700' 
          : 'bg-white border-b border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Attendance & Performance</h1>
          <button className="bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-2 hover:bg-orange-700 transition-colors text-sm sm:text-base">
            <span>Filters</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`mx-3 sm:mx-6 mb-4 sm:mb-6 p-3 sm:p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-200 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="space-y-2">
            <label className={`block text-sm font-medium transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Course</label>
            <select 
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              <option>All Courses</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
              <option>History</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-medium transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Start Date</label>
            <div className="relative">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300'
                }`}
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-medium transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>End Date</label>
            <div className="relative">
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300'
                }`}
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-medium transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Class/Section</label>
            <select 
              value={filters.classSection}
              onChange={(e) => handleFilterChange('classSection', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300'
              }`}
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
      <div className={`mx-3 sm:mx-6 mb-4 sm:mb-6 p-3 sm:p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <h2 className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Attendance Trends</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors text-sm sm:text-base" onClick={() => handleExport('PDF')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <span>PDF</span>
            </button>
            <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors text-sm sm:text-base" onClick={() => handleExport('Excel')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
              </svg>
              <span>Excel</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-blue-100 p-4 sm:p-6 rounded-lg flex items-center justify-between transition-colors duration-200 dark:bg-blue-900">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white p-2 sm:p-3 rounded-full mr-3">
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                  <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                  <path d="M12 2c0 1-1 2-2 2s-2 1-2 2 1 2 2 2 2-1 2-2z"/>
                  <path d="M12 22c0-1 1-2 2-2s2-1 2-2-1-2-2-2-2 1-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold transition-colors duration-200">Average Attendance</h3>
                <div className="text-lg sm:text-2xl font-bold transition-colors duration-200">87.5%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-100 p-4 sm:p-6 rounded-lg flex items-center justify-between transition-colors duration-200 dark:bg-red-900">
            <div className="flex items-center">
              <div className="bg-red-500 text-white p-2 sm:p-3 rounded-full mr-3">
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold transition-colors duration-200">Total Absences</h3>
                <div className="text-lg sm:text-2xl font-bold transition-colors duration-200">234</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-100 p-4 sm:p-6 rounded-lg flex items-center justify-between transition-colors duration-200 dark:bg-green-900 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="bg-green-500 text-white p-2 sm:p-3 rounded-full mr-3">
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                  <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                  <path d="M12 2c0 1-1 2-2 2s-2 1-2 2 1 2 2 2 2-1 2-2z"/>
                  <path d="M12 22c0-1 1-2 2-2s2-1 2-2-1-2-2-2-2 1-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold transition-colors duration-200">Present Today</h3>
                <div className="text-lg sm:text-2xl font-bold transition-colors duration-200">156</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trends Section */}
      <div className={`mx-3 sm:mx-6 mb-4 sm:mb-6 p-3 sm:p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <h2 className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Performance Trends</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors text-sm sm:text-base" onClick={() => handleExport('PDF')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <span>PDF</span>
            </button>
            <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors text-sm sm:text-base" onClick={() => handleExport('Excel')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
              </svg>
              <span>Excel</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-purple-100 p-4 sm:p-6 rounded-lg flex items-center justify-between transition-colors duration-200 dark:bg-purple-900">
            <div className="flex items-center">
              <div className="bg-purple-500 text-white p-2 sm:p-3 rounded-full mr-3">
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold transition-colors duration-200">Average GPA</h3>
                <div className="text-lg sm:text-2xl font-bold transition-colors duration-200">3.2</div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-100 p-4 sm:p-6 rounded-lg flex items-center justify-between transition-colors duration-200 dark:bg-yellow-900">
            <div className="flex items-center">
              <div className="bg-yellow-500 text-white p-2 sm:p-3 rounded-full mr-3">
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="19" x2="12" y2="5"/>
                  <polyline points="5,12 12,5 19,12"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold transition-colors duration-200">Highest Score</h3>
                <div className="text-lg sm:text-2xl font-bold transition-colors duration-200">98%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-100 p-4 sm:p-6 rounded-lg flex items-center justify-between transition-colors duration-200 dark:bg-indigo-900 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="bg-indigo-500 text-white p-2 sm:p-3 rounded-full mr-3">
                <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <polyline points="19,12 12,19 5,12"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-semibold transition-colors duration-200">Lowest Score</h3>
                <div className="text-lg sm:text-2xl font-bold transition-colors duration-200">45%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options Section */}
      <div className={`mx-3 sm:mx-6 mb-4 sm:mb-6 p-3 sm:p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 transition-colors duration-200 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Export Options</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors text-sm sm:text-base" onClick={() => handleExport('PDF')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            <span>Export as PDF</span>
          </button>
          
          <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors text-sm sm:text-base" onClick={() => handleExport('Excel')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
            </svg>
            <span>Export as Excel</span>
          </button>
          
          <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-700 transition-colors text-sm sm:text-base" onClick={() => handleExport('Raw Data')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download Raw Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
