import { useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp, AlertTriangle, MessageSquare, Video, ChevronDown, Bell, Menu, X } from 'lucide-react';
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import pe1 from "../../img/pe1.png";
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar'; 

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredWeek, setHoveredWeek] = useState<{ label: string; value: number; x: number; y: number } | null>(null);
  interface AttendanceTrend {
    weekLabel: string;
    weeklyAverage: number;
  }
  interface ChildData {
    name: string;
    grade: string;
    attendance: number;
    gpa: number;
    risk: string;
    riskColor: string;
    img?: string;
    attendanceTrends?: AttendanceTrend[];
  }
  interface StatsData {
    totalChildren: number;
    attendance: number;
    gpa: number;
    incidents: number;
    commendations: number;
  }
  interface BehaviorLogItem {
    label: string;
    type: 'Incident' | 'Commendation';
    incidentType?: string;
  }
  interface DashboardData {
    children: ChildData[];
    stats: StatsData;
    behaviorLog: BehaviorLogItem[];
    attendanceTrends?: AttendanceTrend[];
  }
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();
  const { user, token, parentId } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!parentId || !token) {
        console.log('Missing parentId or token:', { parentId, token: token ? 'exists' : 'missing' });
        setError('Missing parent ID or token');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        console.log('Fetching dashboard from:', `${baseUrl}/api/students/parent-dashboard/${parentId}`);
        const res = await fetch(`${baseUrl}/api/students/parent-dashboard/${parentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response status:', res.status, res.statusText);
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        const response = await res.json();
        console.log('Received dashboard data:', response);
        
        // Transform API response to match component structure
        const apiData = response.data;
        
        // Collect all attendance trends from all children
        const allAttendanceTrends = apiData.children.flatMap((child: { attendanceTrends?: AttendanceTrend[] }) => 
          child.attendanceTrends || []
        );
        
        const transformedData: DashboardData = {
          children: apiData.children.map((child: { 
            name: string;
            grade?: string;
            overallAttendance?: number;
            gpa?: number;
            behaviorIncidents?: number;
            profileImage?: string;
            attendanceTrends?: AttendanceTrend[];
          }) => {
            // Determine risk level based on attendance and behavior
            let risk = 'Low Risk';
            let riskColor = 'green';
            if ((child.overallAttendance || 0) < 75 || (child.behaviorIncidents || 0) > 2) {
              risk = 'High Risk';
              riskColor = 'red';
            } else if ((child.overallAttendance || 0) < 85 || (child.behaviorIncidents || 0) > 0) {
              risk = 'Medium Risk';
              riskColor = 'orange';
            }
            
            return {
              name: child.name,
              grade: child.grade || 'N/A',
              attendance: Math.round(child.overallAttendance || 0),
              gpa: child.gpa || 0,
              risk: risk,
              riskColor: riskColor,
              img: child.profileImage || undefined,
              attendanceTrends: child.attendanceTrends || []
            };
          }),
          stats: {
            totalChildren: apiData.totalChildren || apiData.children.length,
            attendance: apiData.children.length > 0 
              ? Math.round(apiData.children.reduce((sum: number, c: { overallAttendance?: number }) => sum + (c.overallAttendance || 0), 0) / apiData.children.length)
              : 0,
            gpa: apiData.children.length > 0
              ? Number((apiData.children.reduce((sum: number, c: { gpa?: number }) => sum + (c.gpa || 0), 0) / apiData.children.length).toFixed(1))
              : 0,
            incidents: apiData.children.reduce((sum: number, c: { behaviorIncidents?: number }) => sum + (c.behaviorIncidents || 0), 0),
            commendations: apiData.children.reduce((sum: number, c: { commendations?: number }) => sum + (c.commendations || 0), 0)
          },
          behaviorLog: apiData.children.flatMap((child: { behaviorDetails?: { note: string; incidentType: string }[] }) => 
            (child.behaviorDetails || []).map((detail: { note: string; incidentType: string }) => ({
              label: detail.note || detail.incidentType || 'Behavior incident',
              type: 'Incident' as const,
              incidentType: detail.incidentType
            }))
          ),
          attendanceTrends: allAttendanceTrends
        };
        
        console.log('Transformed data:', transformedData);
        setDashboardData(transformedData);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err instanceof Error ? err.message : 'Error fetching dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [parentId, token]);



  // Only use real API data; no demo/fallback data
  const data: DashboardData | null = dashboardData;

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
                onClick={() => handleNavigation('/parent-dashboard', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/parent-children', 'My Children')}
                className="hover:text-orange-600 transition-colors"
              >
                My Children
              </button>
              <button 
                onClick={() => handleNavigation('/parent-messages', 'Messages')}
                className="hover:text-orange-600 transition-colors"
              >
                Messages
              </button>
              <button 
                onClick={() => handleNavigation('/parent-settings', 'Settings')}
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
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Parent'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Use the ParentSidebar component */}
        <ParentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your children's performance.</p>
          </div>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {/* My Children */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">My Children</h3>
                  <p className="text-3xl font-bold">{data?.stats?.totalChildren ?? '--'}</p>
                  <p className="text-xs text-gray-500 mt-1">Total children linked</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Attendance Overview</h3>
                  <p className="text-3xl font-bold">{data?.stats?.attendance ?? '--'}%</p>
                  <p className="text-xs text-green-600 mt-1">Monthly trend</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Academic Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Academic Status</h3>
                  <p className="text-3xl font-bold">{data?.stats?.gpa ?? '--'}</p>
                  <p className="text-xs text-purple-600 mt-1">GPA / 4.0 - Improving</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Behavior Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Behavior Alerts</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-3xl font-bold text-red-600">{data?.stats?.incidents ?? '--'}</p>
                      <p className="text-xs text-gray-500">Incidents</p>
                    </div>
                    
                  </div>
                </div>
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* My Children Section with Attendance & Behavior cards below */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">My Children</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {data?.children && data.children.length > 0 ? (
                  data.children.map((child, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img src={child.img || pe1} alt={child.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <h3 className="font-semibold">{child.name}</h3>
                            <p className="text-sm text-gray-600">{child.grade}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 bg-${child.riskColor || 'orange'}-100 text-${child.riskColor || 'orange'}-700 text-xs rounded-full`}>
                          {child.risk}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Attendance:</span>
                          <span className="font-semibold">{child.attendance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">GPA:</span>
                          <span className="font-semibold">{child.gpa}</span>
                        </div>
                      </div>
                      <button className="w-full bg-blue-200 text-blue-800 py-2 rounded-lg hover:bg-blue-300 transition">
                        View Full Profile
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-400 py-8">No children data available.</div>
                )}
              </div>

              {/* Attendance & Behavior cards moved here under My Children */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Attendance Trend - Weekly data from backend */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Attendance Trend</h3>
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="relative h-40">
                    {data?.attendanceTrends && data.attendanceTrends.length > 0 ? (
                      <>
                        <svg className="w-full h-full" viewBox="0 0 300 120">
                          <line x1="30" y1="100" x2="270" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                          <line x1="30" y1="60" x2="270" y2="60" stroke="#e5e7eb" strokeWidth="1" />
                          <line x1="30" y1="20" x2="270" y2="20" stroke="#e5e7eb" strokeWidth="1" />
                          
                          <polyline
                            points={data.attendanceTrends.map((trend, i) => {
                              const x = 50 + (i * (220 / Math.max(data.attendanceTrends!.length - 1, 1)));
                              const y = 100 - (trend.weeklyAverage * 0.8);
                              return `${x},${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                          />
                          
                          {data.attendanceTrends.map((trend, i) => {
                            const x = 50 + (i * (220 / Math.max(data.attendanceTrends!.length - 1, 1)));
                            const y = 100 - (trend.weeklyAverage * 0.8);
                            return (
                              <g key={i}>
                                <circle 
                                  cx={x} 
                                  cy={y} 
                                  r="3" 
                                  fill="#10b981"
                                  className="cursor-pointer transition-all"
                                  onMouseEnter={() => setHoveredWeek({ label: trend.weekLabel, value: trend.weeklyAverage, x, y })}
                                  onMouseLeave={() => setHoveredWeek(null)}
                                />
                                <circle 
                                  cx={x} 
                                  cy={y} 
                                  r="10" 
                                  fill="transparent"
                                  className="cursor-pointer"
                                  onMouseEnter={() => setHoveredWeek({ label: trend.weekLabel, value: trend.weeklyAverage, x, y })}
                                  onMouseLeave={() => setHoveredWeek(null)}
                                />
                              </g>
                            );
                          })}
                          
                          <text x="35" y="105" fontSize="8" fill="#6b7280">0</text>
                          <text x="30" y="65" fontSize="8" fill="#6b7280">50</text>
                          <text x="25" y="25" fontSize="8" fill="#6b7280">100</text>
                          
                          {data.attendanceTrends.map((trend, i) => {
                            const x = 50 + (i * (220 / Math.max(data.attendanceTrends!.length - 1, 1)));
                            return (
                              <text key={i} x={x} y="115" fontSize="8" fill="#6b7280" textAnchor="middle">
                                {trend.weekLabel}
                              </text>
                            );
                          })}
                        </svg>
                        {hoveredWeek && (
                          <div 
                            className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
                            style={{
                              left: `${(hoveredWeek.x / 300) * 100}%`,
                              top: `${(hoveredWeek.y / 120) * 100 - 10}%`,
                              transform: 'translate(-50%, -100%)'
                            }}
                          >
                            {hoveredWeek.label}: {Math.round(hoveredWeek.value)}%
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No attendance trend data available
                      </div>
                    )}
                  </div>
                </div>

                {/* Behavior Log - Minimized */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Behavior Log</h3>
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="space-y-3">
                    {data?.behaviorLog && data.behaviorLog.length > 0 ? (
                      data.behaviorLog.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center p-2 rounded-lg ${item.type === 'Incident' ? 'bg-red-50' : 'bg-green-50'}`}
                        >
                          <span className="text-xs">{item.label}</span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${item.type === 'Incident' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}
                          >
                            {item.incidentType || item.type}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-8">No behavior log data available.</div>
                    )}
                  </div>
                      {/* Loading and error states */}
                      {loading && (
                        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
                          <div className="p-6 bg-white rounded-lg shadow text-lg font-semibold text-gray-700 animate-pulse">Loading dashboard...</div>
                        </div>
                      )}
                      {error && (
                        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                          <div className="p-6 bg-white rounded-lg shadow text-lg font-semibold text-red-600">{error}</div>
                        </div>
                      )}
                </div>
              </div>
            </div>

            {/* Communication Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Communication</h2>
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-semibold mb-4">Messages</h3>
                <div className="space-y-3">
                  <div className="border-b pb-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium">Teacher Smith</p>
                      <p className="text-xs text-gray-500">Sept 20</p>
                    </div>
                    <p className="text-sm text-gray-600">Math Assignment Feedback</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-300 text-blue-900 py-3 rounded-lg hover:bg-blue-400 transition flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message Teacher
                  </button>
                  <button className="w-full bg-green-300 text-green-900 py-3 rounded-lg hover:bg-green-400 transition flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    Request Meeting
                  </button>
                </div>
              </div>

              {/* Announcements with colored rectangles */}
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h3 className="font-semibold mb-4">Announcements</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Parent-Teacher</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Meeting</span> on Oct 2
                  </p>
                  <p className="text-gray-700">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Midterm</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">exams</span> start Oct 15
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-blue-300 text-blue-900 py-3 rounded-lg hover:bg-blue-400 transition font-medium">
                Message Teacher
              </button>
              <button className="bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition font-medium">
                Check Attendance
              </button>
              <button className="bg-green-300 text-green-900 py-3 rounded-lg hover:bg-green-400 transition font-medium">
                View Report Card
              </button>
              <button className="bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium">
                Update Profile
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}