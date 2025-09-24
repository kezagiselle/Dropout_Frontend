import { useState } from 'react'
import { FaArrowLeft, FaPrint, FaChevronDown } from 'react-icons/fa'
import { FaUser } from "react-icons/fa";

interface TeacherProfileProps {
  onBack: () => void;
}

function TeacherProfile({ onBack }: TeacherProfileProps) {
  const [reportType, setReportType] = useState('');
  const [reportContent, setReportContent] = useState('');

  const reportTypes = [
    'Academic Performance Report',
    'Behavioral Assessment',
    'Attendance Report',
    'Parent Conference Summary',
    'Intervention Report',
    'Progress Evaluation'
  ];

  const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };

  const handleReportContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReportContent(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2 sm:p-4 pt-12 sm:pt-16 md:pt-20">
      {/* Main Content Card */}
      <div className="w-full max-w-7xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12 min-h-[600px] sm:min-h-[700px] flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Teacher Profile
            </h1>
            <p className="text-sm text-gray-600">
              Manage Teachers Activities
            </p>
          </div>
          
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>
        </div>

        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Dashboard</span>
            <span className="mx-2">&gt;</span>
            <span className="hover:text-gray-900 cursor-pointer">Teachers</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-medium">Robert Smith</span>
          </nav>
        </div>

        {/* Teacher Information Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Teacher Avatar */}
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUser className="w-10 h-10 text-blue-600" />
              </div>
              
              {/* Teacher Details */}
    <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Robert Smith</h2>
                <p className="text-gray-600 mb-1">Mathematical • Teacher ID: #TC-2024-0847</p>
                <p className="text-gray-600">Westfield High School</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 text-sm font-medium">
                <FaPrint className="text-sm" />
                Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Create a Report Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex-1">
          <h3 className="text-lg font-bold text-orange-600 mb-6">Create a Report</h3>
          
          {/* Report Type Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type of Report
            </label>
            <div className="relative">
              <select
                value={reportType}
                onChange={handleReportTypeChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-900 pr-10"
              >
                <option value="">Select a type</option>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Report Content Textarea */}
          <div className="mb-6">
            <div className="relative">
              <textarea
                value={reportContent}
                onChange={handleReportContentChange}
                placeholder="Write here your report"
                rows={8}
                className="w-full px-3 py-2.5 border-l-4 border-orange-500 border-t border-r border-b border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 resize-none"
              />
            </div>
          </div>

          {/* Author Information */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">By: Ms. Willson (HoD)</p>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
              Upload to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherProfile
