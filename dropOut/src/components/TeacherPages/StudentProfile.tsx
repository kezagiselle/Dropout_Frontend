import React, { useState } from 'react';
import { Download, Plus, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  riskStatus: string;
  riskColor: 'red' | 'green' | 'yellow';
  enrollmentStatus: string;
  enrollmentColor: 'red' | 'green' | 'yellow';
}

type RiskColor = 'red' | 'green' | 'yellow';

export default function StudentProfiles() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('All Risk Levels');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const students: Student[] = [
    {
      id: 'STU001',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      grade: 'Grade 11',
      riskStatus: 'At-risk',
      riskColor: 'red',
      enrollmentStatus: 'Enrolled',
      enrollmentColor: 'green'
    },
    {
      id: 'STU002',
      name: 'Maria Gonzalez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      grade: 'Grade 12',
      riskStatus: 'Normal',
      riskColor: 'green',
      enrollmentStatus: 'Enrolled',
      enrollmentColor: 'green'
    },
    {
      id: 'STU003',
      name: 'Ahmed Ali',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
      grade: 'Grade 10',
      riskStatus: 'At-risk',
      riskColor: 'red',
      enrollmentStatus: 'Pending',
      enrollmentColor: 'yellow'
    }
  ];

  const getRiskBadgeClass = (color: RiskColor): string => {
    const classes = {
      red: 'bg-red-100 text-red-700',
      green: 'bg-green-100 text-green-700',
      yellow: 'bg-yellow-100 text-yellow-700'
    };
    return classes[color];
  };

  const getRiskIcon = (color: RiskColor): React.ReactElement => {
    if (color === 'red') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  };

  const getEnrollmentIcon = (color: RiskColor): React.ReactElement => {
    if (color === 'yellow') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Profiles</h1>
              <p className="text-sm text-gray-600 mt-1">Monitoring Students Profiles</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Add Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Student Name"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Regions</option>
                <option>North Region</option>
                <option>South Region</option>
                <option>East Region</option>
                <option>West Region</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedRiskLevel}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRiskLevel(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Risk Levels</option>
                <option>At-risk</option>
                <option>Normal</option>
                <option>Low Risk</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div className="col-span-3">Student Name</div>
            <div className="col-span-2">Grade</div>
            <div className="col-span-2">Risk Status</div>
            <div className="col-span-3">Enrollment Status</div>
            <div className="col-span-2">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {students.map((student) => (
              <div key={student.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                {/* Student Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">ID: {student.id}</div>
                  </div>
                </div>

                {/* Grade */}
                <div className="col-span-2 text-gray-700">
                  {student.grade}
                </div>

                {/* Risk Status */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeClass(student.riskColor)}`}>
                    {getRiskIcon(student.riskColor)}
                    {student.riskStatus}
                  </span>
                </div>

                {/* Enrollment Status */}
                <div className="col-span-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeClass(student.enrollmentColor)}`}>
                    {getEnrollmentIcon(student.enrollmentColor)}
                    {student.enrollmentStatus}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing 1 to 3 of 3 Students
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <button 
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1 
                  ? 'bg-orange-500 text-white' 
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              1
            </button>
            <button 
              onClick={() => setCurrentPage(2)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 2 
                  ? 'bg-orange-500 text-white' 
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              2
            </button>
            <button 
              onClick={() => setCurrentPage(3)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 3 
                  ? 'bg-orange-500 text-white' 
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              3
            </button>
            <button 
              onClick={() => setCurrentPage(4)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 4 
                  ? 'bg-orange-500 text-white' 
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              4
            </button>
            
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}