import { useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp, AlertTriangle, MessageSquare, Video, ChevronDown, Bell, Menu, X } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
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

  // Static performance trends data for multiple children
  const performanceTrendsData = [
    { gradeType: 'Quiz', 'Sarah Johnson': 16, 'Mike Johnson': 14, 'Emma Johnson': 18 },
    { gradeType: 'Assignment', 'Sarah Johnson': 17, 'Mike Johnson': 15, 'Emma Johnson': 17 },
    { gradeType: 'Group Work', 'Sarah Johnson': 18, 'Mike Johnson': 16, 'Emma Johnson': 19 },
    { gradeType: 'Exam', 'Sarah Johnson': 15, 'Mike Johnson': 13, 'Emma Johnson': 16 }
  ];

  // Colors for different children's trend lines
  const childrenColors = ['#3b82f6', '#10b981', '#f59e0b'];
  const childrenNames = ['Sarah Johnson', 'Mike Johnson', 'Emma Johnson'];

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
              <span className="hidden lg:inline">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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

          {/* Performance Trends Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Children Performance Trends</h2>
              <span className="text-emerald-600 text-sm flex items-center gap-1">
                <TrendingUp className="w-5 h-5" />
                <span>Academic progress comparison</span>
              </span>
            </div>
            <div className="relative h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceTrendsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="gradeType" 
                    fontSize={12} 
                  />
                  <YAxis 
                    domain={[0, 20]}
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value}/20`, name]}
                    labelFormatter={(label) => `Assessment: ${label}`}
                  />
                  {childrenNames.map((childName, index) => (
                    <Line 
                      key={childName}
                      type="monotone" 
                      dataKey={childName} 
                      stroke={childrenColors[index]} 
                      strokeWidth={3}
                      dot={{ fill: childrenColors[index], strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
              {childrenNames.map((childName, index) => (
                <div key={childName} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: childrenColors[index] }}
                  ></div>
                  <span className="text-sm text-gray-700 font-medium">{childName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Trends Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Weekly Attendance Trends</h2>
              <div className="flex items-center gap-2 text-blue-600">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Weekly Overview</span>
              </div>
            </div>
            <div className="relative h-64">
              {data?.attendanceTrends && data.attendanceTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.attendanceTrends.map(trend => ({
                      week: trend.weekLabel,
                      attendance: trend.weeklyAverage
                    }))}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="week" 
                      fontSize={12} 
                    />
                    <YAxis 
                      domain={[0, 100]}
                      fontSize={12}
                    />
                    <Tooltip 
                      formatter={(value) => [`${Math.round(Number(value))}%`, 'Attendance']}
                      labelFormatter={(label) => `Week: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">No Attendance Data</h3>
                    <p>Weekly attendance trend data is not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Behavior Log - Full Width */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Behavior Log</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 text-xl">Recent Activity</h3>
                <AlertTriangle className="w-7 h-7 text-orange-600" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {data?.behaviorLog && data.behaviorLog.length > 0 ? (
                  data.behaviorLog.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-xl border-l-4 ${item.type === 'Incident' ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-lg font-semibold text-gray-800 leading-relaxed">{item.label}</span>
                        <span
                          className={`px-4 py-2 text-sm font-bold rounded-full ${item.type === 'Incident' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} shadow-sm`}
                        >
                          {item.incidentType || item.type}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-16">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                    <h4 className="text-2xl font-bold mb-4">No Behavior Data</h4>
                    <p className="text-lg">No behavior log data available at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

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