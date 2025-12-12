import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Download, User, ChevronDown, Bell, Menu, X, Calendar} from 'lucide-react';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import pe1 from "../../img/pe1.png";
import pe2 from "../../img/pe2.png";
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar';

const performanceData = [
  { month: 'September', Math: 3.7, Science: 3.5, History: 3.2 },
  { month: 'October', Math: 3.9, Science: 3.8, History: 2.9 },
  { month: 'November', Math: 4.0, Science: 3.5, History: 2.2 },
];

export default function Academic() {
  const [activeTab, setActiveTab] = useState('Academic Progress');
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
                Academic Progress Overview
              </h1>
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 leading-tight xs:leading-normal">
                Track student performance and academic achievements
              </p>
            </div>
            <div className="flex items-center gap-1.5 xs:gap-2 bg-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm sm:shadow min-w-fit">
              <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap">2 Children</span>
            </div>
          </div>

          {/* Recent Grades Section */}
          <div className="mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-2 xs:mb-3 sm:mb-4 gap-2 xs:gap-0">
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Recent Grades
              </h2>
              <button className="text-xs xs:text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium px-2 xs:px-3 py-1 xs:py-1.5 rounded-lg hover:bg-blue-50 transition-colors self-end xs:self-auto">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              {/* John Doe Card */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 xs:p-4 sm:p-5 lg:p-6 transition-transform hover:scale-[1.01] hover:shadow-md">
                <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3 sm:mb-4">
                  <img 
                    src={pe1} 
                    alt="John Doe" 
                    className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-200"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm xs:text-base sm:text-lg truncate">
                      John Doe
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600">Grade 10A</p>
                  </div>
                </div>

                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 mb-2 xs:mb-3 sm:mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs xs:text-sm sm:text-base text-gray-700 truncate pr-2">Math</span>
                    <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-yellow-100 text-yellow-800 text-xs xs:text-sm font-semibold rounded whitespace-nowrap">
                      B+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs xs:text-sm sm:text-base text-gray-700 truncate pr-2">Science</span>
                    <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-green-100 text-green-800 text-xs xs:text-sm font-semibold rounded whitespace-nowrap">
                      A
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs xs:text-sm sm:text-base text-gray-700 truncate pr-2">History</span>
                    <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-orange-100 text-orange-800 text-xs xs:text-sm font-semibold rounded whitespace-nowrap">
                      C
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2 xs:p-3 rounded-lg border-l-3 xs:border-l-4 border-gray-400">
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold">Teacher Comment:</span> "Needs improvement in History"
                  </p>
                </div>
              </div>

              {/* Jane Doe Card */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 xs:p-4 sm:p-5 lg:p-6 transition-transform hover:scale-[1.01] hover:shadow-md">
                <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3 sm:mb-4">
                  <img 
                    src={pe2} 
                    alt="Jane Doe" 
                    className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-200"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm xs:text-base sm:text-lg truncate">
                      Jane Doe
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600">Grade 10B</p>
                  </div>
                </div>

                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 mb-2 xs:mb-3 sm:mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs xs:text-sm sm:text-base text-gray-700 truncate pr-2">Math</span>
                    <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-green-100 text-green-800 text-xs xs:text-sm font-semibold rounded whitespace-nowrap">
                      A
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs xs:text-sm sm:text-base text-gray-700 truncate pr-2">Science</span>
                    <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-yellow-100 text-yellow-800 text-xs xs:text-sm font-semibold rounded whitespace-nowrap">
                      B+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs xs:text-sm sm:text-base text-gray-700 truncate pr-2">History</span>
                    <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-blue-100 text-blue-800 text-xs xs:text-sm font-semibold rounded whitespace-nowrap">
                      B
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-2 xs:p-3 rounded-lg border-l-3 xs:border-l-4 border-green-500">
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold">Teacher Comment:</span> "Excellent participation"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Trend Section */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8 mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6 gap-3 xs:gap-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 xs:mb-2">
                  Performance Trend
                </h2>
                <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 mt-1 xs:mt-2">
                  <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs xs:text-sm">Improving</span>
                  </div>
                  <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs xs:text-sm">Declining</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 xs:mb-3 sm:mb-4 gap-2 sm:gap-0">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-800">
                  Subject-wise Progress Chart
                </h3>
                <select className="border border-gray-300 rounded px-2 xs:px-3 py-1 xs:py-1.5 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto max-w-xs">
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>

              <div className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ 
                      top: 5, 
                      right: 5, 
                      left: 0, 
                      bottom: 5 
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[0, 4]}
                      ticks={[0, 1, 2, 3, 4]}
                      tick={{ fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        fontSize: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={20}
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: '12px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Math" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Science" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="History" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ fill: '#ef4444', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 xs:p-4 sm:p-5 lg:p-6">
            <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4">
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg transition font-medium flex items-center justify-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base flex-1 xs:flex-none min-h-[44px]">
                <Download className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span className="truncate">Download Report Card</span>
              </button>
              <button className="bg-green-400 hover:bg-green-500 text-green-900 px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg transition font-medium flex items-center justify-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base flex-1 xs:flex-none min-h-[44px]">
                <User className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span className="truncate">View Full Academic Profile</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}