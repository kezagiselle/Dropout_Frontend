import { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Bell, Menu, X, TrendingUp, Shield, FileText } from 'lucide-react';
import { FaCalendarCheck } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom'; 
import { TbWaveSawTool } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Attendance from "./StudentAttendance";
import BehaviorReports from "./StudentBehavior"; 
import StudentSettings from "./StudentSettings";
import { useUserAuth } from '../../context/useUserAuth';
import StudentSidebar from './StudentSidebar';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface DashboardData {
  attendanceRate: number;
  averageGPA: number;
  behaviorIncidents: number;
  riskLevel: string | null;
  probabilityPercent: number | null;
  performanceTrend: {
    gradeType: string;
    averageMarks: number;
  }[];
  attendanceOverview: {
    day: string;
    attendance: number;
  }[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showBehavior, setShowBehavior] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { user, token } = useUserAuth(); 

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token || !user?.studentId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${baseUrl}/api/students/dashboard/${user.studentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const result: ApiResponse = await response.json();
        
        if (result.success) {
          setDashboardData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, user?.studentId]);

  // Transform performance data for chart (by grade type instead of terms)
  const performanceData = dashboardData?.performanceTrend?.map(item => ({
    name: item.gradeType,
    averageMarks: item.averageMarks
  })) || [];

  // Transform attendance data for chart (day by day) - sorted chronologically
  const attendanceData = dashboardData?.attendanceOverview
    ?.map(item => {
      const date = new Date(item.day);
      const formattedDate = date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit' 
      }); // Format as DD/MM
      return {
        name: formattedDate, // Use actual date instead of day name
        day: item.day,
        present: item.attendance, // API already provides 100.0 or 0.0
        absent: 100 - item.attendance,
        late: 0, // Not provided in API, keeping as 0
        _sortDate: date // Prefix with underscore to indicate internal use
      };
    })
    .sort((a, b) => a._sortDate.getTime() - b._sortDate.getTime())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ _sortDate, ...rest }) => rest) || [];

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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">{user?.schoolName || 'School Name'}</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="animate-pulse">
                <div className="h-6 sm:h-8 lg:h-9 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {loading ? (
              // Stats Cards Skeleton
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                    <div className="bg-gray-200 p-1.5 sm:p-2 rounded-lg w-8 h-8 sm:w-10 sm:h-10"></div>
                    <div className="bg-gray-200 rounded w-12 h-4"></div>
                  </div>
                  <div className="bg-gray-200 rounded w-16 h-6 sm:h-8 mb-1"></div>
                  <div className="bg-gray-200 rounded w-24 h-3 sm:h-4 mb-1"></div>
                  <div className="bg-gray-200 rounded w-20 h-3"></div>
                </div>
              ))
            ) : (
              <>
                {/* Attendance Rate */}
                <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="bg-teal-100 p-1.5 sm:p-2 rounded-lg">
                  <FaCalendarCheck className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
                </div>
                <span className="text-emerald-600 text-xs sm:text-sm font-semibold whitespace-nowrap">
                  {dashboardData?.attendanceRate && dashboardData.attendanceRate >= 80 ? '↑ Good' : '↓ Low'}
                </span>
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {dashboardData?.attendanceRate || 0}%
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Attendance Rate</div>
              <div className="text-gray-500 text-xs mt-1">Current performance</div>
            </div>

            {/* Average GPA */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg">
                  <TbWaveSawTool className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <span className="bg-blue-50 text-blue-600 text-xs font-medium px-1 py-0.5 rounded whitespace-nowrap">
                  Average
                </span>
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {dashboardData?.averageGPA || 0}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Average Marks</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
                <div 
                  className="bg-blue-500 h-1.5 sm:h-2 rounded-full" 
                  style={{ width: `${Math.min((dashboardData?.averageGPA || 0) * 5, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Behavior Incidents */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="bg-amber-100 p-1.5 sm:p-2 rounded-lg">
                  <FaStar className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                </div>
                <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${
                  (dashboardData?.behaviorIncidents || 0) === 0 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {(dashboardData?.behaviorIncidents || 0) === 0 ? '✓ Good' : '⚠ Alert'}
                </span>
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {dashboardData?.behaviorIncidents || 0}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Behavior Incidents</div>
              <div className="text-gray-500 text-xs mt-1">Current term</div>
            </div>

            {/* Risk Level */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-lg">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">
                  {dashboardData?.riskLevel || 'LOW'}
                </span>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600 mb-1">
                Low Risk
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-bold">Dropout Risk Level</div>
              <div className="text-gray-500 text-xs mt-1">
                {dashboardData?.probabilityPercent ? `${dashboardData.probabilityPercent}% probability` : '0% probability'}
              </div>
            </div>
              </>
            )}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Performance Trend */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Performance Trend</h2>
                <span className="text-emerald-600 text-xs sm:text-sm flex items-center gap-1 whitespace-nowrap">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Your grades are improving</span>
                  <span className="sm:hidden">Improving</span>
                </span>
              </div>
              <div className="h-40 sm:h-48 lg:h-56 xl:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis 
                      domain={[0, 20]}
                      fontSize={10}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="averageMarks" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Daily Attendance</h2>
              <div className="h-40 sm:h-48 lg:h-56 xl:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={attendanceData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={10} 
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tickCount={3}
                      ticks={[0, 50, 100]}
                      fontSize={10}
                      tickFormatter={(value) => {
                        if (value === 0) return 'Absent';
                        if (value === 100) return 'Present';
                        return '';
                      }}
                    />
                    <Tooltip 
                      formatter={(value) => [Number(value) >= 100 ? 'Present' : 'Absent', 'Status']}
                      labelFormatter={(label, payload) => {
                        if (payload && payload.length > 0) {
                          const fullDate = payload[0].payload.day;
                          const formattedDate = new Date(fullDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          });
                          return `Date: ${formattedDate}`;
                        }
                        return `Day: ${label}`;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="present" 
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        const isPresent = payload.present >= 100; // Handle 100.0 as present
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={6}
                            fill={isPresent ? '#10b981' : '#ef4444'}
                            stroke={isPresent ? '#059669' : '#dc2626'}
                            strokeWidth={2}
                          />
                        );
                      }}
                      activeDot={{ 
                        r: 8, 
                        fill: '#10b981',
                        stroke: '#059669',
                        strokeWidth: 2
                      }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 sm:mt-3 lg:mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-2 sm:p-3">
                <p className="text-emerald-700 text-xs sm:text-sm font-semibold">
                  ✓ Overall attendance rate: {dashboardData?.attendanceRate ? `${dashboardData.attendanceRate}%` : 'Loading...'}
                </p>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-gray-600">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600">Absent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Upcoming Assignments</h2>
                <span className="bg-blue-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs font-semibold">
                  3
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {assignments.map((assignment, i) => (
                  <div key={i} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-blue-50 shadow-sm border border-blue-100 cursor-pointer group">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-blue-700 font-bold text-xs sm:text-sm lg:text-base truncate">{assignment.title}</div>
                        <div className="text-blue-600 text-xs sm:text-sm truncate">{assignment.due}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${assignment.color} scale-105 flex-shrink-0 ml-2 whitespace-nowrap`}>
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Behavior */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Recent Behavior</h2>
                <button 
                  className="text-blue-600 text-xs sm:text-sm font-medium hover:underline whitespace-nowrap"
                  onClick={() => setShowBehavior(true)}
                >
                  View All
                </button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {behaviors.map((behavior, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-50 shadow-sm border border-gray-100 cursor-pointer group">
                    <span className="text-sm sm:text-base flex-shrink-0">{behavior.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-700 font-bold text-xs sm:text-sm lg:text-base truncate">{behavior.title}</div>
                      <div className="text-gray-600 text-xs sm:text-sm truncate">{behavior.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">Messages</h2>
              <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-3 lg:mb-4">
                {messages.map((message, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-blue-50 shadow-sm border border-blue-100 cursor-pointer group">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 ${message.unread ? 'bg-red-500' : 'bg-gray-300'} scale-125`}></div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-blue-700 font-bold text-xs sm:text-sm lg:text-base truncate">{message.title}</div>
                      <div className="text-blue-600 text-xs sm:text-sm">{message.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 lg:p-4">
                <div className="flex items-start gap-1 sm:gap-2">
                  <span className="text-blue-600 flex-shrink-0">💡</span>
                  <div className="min-w-0 flex-1">
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
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <button 
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-2 sm:py-2.5 sm:px-4 lg:py-3 lg:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => handleNavigation('/my-assignments', 'My Assignments')}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-semibold truncate">View Assignments</span>
              </button>
              <button
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-medium py-2 px-2 sm:py-2.5 sm:px-4 lg:py-3 lg:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => handleNavigation('/student-attendance', 'My Attendance')}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-semibold truncate">View Attendance</span>
              </button>
              <button 
                className="bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-2 sm:py-2.5 sm:px-4 lg:py-3 lg:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => handleNavigation('/student-behavior', 'My Behavior')}
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-semibold truncate">Check Behavior</span>
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-2 sm:py-2.5 sm:px-4 lg:py-3 lg:px-6 rounded-lg transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => handleNavigation('/student-settings', 'My Profile')}
              >
                <IoMdSettings className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-semibold truncate">My Profile</span>
              </button>
            </div>
          </div>

          {/* Modals */}
          {showAttendance && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 sm:px-3 lg:px-4">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-600 z-10"
                  onClick={() => setShowAttendance(false)}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <Attendance />
              </div>
            </div>
          )}

          {showBehavior && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 sm:px-3 lg:px-4">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-600 z-10"
                  onClick={() => setShowBehavior(false)}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <BehaviorReports />
              </div>
            </div>
          )}

          {showSettings && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 sm:px-3 lg:px-4">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-600 z-10"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
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