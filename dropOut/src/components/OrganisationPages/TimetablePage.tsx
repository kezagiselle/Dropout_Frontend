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
  X,
  ChevronLeft
} from 'lucide-react';
import userr from "../../../src/img/userr.png"; 
import { useUserAuth } from '../../context/useUserAuth'; 
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar'; 

type TimeSlot = {
  subject: string;
  room: string;
  color: string;
  startTime?: string;
  endTime?: string;
};

type DaySchedule = {
  day: string;
  date: number;
  slots: {
    [key: string]: TimeSlot | null;
  };
};

const schedule: DaySchedule[] = [
  {
    day: 'Mon',
    date: 18,
    slots: {
      '8:00 AM': { subject: 'Mathematics', room: 'Room 201', color: 'bg-blue-100 border-l-4 border-blue-500' },
      '10:00 AM': null,
      '12:00 PM': null,
      '2:00 PM': { subject: 'Physics', room: 'Room 401', color: 'bg-blue-100 border-l-4 border-blue-500' }
    }
  },
  {
    day: 'Tue',
    date: 19,
    slots: {
      '8:00 AM': null,
      '10:00 AM': { subject: 'Chemistry', room: 'Lab 203', color: 'bg-yellow-100 border-l-4 border-yellow-500' },
      '12:00 PM': null,
      '2:00 PM': null
    }
  },
  {
    day: 'Wed',
    date: 20,
    slots: {
      '8:00 AM': { subject: 'Biology', room: 'Lab 101', color: 'bg-green-100 border-l-4 border-green-500' },
      '10:00 AM': null,
      '12:00 PM': null,
      '2:00 PM': { subject: 'Art', room: 'Studio A', color: 'bg-pink-100 border-l-4 border-pink-500' }
    }
  },
  {
    day: 'Thu',
    date: 21,
    slots: {
      '8:00 AM': null,
      '10:00 AM': { subject: 'English', room: 'Room 102', color: 'bg-red-100 border-l-4 border-red-500' },
      '12:00 PM': null,
      '2:00 PM': null
    }
  },
  {
    day: 'Fri',
    date: 22,
    slots: {
      '8:00 AM': { subject: 'History', room: 'Room 305', color: 'bg-purple-100 border-l-4 border-purple-500' },
      '10:00 AM': null,
      '12:00 PM': null,
      '2:00 PM': null
    }
  },
  {
    day: 'Sat',
    date: 23,
    slots: {
      '8:00 AM': null,
      '10:00 AM': null,
      '12:00 PM': null,
      '2:00 PM': null
    }
  },
  {
    day: 'Sun',
    date: 24,
    slots: {
      '8:00 AM': null,
      '10:00 AM': null,
      '12:00 PM': null,
      '2:00 PM': null
    }
  }
];

const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM'];

const TimetablePage = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [activeTab, setActiveTab] = useState('Exams & Grades');
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

            {/* Header Navigation Links - Better responsive behavior */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4 text-sm text-gray-600 flex-wrap">
              <button 
                onClick={() => handleNavigation('/org-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/org-schools', 'Schools')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Schools
              </button>
              <button 
                onClick={() => handleNavigation('/student-page', 'Students')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Students
              </button>
              <button 
                onClick={() => handleNavigation('/teacher-page', 'Teachers')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Teachers
              </button>
              <button 
                onClick={() => handleNavigation('/course-timetable', 'Courses & Timetable')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Courses
              </button>
              <button 
                onClick={() => handleNavigation('/exams-grades', 'Exams & Grades')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Exams
              </button>
              <button 
                onClick={() => handleNavigation('/reports', 'Reports')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
              >
                Reports
              </button>
              <button 
                onClick={() => handleNavigation('/organ-settings', 'Settings')}
                className="hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
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

            {/* Profile - Better responsive behavior */}
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

        {/* Main Content - Improved responsive padding */}
        <main className="flex-1 min-w-0 p-2 sm:p-3 lg:p-4 lg:ml-0">
          {/* Back Button - Better responsive */}
          <div className="mb-3 sm:mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-white bg-black hover:bg-gray-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
          </div>

          {/* Page Header - Improved responsive */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Exams Timetable</h1>
                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 mt-1">
                  <p className="text-xs sm:text-sm text-gray-500">Week of November 18-24, 2024</p>
                  <span className="hidden xs:inline text-gray-300">•</span>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">Westfield High School</p>
                </div>
              </div>
              
              {/* Action Buttons - Improved responsive */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                  <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                    Today
                  </button>
                  <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                </div>
                
                {/* Additional actions for larger screens */}
                <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                  <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors whitespace-nowrap">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Message</span>
                  </button>
                  <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timetable Grid - Improved responsive */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop/Tablet View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="w-20 px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-semibold text-gray-600 border-b border-r border-gray-200">
                          Time
                        </th>
                        {schedule.map((day) => (
                          <th key={day.day} className="px-2 sm:px-3 py-2 sm:py-3 text-center border-b border-gray-200 min-w-[120px] sm:min-w-[140px]">
                            <div className="text-xs sm:text-sm font-semibold text-gray-900">{day.day}</div>
                            <div className="text-xs text-gray-500">{day.date}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time) => (
                        <tr key={time} className="group">
                          <td className="px-3 py-2 sm:px-4 sm:py-3 text-xs font-medium text-gray-600 border-r border-gray-200 bg-gray-50 align-top">
                            {time}
                          </td>
                          {schedule.map((day) => {
                            const slot = day.slots[time];
                            const isLunchTime = time === '12:00 PM';
                            
                            return (
                              <td 
                                key={`${day.day}-${time}`} 
                                className="p-1 sm:p-2 border-b border-gray-100 align-top relative"
                              >
                                {isLunchTime ? (
                                  <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center">
                                    <span className="text-xs text-gray-400 font-medium">Lunch</span>
                                  </div>
                                ) : slot ? (
                                  <div className={`${slot.color} rounded p-2 sm:p-3 h-12 sm:h-14 lg:h-16 cursor-pointer hover:shadow-sm transition-shadow`}>
                                    <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">
                                      {slot.subject}
                                    </div>
                                    <div className="text-xs text-gray-600 truncate">
                                      {slot.room}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-12 sm:h-14 lg:h-16"></div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tablet View (md to lg) */}
            <div className="hidden md:block lg:hidden">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="w-16 px-2 py-2 text-left text-xs font-semibold text-gray-600 border-b border-r border-gray-200">
                          Time
                        </th>
                        {schedule.slice(0, 5).map((day) => ( // Show only weekdays on tablet
                          <th key={day.day} className="px-2 py-2 text-center border-b border-gray-200 min-w-[100px]">
                            <div className="text-xs font-semibold text-gray-900">{day.day}</div>
                            <div className="text-xs text-gray-500">{day.date}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time) => (
                        <tr key={time}>
                          <td className="px-2 py-2 text-xs font-medium text-gray-600 border-r border-gray-200 bg-gray-50">
                            {time.replace(' AM', '').replace(' PM', '')}
                          </td>
                          {schedule.slice(0, 5).map((day) => {
                            const slot = day.slots[time];
                            const isLunchTime = time === '12:00 PM';
                            
                            return (
                              <td key={`${day.day}-${time}`} className="p-1 border-b border-gray-100">
                                {isLunchTime ? (
                                  <div className="h-12 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">Lunch</span>
                                  </div>
                                ) : slot ? (
                                  <div className={`${slot.color} rounded p-2 h-12 cursor-pointer`}>
                                    <div className="text-xs font-semibold text-gray-900 truncate">
                                      {slot.subject.split(' ')[0]}
                                    </div>
                                    <div className="text-xs text-gray-600 truncate">
                                      {slot.room}
                                    </div>
                                  </div>
                                ) : null}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile View - Enhanced card layout */}
            <div className="md:hidden">
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">This Week's Exams</h3>
                    <p className="text-xs text-gray-500">Tap a day to view details</p>
                  </div>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg border border-blue-100">
                    <MessageSquare className="w-3 h-3" />
                    Help
                  </button>
                </div>
              </div>
              
              <div className="p-3">
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {schedule.map((day) => (
                    <div 
                      key={day.day} 
                      className="text-center p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="text-xs font-medium text-gray-900">{day.day}</div>
                      <div className="text-xs text-gray-500">{day.date}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  {schedule.slice(0, 5).map((day) => ( // Show only weekdays on mobile
                    <div key={day.day} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-900">{day.date}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{day.day}</h4>
                            <p className="text-xs text-gray-500">November {day.date}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          {Object.values(day.slots).filter(slot => slot !== null).length} exams
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {timeSlots.map((time) => {
                          const slot = day.slots[time];
                          const isLunchTime = time === '12:00 PM';
                          
                          if (!slot && !isLunchTime) return null;
                          
                          return (
                            <div key={time} className="bg-white rounded-lg p-2">
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-medium text-gray-500">{time}</span>
                                {isLunchTime ? (
                                  <span className="text-xs text-gray-400">Break</span>
                                ) : slot && (
                                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                                    slot.color.includes('blue') ? 'bg-blue-50 text-blue-700' :
                                    slot.color.includes('green') ? 'bg-green-50 text-green-700' :
                                    slot.color.includes('yellow') ? 'bg-yellow-50 text-yellow-700' :
                                    slot.color.includes('red') ? 'bg-red-50 text-red-700' :
                                    slot.color.includes('purple') ? 'bg-purple-50 text-purple-700' :
                                    'bg-gray-50 text-gray-700'
                                  }`}>
                                    Exam
                                  </span>
                                )}
                              </div>
                              {isLunchTime ? (
                                <p className="text-sm font-medium text-gray-900 mt-1">Lunch Break</p>
                              ) : slot && (
                                <>
                                  <p className="text-sm font-semibold text-gray-900 mt-1">{slot.subject}</p>
                                  <p className="text-xs text-gray-600 mt-0.5">{slot.room}</p>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions for Mobile */}
          <div className="md:hidden mt-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Quick Actions</h4>
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-100">
                  <MessageSquare className="w-3 h-3" />
                  Message
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-200">
                  <Download className="w-3 h-3" />
                  Download
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg border border-blue-100">
                  <Calendar className="w-3 h-3" />
                  Calendar
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TimetablePage;