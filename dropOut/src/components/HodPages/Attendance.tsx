import React, { useState } from 'react';
import { useTheme } from '../Hod';
import { FaFileAlt, FaCheck, FaTimes, FaClock, FaExclamationTriangle, FaInfoCircle, FaStar, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FaDownload } from "react-icons/fa6";

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
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Attendance Management
          </h1>
          <p className={`text-xs sm:text-sm lg:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Monitor student attendance and identify at-risk patterns
          </p>
        </div>
        
        <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base">
          <FaDownload className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Present Today */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Present Today
              </p>
              <p className="text-3xl font-bold mt-2 text-green-400">847</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-green-600 font-medium">+2.3% from yesterday</span>
              </div>
            </div>
            <FaCheck className="w-5 h-5 text-green-600 ml-4" />
          </div>
        </div>

        {/* Absent Today */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Absent Today
              </p>
              <p className="text-3xl font-bold mt-2 text-red-400">23</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-red-600 font-medium">+5 from yesterday</span>
              </div>
            </div>
            <FaTimes className="w-5 h-5 text-red-600 ml-4" />
          </div>
        </div>

        {/* Late Arrivals */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Late Arrivals
              </p>
              <p className="text-3xl font-bold mt-2 text-orange-400">12</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-orange-600 font-medium">-3 from yesterday</span>
              </div>
            </div>
            <FaClock className="w-5 h-5 text-orange-600 ml-4" />
          </div>
        </div>

        {/* At Risk Students */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                At Risk Students
              </p>
              <p className="text-3xl font-bold mt-2 text-red-400">8</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-red-600 font-medium">Needs attention</span>
              </div>
            </div>
            <FaExclamationTriangle className="w-5 h-5 text-red-600 ml-4" />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Filters
          </h2>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Course</label>
              <select 
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
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
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>End Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Class/Section</label>
              <select 
                value={filters.classSection}
                onChange={(e) => handleFilterChange('classSection', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
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
      </div>

      {/* Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Attendance Trends */}
        <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Attendance Trends
              </h2>
              <div className="flex items-center space-x-2">
                 <button 
                   onClick={() => handleExport('PDF')}
                   className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200"
                 >
                   <FaDownload className="w-3 h-3 text-black" />
                   <span>PDF</span>
                 </button>
                 <button 
                   onClick={() => handleExport('Excel')}
                   className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200"
                 >
                   <FaFileAlt className="w-3 h-3 text-black" />
                   <span>Excel</span>
                 </button>
              </div>
            </div>
          </div>
          
           <div className="p-3 sm:p-4 lg:p-6">
             {/* White space where chart was */}
             <div className="h-48 mb-8"></div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Average Attendance Card */}
               <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg min-h-[120px]">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                     <FaCheck className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-base font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Average Attendance</p>
                 </div>
                 <p className="text-3xl font-bold text-green-600">87.5%</p>
               </div>
               
               {/* Total Absences Card */}
               <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg min-h-[120px]">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                     <FaTimes className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-base font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Total Absences</p>
                 </div>
                 <p className="text-3xl font-bold text-red-600">234</p>
               </div>
             </div>
           </div>
        </div>

        {/* Performance Trends */}
        <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Performance Trends
              </h2>
              <div className="flex items-center space-x-2">
                 <button 
                   onClick={() => handleExport('PDF')}
                   className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200"
                 >
                   <FaDownload className="w-3 h-3 text-black" />
                   <span>PDF</span>
                 </button>
                 <button 
                   onClick={() => handleExport('Excel')}
                   className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200"
                 >
                   <FaFileAlt className="w-3 h-3 text-black" />
                   <span>Excel</span>
                 </button>
              </div>
            </div>
          </div>
          
           <div className="p-3 sm:p-4 lg:p-6">
             {/* White space where chart was */}
             <div className="h-48 mb-8"></div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
               {/* Average GPA Card */}
               <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                     <FaStar className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Average GPA</p>
                 </div>
                 <p className="text-2xl font-bold text-blue-600">3.2</p>
               </div>
               
               {/* Highest Score Card */}
               <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                     <FaArrowUp className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Highest Score</p>
                 </div>
                 <p className="text-2xl font-bold text-green-600">98%</p>
               </div>
               
               {/* Lowest Score Card */}
               <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                     <FaArrowDown className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Lowest Score</p>
                 </div>
                 <p className="text-2xl font-bold text-orange-600">45%</p>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Automated Alerts Section */}
      <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Automated Alerts
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
              View All
            </button>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="space-y-4">
            {/* High Risk Alert */}
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 dark:bg-red-600 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sarah Johnson - 5 unexcused absences this week
                  </p>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Action
              </button>
            </div>
            
            {/* Tardiness Pattern */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-600 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Mike Chen - Late 4 times this week
                  </p>
                </div>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Review
              </button>
            </div>
            
            {/* Attendance Improvement */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <FaInfoCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Class 10A - 98% attendance this week
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;