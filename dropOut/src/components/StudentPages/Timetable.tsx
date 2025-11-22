import React, { useState } from 'react';
import { ChevronDown, Calendar, Download, MessageSquare, ChevronRight, Clock, BarChart3, Bell, Menu, X, FileText } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';

type ClassInfo = {
  status?: 'now' | 'soon' | 'later';
  title: string;
  teacher: string;
  time: string;
  room: string;
};

type DaySchedule = {
  day: string;
  slots: {
    time: string;
    subject: string;
    teacher: string;
    room: string;
    badge?: string;
    badgeColor?: string;
  }[];
};

const nextClasses: ClassInfo[] = [
  {
    status: 'now',
    title: 'Advanced Mathematics',
    teacher: 'Prof. Johnson',
    time: '10:00 AM - 11:30 AM',
    room: 'Room 204'
  },
  {
    status: 'soon',
    title: 'Physics Lab',
    teacher: 'Dr. Smith',
    time: '12:00 PM - 2:00 PM',
    room: 'Lab 3B'
  },
  {
    status: 'later',
    title: 'Chemistry',
    teacher: 'Prof. Davis',
    time: '2:30 PM - 4:00 PM',
    room: 'Room 156'
  }
];

const alerts = [
  {
    title: 'Class Cancelled',
    detail: 'English Literature - Tomorrow',
    color: 'bg-red-50 text-red-700'
  },
  {
    title: 'Time Changed',
    detail: 'History moved to 11:00 AM',
    color: 'bg-orange-50 text-orange-700'
  }
];

const schedule: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { time: '10:30 AM', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 204' },
      { time: '12:30 PM', subject: 'History', teacher: 'Prof. Brown', room: 'Room 155' },
      { time: '2:00 PM', subject: 'Computer Science', teacher: 'Dr. Lee', room: 'Lab 1A' },
      { time: '4:00 PM', subject: 'Study Group', teacher: 'Library', room: 'Room A12' }
    ]
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '10:30 AM', subject: 'Physics', teacher: 'Dr. Smith', room: 'Room 301', badge: 'Current', badgeColor: 'bg-emerald-100 text-emerald-700' },
      { time: '12:30 PM', subject: 'Literature', teacher: 'Ms. Taylor', room: 'Room 220' },
      { time: '2:30 PM', subject: 'Art History', teacher: 'Prof. Martinez', room: 'Room 404' },
      { time: '4:30 PM', subject: 'Study Group', teacher: 'Library', room: 'Room A12' }
    ]
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '10:30 AM', subject: 'Chemistry', teacher: 'Prof. Davis', room: 'Lab 2C' },
      { time: '12:30 PM', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 204' },
      { time: '2:30 PM', subject: 'Biology Lab', teacher: 'Dr. Wilson', room: 'Lab 2B' },
      { time: '4:30 PM', subject: 'Chemistry', teacher: 'Prof. Davis', room: 'Room 156' }
    ]
  },
  {
    day: 'Thursday',
    slots: [
      { time: '10:30 AM', subject: 'English', teacher: 'Ms. Clark', room: 'Room 108', badge: 'Cancelled', badgeColor: 'bg-red-100 text-red-700' },
      { time: '12:30 PM', subject: 'Physics Lab', teacher: 'Dr. Smith', room: 'Lab 3B', badge: 'Missed', badgeColor: 'bg-orange-100 text-orange-700' },
      { time: '2:30 PM', subject: 'Chemistry', teacher: 'Prof. Davis', room: 'Room 156' },
      { time: '4:30 PM', subject: 'Seminar', teacher: 'Guest Speaker', room: 'Auditorium' }
    ]
  },
  {
    day: 'Friday',
    slots: [
      { time: '10:30 AM', subject: 'Biology', teacher: 'Dr. Wilson', room: 'Room 10B' },
      { time: '12:30 PM', subject: 'Statistics', teacher: 'Prof. Chen', room: 'Room 212' }
    ]
  }
];

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const Timetable = () => {
  const [activeTab, setActiveTab] = useState<string>('Timetable');
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
    { icon: TbReport, label: 'Behavior Reports', path: '/behavior-reports' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
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
            <button
              className={`w-full mt-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 ${
                activeTab === 'Timetable'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation('/timetable', 'Timetable')}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Timetable</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Page Header Inside Main */}
          <div className="bg-white border-b border-gray-200 px-3 py-4 sm:px-4 lg:px-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Timetable</h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1">View your daily and weekly class schedule</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <div className="relative min-w-[120px] sm:min-w-[140px]">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 font-medium text-gray-700 shadow-sm w-full text-xs sm:text-sm">
                    <option>Fall 2024</option>
                  </select>
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative min-w-[100px] sm:min-w-[120px]">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 font-medium text-gray-700 shadow-sm w-full text-xs sm:text-sm">
                    <option>All Subjects</option>
                  </select>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 rotate-90" />
                </div>
                <button className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-blue-200 text-blue-600 bg-blue-50 font-semibold shadow-sm text-xs sm:text-sm whitespace-nowrap">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Week View</span>
                  <span className="xs:hidden">Week</span>
                </button>
                <button className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 text-gray-700 bg-white shadow-sm text-xs sm:text-sm whitespace-nowrap">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">DL</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid: Next Classes + Timetable */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Next Classes</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">Today</span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {nextClasses.map((cls, idx) => (
                    <div
                      key={idx}
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border ${
                        cls.status === 'now'
                          ? 'bg-emerald-50 border-emerald-100'
                          : cls.status === 'soon'
                          ? 'bg-blue-50 border-blue-100'
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 whitespace-nowrap">
                          {cls.status === 'now' ? 'Now' : cls.status === 'soon' ? 'In 45 min' : 'In 3 hrs'}
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{cls.room}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mt-1 truncate">{cls.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{cls.teacher}</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{cls.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 sm:mb-3">Alerts</p>
                <div className="space-y-2 sm:space-y-3">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border border-gray-100 ${alert.color.replace('text-', 'border-')}`}>
                      <p className="text-xs sm:text-sm font-semibold truncate">{alert.title}</p>
                      <p className="text-xs text-gray-500 truncate">{alert.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Timetable */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">November 18-22, 2024</p>
                  <p className="text-xs text-gray-500">Week 12 • Term 2</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-lg flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Message Teacher</span>
                    <span className="sm:hidden">Message</span>
                  </button>
                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg whitespace-nowrap">
                    Today
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="w-16 sm:w-20 lg:w-24 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pb-2 sm:pb-3 whitespace-nowrap">Time</th>
                      {schedule.map((day) => (
                        <th key={day.day} className="text-left text-xs sm:text-sm font-semibold text-gray-600 pb-2 sm:pb-3 min-w-[120px]">
                          {window.innerWidth < 640 ? day.day.slice(0, 3) : day.day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 4 }).map((_, rowIdx) => (
                      <tr key={rowIdx}>
                        <td className="align-top pr-2 sm:pr-4 pb-2 sm:pb-4 text-xs font-semibold text-gray-400 whitespace-nowrap">
                          {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'][rowIdx]}
                        </td>
                        {schedule.map((day) => {
                          const slot = day.slots[rowIdx];

                          // Determine background color for special Physics slots
                          const baseClass =
                            day.day === 'Tuesday' && slot?.subject === 'Physics'
                              ? 'bg-emerald-50 border-emerald-100'
                              : day.day === 'Thursday' && slot?.subject === 'Physics Lab'
                              ? 'bg-orange-50 border-orange-100'
                              : 'bg-blue-50 border-blue-100';

                          return (
                            <td key={`${day.day}-${rowIdx}`} className="p-1 sm:p-2 pb-2 sm:pb-4 align-top">
                              {slot ? (
                                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border h-full ${baseClass}`}>
                                  <p className="text-xs text-gray-500 whitespace-nowrap">{slot.time}</p>
                                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{slot.subject}</p>
                                  <p className="text-xs text-gray-500 truncate">{slot.teacher}</p>
                                  <p className="text-xs text-gray-400 truncate">{slot.room}</p>
                                  {slot.badge && (
                                    <span className={`inline-flex items-center mt-1 sm:mt-2 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold rounded-full ${slot.badgeColor} whitespace-nowrap`}>
                                      {slot.badge}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div className="h-full rounded-lg sm:rounded-xl border border-dashed border-gray-200 min-h-[80px]"></div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Schedule Cards for very small screens */}
              <div className="lg:hidden mt-4 space-y-3">
                {schedule.map((day) => (
                  <div key={day.day} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">{day.day}</h3>
                    <div className="space-y-2">
                      {day.slots.map((slot, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-2 border border-gray-200">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-medium text-gray-500">{slot.time}</span>
                            {slot.badge && (
                              <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full ${slot.badgeColor}`}>
                                {slot.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900 text-sm">{slot.subject}</h4>
                          <p className="text-xs text-gray-500">{slot.teacher}</p>
                          <p className="text-xs text-gray-400">{slot.room}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Timetable;