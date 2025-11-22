import React, { useState } from 'react';
import { ChevronDown, Calendar, BarChart3, Bell, Search, Menu, X, FileText, Clock, MapPin, MessageSquare } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate, useLocation } from 'react-router-dom'; 

// Type definitions
type ClassStatus = 'missing' | 'active' | 'pending' | 'completed';

interface ClassItem {
  id: number;
  name: string;
  teacher: string;
  schedule: string;
  room: string;
  grade: number | null;
  status: ClassStatus;
  color: string;
  icon: string;
  isFinal?: boolean;
}

interface StatusBadge {
  text: string;
  bg: string;
  text_color: string;
}

interface UpcomingClass {
  name: string;
  time: string;
  startsIn: string;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const StudentClasses = () => {
  const [activeTab, setActiveTab] = useState<string>('My Classes');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [termFilter, setTermFilter] = useState<string>('Term 2 - 2025');
  const [classFilter, setClassFilter] = useState<string>('All Classes');
  const [performanceFilter, setPerformanceFilter] = useState<string>('All Performance');
  const [sortBy, setSortBy] = useState<string>('Sort by Subject');
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  // Student-specific menu items - Behavior Reports removed
  const menuItems: MenuItem[] = [
    { icon: SiGoogleclassroom, label: 'My Classes', path: '/my-classes' },
    { icon: FileText, label: 'My Assignments', path: '/my-assignments' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  const classes: ClassItem[] = [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Mr. Johnson',
      schedule: 'Mon & Wed - 10:00-11:30 AM',
      room: 'Room A-201',
      grade: 85,
      status: 'missing',
      color: 'bg-blue-500',
      icon: '📐'
    },
    {
      id: 2,
      name: 'Chemistry',
      teacher: 'Dr. Smith',
      schedule: 'Tue & Thu - 2:00-3:30 PM',
      room: 'Lab B-105',
      grade: 92,
      status: 'active',
      color: 'bg-emerald-500',
      icon: '⚗️'
    },
    {
      id: 3,
      name: 'English Literature',
      teacher: 'Ms. Davis',
      schedule: 'Mon, Wed, Fri - 9:00-10:00 AM',
      room: 'Room C-301',
      grade: 78,
      status: 'active',
      color: 'bg-purple-500',
      icon: '📚'
    },
    {
      id: 4,
      name: 'Physics',
      teacher: 'Mr. Wilson',
      schedule: 'Tue & Thu - 11:00-12:30 PM',
      room: 'Lab A-102',
      grade: null,
      status: 'pending',
      color: 'bg-red-500',
      icon: '⚛️'
    },
    {
      id: 5,
      name: 'Geography',
      teacher: 'Mrs. Brown',
      schedule: 'Wed & Fri - 1:00-2:30 PM',
      room: 'Room D-205',
      grade: 88,
      status: 'active',
      color: 'bg-teal-500',
      icon: '🌍'
    },
    {
      id: 6,
      name: 'History',
      teacher: 'Mr. Taylor',
      schedule: 'Mon & Wed - 3:00-4:30 PM',
      room: 'Room E-101',
      grade: 94,
      status: 'completed',
      color: 'bg-indigo-500',
      icon: '📜',
      isFinal: true
    }
  ];

  const upcomingClasses: UpcomingClass[] = [
    { name: 'Mathematics', time: 'Today, 10:00 AM', startsIn: '2h 30m' },
    { name: 'Chemistry', time: 'Today, 2:00 PM', startsIn: '6h 30m' },
    { name: 'English Literature', time: 'Tomorrow, 9:00 AM', startsIn: '1d 1h' },
    { name: 'Physics', time: 'Tomorrow, 11:00 AM', startsIn: '1d 3h' },
    { name: 'Geography', time: 'Tomorrow, 1:00 PM', startsIn: '1d 5h' }
  ];

  const getStatusBadge = (status: ClassStatus): StatusBadge => {
    const badges: Record<ClassStatus, StatusBadge> = {
      missing: { text: 'Missing Assignment', bg: 'bg-orange-100', text_color: 'text-orange-700' },
      active: { text: 'Active', bg: 'bg-green-100', text_color: 'text-green-700' },
      pending: { text: 'Pending', bg: 'bg-yellow-100', text_color: 'text-yellow-700' },
      completed: { text: 'Completed', bg: 'bg-red-100', text_color: 'text-red-700' }
    };
    return badges[status];
  };

  const getGradeColor = (grade: number): string => {
    if (grade >= 90) return 'bg-indigo-500';
    if (grade >= 85) return 'bg-green-500';
    if (grade >= 80) return 'bg-teal-500';
    if (grade >= 75) return 'bg-purple-500';
    return 'bg-blue-500';
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
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Classes</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">View your enrolled subjects, teachers, and schedules.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select 
                    value={termFilter}
                    onChange={(e) => setTermFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Term 2 - 2025</option>
                    <option>Term 1 - 2025</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Class or Subject"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <select 
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Classes</option>
                    <option>Active Only</option>
                    <option>Completed</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select 
                    value={performanceFilter}
                    onChange={(e) => setPerformanceFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Performance</option>
                    <option>High Performance</option>
                    <option>Low Performance</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Sort by Subject</option>
                    <option>Sort by Grade</option>
                    <option>Sort by Teacher</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <p className="text-sm text-gray-500 hidden sm:block">Showing 6 of 8 classes</p>
            </div>
          </div>

          {/* Classes Grid - 3x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {classes.map((cls) => {
              const badge = getStatusBadge(cls.status);
              return (
                <div key={cls.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg sm:text-xl ${cls.color.replace('bg-', 'text-')}`}>
                        {cls.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{cls.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">{cls.teacher}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text_color}`}>
                      {cls.status === 'active' && '● '}
                      {cls.status === 'pending' && '● '}
                      {cls.status === 'completed' && '● '}
                      {badge.text}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{cls.room}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-600">{cls.isFinal ? 'Final Grade' : 'Current Grade'}</span>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{cls.grade ? `${cls.grade}%` : '--'}</span>
                    </div>
                    {cls.grade && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getGradeColor(cls.grade)}`}
                          style={{ width: `${cls.grade}%` }}
                        />
                      </div>
                    )}
                    {!cls.grade && (
                      <div className="w-full bg-gray-200 rounded-full h-2" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Upcoming Classes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {upcomingClasses.map((cls, idx) => (
                <div key={idx} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1">{cls.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{cls.time}</p>
                  <p className={`text-xs sm:text-sm font-medium ${idx === 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    Starts in {cls.startsIn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={() => navigate('/timetable')}
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              View Timetable
            </button>
            <button className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              Message Teacher
            </button>
            <button className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              View Assignments
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentClasses;