import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, AlertTriangle, Plus, Calendar, ChevronDown, Bell, Menu, X } from 'lucide-react';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar';

const attendanceData = [
  { day: 'Monday', Present: 90, Absent: 5, Late: 10 },
  { day: 'Tuesday', Present: 85, Absent: 10, Late: 30 },
  { day: 'Wednesday', Present: 88, Absent: 5, Late: 25 },
  { day: 'Thursday', Present: 82, Absent: 12, Late: 25 },
  { day: 'Friday', Present: 75, Absent: 20, Late: 28 },
];

export default function ParentAttendance() {
  const [activeTab, setActiveTab] = useState('Attendance');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          {/* Left Section - Mobile Menu Button and School Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.schoolName || 'School Name'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/parent-dashboard', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/parent-children', 'My Children')}
                className="hover:text-orange-600 transition-colors"
              >
                My Children
              </button>
              <button 
                onClick={() => handleNavigation('/parent-messages', 'Messages')}
                className="hover:text-orange-600 transition-colors"
              >
                Messages
              </button>
              <button 
                onClick={() => handleNavigation('/parent-settings', 'Settings')}
                className="hover:text-orange-600 transition-colors"
              >
                Settings
              </button>
            </div>
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Parent'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Use the ParentSidebar component */}
        <ParentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 sm:mb-6 lg:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Attendance & Behavior</h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">Track student attendance patterns and behavioral records</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm sm:shadow">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">2 Children</span>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow mb-4 sm:mb-6">
            <div className="p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Attendance Overview</h2>
              
              {/* Chart Section */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 sm:mb-0">Weekly Attendance Trend</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span>Present</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <span>Absent</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                      <span>Late</span>
                    </div>
                  </div>
                </div>

                <div className="h-60 sm:h-72 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        label={{ value: 'Attendance (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                      />
                      <Tooltip />
                      <Bar dataKey="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Late" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">85%</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Present</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">10%</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Absent</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">5%</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Late</p>
                </div>
              </div>
            </div>
          </div>

          {/* Behavior Records */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Behavior Records</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Incidents */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow">
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="text-base font-semibold text-gray-900">Recent Incidents</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span className="text-sm font-semibold text-gray-900">Sept 20</span>
                        </div>
                        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-red-200 text-red-800 text-xs rounded-full font-medium">
                          Red Tag
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 ml-4 mt-1">Disruptive behavior</p>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          <span className="text-sm font-semibold text-gray-900">Sept 15</span>
                        </div>
                        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-orange-200 text-orange-800 text-xs rounded-full font-medium">
                          Orange Tag
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 ml-4 mt-1">Late submission</p>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span className="text-sm font-semibold text-gray-900">Sept 12</span>
                        </div>
                        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-red-200 text-red-800 text-xs rounded-full font-medium">
                          Red Tag
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 ml-4 mt-1">Absent without excuse</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Positive Commendations */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow">
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Plus className="w-5 h-5 text-green-600" />
                    <h3 className="text-base font-semibold text-gray-900">Positive Commendations</h3>
                  </div>

                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm font-semibold text-gray-900">Sept 18</span>
                        </div>
                        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                          Green Tag
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 ml-4 mt-1">Excellent participation</p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm font-semibold text-gray-900">Sept 14</span>
                        </div>
                        <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                          Green Tag
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 ml-4 mt-1">Helped classmates</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 sm:p-6 text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-1">2</p>
                    <p className="text-sm text-gray-700">This Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-5 lg:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
            <div className="flex justify-end">
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition font-medium flex items-center gap-2 text-sm sm:text-base">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                View Full Attendance History
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}