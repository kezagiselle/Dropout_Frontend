import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, School, AlertTriangle, CheckCircle, Download, BookOpen, FileText, HelpCircle, Wrench, MessageCircle, Menu, X } from 'lucide-react';
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar'; 

export default function OrganDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const navigate = useNavigate();

  const handleNavigation = (path: string, tabName: string) => {
    navigate(path);
    setActiveTab(tabName);
    setSidebarOpen(false); 
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {sidebarOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>

                {/* Dashboard Title */}
                <div className="flex-1 ml-4 lg:ml-0">
                  <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Organization Dashboard</h1>
                  <p className="text-sm text-gray-600 mt-1">Overview of all educational institutions under management</p>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Organization Admin!</h2>
                <p className="text-blue-100">Monitor performance, track interventions, and manage all educational institutions from one dashboard.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className={`flex items-center text-sm ${stat.positive === true ? 'text-green-600' : stat.positive === false ? 'text-red-600' : 'text-gray-500'}`}>
                      {stat.positive === true && '↑'}
                      {stat.positive === false && '↓'}
                      {stat.positive === null && '→'}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dropout Risk Trends */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Dropout Risk Trends</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View Details →</button>
                  </div>
                  <div className="relative h-64">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      {/* Area chart simulation */}
                      <defs>
                        <linearGradient id="highRisk" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="medRisk" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#fb923c" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="lowRisk" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                      
                      {/* Low Risk */}
                      <path d="M 20 180 L 60 175 L 100 178 L 140 180 L 180 176 L 220 178 L 260 180 L 300 177 L 340 180 L 380 178 L 380 200 L 20 200 Z" 
                            fill="url(#lowRisk)" />
                      
                      {/* Medium Risk */}
                      <path d="M 20 100 L 60 95 L 100 98 L 140 92 L 180 96 L 220 90 L 260 94 L 300 88 L 340 92 L 380 90 L 380 180 L 340 180 L 300 177 L 260 180 L 220 178 L 180 176 L 140 180 L 100 178 L 60 175 L 20 180 Z" 
                            fill="url(#medRisk)" />
                      
                      {/* High Risk */}
                      <path d="M 20 40 L 60 35 L 100 38 L 140 32 L 180 36 L 220 30 L 260 34 L 300 28 L 340 32 L 380 30 L 380 90 L 340 92 L 300 88 L 260 94 L 220 90 L 180 96 L 140 92 L 100 98 L 60 95 L 20 100 Z" 
                            fill="url(#highRisk)" />
                      
                      {/* X-axis labels */}
                      <text x="20" y="195" fontSize="10" fill="#666">Jan</text>
                      <text x="80" y="195" fontSize="10" fill="#666">Feb</text>
                      <text x="140" y="195" fontSize="10" fill="#666">Mar</text>
                      <text x="200" y="195" fontSize="10" fill="#666">Apr</text>
                      <text x="260" y="195" fontSize="10" fill="#666">May</text>
                      <text x="320" y="195" fontSize="10" fill="#666">Jun</text>
                      <text x="360" y="195" fontSize="10" fill="#666">Jul</text>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-500"></div>
                      <span className="text-gray-600">High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-400"></div>
                      <span className="text-gray-600">Medium Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-400"></div>
                      <span className="text-gray-600">Low Risk</span>
                    </div>
                  </div>
                </div>

                {/* Policy Impact Analysis */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Policy Impact Analysis</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View Details →</button>
                  </div>
                  <div className="h-64 flex items-end justify-around gap-2 px-4">
                    {[
                      { label: 'Dropout Rate', before: 8, after: 4 },
                      { label: 'Attendance', before: 70, after: 87 },
                      { label: 'Performance', before: 65, after: 72 },
                      { label: 'Teacher Retention', before: 75, after: 85 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex gap-1 items-end h-48">
                          <div className="flex-1 bg-gray-300 rounded-t" style={{ height: `${item.before}%` }}></div>
                          <div className="flex-1 bg-blue-400 rounded-t" style={{ height: `${item.after}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-600 text-center mt-2">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-300"></div>
                      <span className="text-gray-600">Before Policy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-blue-400"></div>
                      <span className="text-gray-600">After Policy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts and Reports Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Alerts & Notifications */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View All →</button>
                  </div>
                  <div className="space-y-3">
                    {alerts.map((alert, idx) => (
                      <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
                        alert.color === 'red' ? 'bg-red-50 border-red-500' :
                        alert.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                        'bg-blue-50 border-blue-500'
                      }`}>
                        <span className="text-xl">{alert.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{alert.title}</h3>
                          <p className="text-gray-600 text-xs mt-1">{alert.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aggregated Reports */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Aggregated Reports</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View All →</button>
                  </div>
                  <div className="space-y-3">
                    {reports.map((report, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{report.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{report.title}</h3>
                            <p className="text-gray-600 text-xs mt-1">{report.subtitle}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {quickAccess.map((item, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleNavigation(item.path, item.label)}
                      className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all"
                    >
                      <item.icon className={`w-8 h-8 mb-2 text-blue-500`} />
                      <span className="text-sm font-medium text-gray-700 text-center">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}