/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { ChevronDown, Calendar, BarChart3, Bell, Search, Menu, X } from 'lucide-react';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa6";
import { IoMdTv } from "react-icons/io";
import { TbAlertTriangle } from "react-icons/tb";
import { FaRegChartBar } from "react-icons/fa"; 
import userr from "../../../src/img/userr.png";
import { useNavigate, useLocation } from 'react-router-dom'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MyClasses from './MyClasses';
import Attendance from '../TeacherPages/Attendance';
import DailyAttendance from '../TeacherPages/DailyAttendance'
import Behavior from '../TeacherPages/Behavior'; 
import StudentProfiles from './StudentProfiles';
import Settings from './Settings';
import Marks from './Marks'; 
import { useUserAuth } from '../../context/useUserAuth';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const { token, user } = useUserAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      if (!token || !user?.userId) {
        setIsLoading(false);
        return;
      }
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const res = await fetch(`${baseUrl}/api/teachers/dashboard/${user.userId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setDashboardData(data.data);
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard(); 
  }, [token, user]);

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  const renderMainContent = () => {
    switch (location.pathname) {
      case '/attendance': 
        return <Attendance />;
      case '/my-classes':
        return <MyClasses />;
      case '/daily-attendance': 
        return <DailyAttendance />;
      case '/behavior-reports':
        return <Behavior />;
      case '/student-profiles':
        return <StudentProfiles />;
      case '/settings':
        return <Settings />;
      case '/marks': // Added Marks route
        return <Marks />;
      default:
        return <DashboardContent />;
    }
  };

  // Stat cards: use API data if available, else fallback to static
  const statCards = [
    {
      title: 'My Students',
      value: dashboardData?.totalStudents ?? 0,
      subtitle: '+1 from last term',
      icon: IoIosPeople,
      color: 'bg-white',
      iconColor: 'text-blue-500'
    },
    {
      title: 'My Courses',
      value: dashboardData?.totalCourses ?? 0,
      subtitle: 'Active courses',
      icon: IoMdTv,
      color: 'bg-white',
      iconColor: 'text-green-500'
    },
    {
      title: 'At-Risk Students',
      value: dashboardData?.atRiskStudents ?? 0,
      subtitle: 'Needs attention',
      icon: TbAlertTriangle,
      color: 'bg-white',
      iconColor: 'text-red-500',
      valueColor: 'text-red-600'
    },
    {
      title: "Today's Attendance",
      value: dashboardData?.todayAttendancePercentage !== undefined
        ? `${dashboardData.todayAttendancePercentage}%`
        : '0%',
      subtitle: 'Overall attendance rate',
      icon: FaClipboardCheck,
      color: 'bg-white',
      iconColor: 'text-green-500',
      valueColor: 'text-green-600'
    }
  ];

  // Updated attendance data for the BarChart with increased absent AND late values
  const attendanceData = [
    { name: 'Mon', present: 115, absent: 8, late: 5 },
    { name: 'Tue', present: 110, absent: 13, late: 5 },
    { name: 'Wed', present: 105, absent: 18, late: 5 },
    { name: 'Thu', present: 113, absent: 10, late: 5 },
    { name: 'Fri', present: 107, absent: 16, late: 5 },
    { name: 'Sat', present: 95, absent: 28, late: 5 },
    { name: 'Sun', present: 90, absent: 33, late: 5 }
  ];

  const flaggedStudents = [
    { name: 'Sarah Johnson', grade: 'Grade 10A', risk: 'High Risk', color: 'bg-red-100 text-red-700' },
    { name: 'Michael Chen', grade: 'Grade 10B', risk: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Emma Davis', grade: 'Grade 10A', risk: 'Low Risk', color: 'bg-green-100 text-green-700' }
  ];

  const recentBehavior = [
    { name: 'Alex Thompson', behavior: 'Excellent participation', time: 'Today, 10:30 AM', type: 'positive' },
    { name: 'James Wilson', behavior: 'Disruptive behavior', time: 'Yesterday, 2:15 PM', type: 'negative' }
  ];

  const schedule = [
    { period: 'Period 1', class: 'Mathematics - Grade 10A', time: '8:00 - 8:45 AM', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    { period: 'Period 2', class: 'Mathematics - Grade 10B', time: '8:50 - 9:35 AM', color: 'bg-green-500', bgColor: 'bg-green-50' },
    { period: 'Free', class: 'Free Period', time: '9:40 - 10:25 AM', color: 'bg-emerald-600', bgColor: 'bg-green-50' }
  ];

  const alerts = [
    { title: 'Parent meeting scheduled', time: 'Tomorrow, 3:00 PM', type: 'urgent', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { title: 'Grade submission deadline', time: 'Due in 2 days', type: 'medium', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
    { title: 'New curriculum update', time: 'Review required', type: 'info', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  ];

  // Updated menuItems to include Marks
  const menuItems = [
    { icon: LiaChalkboardTeacherSolid, label: 'My Classes', path: '/my-classes' },
    { icon: FaClipboardCheck, label: 'Attendance', path: '/attendance' },
    { icon: FaRegChartBar, label: 'Marks', path: '/marks' }, // Added Marks menu item
    { icon: TbReport, label: 'Behavior Reports', path: '/behavior-reports' },
    { icon: IoIosPeople, label: 'Student Profiles', path: '/student-profiles' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  // Extract dashboard content to separate component to avoid recursion
  const DashboardContent = () => (
    <main className="flex-1 min-w-0 p-4 sm:p-6">
      {/* Stat Cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg p-4 sm:p-5 relative shadow-sm border border-gray-200 animate-pulse">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {statCards.map((card, idx) => (
            <div key={idx} className={`${card.color} rounded-lg p-4 sm:p-5 relative shadow-sm border border-gray-200`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">{card.title}</p>
                  <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${card.valueColor || 'text-gray-900'}`}>{card.value}</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.iconColor}`} />
                </div>
              </div>
              <p className="text-xs text-gray-500">{card.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Larger */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          {/* Attendance Overview with BarChart */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Attendance Overview</h2>
              <button className="text-sm text-orange-500 font-medium w-full sm:w-auto text-left sm:text-right">View Details</button>
            </div>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#8884d8" name="Present" />
                  <Bar dataKey="absent" stackId="a" fill="#82ca9d" name="Absent" />
                  <Bar dataKey="late" fill="#ffc658" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded flex items-center gap-2">
              <span className="text-yellow-700 text-xs sm:text-sm">⚠️ 3 students with chronic absences this week</span>
            </div>
          </div>

          {/* Assignments & Quizzes */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Assignments & Quizzes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Pending to Grade</h3>
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">24</div>
                <p className="text-xs text-gray-500">assignments</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Upcoming to Publish</h3>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">3</div>
                <p className="text-xs text-gray-500">assignments</p>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div key={idx} className={`${item.bgColor} rounded-lg p-3 sm:p-4 border border-gray-200`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className={`${item.color} text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium w-fit`}>
                      {item.period}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.class}</p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleNavigation('/marks', 'Marks')}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-1 text-sm justify-center"
              >
                + Add Marks
              </button>
              <button 
                onClick={() => handleNavigation('/behavior-reports', 'Behavior Reports')}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-1 text-sm justify-center"
              >
                + Log Behavior
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Flagged Students */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Flagged Students</h2>
              <button className="text-sm text-orange-500 font-medium w-full sm:w-auto text-left sm:text-right">View All</button>
            </div>
            <div className="space-y-3">
              {flaggedStudents.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1 mr-2">
                    <p className="font-medium text-gray-900 text-sm truncate">{student.name}</p>
                    <p className="text-xs text-gray-500 truncate">{student.grade}</p>
                  </div>
                  <span className={`${student.color} px-2 py-1 rounded text-xs font-medium whitespace-nowrap flex-shrink-0`}>
                    {student.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Behavior */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Behavior</h2>
              <button 
                onClick={() => handleNavigation('/behavior-reports', 'Behavior Reports')}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm w-full sm:w-auto text-center"
              >
                + Log Report
              </button>
            </div>
            <div className="space-y-3">
              {recentBehavior.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.name} - {item.behavior}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Tasks */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Alerts & Tasks</h2>
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 rounded-lg border ${alert.bgColor} ${alert.borderColor}`}>
                  <div className={`${alert.type === 'urgent' ? 'bg-red-500' : alert.type === 'medium' ? 'bg-orange-500' : 'bg-blue-500'} text-white px-2 py-1 rounded text-xs font-medium w-fit`}>
                    {alert.type === 'urgent' ? 'Urgent' : alert.type === 'medium' ? 'Medium' : 'Info'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{alert.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );

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
            <button 
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 mb-2 ${
                activeTab === 'Dashboard' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation('/', 'Dashboard')}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 ${
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

        {renderMainContent()}
      </div>
    </div>
  );
}