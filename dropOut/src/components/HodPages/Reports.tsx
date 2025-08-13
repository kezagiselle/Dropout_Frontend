import React, { useState } from "react";
import { FaChartBar, FaEye } from "react-icons/fa";
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
    <div>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <AiOutlinePlus /> Generate Report
        </button>
      </div>

      {/* Report Generation Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Report Generation</h2>
        <p className="text-gray-500 mb-4">
          Configure your report parameters and generate comprehensive reports
        </p>

        {/* Report Type */}
        <label className="block text-sm font-medium mb-1">
          Select Report Type
        </label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="">Choose report type...</option>
          <option value="attendance">Attendance Report</option>
          <option value="performance">Performance Report</option>
        </select>

        {/* Filters */}
        <h3 className="text-sm font-medium mb-2">Filters</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>All Departments</option>
              <option>Science</option>
              <option>Mathematics</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Grade/Class</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>All Grades</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
            </select>
          </div>
        </div>

        {/* Report Preview */}
        <div className="border rounded p-6 text-center text-gray-500 mb-4">
          <FaEye className="mx-auto mb-2 text-gray-400" size={24} />
          Select report type and filters to see preview
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaChartBar /> Generate Report
          </button>
          <button
            onClick={clearFilters}
            className="border px-4 py-2 rounded hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
