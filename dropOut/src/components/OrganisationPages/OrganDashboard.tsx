import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, School, AlertTriangle, CheckCircle, Download, BookOpen, FileText, HelpCircle, Wrench, MessageCircle, Menu, X, Bell, ChevronDown, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar'; 
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

export default function OrganDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Total Students', value: '2,932', change: '+2.4%', icon: GraduationCap, positive: true, color: 'blue' },
    { label: 'Total Teachers', value: '200', change: '+1.8%', icon: Users, positive: true, color: 'green' },
    { label: 'Total Schools', value: '2', change: '0.0%', icon: School, positive: null, color: 'orange' },
    { label: 'Dropout Rate', value: '4.2%', change: '-0.8%', icon: AlertTriangle, positive: true, color: 'yellow' },
    { label: 'Average Attendance', value: '87.3%', change: '+0.5%', icon: CheckCircle, positive: true, color: 'teal' }
  ];

  const alerts = [
    { type: 'critical', icon: '🔴', title: 'Critical: 15 schools exceed 15% dropout rate', subtitle: 'Northern Region - Immediate intervention required', color: 'red' },
    { type: 'warning', icon: '⚠️', title: 'Warning: Attendance below 80% in 32 schools', subtitle: 'Eastern Region - Monitor closely', color: 'yellow' },
    { type: 'info', icon: 'ℹ️', title: 'Info: Monthly reports due in 5 days', subtitle: 'All regions - Prepare submissions', color: 'blue' }
  ];

  const reports = [
    { title: 'National Attendance Report', subtitle: 'Q3 2024 - All Regions', icon: '📄', color: 'red' },
    { title: 'Academic Performance Summary', subtitle: 'District Level - September 2024', icon: '📊', color: 'green' },
    { title: 'Behavioral Trends Report', subtitle: 'Monthly Analysis - All Schools', icon: '📋', color: 'yellow' }
  ];

  const quickAccess = [
    { label: 'Schools', icon: School, color: 'yellow', path: '/schools' },
    { label: 'Reports', icon: FileText, color: 'yellow', path: '/reports' },
    { label: 'Policy Analysis', icon: HelpCircle, color: 'blue', path: '/policy-analysis' },
    { label: 'Interventions', icon: Wrench, color: 'blue', path: '/interventions' },
    { label: 'Communication Hub', icon: MessageCircle, color: 'blue', path: '/communication' }
  ];

  // Dropout Risk Trends Data for Recharts
  const dropoutData = [
    { month: 'Jan', highRisk: 45, mediumRisk: 30, lowRisk: 25 },
    { month: 'Feb', highRisk: 42, mediumRisk: 32, lowRisk: 26 },
    { month: 'Mar', highRisk: 38, mediumRisk: 35, lowRisk: 27 },
    { month: 'Apr', highRisk: 35, mediumRisk: 38, lowRisk: 27 },
    { month: 'May', highRisk: 32, mediumRisk: 40, lowRisk: 28 },
    { month: 'Jun', highRisk: 30, mediumRisk: 42, lowRisk: 28 },
    { month: 'Jul', highRisk: 28, mediumRisk: 43, lowRisk: 29 },
    { month: 'Aug', highRisk: 26, mediumRisk: 44, lowRisk: 30 },
    { month: 'Sep', highRisk: 24, mediumRisk: 45, lowRisk: 31 },
    { month: 'Oct', highRisk: 22, mediumRisk: 46, lowRisk: 32 },
    { month: 'Nov', highRisk: 20, mediumRisk: 47, lowRisk: 33 },
    { month: 'Dec', highRisk: 18, mediumRisk: 48, lowRisk: 34 },
  ];

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
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.name || 'Education Organization'}</span>
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
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Organization Admin'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Use the OrganizationSidebar component */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          {/* Dashboard Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Organization Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Monitor performance, track interventions, and manage all educational institutions from one dashboard.</p>
          </div>

          {/* Stats Cards - Improved Responsiveness */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-gray-600 text-xs sm:text-sm font-medium">{stat.label}</span>
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${stat.color}-500`} />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className={`flex items-center text-xs sm:text-sm ${stat.positive === true ? 'text-green-600' : stat.positive === false ? 'text-red-600' : 'text-gray-500'}`}>
                  {stat.positive === true && '↑'}
                  {stat.positive === false && '↓'}
                  {stat.positive === null && '→'}
                  <span className="ml-1">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row - Improved Responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Dropout Risk Trends with Recharts */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Dropout Risk Trends</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 self-start sm:self-auto">View Details →</button>
              </div>
              <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dropoutData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#6b7280', fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value}%`, 'Risk Level']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="highRisk" 
                      stackId="1"
                      stroke="#ef4444" 
                      fill="#fecaca"
                      fillOpacity={0.8}
                      name="High Risk"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mediumRisk" 
                      stackId="1"
                      stroke="#f97316" 
                      fill="#fed7aa"
                      fillOpacity={0.8}
                      name="Medium Risk"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lowRisk" 
                      stackId="1"
                      stroke="#22c55e" 
                      fill="#bbf7d0"
                      fillOpacity={0.8}
                      name="Low Risk"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-500"></div>
                  <span className="text-gray-600">High Risk</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-orange-500"></div>
                  <span className="text-gray-600">Medium Risk</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-500"></div>
                  <span className="text-gray-600">Low Risk</span>
                </div>
              </div>
            </div>

            {/* Policy Impact Analysis */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Policy Impact Analysis</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 self-start sm:self-auto">View Details →</button>
              </div>
              <div className="h-48 sm:h-64 flex items-end justify-around gap-1 sm:gap-2 px-2 sm:px-4">
                {[
                  { label: 'Dropout Rate', before: 8, after: 4 },
                  { label: 'Attendance', before: 70, after: 87 },
                  { label: 'Performance', before: 65, after: 72 },
                  { label: 'Teacher Retention', before: 75, after: 85 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 sm:gap-1 items-end h-32 sm:h-48">
                      <div className="flex-1 bg-gray-300 rounded-t" style={{ height: `${item.before}%` }}></div>
                      <div className="flex-1 bg-blue-400 rounded-t" style={{ height: `${item.after}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-600 text-center mt-1 sm:mt-2 whitespace-nowrap">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-gray-300"></div>
                  <span className="text-gray-600">Before Policy</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-blue-400"></div>
                  <span className="text-gray-600">After Policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts and Reports Row - Improved Responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Alerts & Notifications */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 self-start sm:self-auto">View All →</button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {alerts.map((alert, idx) => (
                  <div key={idx} className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border-l-4 ${
                    alert.color === 'red' ? 'bg-red-50 border-red-500' :
                    alert.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <span className="text-lg sm:text-xl">{alert.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{alert.title}</h3>
                      <p className="text-gray-600 text-xs mt-0.5 sm:mt-1 truncate">{alert.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aggregated Reports - Darker/Less Bright Blue Buttons */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Aggregated Reports</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 self-start sm:self-auto">View All →</button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {reports.map((report, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2 sm:gap-0">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">{report.icon}</span>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{report.title}</h3>
                        <p className="text-gray-600 text-xs mt-0.5 sm:mt-1 truncate">{report.subtitle}</p>
                      </div>
                    </div>
                    {/* Updated: Darker blue buttons - changed from bg-blue-50 to bg-blue-100, text-blue-600 to text-blue-700 */}
                    <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs sm:text-sm mt-2 sm:mt-0 self-start sm:self-auto">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Access - Improved Responsiveness */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
              {quickAccess.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleNavigation(item.path, item.label)}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all"
                >
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 sm:mb-2 text-blue-500" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}