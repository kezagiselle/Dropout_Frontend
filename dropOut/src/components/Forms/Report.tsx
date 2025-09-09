import { useState } from 'react';
import { FaArrowLeft, FaDownload, FaEye, FaChartBar, FaChevronDown } from 'react-icons/fa';
import { IoIosCalendar } from 'react-icons/io';

interface ReportProps {
  onBack: () => void;
}

function Report({ onBack }: ReportProps) {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [gradeClass, setGradeClass] = useState('All Grades');

  const handleGenerateReport = () => {
    // Handle report generation logic here
    console.log('Generating report with:', { reportType, startDate, endDate, department, gradeClass });
  };

  const handleClearFilters = () => {
    setReportType('');
    setStartDate('');
    setEndDate('');
    setDepartment('All Departments');
    setGradeClass('All Grades');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reports Management
            </h1>
            <p className="text-gray-600">
              Comprehensive analytics on student dropout risks and trends
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
              <FaDownload className="text-sm" />
              Export
            </button>
            <button 
              onClick={onBack}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <FaArrowLeft className="text-sm" />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-4xl bg-white rounded-lg border border-gray-200 p-8">
        {/* Report Generation Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Report Generation
          </h2>
          <p className="text-gray-600 mb-6">
            Configure your report parameters and generate comprehensive reports
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select Report Type
            </label>
            <div className="relative">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
              >
                <option value="">Choose report type...</option>
                <option value="dropout-risk">Dropout Risk Analysis</option>
                <option value="attendance">Attendance Report</option>
                <option value="academic-performance">Academic Performance</option>
                <option value="intervention">Intervention Effectiveness</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Filters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 focus:border-orange-500"
                />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <IoIosCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg cursor-pointer pointer-events-none" />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 focus:border-orange-500"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <IoIosCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg cursor-pointer pointer-events-none" />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
                >
                  <option value="All Departments">All Departments</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
              </div>
            </div>

            {/* Grade/Class */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Grade/Class
              </label>
              <div className="relative">
                <select
                  value={gradeClass}
                  onChange={(e) => setGradeClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
                >
                  <option value="All Grades">All Grades</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Report Preview Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FaEye className="text-gray-700 text-lg" />
            <h2 className="text-xl font-bold text-gray-900">
              Report Preview
            </h2>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-12 text-center bg-gray-50">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500">
                Select report type and filters to see preview
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button 
            onClick={handleClearFilters}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Clear Filters
          </button>
          <button 
            onClick={handleGenerateReport}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition-colors duration-200 font-semibold"
          >
            <FaChartBar className="text-sm" />
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;