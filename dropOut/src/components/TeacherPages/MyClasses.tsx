import React, { useState } from 'react';
import { ChevronDown, Calendar, Users, BookOpen, BarChart3, Bell, Search, Grid, List, ChevronLeft, ChevronRight, TrendingUp, AlertTriangle, Menu, X } from 'lucide-react';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaClipboardCheck } from "react-icons/fa6";
import { TbReport, TbWorld } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { BsThermometerSun } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa6";
import { FaRegChartBar } from "react-icons/fa"; 
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import { AiFillMessage } from "react-icons/ai";


interface ClassItem {
  id: number;
  grade: string;
  period: string;
  room: string;
  status: 'Normal' | 'Low Attendance' | 'High Risk';
  students: number;
  attendance: number;
  icon: React.ReactNode;
  upcoming: Array<{ title: string; due: string; color: string }>;
  alert?: string;
}

function MyClasses() {
  const [periodFilter, setPeriodFilter] = useState('All Periods');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('My Classes');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/teacher-dashboard' },
    { icon: LiaChalkboardTeacherSolid, label: 'My Classes', path: '/my-classes' },
    { icon: FaClipboardCheck, label: 'Attendance', path: '/attendance' },
    { icon: FaRegChartBar, label: 'Marks', path: '/marks' }, 
    { icon: TbReport, label: 'Behavior Reports', path: '/behavior-reports' },
    { icon: IoIosPeople, label: 'Student Profiles', path: '/student-profiles' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  const classes: ClassItem[] = [
    {
      id: 1,
      grade: 'Grade 10 – Mathematics',
      period: '2nd Period',
      room: 'Room 204',
      status: 'Normal',
      students: 32,
      attendance: 92,
      icon: <div className="p-2 bg-blue-100 rounded-lg"><FaCalculator className="w-5 h-5 text-blue-700" /></div>,
      upcoming: [
        { title: 'Quiz: Algebra Basics', due: 'Tomorrow', color: 'text-orange-500' },
        { title: 'Assignment: Chapter 5', due: 'Due Friday', color: 'text-blue-500' }
      ]
    },
    {
      id: 2,
      grade: 'Grade 9 – Biology',
      period: '3rd Period',
      room: 'Lab 101',
      status: 'Low Attendance',
      students: 28,
      attendance: 73,
      icon: <div className="p-2 bg-green-100 rounded-lg"><BsThermometerSun className="w-6 h-6 text-green-700" /></div>,
      upcoming: [
        { title: 'Lab: Cell Structure', due: 'Today', color: 'text-orange-500' },
        { title: 'Test: Genetics', due: 'Next Week', color: 'text-blue-500' }
      ]
    },
    {
      id: 3,
      grade: 'Grade 11 – English Literature',
      period: '1st Period',
      room: 'Room 108',
      status: 'Normal',
      students: 25,
      attendance: 88,
      icon: <div className="p-2 bg-purple-100 rounded-lg"><FaBook className="w-5 h-5 text-purple-700" /></div>,
      upcoming: [
        { title: 'Essay: Shakespeare Analysis', due: 'Due Monday', color: 'text-orange-500' },
        { title: 'Discussion: Hamlet Act 3', due: 'Wednesday', color: 'text-blue-500' }
      ]
    },
    {
      id: 4,
      grade: 'Grade 12 – World History',
      period: '4th Period',
      room: 'Room 302',
      status: 'High Risk',
      students: 30,
      attendance: 68,
      icon: <div className="p-2 bg-red-100 rounded-lg"><TbWorld className="w-6 h-6 text-red-700" /></div>,
      upcoming: [
        { title: 'Midterm Exam', due: 'Tomorrow', color: 'text-orange-500' },
        { title: 'Project: WWI Research', due: 'Due Friday', color: 'text-blue-500' }
      ]
    }
  ];

  // Separate classes for left and right columns
  const leftColumnClasses = classes.filter(classItem => 
    classItem.grade.includes('Grade 10') || classItem.grade.includes('Grade 11')
  );
  
  const rightColumnClasses = classes.filter(classItem => 
    classItem.grade.includes('Grade 9') || classItem.grade.includes('Grade 12')
  );

  const getStatusColor = (status: 'Normal' | 'Low Attendance' | 'High Risk'): string => {
    switch(status) {
      case 'Normal': return 'bg-green-100 text-green-700';
      case 'Low Attendance': return 'bg-orange-100 text-orange-700';
      case 'High Risk': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAttendanceColor = (attendance: number): string => {
    if (attendance >= 90) return 'bg-green-500';
    if (attendance >= 75) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          {/* Left Section - Mobile Menu Button and School Name */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Westfield High School</span>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, visible on tablet and up */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, teachers, courses..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-4 h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-2">
              <img src={userr} alt="User profile" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" />
              <span className="text-sm font-medium hidden sm:block">Sarah Wilson</span>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, teachers, courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 mr-2">Filters</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2 whitespace-nowrap">
            All Grades <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2 whitespace-nowrap">
            All Classes <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2 whitespace-nowrap">
            Current Term <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-4 py-1 bg-orange-500 text-white rounded text-sm flex items-center gap-2 whitespace-nowrap">
            <Calendar className="w-4 h-4" />
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
          
          <nav className="p-4 relative z-50 bg-white h-full">
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 mb-2 ${
                  activeTab === item.label 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitoring my classes</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 sm:p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Total Courses</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">8</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Active courses</p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Total Students</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">247</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <IoIosPeople className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Enrolled students</p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Avg Attendance</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">89%</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Overall attendance rate</p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Risk Classes</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-red-600">2</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Needs attention</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column - Grade 10 & 11 Classes */}
            <div className="space-y-4 sm:space-y-6">
              {leftColumnClasses.map((classItem) => (
                <div key={classItem.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">{classItem.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">{classItem.grade}</h3>
                        <p className="text-sm text-gray-600">{classItem.period} • {classItem.room}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)} self-start sm:self-auto`}>
                      {classItem.status}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Students</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">{classItem.students}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Attendance</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg sm:text-2xl font-bold text-gray-900 w-12 sm:w-16">{classItem.attendance}%</p>
                        <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2 flex-1">
                          <div
                            className={`h-2 rounded-full ${getAttendanceColor(classItem.attendance)}`}
                            style={{ width: `${classItem.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming */}
                  <div className="mb-4 sm:mb-3">
                    <p className="text-xs text-gray-600 mb-2">Upcoming</p>
                    <div className="space-y-2">
                      {classItem.upcoming.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <p className="text-sm text-gray-700 truncate flex-1 mr-2">{item.title}</p>
                          <p className={`text-sm font-medium ${item.color} whitespace-nowrap`}>{item.due}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex-1 bg-blue-300 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-400 flex items-center justify-center gap-1">
                      <IoIosPeople className="w-4 h-4" />
                      <span className="hidden sm:inline">View Students</span>
                      <span className="sm:hidden">Students</span>
                    </button>
                    <button className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-orange-600">
                      + Add Marks
                    </button>
                    <button className="flex-1 bg-green-300 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-400 flex items-center justify-center gap-1">
                      <AiFillMessage className="w-4 h-4" />
                      <span className="hidden sm:inline">Message Parent</span>
                      <span className="sm:hidden">Parents</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Grade 9 & 12 Classes */}
            <div className="space-y-4 sm:space-y-6">
              {rightColumnClasses.map((classItem) => (
                <div key={classItem.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">{classItem.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">{classItem.grade}</h3>
                        <p className="text-sm text-gray-600">{classItem.period} • {classItem.room}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)} self-start sm:self-auto`}>
                      {classItem.status}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Students</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">{classItem.students}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Attendance</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg sm:text-2xl font-bold text-gray-900 w-12 sm:w-16">{classItem.attendance}%</p>
                        <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2 flex-1">
                          <div
                            className={`h-2 rounded-full ${getAttendanceColor(classItem.attendance)}`}
                            style={{ width: `${classItem.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming */}
                  <div className="mb-4 sm:mb-3">
                    <p className="text-xs text-gray-600 mb-2">Upcoming</p>
                    <div className="space-y-2">
                      {classItem.upcoming.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <p className="text-sm text-gray-700 truncate flex-1 mr-2">{item.title}</p>
                          <p className={`text-sm font-medium ${item.color} whitespace-nowrap`}>{item.due}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex-1 bg-blue-300 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-400 flex items-center justify-center gap-1">
                      <IoIosPeople className="w-4 h-4" />
                      <span className="hidden sm:inline">View Students</span>
                      <span className="sm:hidden">Students</span>
                    </button>
                    <button className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-orange-600">
                      + Add Marks
                    </button>
                    <button className="flex-1 bg-green-300 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-400 flex items-center justify-center gap-1">
                      <AiFillMessage className="w-4 h-4" />
                      <span className="hidden sm:inline">Message Parent</span>
                      <span className="sm:hidden">Parents</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyClasses;