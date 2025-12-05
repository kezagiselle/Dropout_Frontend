import { useState } from 'react'
import { FaArrowLeft, FaCalendarAlt, FaUser, FaPrint, FaChevronDown, FaUpload } from 'react-icons/fa'
import StudentLast from './StudentLast';

interface StudentRepoProps {
  onBack: () => void;
}

function StudentRepo({ onBack }: StudentRepoProps) {
  const [reportType, setReportType] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [showStudentLast, setShowStudentLast] = useState(false);

  if (showStudentLast) {
    return <StudentLast onBack={() => setShowStudentLast(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Profile</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Watch Student information to monitor dropout risk and academic progress</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-xs sm:text-sm font-medium">
              Historic
            </button>
            <button 
              onClick={onBack}
              className="bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-xs sm:text-sm"
            >
              <FaArrowLeft className="text-xs sm:text-sm" />
              Back
            </button>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <span>Dashboard</span>
            <span className="mx-2">&gt;</span>
            <span>Students</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-medium">Marcus Johnson</span>
          </nav>
        </div>

        {/* Student Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUser className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Marcus Johnson</h2>
                <p className="text-gray-600">Grade 10 • Student ID: #ST-2024-0847</p>
                <p className="text-gray-600">Westfield High School</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaCalendarAlt className="text-sm" />
                Schedule Meeting
              </button>
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaUser className="text-sm" />
                Assign as Mentor
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaPrint className="text-sm" />
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Create a Report Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-orange-400 mb-6">Create a Report</h2>
          
          <div className="space-y-6">
            {/* Type of Report Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Type of Report
              </label>
              <div className="relative">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
                >
                  <option value="">Select a type</option>
                  <option value="academic">Academic Performance</option>
                  <option value="behavioral">Behavioral Assessment</option>
                  <option value="attendance">Attendance Report</option>
                  <option value="intervention">Intervention Progress</option>
                  <option value="general">General Report</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Report Text Area */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Write here your report
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-orange-500 rounded-l-lg"></div>
                <textarea
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 resize-none"
                  placeholder="Write your detailed report here..."
                />
              </div>
            </div>

            {/* Author Information */}
            <div className="text-sm text-gray-600">
              By: Ms. Willson (HoD)
            </div>

            {/* Upload Button */}
            <div className="flex justify-end">
              <button 
                onClick={() => setShowStudentLast(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
              >
                <FaUpload className="text-sm" />
                Upload to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRepo;