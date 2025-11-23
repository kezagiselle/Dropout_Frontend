import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Calendar, Bell, Menu, X, BarChart3, FileText } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { FaCalendarCheck } from 'react-icons/fa';
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const subjects = [
  { name: 'Mathematics', total: 24, present: 20, absent: 4, percent: 83, trend: 'down' as const, color: 'text-orange-500', bar: 'bg-orange-400' },
  { name: 'English', total: 22, present: 21, absent: 1, percent: 95, trend: 'up' as const, color: 'text-emerald-500', bar: 'bg-emerald-400' }
];

const StudentAttendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('My Attendance');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const menuItems: MenuItem[] = [
    { icon: SiGoogleclassroom, label: 'My Classes', path: '/student-class' },
    { icon: FileText, label: 'My Assignments', path: '/my-assignments' },
    { icon: FaCalendarCheck, label: 'My Attendance', path: '/student-attendance' },
    { icon: TbReport, label: 'My Behavior', path: '/student-behavior' }
  ];

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
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">Westfield High School</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/student-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/student-class', 'My Classes')}
                className="hover:text-orange-600 transition-colors"
              >
                Classes
              </button>
              <button 
                onClick={() => handleNavigation('/my-assignments', 'My Assignments')}
                className="hover:text-orange-600 transition-colors"
              >
                Assignments
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">Alex Johnson</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
        >
          {/* Mobile Close Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <nav className="p-3 sm:p-4 relative z-50 bg-white h-full">
            <button
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 ${
                activeTab === 'Dashboard'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation('/student-dash', 'Dashboard')}
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Dashboard</span>
            </button>
            {menuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={idx}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 ${
                    activeTab === item.label
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                  }`}
                  onClick={() => handleNavigation(item.path, item.label)}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">My Attendance</h1>
              <p className="text-gray-600 text-sm sm:text-base">Track your attendance across all subjects</p>
            </div>

            {/* Attendance Table */}
            <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Subject-wise Attendance</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-100">
                      <th className="py-2 pr-2 sm:pr-4 text-left font-medium whitespace-nowrap">Subject</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap hidden xs:table-cell">Total Sessions</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap">Present</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap hidden sm:table-cell">Absent</th>
                      <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap">Attendance %</th>
                      <th className="py-2 pl-2 sm:pl-4 text-left font-medium whitespace-nowrap hidden xs:table-cell">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subj) => (
                      <tr key={subj.name} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-gray-800 font-medium flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center text-xs flex-shrink-0">
                            {subj.name === 'Mathematics' && '📊'}
                            {subj.name === 'English' && '📘'}
                          </span>
                          <span className="truncate">{subj.name}</span>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap hidden xs:table-cell">
                          {subj.total}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap">
                          {subj.present}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap hidden sm:table-cell">
                          {subj.absent}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-16 sm:w-20 lg:w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                              <div
                                className={`h-1.5 rounded-full ${subj.bar}`}
                                style={{ width: `${subj.percent}%` }}
                              />
                            </div>
                            <span className={`text-xs sm:text-sm font-semibold ${subj.color} flex-shrink-0`}>
                              {subj.percent}%
                            </span>
                          </div>
                        </td>
                        <td className="py-2 sm:py-3 pl-2 sm:pl-4 whitespace-nowrap hidden xs:table-cell">
                          {subj.trend === 'up' ? (
                            <span className="inline-flex items-center text-emerald-500 text-xs sm:text-sm font-semibold">
                              <ArrowUpRight className="w-3 h-3 mr-1 flex-shrink-0" />
                              Up
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-orange-500 text-xs sm:text-sm font-semibold">
                              <ArrowDownRight className="w-3 h-3 mr-1 flex-shrink-0" />
                              Down
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards for extra small screens */}
              <div className="xs:hidden mt-4 space-y-3">
                {subjects.map((subj) => (
                  <div key={subj.name} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center text-xs">
                          {subj.name === 'Mathematics' && '📊'}
                          {subj.name === 'English' && '📘'}
                        </span>
                        <span className="font-medium text-gray-900 text-sm">{subj.name}</span>
                      </div>
                      {subj.trend === 'up' ? (
                        <span className="inline-flex items-center text-emerald-500 text-xs font-semibold">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          Up
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-orange-500 text-xs font-semibold">
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                          Down
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Sessions:</span>
                        <span className="font-medium ml-1">{subj.total}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Present:</span>
                        <span className="font-medium ml-1">{subj.present}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Absent:</span>
                        <span className="font-medium ml-1">{subj.absent}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Percentage:</span>
                        <span className={`font-medium ml-1 ${subj.color}`}>{subj.percent}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${subj.bar}`}
                          style={{ width: `${subj.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overall Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">89%</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mt-1">+2% from last month</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Present</p>
                    <p className="text-2xl font-bold text-gray-900">41</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Out of 46 sessions</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Absent</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 text-sm">✗</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Need improvement</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAttendance;