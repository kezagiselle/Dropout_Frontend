 
import React, { useState, useEffect } from 'react';
import { Download, Plus, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUserAuth } from '../../context/useUserAuth';
import pe1 from "../../../src/img/pe1.png";
import pe2 from "../../../src/img/pe2.png";
import pe3 from "../../../src/img/pe3.png";

type RiskColor = 'red' | 'green' | 'yellow';

interface Student {
  studentId: string;
  name: string;
  riskLevel: string;
  averageAttendance: number;
  dropoutProbability: number;
}

export default function StudentProfiles() {
  const { user, token } = useUserAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('All Risk Levels');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!user?.userId || !token) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/teachers/students/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        
        const result = await response.json();
        if (result.success && result.data) {
          setStudents(result.data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [user?.userId, token]);

  const getRiskColor = (riskLevel: string): RiskColor => {
    if (riskLevel === 'CRITICAL') return 'red';
    if (riskLevel === 'HIGH') return 'yellow';
    return 'green'; // MEDIUM or LOW
  };

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
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full max-w-none p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2 w-full">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Student Profiles</h1>
                  <p className="text-sm text-gray-600 mt-1">Monitoring Students Profiles</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center">
                    <Plus className="w-4 h-4" />
                    Add Report
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 w-full relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Student Name"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex gap-4 w-full sm:w-auto">
                  <div className="flex-1 sm:flex-none relative">
                    <select
                      value={selectedRegion}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRegion(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                      <option>All Regions</option>
                      <option>North Region</option>
                      <option>South Region</option>
                      <option>East Region</option>
                      <option>West Region</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="flex-1 sm:flex-none relative">
                    <select
                      value={selectedRiskLevel}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRiskLevel(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header - Hidden on mobile, visible on tablet and up */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div className="col-span-3">Student Name</div>
                <div className="col-span-2">Attendance</div>
                <div className="col-span-2">Risk Status</div>
                <div className="col-span-3">Dropout Probability</div>
                <div className="col-span-2">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {isLoading ? (
                  // Loading skeleton
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="p-4 sm:px-6 sm:py-4 animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : students.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No students found
                  </div>
                ) : (
                  students.map((student, index) => (
                    <div key={student.studentId} className="p-4 sm:px-6 sm:py-4 hover:bg-gray-50 transition-colors">
                      {/* Mobile Layout */}
                      <div className="sm:hidden space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={[pe1, pe2, pe3][index % 3]}
                              alt={student.name}
                              className="w-12 h-12 rounded-full bg-gray-200 object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">ID: {student.studentId.slice(0, 8)}</div>
                            </div>
                          </div>
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                            View
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500 mb-1">Attendance</div>
                            <div className="font-medium">{student.averageAttendance}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Risk Status</div>
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeClass(getRiskColor(student.riskLevel))}`}>
                              {getRiskIcon(getRiskColor(student.riskLevel))}
                              {student.riskLevel}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <div className="text-gray-500 mb-1">Dropout Probability</div>
                            <div className="font-medium">{(student.dropoutProbability * 100).toFixed(1)}%</div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                        {/* Student Name */}
                        <div className="col-span-3 flex items-center gap-3">
                          <img
                            src={[pe1, pe2, pe3][index % 3]}
                            alt={student.name}
                            className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">ID: {student.studentId.slice(0, 8)}</div>
                          </div>
                        </div>

                        {/* Attendance */}
                        <div className="col-span-2 text-gray-700">
                          {student.averageAttendance}%
                        </div>

                        {/* Risk Status */}
                        <div className="col-span-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeClass(getRiskColor(student.riskLevel))}`}>
                            {getRiskIcon(getRiskColor(student.riskLevel))}
                            {student.riskLevel}
                          </span>
                        </div>

                        {/* Dropout Probability */}
                        <div className="col-span-3 text-gray-700 font-medium">
                          {(student.dropoutProbability * 100).toFixed(1)}%
                        </div>

                        {/* Actions */}
                        <div className="col-span-2">
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
              <div className="text-sm text-gray-600">
                Showing 1 to {students.length} of {students.length} Students
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                {[1, 2, 3, 4].map((page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page 
                        ? 'bg-orange-500 text-white' 
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1 transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}