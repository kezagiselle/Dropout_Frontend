import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Calendar, 
  Download, 
  MessageSquare, 
  ChevronRight, 
  Clock, 
  Bell, 
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar'; 

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

const TimetablePage = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [activeTab, setActiveTab] = useState('Courses & Timetable');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          {/* Left Section - Mobile Menu Button and Organization Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base truncate max-w-[120px] sm:max-w-none">
                {user?.name || 'Education Organization'}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/org-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/org-schools', 'Schools')}
                className="hover:text-orange-600 transition-colors"
              >
                Schools
              </button>
              <button 
                onClick={() => handleNavigation('/student-page', 'Students')}
                className="hover:text-orange-600 transition-colors"
              >
                Students
              </button>
              <button 
                onClick={() => handleNavigation('/teacher-page', 'Teachers')}
                className="hover:text-orange-600 transition-colors"
              >
                Teachers
              </button>
              <button 
                onClick={() => handleNavigation('/course-timetable', 'Courses & Timetable')}
                className="hover:text-orange-600 transition-colors"
              >
                Courses & Timetable
              </button>
              <button 
                onClick={() => handleNavigation('/exams-grades', 'Exams & Grades')}
                className="hover:text-orange-600 transition-colors"
              >
                Exams & Grades
              </button>
              <button 
                onClick={() => handleNavigation('/reports', 'Reports')}
                className="hover:text-orange-600 transition-colors"
              >
                Reports
              </button>
              <button 
                onClick={() => handleNavigation('/organization-settings', 'Settings')}
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
              <img 
                src={userr} 
                alt="User profile" 
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" 
              />
              <span className="text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[100px] lg:max-w-none">
                {user?.name || 'Admin'}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Organization Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content - Pushed closer to sidebar */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-3 lg:ml-0">
          {/* Back Button */}
          <div className="mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-white bg-black hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
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

          {/* Main Timetable - Full width */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-3">
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
                    <th className="w-16 sm:w-20 lg:w-24 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 pb-3 whitespace-nowrap">Time</th>
                    {schedule.map((day) => (
                      <th key={day.day} className="text-left text-xs sm:text-sm font-semibold text-gray-600 pb-3 min-w-[120px]">
                        {window.innerWidth < 640 ? day.day.slice(0, 3) : day.day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 4 }).map((_, rowIdx) => (
                    <tr key={rowIdx}>
                      <td className="align-top pr-4 pb-4 text-xs font-semibold text-gray-400 whitespace-nowrap">
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
                          <td key={`${day.day}-${rowIdx}`} className="p-2 pb-4 align-top">
                            {slot ? (
                              <div className={`p-3 rounded-lg border h-full ${baseClass}`}>
                                <p className="text-xs text-gray-500 whitespace-nowrap">{slot.time}</p>
                                <p className="text-sm font-semibold text-gray-900 truncate">{slot.subject}</p>
                                <p className="text-xs text-gray-500 truncate">{slot.teacher}</p>
                                <p className="text-xs text-gray-400 truncate">{slot.room}</p>
                                {slot.badge && (
                                  <span className={`inline-flex items-center mt-2 px-2 py-1 text-xs font-semibold rounded-full ${slot.badgeColor} whitespace-nowrap`}>
                                    {slot.badge}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="h-full rounded-lg border border-dashed border-gray-200 min-h-[80px]"></div>
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
        </main>
      </div>
    </div>
  );
};

export default TimetablePage;