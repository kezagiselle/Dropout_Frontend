import React, { useState } from 'react';
import { ChevronDown, Calendar, Users, BookOpen, BarChart3, UserCircle, MessageSquare, Bell, Search, Menu, X, TrendingUp, Award, Shield, FileText, Clock } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCalendarCheck } from 'react-icons/fa';
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa6";
import { IoMdTv } from "react-icons/io";
import { TbAlertTriangle } from "react-icons/tb";
import { FaRegChartBar } from "react-icons/fa"; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import userr from "../../../src/img/userr.png";
import { useNavigate, useLocation } from 'react-router-dom'; 
import { TbWaveSawTool } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Attendance from "./Attendance";
import BehaviorReports from "./BehaviorReports"; 
import StudentSettings from "./StudentSettings";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showBehavior, setShowBehavior] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // New state for settings modal
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  // Student-specific menu items - FIXED ROUTES
  const menuItems = [
    { icon: SiGoogleclassroom, label: 'My Classes',  path: '/student-class' },
    { icon: FileText, label: 'My Assignments', path: '/my-assignments' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  // Updated performance data for Recharts
  const performanceData = [
    { name: 'Term 1', grade: 3.2 },
    { name: 'Term 2', grade: 3.5 },
    { name: 'Term 3', grade: 3.6 },
    { name: 'Term 4', grade: 3.7 }
  ];

  // Updated attendance data for Recharts
  const attendanceData = [
    { name: 'Mon', present: 95, absent: 5, late: 0 },
    { name: 'Tue', present: 100, absent: 0, late: 0 },
    { name: 'Wed', present: 80, absent: 15, late: 5 },
    { name: 'Thu', present: 100, absent: 0, late: 0 },
    { name: 'Fri', present: 98, absent: 2, late: 0 },
    { name: 'Sat', present: 0, absent: 0, late: 0 },
    { name: 'Sun', present: 0, absent: 0, late: 0 }  
  ];

  const assignments = [
    { title: 'Math Quiz', due: 'Due: Oct 20', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
    { title: 'History Essay', due: 'Due: Oct 28', status: 'Submitted', color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Science Project', due: 'Due: Nov 2', status: 'Graded', color: 'bg-gray-100 text-gray-600' }
  ];

  const behaviors = [
    { title: 'Excellent participation', time: 'Oct 10 • Ms. Johnson', icon: '🟢' },
    { title: 'Helped classmate', time: 'Oct 9 • Mr. Brown', icon: '🟢' },
    { title: 'Late to class', time: 'Oct 8 • Ms. Davis', icon: '🟡' }
  ];

  const messages = [
    { title: 'Parent-Teacher Meeting', time: '2 days ago', unread: true },
    { title: 'New assignment posted', time: '1 day ago', unread: false }
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

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-xs sm:text-sm text-gray-600 mr-1 sm:mr-2">Filters</span>
          <button className="px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            All Subjects <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3" />
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            Current Term <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3" />
          </button>
          <button className="px-3 py-1 sm:px-4 sm:py-1 bg-orange-500 text-white rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            Date Filter
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
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
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 ${
                  activeTab === item.label 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">Westfield High School</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {/* Attendance Rate */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg">
                  <FaCalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                </div>
                <span className="text-emerald-600 text-xs sm:text-sm font-semibold">↑ +2.5%</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">92%</div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Attendance Rate</div>
              <div className="text-gray-500 text-xs mt-1">vs last term</div>
            </div>

            {/* Average GPA */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg">
                  <TbWaveSawTool className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <span className="bg-blue-50 text-blue-600 text-xs font-medium px-1 py-0.5 rounded">↑ +0.3</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">3.7</div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Average GPA</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                <div className="bg-blue-500 h-1.5 sm:h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            {/* Commendations */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="bg-amber-100 p-1.5 sm:p-2 rounded-lg">
                  <FaStar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                </div>
                <span className="text-orange-600 text-xs sm:text-sm font-semibold">↓ -1</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                8 <span className="text-gray-400 text-lg sm:text-xl">/ 2</span>
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Commendations / Incidents</div>
            </div>

            {/* Risk Level */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">LOW</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-1">Low Risk</div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Dropout Risk Level</div>
              <div className="text-gray-500 text-xs mt-1">Keep up the good work!</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Performance Trend - Updated with Recharts LineChart */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Performance Trend</h2>
                <span className="text-emerald-600 text-xs sm:text-sm flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Your grades are improving</span>
                  <span className="sm:hidden">Improving</span>
                </span>
              </div>
              <div className="h-48 sm:h-56 lg:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis 
                      domain={[0, 4]}
                      ticks={[0, 1, 2, 3, 4]}
                      fontSize={12}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="grade" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Overview - Updated with Recharts */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Weekly Attendance</h2>
              <div className="h-48 sm:h-56 lg:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={attendanceData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="present" stackId="a" fill="#10b981" name="Present %" />
                    <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent %" />
                    <Bar dataKey="late" fill="#f59e0b" name="Late %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 sm:mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-2 sm:p-3">
                <p className="text-emerald-700 text-xs sm:text-sm font-semibold">✓ Great attendance this week: 95% average</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Upcoming Assignments</h2>
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-semibold">
                  3
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {assignments.map((assignment, i) => (
                  <div key={i} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-blue-50 shadow-sm border border-blue-100 cursor-pointer group">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-blue-700 font-bold text-sm sm:text-base truncate">{assignment.title}</div>
                        <div className="text-blue-600 text-xs sm:text-sm">{assignment.due}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${assignment.color} scale-105 flex-shrink-0 ml-2`}>
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Behavior */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent Behavior</h2>
                <button 
                  className="text-blue-600 text-xs sm:text-sm font-medium hover:underline"
                  onClick={() => setShowBehavior(true)}
                >
                  View All
                </button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {behaviors.map((behavior, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-50 shadow-sm border border-gray-100 cursor-pointer group">
                    <span className="text-sm sm:text-base">{behavior.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-700 font-bold text-sm sm:text-base">{behavior.title}</div>
                      <div className="text-gray-600 text-xs sm:text-sm">{behavior.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Messages</h2>
              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                {messages.map((message, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-blue-50 shadow-sm border border-blue-100 cursor-pointer group">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 ${message.unread ? 'bg-red-500' : 'bg-gray-300'} scale-125`}></div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-blue-700 font-bold text-sm sm:text-base">{message.title}</div>
                      <div className="text-blue-600 text-xs sm:text-sm">{message.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-1 sm:gap-2">
                  <span className="text-blue-600">💡</span>
                  <div>
                    <div className="font-medium text-blue-900 text-xs sm:text-sm font-bold">AI Suggestion</div>
                    <div className="text-blue-700 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      You missed 2 English classes this week. Review lesson notes to stay on track.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <button 
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-3 sm:py-3 sm:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={() => handleNavigation('/my-assignments', 'My Assignments')}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="font-semibold">View Assignments</span>
              </button>
              <button
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-medium py-2 px-3 sm:py-3 sm:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={() => setShowAttendance(true)}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="font-semibold">View Attendance</span>
              </button>
              <button 
                className="bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-3 sm:py-3 sm:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={() => setShowBehavior(true)}
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="font-semibold">Check Behavior</span>
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 sm:py-3 sm:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={() => setShowSettings(true)}
              >
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="font-semibold">Update Profile</span>
              </button>
            </div>
          </div>

          {/* Attendance Modal */}
          {showAttendance && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-3 sm:px-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowAttendance(false)}
                >
                  <X className="w-5 h-5" />
                </button>
                <Attendance />
              </div>
            </div>
          )}

          {/* Behavior Reports Modal */}
          {showBehavior && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-3 sm:px-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
                  onClick={() => setShowBehavior(false)}
                >
                  <X className="w-5 h-5" />
                </button>
                <BehaviorReports />
              </div>
            </div>
          )}

          {/* Student Settings Modal */}
          {showSettings && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-3 sm:px-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="w-5 h-5" />
                </button>
                <StudentSettings />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}