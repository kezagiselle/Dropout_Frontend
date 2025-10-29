/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Eye, ChevronDown, Filter, Plus, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';


type ColorType = 'green' | 'orange' | 'red';

export default function Behavior() {
  const [selectedStudent, setSelectedStudent] = useState<string>('All Students');
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Date (Latest)');
  const [stats, setStats] = useState<null | {
    totalReports: number;
    totalMajorIncidents: number;
    totalMinorIncidents: number;
    reports: Array<{
      studentName: string;
      severityLevel: string;
      incidentType: string;
      notes: string;
    }>;
  }>(null);

  const navigate = useNavigate();
  const { token, user } = useUserAuth();

  // Add this function to handle navigation to LogBehaviorReport
  const handleLogNewReport = () => {
    navigate('/log-behavior-report');
  };

  // Fetch behavior incident stats for the logged-in user and replace hardcoded data
  useEffect(() => {
    const fetchStats = async () => {
      if (!token || !user?.userId) return;
      
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const res = await fetch(`${baseUrl}/api/behavior-incidents/stats/${user.userId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setStats(data.data);
        }
      } catch (err) {
        console.error('Error fetching behavior stats:', err);
        setStats(null);
      }
    };
    fetchStats();
  }, [token, user]);

  const getIconBg = (color: ColorType): string => {
    const colors = {
      green: 'bg-green-100',
      orange: 'bg-orange-100',
      red: 'bg-red-100'
    };
    return colors[color];
  };

  const getIcon = (color: ColorType): React.ReactElement => {
    const icons = {
      green: (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      orange: (
        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      red: (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[color];
  };

  const getBorderColor = (color: ColorType): string => {
    const colors = {
      green: 'border-l-green-500',
      orange: 'border-l-orange-500',
      red: 'border-l-red-500'
    };
    return colors[color];
  };

  

  // Map severity level from API to color type used in UI
  const severityToColor = (severity: string): ColorType => {
    if (!severity) return 'orange';
    const s = severity.toUpperCase();
    if (s === 'LOW') return 'orange';
    if (s === 'MEDIUM') return 'red';
    if (s === 'HIGH') return 'red';
    return 'orange';
  };

  // Map incident type to a simple badge style (no colors)
  const getIncidentBadge = (incidentType: string): string => {
    return 'bg-gray-100 text-gray-700';
  };

  // Map severity level to colorful badge style
  const getSeverityBadge = (severity: string): string => {
    const s = (severity || '').toUpperCase();
    if (s === 'LOW') return 'bg-green-500 text-white';
    if (s === 'MEDIUM') return 'bg-yellow-500 text-white';
    if (s === 'HIGH') return 'bg-orange-500 text-white';
    if (s === 'CRITICAL') return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full max-w-none p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2 w-full">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Behavior Reports</h1>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Track and manage student behavior incidents and commendations</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors justify-center text-sm sm:text-base"
                    onClick={handleLogNewReport}
                  >
                    <Plus className="w-4 h-4" />
                    Log New Behavior Report
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors justify-center text-sm sm:text-base">
                    <Eye className="w-4 h-4" />
                    View All Reports
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <div className="relative">
                  <select 
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option>All Students</option>
                    <option>Emma Johnson</option>
                    <option>Michael Brown</option>
                    <option>James Wilson</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option>All Classes</option>
                    <option>Grade 9A</option>
                    <option>Grade 10B</option>
                    <option>Grade 11C</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option>All Types</option>
                    <option>Commendation</option>
                    <option>Minor Incident</option>
                    <option>Major Incident</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <input 
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                />

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                  <div className="relative flex-1">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                      <option>Date (Latest)</option>
                      <option>Date (Oldest)</option>
                      <option>Student Name</option>
                      <option>Type</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1">{stats?.totalReports ?? 0}</div>
                <div className="text-xs sm:text-sm text-gray-600">Behavior Reports</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-4xl font-bold text-orange-500 mb-1">{stats?.totalMinorIncidents ?? 0}</div>
                <div className="text-xs sm:text-sm text-gray-600">Minor Incidents</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-4xl font-bold text-red-500 mb-1">{stats?.totalMajorIncidents ?? 0}</div>
                <div className="text-xs sm:text-sm text-gray-600">Major Incidents</div>
              </div>
            </div>

            {/* Reports List */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Behavior Reports</h2>
              <div className="space-y-4">
                {(stats?.reports || []).map((r, idx) => {
                  const color = severityToColor(r.severityLevel);
                  return (
                    <div
                      key={`${r.studentName}-${idx}`}
                      className={`bg-white rounded-lg shadow-sm border-l-4 ${getBorderColor(color)} p-4 sm:p-6 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${getIconBg(color)} flex items-center justify-center flex-shrink-0`}>
                          {getIcon(color)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{r.studentName}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityBadge(r.severityLevel)} uppercase`}>
                                {r.severityLevel}
                              </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 self-start sm:self-auto">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getIncidentBadge(r.incidentType)}`}>
                                {r.incidentType}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-700">{r.notes}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing 1 to 5 of 5 results
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}