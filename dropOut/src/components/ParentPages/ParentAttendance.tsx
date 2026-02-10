import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, AlertTriangle, Calendar, ChevronDown, Bell, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar';

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
    attendanceOverview: {
      day: string;
      attendance: number;
    }[];
    behaviorIncidents: {
      note: string;
      incidentType: string;
      severityLevel: string;
    }[];
  };
}

// Calendar day interface
interface CalendarDay {
  date: number;
  fullDate: string;
  isCurrentMonth: boolean;
  attendance?: number;
}

export default function ParentAttendance() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [activeTab, setActiveTab] = useState('Attendance');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceApiResponse['data'] | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const { user, token, studentIds } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Set initial selected student
  useEffect(() => {
    if (studentIds && studentIds.length > 0 && !selectedStudentId) {
      setSelectedStudentId(studentIds[0]);
    }
  }, [studentIds, selectedStudentId]);

  // Fetch attendance data from API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        
        if (!token) {
          console.error('No authentication token found');
          throw new Error('No authentication token found');
        }
        
        if (!selectedStudentId) {
          console.log('No student selected yet, waiting...');
          setLoading(false);
          return;
        }

        console.log('Fetching attendance for student:', selectedStudentId);
        console.log('Using token:', token ? 'Token exists' : 'No token');
        console.log('API URL:', `${baseUrl}/api/students/${selectedStudentId}/attendance-overview`);

        const response = await fetch(`${baseUrl}/api/students/${selectedStudentId}/attendance-overview`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: AttendanceApiResponse = await response.json();
        console.log('API Response:', result);
        
        if (result.success) {
          console.log('Setting attendance data:', result.data);
          setAttendanceData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch attendance data');
        }
      } catch (err) {
        console.error('Full error details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [token, selectedStudentId, baseUrl]);

  // Transform API data for chart - Convert weekly percentages to daily format for existing chart
  const chartData = attendanceData && attendanceData.weeklyAttendancePercentages ? 
    Object.entries(attendanceData.weeklyAttendancePercentages)
      .slice(0, 5)
      .map(([week, percentage]) => {
        const present = percentage;
        const absent = present === 0 ? 0 : (100 - percentage);
        // Store actual values for tooltip, but use minimum display values for visibility
        const presentDisplay = present === 0 ? 1.5 : present; // Show small bar at 0
        const absentDisplay = absent === 0 ? 1.5 : absent; // Show small bar at 0
        console.log(`Transforming week: ${week}, percentage: ${percentage}, present: ${present}, absent: ${absent}`);
        return {
          day: week.replace('Week ', 'W').split(' ')[0],
          Present: presentDisplay,
          Absent: absentDisplay,
          actualPresent: present, // Store actual value for tooltip
          actualAbsent: absent
        };
      })
    : [
      { day: 'W1', Present: 1.5, Absent: 1.5, actualPresent: 0, actualAbsent: 0 },
      { day: 'W2', Present: 1.5, Absent: 1.5, actualPresent: 0, actualAbsent: 0 },
      { day: 'W3', Present: 1.5, Absent: 1.5, actualPresent: 0, actualAbsent: 0 },
      { day: 'W4', Present: 1.5, Absent: 1.5, actualPresent: 0, actualAbsent: 0 },
    ];

  console.log('Final chartData:', chartData);
  console.log('attendanceData:', attendanceData);

  // Calculate stats from API data
  const overallAttendance = attendanceData?.overallAttendancePercentage || 0;
  console.log('Overall attendance:', overallAttendance);
  const totalPresent = Math.round(overallAttendance);
  const totalAbsent = Math.round(100 - overallAttendance);

  // Calendar helper functions
  const getAttendanceMap = () => {
    if (!attendanceData?.attendanceOverview) return new Map();
    return new Map(attendanceData.attendanceOverview.map(item => [item.day, item.attendance]));
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 lg:px-6 xl:px-8">
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1 xs:p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Menu className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
              </button>
              <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                <span className="font-semibold text-gray-800 text-xs xs:text-sm sm:text-base lg:text-lg">
                  {user?.schoolName || 'School Name'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3 xl:gap-4">
              <div className="relative p-1 xs:p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <Bell className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600" />
              </div>
              <img src={userr} alt="User profile" className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-gray-200" />
            </div>
          </div>
        </header>
        <div className="flex">
          <ParentSidebar 
            activeTab={activeTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleNavigation={handleNavigation}
          />
          <main className="flex-1 min-w-0 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-64 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
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
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 lg:px-6 xl:px-8">
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1 xs:p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Menu className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
              </button>
              <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                <span className="font-semibold text-gray-800 text-xs xs:text-sm sm:text-base lg:text-lg">
                  {user?.schoolName || 'School Name'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3 xl:gap-4">
              <div className="relative p-1 xs:p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <Bell className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600" />
              </div>
              <img src={userr} alt="User profile" className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-gray-200" />
            </div>
          </div>
        </header>
        <div className="flex">
          <ParentSidebar 
            activeTab={activeTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleNavigation={handleNavigation}
          />
          <main className="flex-1 min-w-0 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
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
                Attendance & Behavior
              </h1>
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 leading-tight xs:leading-normal">
                Track student attendance patterns and behavioral records
              </p>
            </div>
            <div className="flex items-center gap-2">
              {studentIds && studentIds.length > 1 && (
                <select
                  value={selectedStudentId || ''}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="bg-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm sm:shadow text-xs xs:text-sm sm:text-base font-medium border border-gray-200"
                >
                  {studentIds.map((id: string, idx: number) => (
                    <option key={id} value={id}>
                      Student {idx + 1}
                    </option>
                  ))}
                </select>
              )}
              <div className="flex items-center gap-1.5 xs:gap-2 bg-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm sm:shadow min-w-fit">
                <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap">{studentIds?.length || 0} {studentIds?.length === 1 ? 'Child' : 'Children'}</span>
              </div>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
            <div className="p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8">
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                Attendance Overview
              </h2>
              
              {/* Chart Section */}
              <div className="mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-2 xs:mb-3 sm:mb-4 gap-2 xs:gap-0">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-800 mb-1 xs:mb-0">
                    Weekly Attendance Trend
                  </h3>
                  <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4 text-xs xs:text-sm">
                    <div className="flex items-center gap-1 xs:gap-1.5">
                      <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span className="whitespace-nowrap">Present</span>
                    </div>
                    <div className="flex items-center gap-1 xs:gap-1.5">
                      <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <span className="whitespace-nowrap">Absent</span>
                    </div>
                  </div>
                </div>

                <div className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      barCategoryGap="20%"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={false}
                        domain={[0, 100]}
                        label={{ 
                          value: 'Attendance (%)', 
                          angle: -90, 
                          position: 'insideLeft', 
                          style: { fontSize: 10 } 
                        }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          fontSize: '12px',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          padding: '8px'
                        }}
                        formatter={(value, name, props) => {
                          // Show actual values in tooltip, not display values
                          if (name === 'Present') {
                            return [`${props.payload.actualPresent}%`, 'Present'];
                          } else if (name === 'Absent') {
                            return [`${props.payload.actualAbsent}%`, 'Absent'];
                          }
                          return [`${value}%`, name];
                        }}
                      />
                      <Bar 
                        dataKey="Present" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]} 
                        name="Present"
                        maxBarSize={40}
                      />
                      <Bar 
                        dataKey="Absent" 
                        fill="#ef4444" 
                        radius={[4, 4, 0, 0]} 
                        name="Absent"
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats Row - Enhanced responsiveness */}
              <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
                <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg bg-green-50">
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">{totalPresent}%</p>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1 xs:mt-2">Total Present</p>
                </div>
                <div className="text-center p-2 xs:p-3 sm:p-4 rounded-lg bg-red-50">
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-red-600">{totalAbsent}%</p>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1 xs:mt-2">Total Absent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Behavior Records */}
          <div className="mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
            <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 lg:mb-5">
              Behavior Records
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
              {/* Recent Incidents */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow transition-transform hover:scale-[1.01] hover:shadow-md">
                <div className="p-3 xs:p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3 sm:mb-4">
                    <AlertTriangle className="w-4 h-4 xs:w-5 xs:h-5 text-red-600" />
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">
                      Recent Incidents
                    </h3>
                  </div>

                  <div className="space-y-2 xs:space-y-3">
                    {attendanceData?.behaviorIncidents && attendanceData.behaviorIncidents.length > 0 ? (
                      attendanceData.behaviorIncidents.map((incident, index) => {
                        const isLowSeverity = incident.severityLevel === 'LOW';
                        const bgColor = isLowSeverity ? 'bg-orange-50 border-orange-500' : 'bg-red-50 border-red-500';
                        const hoverColor = isLowSeverity ? 'hover:bg-orange-100' : 'hover:bg-red-100';
                        const dotColor = isLowSeverity ? 'bg-orange-500' : 'bg-red-500';
                        const tagColor = isLowSeverity ? 'bg-orange-200 text-orange-800' : 'bg-red-200 text-red-800';
                        const tagText = `${incident.severityLevel} Severity`;
                        
                        return (
                          <div key={index} className={`${bgColor} border-l-3 xs:border-l-4 p-3 xs:p-4 sm:p-5 rounded ${hoverColor} transition-colors`}>
                            <div className="flex items-start justify-between mb-2 xs:mb-3">
                              <div className="flex items-center gap-2 xs:gap-3">
                                <span className={`w-2 h-2 xs:w-2.5 xs:h-2.5 ${dotColor} rounded-full`}></span>
                                <div className="min-w-0">
                                  <h4 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 capitalize">
                                    {incident.incidentType.toLowerCase().replace('_', ' ')}
                                  </h4>
                                  <span className="text-xs xs:text-sm text-gray-600">Recent incident</span>
                                </div>
                              </div>
                              <span className={`px-2 xs:px-3 py-1 xs:py-1.5 ${tagColor} text-xs xs:text-sm rounded-full font-medium whitespace-nowrap`}>
                                {tagText}
                              </span>
                            </div>
                            <p className="text-sm xs:text-base sm:text-lg text-gray-700 ml-6 xs:ml-8 leading-relaxed">
                              {incident.note}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-green-600 text-xl">✓</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No Recent Incidents</h3>
                        <p className="text-xs text-gray-600">Great behavior! No incidents reported.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Attendance Calendar */}
              <div className="bg-white rounded-lg shadow-sm sm:shadow transition-transform hover:scale-[1.01] hover:shadow-md">
                <div className="p-3 xs:p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">
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
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 xs:p-4 sm:p-5 lg:p-6">
            <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Quick Actions
            </h2>
           <div className="flex justify-center xs:justify-end">
  <button className="bg-blue-400 hover:bg-blue-500 text-white px-3 xs:px-4 sm:px-4 md:px-5 lg:px-6 py-2 xs:py-2.5 sm:py-2.5 md:py-3 rounded-lg transition font-medium flex items-center justify-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-sm md:text-base w-full xs:w-auto min-h-[40px] xs:min-h-[44px] max-w-md">
    <Calendar className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
    <span className="truncate">View Full Attendance History</span>
  </button>
</div>
          </div>
        </main>
      </div>
    </div>
  );
}