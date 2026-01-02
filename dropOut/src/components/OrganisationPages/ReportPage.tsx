import React, { useState } from 'react';
import { ChevronDown, School, Users, AlertTriangle, UserX, BarChart3, TrendingDown, Calendar, FileText, Eye, Download } from 'lucide-react';

export default function ReportPage() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [currentPage, setCurrentPage] = useState(1);

  const schools = [
    { name: 'Westfield High School', region: 'Region A' },
    { name: 'Washington High School', region: 'Region B' },
    { name: 'Roosevelt Middle School', region: 'Region C' },
  ];

  const reports = [
    { name: 'Student Performance Report - Q4 2024', date: 'Jan 15, 2025', status: 'Ready' },
    { name: 'Attendance Summary - December 2024', date: 'Jan 12, 2025', status: 'In Progress' },
    { name: 'Regional Analysis - All Regions', date: 'Jan 10, 2025', status: 'Ready' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">GASABO</span>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
          <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
            Clear All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded">
                <School className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Schools</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1200</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3%</div>
                <div className="text-sm text-gray-600">Dropout Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">30</div>
                <div className="text-sm text-gray-600">At-Risk Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Select Report Type */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Report Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-white rounded-lg p-6 shadow-sm border-2 border-orange-500 hover:shadow-md transition-shadow text-left">
              <FileText className="w-8 h-8 text-orange-500 mb-3" />
              <div className="font-semibold text-gray-900 mb-1">Student Performance Report</div>
              <div className="text-sm text-gray-600">Academic performance metrics</div>
            </button>

            <button className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
              <TrendingDown className="w-8 h-8 text-blue-500 mb-3" />
              <div className="font-semibold text-gray-900 mb-1">Dropout Statistics</div>
              <div className="text-sm text-gray-600">Student dropout analysis</div>
            </button>

            <button className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
              <Calendar className="w-8 h-8 text-green-500 mb-3" />
              <div className="font-semibold text-gray-900 mb-1">Attendance Summary</div>
              <div className="text-sm text-gray-600">Student attendance data</div>
            </button>

            <button className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
              <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
              <div className="font-semibold text-gray-900 mb-1">Regional Analysis</div>
              <div className="text-sm text-gray-600">Regional performance comparison</div>
            </button>
          </div>
        </div>

        {/* Report Parameters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Parameters</h2>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by School name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Regions</option>
                  <option>Region A</option>
                  <option>Region B</option>
                  <option>Region C</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <span>▶</span>
            Generate Report
          </button>
        </div>

        {/* Schools Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">School Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Region</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schools.map((school, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
                        {school.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{school.region}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                          <span>🔔</span>
                          Generate Report
                        </button>
                        <a href="#" className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                          <span>↗</span>
                          View Profile
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to 6 of 24 schools
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                Previous
              </button>
              <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">2</button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">3</button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">4</button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Generated Reports */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Generated Reports</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Report Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date Generated</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{report.name}</td>
                    <td className="px-6 py-4 text-gray-700">{report.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        report.status === 'Ready' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}