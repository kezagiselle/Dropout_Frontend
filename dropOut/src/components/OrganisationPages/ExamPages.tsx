import React, { useState } from 'react';
import { Search, GraduationCap, Users, TrendingDown, AlertCircle, ExternalLink, ChevronLeft, ChevronRight, ChevronDown, FileText, Calendar, Shield } from 'lucide-react';

export default function SchoolsDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All Risk Levels');
  const [currentPage, setCurrentPage] = useState(1);

  const schools = [
    { id: 1, name: 'Westfield High School', region: 'Region A' },
    { id: 2, name: 'Washington High School', region: 'Region B' },
    { id: 3, name: 'Roosevelt Middle School', region: 'Region C' },
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Region Selector and Clear All */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative inline-block">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option>GASABO</option>
              <option>KICUKIRO</option>
              <option>NYARUGENGE</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Clear All
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Schools Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-gray-600 text-sm font-medium">Schools</div>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Students Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-600 text-sm font-medium">Total Students</div>
                  <div className="text-2xl font-bold text-gray-900">1200</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dropout Rate Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-gray-600 text-sm font-medium">Dropout Rate</div>
                  <div className="text-2xl font-bold text-gray-900">3%</div>
                </div>
              </div>
            </div>
          </div>

          {/* At-Risk Students Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-gray-600 text-sm font-medium">At-Risk Students</div>
                  <div className="text-2xl font-bold text-gray-900">30</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Grades Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Academic Grades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Latest Grades Card */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 relative">
              <div className="absolute top-4 right-4">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-blue-600 text-sm font-medium mb-1">Latest Grades</div>
              <div className="text-3xl font-bold text-blue-700 mb-1">B+</div>
              <div className="text-blue-600 text-sm">Average: 85%</div>
            </div>

            {/* Attendance Card */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-100 relative">
              <div className="absolute top-4 right-4">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-green-600 text-sm font-medium mb-1">Attendance</div>
              <div className="text-3xl font-bold text-green-700 mb-1">92%</div>
              <div className="text-green-600 text-sm">This semester</div>
            </div>

            {/* Risk Level Card */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 relative">
              <div className="absolute top-4 right-4">
                <Shield className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-yellow-700 text-sm font-medium mb-1">Risk Level</div>
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-lg font-semibold text-yellow-700">Medium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by School name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Region Filter */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full md:w-auto"
              >
                <option>All Regions</option>
                <option>Region A</option>
                <option>Region B</option>
                <option>Region C</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Risk Level Filter */}
            <div className="relative">
              <select
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full md:w-auto"
              >
                <option>All Risk Levels</option>
                <option>Low Risk</option>
                <option>Medium Risk</option>
                <option>High Risk</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  School Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium text-sm">
                      {school.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">
                    {school.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Exams</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
            <div className="text-sm text-gray-600">
              Showing 1 to 6 of 24 schools
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1 text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button className="px-3.5 py-1.5 bg-orange-500 text-white rounded font-medium text-sm min-w-[36px]">
                1
              </button>
              <button className="px-3.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 text-sm min-w-[36px]">
                2
              </button>
              <button className="px-3.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 text-sm min-w-[36px]">
                3
              </button>
              <button className="px-3.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 text-sm min-w-[36px]">
                4
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1 text-gray-700 text-sm">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}