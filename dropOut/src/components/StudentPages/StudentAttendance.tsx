import React, { useState, useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Calendar, Bell, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaCalendarCheck } from 'react-icons/fa';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import userr from "../../../src/img/userr.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import StudentSidebar from './StudentSidebar';

// API Response Interface
interface AttendanceApiResponse {
  success: boolean;
  message: string;
  data: {
    overallAttendancePercentage: number;
    weeklyAttendancePercentages: Record<string, number>;
    courseAttendancePercentages: Record<string, number>;
    mostMissedClassName: string;
    mostMissedClassTotal: number;
  };
}

// Dashboard API attendance overview interface
interface AttendanceOverview {
  day: string; // "2025-10-24"
  attendance: number; // 0 or 100
}

// Calendar day interface
interface CalendarDay {
  date: number;
  fullDate: string;
  isCurrentMonth: boolean;
  attendance?: number;
}

const StudentAttendance: React.FC = () => {
  // Base URL for API calls
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // API State management
  const [attendanceData, setAttendanceData] = useState<AttendanceApiResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State management
  const [activeTab, setActiveTab] = useState<string>('My Attendance');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useUserAuth();
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceOverview, setAttendanceOverview] = useState<AttendanceOverview[]>([]);
  
  // Get attendance data from route state or fetch from dashboard
  useEffect(() => {
    if (location.state?.attendanceOverview) {
      setAttendanceOverview(location.state.attendanceOverview);
    } else {
      // Fetch dashboard data to get attendanceOverview
      const fetchDashboardData = async () => {
        try {
          if (!token || !user?.studentId) return;
          
          const response = await fetch(`${baseUrl}/api/students/dashboard/${user.studentId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data.attendanceOverview) {
              setAttendanceOverview(result.data.attendanceOverview);
            }
          }
        } catch (err) {
          console.error('Error fetching dashboard data:', err);
        }
      };
      
      fetchDashboardData();
    }
  }, [location.state, token, user?.studentId, baseUrl]);

  // Fetch attendance data from API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        if (!user?.studentId) {
          throw new Error('No student ID found in user context');
        }

        const response = await fetch(`${baseUrl}/api/students/${user.studentId}/attendance-overview`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: AttendanceApiResponse = await response.json();
        
        if (result.success) {
          setAttendanceData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch attendance data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching attendance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [token, user?.studentId, baseUrl]);

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  // Calendar helper functions
  const getAttendanceMap = () => {
    return new Map(attendanceOverview.map(item => [item.day, item.attendance]));
  };
  
  const generateCalendarDays = (year: number, month: number): CalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday
    
    const days: CalendarDay[] = [];
    const attendanceMap = getAttendanceMap();
    
    for (let i = 0; i < 42; i++) { // 6 weeks
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];
      
      days.push({
        date: currentDate.getDate(),
        fullDate: dateString,
        isCurrentMonth: currentDate.getMonth() === month,
        attendance: attendanceMap.get(dateString)
      });
    }
    
    return days;
  };
  
  const getDateStyle = (day: CalendarDay): string => {
    let baseClasses = 'text-center p-1';
    
    if (!day.isCurrentMonth) {
      return `${baseClasses} text-gray-400`;
    }
    
    if (day.attendance === undefined) {
      return `${baseClasses} text-gray-900`; // No attendance data
    }
    
    if (day.attendance === 100) {
      return `${baseClasses} bg-green-400 text-green-900 rounded font-medium`; // Present
    }
    
    if (day.attendance === 0) {
      return `${baseClasses} bg-red-400 text-red-900 rounded font-medium`; // Absent
    }
    
    return `${baseClasses} text-gray-900`;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());

  // Transform API data for chart
  const chartData = attendanceData ? 
    Object.entries(attendanceData.weeklyAttendancePercentages)
      .map(([week, percentage]) => ({
        name: week.split(' ')[0] + ' ' + week.split(' ')[1], // "Week 1", "Week 2", etc.
        week: week,
        attendance: percentage
      }))
      .reverse() // Show chronological order
    : [];

  // Transform API data for subjects
  const subjects = attendanceData ? 
    Object.entries(attendanceData.courseAttendancePercentages).map(([courseName, percentage]) => {
      const total = 20; // This could be dynamic if provided by API
      const present = Math.round((percentage / 100) * total);
      const absent = total - present;
      
      return {
        name: courseName,
        total,
        present,
        absent,
        percent: percentage,
        trend: percentage < 85 ? 'down' as const : 'up' as const,
        color: percentage < 75 ? 'text-red-500' : percentage < 85 ? 'text-orange-500' : 'text-green-500',
        bar: percentage < 75 ? 'bg-red-400' : percentage < 85 ? 'bg-orange-400' : 'bg-green-400'
      };
    })
    : [];

  // Get current week attendance
  const currentWeekAttendance = attendanceData ? 
    Object.values(attendanceData.weeklyAttendancePercentages)[0] || 0
    : 0;

  // Loading state
  if (loading) {
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
                <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.schoolName || 'School Name'}</span>
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
                <button 
                  onClick={() => handleNavigation('/student-settings', 'My Profile')}
                  className="hover:text-orange-600 transition-colors"
                >
                  My Profile
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
                <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Student'}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <StudentSidebar 
            activeTab="My Attendance"
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleNavigation={handleNavigation}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
            {/* Header Skeleton */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="animate-pulse">
                <div className="h-6 sm:h-8 lg:h-9 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-32"></div>
              </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                    <div className="bg-gray-200 p-1.5 sm:p-2 rounded-lg w-8 h-8 sm:w-10 sm:h-10"></div>
                    <div className="bg-gray-200 rounded w-12 h-4"></div>
                  </div>
                  <div className="bg-gray-200 rounded w-16 h-6 sm:h-8 mb-1"></div>
                  <div className="bg-gray-200 rounded w-24 h-3 sm:h-4 mb-1"></div>
                  <div className="bg-gray-200 rounded w-20 h-3"></div>
                </div>
              ))}
            </div>

            {/* Main Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Attendance Chart Skeleton */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-200 rounded w-32 h-5"></div>
                    <div className="flex gap-2">
                      <div className="bg-gray-200 rounded w-12 h-6"></div>
                      <div className="bg-gray-200 rounded w-16 h-6"></div>
                      <div className="bg-gray-200 rounded w-20 h-6"></div>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-lg h-64 sm:h-80"></div>
                </div>
              </div>

              {/* Right Sidebar Skeleton */}
              <div className="space-y-4 sm:space-y-6">
                {/* Calendar Skeleton */}
                <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gray-200 rounded w-24 h-5"></div>
                      <div className="bg-gray-200 rounded w-16 h-4"></div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {[...Array(35)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded w-8 h-8"></div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full w-3 h-3"></div>
                        <div className="bg-gray-200 rounded w-12 h-3"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full w-3 h-3"></div>
                        <div className="bg-gray-200 rounded w-8 h-3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts Skeleton */}
                <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                  <div className="animate-pulse">
                    <div className="bg-gray-200 rounded w-32 h-5 mb-4"></div>
                    <div className="space-y-3">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-gray-100 rounded-lg p-3">
                          <div className="bg-gray-200 rounded w-20 h-4 mb-2"></div>
                          <div className="bg-gray-200 rounded w-full h-3"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions Skeleton */}
                <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                  <div className="animate-pulse">
                    <div className="bg-gray-200 rounded w-28 h-5 mb-4"></div>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-12 w-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Table Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="animate-pulse">
                <div className="bg-gray-200 rounded w-40 h-5 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-200 rounded w-6 h-6"></div>
                        <div className="bg-gray-200 rounded w-24 h-4"></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-200 rounded w-12 h-4"></div>
                        <div className="bg-gray-200 rounded w-12 h-4"></div>
                        <div className="bg-gray-200 rounded w-16 h-4"></div>
                        <div className="bg-gray-200 rounded w-12 h-2"></div>
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
  }

  // Error state
  if (error) {
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
                <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.schoolName || 'School Name'}</span>
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
                <button 
                  onClick={() => handleNavigation('/student-settings', 'My Profile')}
                  className="hover:text-orange-600 transition-colors"
                >
                  My Profile
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
                <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Student'}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <StudentSidebar 
            activeTab="My Attendance"
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleNavigation={handleNavigation}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 mb-2 text-4xl">⚠️</div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Attendance</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.schoolName || 'School Name'}</span>
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
              <button 
                onClick={() => handleNavigation('/student-settings', 'My Profile')}
                className="hover:text-orange-600 transition-colors"
              >
                My Profile
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Student'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      
       

      <div className="flex">
        {/* Sidebar */}
        <StudentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">My Attendance</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">{user?.schoolName || 'School Name'}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {/* Overall Attendance */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg">
                    <FaCalendarCheck className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
                  </div>
                  <span className="text-emerald-600 text-xs sm:text-sm font-semibold whitespace-nowrap">
                    ↑ Good
                  </span>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {Math.round(attendanceData?.overallAttendancePercentage || 0)}%
                </div>
                <div className="text-gray-600 text-xs sm:text-sm font-bold">Overall Attendance</div>
                <div className="text-gray-500 text-xs mt-1">This semester</div>
              </div>

              {/* This Week */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="bg-red-100 p-1.5 sm:p-2 rounded-lg">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                  </div>
                  <span className="text-red-600 text-xs sm:text-sm font-semibold whitespace-nowrap">
                    ↓ Low
                  </span>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {Math.round(currentWeekAttendance)}%
                </div>
                <div className="text-gray-600 text-xs sm:text-sm font-bold">This Week</div>
                <div className="text-gray-500 text-xs mt-1">Current week</div>
              </div>

              {/* Most Missed Subject */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="bg-orange-100 p-1.5 sm:p-2 rounded-lg">
                    <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                  </div>
                  <span className="text-orange-600 text-xs sm:text-sm font-semibold whitespace-nowrap">
                    ⚠ Alert
                  </span>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {attendanceData?.mostMissedClassTotal || 0}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm font-bold">Most Missed</div>
                <div className="text-gray-500 text-xs mt-1">{attendanceData?.mostMissedClassName || 'N/A'}</div>
              </div>

            </div>

          {/* Main Layout - Left content and Right sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Left Column - Charts and Tables */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 mb-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                  <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Attendance Trend</h2>
                  <div className="flex gap-2">
                    <button className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded text-xs sm:text-sm font-medium">Day</button>
                    <button className="px-2 sm:px-3 py-1 text-gray-600 rounded text-xs sm:text-sm font-medium">Week</button>
                    <button className="px-2 sm:px-3 py-1 text-gray-600 rounded text-xs sm:text-sm font-medium">Subject</button>
                  </div>
                </div>
                <div className="h-40 sm:h-48 lg:h-56 xl:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={10}
                      tick={{ fill: '#666' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      fontSize={10}
                      tick={{ fill: '#666' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Attendance']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
                <div className="mt-2 sm:mt-3 lg:mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-blue-500"></div>
                    <span className="text-xs sm:text-sm text-gray-600">Daily Attendance</span>
                  </div>
                </div>
              </div>

              {/* Subject-wise Attendance Table */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Subject-wise Attendance</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-medium">Subject</th>
                      <th className="pb-3 font-medium">Total Sessions</th>
                      <th className="pb-3 font-medium">Present</th>
                      <th className="pb-3 font-medium">Absent</th>
                      <th className="pb-3 font-medium">Attendance %</th>
                      <th className="pb-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr key={index} className="border-b border-gray-50 last:border-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 text-sm">
                                {subject.name === 'Mathematics' && '📊'}
                                {subject.name === 'English' && '📚'}
                                {subject.name === 'Science' && '🔬'}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">{subject.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-600">{subject.total}</td>
                        <td className="py-4 text-gray-600">{subject.present}</td>
                        <td className="py-4 text-gray-600">{subject.absent}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-2 rounded-full ${subject.bar}`}
                                style={{ width: `${subject.percent}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${subject.color}`}>
                              {subject.percent}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          {subject.trend === 'up' ? (
                            <div className="flex items-center gap-1 text-emerald-500">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-orange-500">
                              <ArrowDownRight className="w-4 h-4" />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Dynamic Calendar */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigateMonth('prev')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => navigateMonth('next')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-xs mb-4">
                  {/* Day headers */}
                  <div className="text-gray-400 text-center font-medium py-2">Sun</div>
                  <div className="text-gray-400 text-center font-medium py-2">Mon</div>
                  <div className="text-gray-400 text-center font-medium py-2">Tue</div>
                  <div className="text-gray-400 text-center font-medium py-2">Wed</div>
                  <div className="text-gray-400 text-center font-medium py-2">Thu</div>
                  <div className="text-gray-400 text-center font-medium py-2">Fri</div>
                  <div className="text-gray-400 text-center font-medium py-2">Sat</div>
                  
                  {/* Calendar days */}
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={getDateStyle(day)}
                      title={day.attendance !== undefined ? 
                        `${day.fullDate}: ${day.attendance === 100 ? 'Present' : 'Absent'}` : 
                        day.fullDate
                      }
                    >
                      {day.date}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span>Present</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 rounded border border-gray-300"></div>
                    <span>No Data</span>
                  </div>
                </div>
              </div>

              {/* Alerts & Insights */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Alerts & Insights</h3>
                <div className="space-y-4">
                  {/* Critical attendance alert for low current week */}
                  {currentWeekAttendance === 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-red-600">🚨</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-900 mb-1">Critical Attendance Alert</h4>
                          <p className="text-sm text-red-700">
                            Your attendance has dropped to 0% in recent weeks. Please attend classes immediately to avoid academic issues.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course-specific alerts */}
                  {subjects.map((subject) => (
                    <div 
                      key={subject.name}
                      className={`${subject.percent < 75 ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'} border rounded-lg p-4`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 ${subject.percent < 75 ? 'bg-red-100' : 'bg-orange-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className={`${subject.percent < 75 ? 'text-red-600' : 'text-orange-600'}`}>⚠️</span>
                        </div>
                        <div>
                          <h4 className={`font-medium ${subject.percent < 75 ? 'text-red-900' : 'text-orange-900'} mb-1`}>{subject.name} Alert</h4>
                          <p className={`text-sm ${subject.percent < 75 ? 'text-red-700' : 'text-orange-700'}`}>
                            Your overall attendance in {subject.name} is {subject.percent}%. 
                            {subject.percent < 75 ? 'This is critically low and requires immediate attention.' : 'Try to maintain consistent attendance to stay on track.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-lg font-medium text-sm transition-colors flex items-center gap-3">
                    <span className="text-lg">📅</span>
                    <span>View Calendar</span>
                  </button>
                  <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 px-4 py-3 rounded-lg font-medium text-sm transition-colors flex items-center gap-3">
                    <span className="text-lg">📝</span>
                    <span>Submit Absence Reason</span>
                  </button>
                  <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-3 rounded-lg font-medium text-sm transition-colors flex items-center gap-3">
                    <span className="text-lg">💬</span>
                    <span>Message Teacher</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAttendance;