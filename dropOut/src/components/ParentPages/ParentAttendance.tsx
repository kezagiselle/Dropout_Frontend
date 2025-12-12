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
      {/* Header - Enhanced Responsiveness */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 lg:px-6 xl:px-8">
          {/* Left Section */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1 xs:p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? 
                <X className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : 
                <Menu className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              }
            </button>
            
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs xs:text-sm sm:text-base lg:text-lg">
                {user?.schoolName || 'School Name'}
              </span>
              <ChevronDown className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-gray-600 hidden xs:block" />
            </div>

            {/* Header Navigation Links - More responsive breakpoints */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3 lg:gap-4 text-xs sm:text-sm md:text-base">
              <button 
                onClick={() => handleNavigation('/parent-dashboard', 'Dashboard')}
                className="hover:text-orange-600 transition-colors px-1 py-0.5 sm:px-2 sm:py-1 rounded hover:bg-orange-50"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/parent-children', 'My Children')}
                className="hover:text-orange-600 transition-colors px-1 py-0.5 sm:px-2 sm:py-1 rounded hover:bg-orange-50"
              >
                My Children
              </button>
              <button 
                onClick={() => handleNavigation('/parent-messages', 'Messages')}
                className="hover:text-orange-600 transition-colors px-1 py-0.5 sm:px-2 sm:py-1 rounded hover:bg-orange-50"
              >
                Messages
              </button>
              <button 
                onClick={() => handleNavigation('/parent-settings', 'Settings')}
                className="hover:text-orange-600 transition-colors px-1 py-0.5 sm:px-2 sm:py-1 rounded hover:bg-orange-50"
              >
                Settings
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3 xl:gap-4">
            {/* Calendar - Better mobile handling */}
            <div className="hidden xs:flex items-center gap-0.5 sm:gap-1 lg:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <span className="lg:hidden text-xs">Calendar</span>
              <ChevronDown className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 hidden lg:block" />
            </div>

            {/* Notifications - Better sizing */}
            <div className="relative p-1 xs:p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <Bell className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full text-white text-[10px] xs:text-xs flex items-center justify-center">
                3
              </span>
            </div>

            {/* Profile - Better mobile adaptation */}
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3">
              <img 
                src={userr} 
                alt="User profile" 
                className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden xs:block">
                <span className="text-xs xs:text-sm sm:text-base font-medium">
                  {user?.name || 'Parent'}
                </span>
                <ChevronDown className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-gray-600 inline-block ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Appears only on small screens */}
        <div className="lg:hidden border-t border-gray-100">
          <div className="flex items-center justify-around px-2 py-1.5 xs:px-3 xs:py-2">
            <button 
              onClick={() => handleNavigation('/parent-dashboard', 'Dashboard')}
              className="flex flex-col items-center p-1 xs:p-2 rounded-lg hover:bg-gray-50 transition-colors min-w-[60px]"
            >
              <span className="text-xs xs:text-sm">Dashboard</span>
            </button>
            <button 
              onClick={() => handleNavigation('/parent-children', 'My Children')}
              className="flex flex-col items-center p-1 xs:p-2 rounded-lg hover:bg-gray-50 transition-colors min-w-[60px]"
            >
              <span className="text-xs xs:text-sm">Children</span>
            </button>
            <button 
              onClick={() => handleNavigation('/parent-messages', 'Messages')}
              className="flex flex-col items-center p-1 xs:p-2 rounded-lg hover:bg-gray-50 transition-colors min-w-[60px]"
            >
              <span className="text-xs xs:text-sm">Messages</span>
            </button>
            <button 
              onClick={() => handleNavigation('/parent-settings', 'Settings')}
              className="flex flex-col items-center p-1 xs:p-2 rounded-lg hover:bg-gray-50 transition-colors min-w-[60px]"
            >
              <span className="text-xs xs:text-sm">Settings</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ParentSidebar Component */}
        <ParentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content - Enhanced responsiveness */}
        <main className="flex-1 min-w-0 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
          {/* Header Section */}
          <div className="flex flex-col xs:flex-row xs:items-start justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-8 xl:mb-10 gap-3 xs:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 xs:mb-2">
                Attendance & Behavior
              </h1>
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 leading-tight xs:leading-normal">
                Track student attendance patterns and behavioral records
              </p>
            </div>
            <div className="flex items-center gap-1.5 xs:gap-2 bg-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm sm:shadow min-w-fit">
              <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap">2 Children</span>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
            <div className="p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8">
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                Attendance Overview
              </h2>
              
              {/* Chart Section */}
              <div className="mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-2 xs:mb-3 sm:mb-4 gap-2 xs:gap-0">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-800 mb-1 xs:mb-0">
                    Weekly Attendance Trend
                  </h3>
                  <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4 text-xs xs:text-sm">
                    <div className="flex items-center gap-1 xs:gap-1.5">
                      <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span className="whitespace-nowrap">Present</span>
                    </div>
                    <div className="flex items-center gap-1 xs:gap-1.5">
                      <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <span className="whitespace-nowrap">Absent</span>
                    </div>
                    <div className="flex items-center gap-1 xs:gap-1.5">
                      <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                      <span className="whitespace-nowrap">Late</span>
                    </div>
                  </div>
                </div>

                <div className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={false}
                        label={{ 
                          value: 'Attendance (%)', 
                          angle: -90, 
                          position: 'insideLeft', 
                          style: { fontSize: 10 } 
                        }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          fontSize: '12px',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          padding: '8px'
                        }}
                        formatter={(value) => [`${value}%`, 'Attendance']}
                      />
                      <Bar 
                        dataKey="Present" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]} 
                        name="Present"
                      />
                      <Bar 
                        dataKey="Absent" 
                        fill="#ef4444" 
                        radius={[4, 4, 0, 0]} 
                        name="Absent"
                      />
                      <Bar 
                        dataKey="Late" 
                        fill="#f97316" 
                        radius={[4, 4, 0, 0]} 
                        name="Late"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats Row - Enhanced responsiveness */}
              <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
                <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg bg-green-50">
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">85%</p>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1 xs:mt-2">Total Present</p>
                </div>
                <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg bg-red-50">
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-red-600">10%</p>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1 xs:mt-2">Total Absent</p>
                </div>
                <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg bg-orange-50">
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600">5%</p>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1 xs:mt-2">Total Late</p>
                </div>
              </div>
            </div>
          </div>

          {/* Behavior Records */}
          <div className="mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
            <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 lg:mb-5">
              Behavior Records
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
              {/* Recent Incidents */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow transition-transform hover:scale-[1.01] hover:shadow-md">
                <div className="p-3 xs:p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3 sm:mb-4">
                    <AlertTriangle className="w-4 h-4 xs:w-5 xs:h-5 text-red-600" />
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">
                      Recent Incidents
                    </h3>
                  </div>

                  <div className="space-y-2 xs:space-y-3">
                    <div className="bg-red-50 border-l-3 xs:border-l-4 border-red-500 p-2 xs:p-3 sm:p-4 rounded hover:bg-red-100 transition-colors">
                      <div className="flex items-start justify-between mb-0.5 xs:mb-1">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-red-500 rounded-full"></span>
                          <span className="text-xs xs:text-sm font-semibold text-gray-900">Sept 20</span>
                        </div>
                        <span className="px-1.5 xs:px-2 py-0.5 xs:py-1 bg-red-200 text-red-800 text-[10px] xs:text-xs rounded-full font-medium whitespace-nowrap">
                          Red Tag
                        </span>
                      </div>
                      <p className="text-xs xs:text-sm text-gray-700 ml-4 xs:ml-5 mt-0.5 xs:mt-1">
                        Disruptive behavior
                      </p>
                    </div>

                    <div className="bg-orange-50 border-l-3 xs:border-l-4 border-orange-500 p-2 xs:p-3 sm:p-4 rounded hover:bg-orange-100 transition-colors">
                      <div className="flex items-start justify-between mb-0.5 xs:mb-1">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-orange-500 rounded-full"></span>
                          <span className="text-xs xs:text-sm font-semibold text-gray-900">Sept 15</span>
                        </div>
                        <span className="px-1.5 xs:px-2 py-0.5 xs:py-1 bg-orange-200 text-orange-800 text-[10px] xs:text-xs rounded-full font-medium whitespace-nowrap">
                          Orange Tag
                        </span>
                      </div>
                      <p className="text-xs xs:text-sm text-gray-700 ml-4 xs:ml-5 mt-0.5 xs:mt-1">
                        Late submission
                      </p>
                    </div>

                    <div className="bg-red-50 border-l-3 xs:border-l-4 border-red-500 p-2 xs:p-3 sm:p-4 rounded hover:bg-red-100 transition-colors">
                      <div className="flex items-start justify-between mb-0.5 xs:mb-1">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-red-500 rounded-full"></span>
                          <span className="text-xs xs:text-sm font-semibold text-gray-900">Sept 12</span>
                        </div>
                        <span className="px-1.5 xs:px-2 py-0.5 xs:py-1 bg-red-200 text-red-800 text-[10px] xs:text-xs rounded-full font-medium whitespace-nowrap">
                          Red Tag
                        </span>
                      </div>
                      <p className="text-xs xs:text-sm text-gray-700 ml-4 xs:ml-5 mt-0.5 xs:mt-1">
                        Absent without excuse
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Positive Commendations */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow transition-transform hover:scale-[1.01] hover:shadow-md">
                <div className="p-3 xs:p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3 sm:mb-4">
                    <Plus className="w-4 h-4 xs:w-5 xs:h-5 text-green-600" />
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">
                      Positive Commendations
                    </h3>
                  </div>

                  <div className="space-y-2 xs:space-y-3 mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                    <div className="bg-green-50 border-l-3 xs:border-l-4 border-green-500 p-2 xs:p-3 sm:p-4 rounded hover:bg-green-100 transition-colors">
                      <div className="flex items-start justify-between mb-0.5 xs:mb-1">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full"></span>
                          <span className="text-xs xs:text-sm font-semibold text-gray-900">Sept 18</span>
                        </div>
                        <span className="px-1.5 xs:px-2 py-0.5 xs:py-1 bg-green-200 text-green-800 text-[10px] xs:text-xs rounded-full font-medium whitespace-nowrap">
                          Green Tag
                        </span>
                      </div>
                      <p className="text-xs xs:text-sm text-gray-700 ml-4 xs:ml-5 mt-0.5 xs:mt-1">
                        Excellent participation
                      </p>
                    </div>

                    <div className="bg-green-50 border-l-3 xs:border-l-4 border-green-500 p-2 xs:p-3 sm:p-4 rounded hover:bg-green-100 transition-colors">
                      <div className="flex items-start justify-between mb-0.5 xs:mb-1">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full"></span>
                          <span className="text-xs xs:text-sm font-semibold text-gray-900">Sept 14</span>
                        </div>
                        <span className="px-1.5 xs:px-2 py-0.5 xs:py-1 bg-green-200 text-green-800 text-[10px] xs:text-xs rounded-full font-medium whitespace-nowrap">
                          Green Tag
                        </span>
                      </div>
                      <p className="text-xs xs:text-sm text-gray-700 ml-4 xs:ml-5 mt-0.5 xs:mt-1">
                        Helped classmates
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 xs:p-4 sm:p-5 lg:p-6 text-center hover:bg-green-100 transition-colors">
                    <p className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-1 xs:mb-2">
                      2
                    </p>
                    <p className="text-xs xs:text-sm text-gray-700 font-medium">This Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 xs:p-4 sm:p-5 lg:p-6">
            <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Quick Actions
            </h2>
           <div className="flex justify-center xs:justify-end">
  <button className="bg-blue-400 hover:bg-blue-500 text-white px-3 xs:px-4 sm:px-4 md:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 md:py-3 rounded-lg transition font-medium flex items-center justify-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-sm md:text-base w-full xs:w-auto min-h-[40px] xs:min-h-[44px] max-w-md">
    <Calendar className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
    <span className="truncate">View Full Attendance History</span>
  </button>
</div>
          </div>
        </main>
      </div>
    </div>
  );
}