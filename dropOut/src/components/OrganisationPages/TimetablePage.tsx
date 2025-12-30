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

        {/* Main Content - Adjusted padding for sidebar */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-4 lg:ml-0">
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

          {/* Week Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Week of November 18-24, 2024</h2>
                <p className="text-sm text-blue-600 mt-1">Westfield High School</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Today
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Timetable Grid */}
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="w-24 px-4 py-3 text-left text-xs font-semibold text-gray-600 border-b border-r border-gray-200">
                        Time
                      </th>
                      {schedule.map((day) => (
                        <th key={day.day} className="px-4 py-3 text-center border-b border-gray-200 min-w-[140px]">
                          <div className="text-sm font-semibold text-gray-900">{day.day}</div>
                          <div className="text-xs text-gray-500">{day.date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time, timeIdx) => (
                      <tr key={time} className="group">
                        <td className="px-4 py-3 text-xs font-medium text-gray-600 border-r border-gray-200 bg-gray-50 align-top">
                          {time}
                        </td>
                        {schedule.map((day, dayIdx) => {
                          const slot = day.slots[time];
                          const isLunchTime = time === '12:00 PM';
                          
                          return (
                            <td 
                              key={`${day.day}-${time}`} 
                              className="p-2 border-b border-gray-100 align-top relative"
                            >
                              {isLunchTime ? (
                                <div className="h-16 flex items-center justify-center">
                                  <span className="text-xs text-gray-400 font-medium">Lunch Break</span>
                                </div>
                              ) : slot ? (
                                <div className={`${slot.color} rounded-lg p-3 h-16 cursor-pointer hover:shadow-md transition-shadow`}>
                                  <div className="text-sm font-semibold text-gray-900 mb-1 truncate">
                                    {slot.subject}
                                  </div>
                                  <div className="text-xs text-gray-600 truncate">
                                    {slot.room}
                                  </div>
                                </div>
                              ) : (
                                <div className="h-16"></div>
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

          {/* Mobile View - Card Layout */}
          <div className="lg:hidden space-y-4">
            {schedule.map((day) => (
              <div key={day.day} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{day.day}</h3>
                    <p className="text-xs text-gray-500">{day.date}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {timeSlots.map((time) => {
                    const slot = day.slots[time];
                    const isLunchTime = time === '12:00 PM';
                    
                    return (
                      <div key={time}>
                        {isLunchTime ? (
                          <div className="py-2 text-center">
                            <span className="text-xs text-gray-400 font-medium">Lunch Break</span>
                          </div>
                        ) : slot ? (
                          <div className={`${slot.color} rounded-lg p-3`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs font-medium text-gray-500">{time}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">{slot.subject}</h4>
                            <p className="text-xs text-gray-600">{slot.room}</p>
                          </div>
                        ) : (
                          <div className="py-2">
                            <span className="text-xs text-gray-400">{time} - Free</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TimetablePage;