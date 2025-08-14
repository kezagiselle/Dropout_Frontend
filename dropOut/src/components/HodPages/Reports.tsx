import React, { useState } from "react";
import { FaChartBar, FaEye, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const Reports = () => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <AiOutlinePlus className="text-white" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8">
        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Report Generation Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Report Generation</h2>
            <p className="text-gray-600 mb-6">
              Configure your report parameters and generate comprehensive reports
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Report Type
              </label>
              <div className="relative">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
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
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="mm/dd/yyyy"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="mm/dd/yyyy"
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                  >
                    <option>All Departments</option>
                    <option>Science</option>
                    <option>Mathematics</option>
                    <option>English</option>
                    <option>History</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grade/Class
                </label>
                <div className="relative">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                  >
                    <option>All Grades</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Report Preview Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FaEye className="text-gray-600" />
              <h3 className="text-lg font-bold text-gray-800">Report Preview</h3>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="w-16 h-20 bg-gray-200 rounded mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">📄</span>
              </div>
              <p className="text-gray-500 text-sm">
                Select report type and filters to see preview
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center gap-3 transition-colors font-medium">
              <FaChartBar className="text-white" />
              Generate Report
            </button>
            <button
              onClick={clearFilters}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
