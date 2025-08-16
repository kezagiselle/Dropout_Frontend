import React, { useState } from "react";
import { FaChartBar, FaEye, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from '../Hod';

const Reports = () => {
  const { theme } = useTheme();
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [grade, setGrade] = useState("All Grades");

  const clearFilters = () => {
    setReportType("");
    setStartDate("");
    setEndDate("");
    setDepartment("All Departments");
    setGrade("All Grades");
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Top Header Bar */}
      <div className={`border-b px-3 sm:px-6 py-3 sm:py-4 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>Reports</h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start gap-2 transition-colors text-sm sm:text-base">
            <AiOutlinePlus className="text-white" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-8">
        {/* Main Content Card */}
        <div className={`rounded-xl shadow-lg p-4 sm:p-8 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800' 
            : 'bg-white'
        }`}>
          {/* Report Generation Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>Report Generation</h2>
            <p className={`mb-4 sm:mb-6 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Configure your report parameters and generate comprehensive reports
            </p>
            
            <div className="mb-4 sm:mb-6">
              <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Select Report Type
              </label>
              <div className="relative">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <option value="">Choose report type...</option>
                  <option value="attendance">Attendance Report</option>
                  <option value="performance">Performance Report</option>
                  <option value="academic">Academic Report</option>
                  <option value="behavioral">Behavioral Report</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="mm/dd/yyyy"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="mm/dd/yyyy"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Department
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <option>All Departments</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>History</option>
                    <option>Art</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Grade/Class
                </label>
                <div className="relative">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className={`w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <option>All Grades</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            <div className="mt-4 sm:mt-6">
              <button
                onClick={clearFilters}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Report Preview Section */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>Report Preview</h3>
            <div className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors duration-200 ${
              theme === 'dark' 
                ? 'border-gray-600 bg-gray-700' 
                : 'border-gray-300 bg-gray-50'
            }`}>
              <FaChartBar className={`mx-auto h-12 w-12 mb-4 transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-300'
              }`} />
              <h4 className={`text-lg font-medium mb-2 transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>No Report Selected</h4>
              <p className={`transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Configure your report parameters above and click "Generate Report" to create a preview.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base flex items-center justify-center gap-2">
              <FaEye className="text-sm" />
              <span>Preview Report</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base flex items-center justify-center gap-2">
              <FaChartBar className="text-sm" />
              <span>Generate Report</span>
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
