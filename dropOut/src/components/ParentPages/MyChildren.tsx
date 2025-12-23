import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, Calendar, TrendingUp, User, Zap, List, ChevronDown, Bell, Menu, X } from 'lucide-react';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import pe1 from "../../img/pe1.png";
import pe2 from "../../img/pe2.png";
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar';

export default function MyChildren() {
  const [activeTab, setActiveTab] = useState('My Children');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  interface DashboardData {
    children: ChildData[];
    stats: StatsData;
  }
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  
  const navigate = useNavigate();
  const { user, token, parentId, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  React.useEffect(() => {
    const fetchDashboard = async () => {
      if (!parentId || !token) {
        setError('Missing parent ID or token');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/api/students/parent-dashboard/${parentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        const response = await res.json();
        
        const apiData = response.data;
        const transformedData: DashboardData = {
          children: apiData.children.map((child: { 
            name: string;
            grade?: string;
            overallAttendance?: number;
            gpa?: number;
            behaviorIncidents?: number;
            profileImage?: string;
          }) => {
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
              img: child.profileImage || undefined
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
          }
        };
        
        setDashboardData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [parentId, token]);

  const data: DashboardData | null = dashboardData;
  const atRiskCount = data?.children.filter(c => c.riskColor === 'red' || c.riskColor === 'orange').length || 0;
  const normalCount = data?.children.filter(c => c.riskColor === 'green').length || 0;

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
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Header - Made responsive */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Children Overview</h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">Track academic performance and attendance for all your children</p>
          </div>

          {/* Stats Cards - Responsive grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {/* Total Children */}
            <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 sm:p-4 lg:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600">Total Children</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{data?.stats?.totalChildren ?? '--'}</p>
                </div>
              </div>
            </div>

            {/* At-Risk Children */}
            <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 sm:p-4 lg:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-red-100 p-2 sm:p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600">At-Risk Children</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{atRiskCount}</p>
                </div>
              </div>
            </div>

            {/* Normal Status */}
            <div className="bg-white rounded-lg shadow-sm sm:shadow p-3 sm:p-4 lg:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600">Normal Status</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{normalCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Children Cards - Responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {data?.children && data.children.length > 0 ? (
              data.children.map((child, idx) => {
                const progressColor = child.riskColor === 'red' ? 'bg-red-500' : child.riskColor === 'orange' ? 'bg-orange-500' : 'bg-green-500';
                const bgColor = child.riskColor === 'red' ? 'bg-red-100' : child.riskColor === 'orange' ? 'bg-orange-100' : 'bg-green-100';
                const textColor = child.riskColor === 'red' ? 'text-red-700' : child.riskColor === 'orange' ? 'text-orange-700' : 'text-green-700';
                const dotColor = child.riskColor === 'red' ? 'bg-red-500' : child.riskColor === 'orange' ? 'bg-orange-500' : 'bg-green-500';
                
                return (
                  <div key={idx} className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start justify-between mb-4 sm:mb-5 lg:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={child.img || pe1} alt={child.name} className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover" />
                        <div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{child.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{child.grade} Student</p>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 ${bgColor} ${textColor} text-xs sm:text-sm rounded-full`}>
                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${dotColor} rounded-full`}></span>
                        <span className="hidden xs:inline">{child.risk}</span>
                        <span className="xs:hidden">{child.risk.split(' ')[0]}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-4 sm:mb-5 lg:mb-6">
                      {/* Attendance */}
                      <div>
                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                          <p className="text-xs sm:text-sm text-gray-600">Attendance</p>
                        </div>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{child.attendance}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div className={`${progressColor} h-1.5 sm:h-2 rounded-full`} style={{ width: `${child.attendance}%` }}></div>
                        </div>
                      </div>

                      {/* GPA */}
                      <div>
                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                          <p className="text-xs sm:text-sm text-gray-600">GPA</p>
                        </div>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{child.gpa}</p>
                        <p className="text-xs text-gray-500">Out of 4.0</p>
                      </div>
                    </div>

                    <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 sm:py-3 rounded-lg transition font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      View Full Profile
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center text-gray-400 py-8">No children data available.</div>
            )}
          </div>

          {/* Quick Actions - Responsive */}

          <div className="bg-white rounded-lg shadow-sm sm:shadow p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Quick Actions</h2>
                <p className="text-xs text-gray-600">Manage children's profiles</p>
              </div>
              <div className="bg-indigo-100 p-1.5 rounded-lg">
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
            </div>

            <div className="flex justify-between items-center gap-1.5">
              <button className="flex-1 max-w-[49%] bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 rounded-lg transition font-medium flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                <List className="w-3.5 h-3.5" />
                View at Risk
              </button>
              <button className="flex-1 max-w-[49%] bg-green-400 hover:bg-green-500 text-green-900 py-2.5 sm:py-3 rounded-lg transition font-medium flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                <List className="w-3.5 h-3.5" />
                View All Children
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}