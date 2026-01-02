import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  School, 
  Users, 
  AlertTriangle, 
  UserX, 
  BarChart3, 
  TrendingDown, 
  Calendar, 
  FileText, 
  Eye, 
  Download,
  Building2,
  BookOpen,
  CalendarDays,
  Settings,
  LogOut,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { useUserAuth } from '../../context/useUserAuth';
import userr from "../../../src/img/userr.png";

// Sidebar Component
interface OrganizationSidebarProps {
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigation: (path: string, tabName: string) => void;
}

const OrganizationSidebar: React.FC<OrganizationSidebarProps> = ({ 
  activeTab, 
  sidebarOpen, 
  setSidebarOpen, 
  handleNavigation 
}) => {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Building2, label: 'Schools', path: '/org-schools' },
    { icon: Users, label: 'Students', path: '/student-page' },
    { icon: FaChalkboardTeacher, label: 'Teachers', path: '/teacher-page' },
    { icon: BookOpen, label: 'Courses & Timetable', path: '/course-timetable' },
    { icon: CalendarDays, label: 'Exams & Grades', path: '/exams-grades' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/organization-settings' }
  ];

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
    >
      {/* Mobile Close Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <nav className="p-3 sm:p-4 relative z-50 bg-white h-full flex flex-col">
        <div className="flex-1">
          {/* Dashboard Button */}
          <button 
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 ${
              activeTab === 'Dashboard' 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
            }`}
            onClick={() => handleNavigation('/org-dash', 'Dashboard')}
          >
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Dashboard</span>
          </button>
          
          {/* Menu Items */}
          {menuItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <button 
                key={idx} 
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 ${
                  activeTab === item.label 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout Button pinned to sidebar bottom */}
        <div className="mt-4 mb-2">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200 text-base bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

// Main ReportPage Component
export default function ReportPage() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Reports');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const schools = [
    { name: 'Westfield High School', region: 'Region A' },
    { name: 'Washington High School', region: 'Region B' },
    { name: 'Roosevelt Middle School', region: 'Region C' },
  ];

  const reports = [
    { name: 'Student Performance Report - Q4 2024', date: 'Jan 15, 2025', status: 'Ready' },
    { name: 'Attendance Summary - December 2024', date: 'Jan 12, 2025', status: 'In Progress' },
    { name: 'Regional Analysis - All Regions', date: 'Jan 10, 2025', status: 'Ready' },
  ];

  // Handle navigation to different tabs
  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
                onClick={() => handleNavigation('/organ-report', 'Reports')}
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
        {/* Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-sm font-medium text-gray-700">Filters:</span>
              
              {/* All Schools Dropdown */}
              <div className="relative">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-400 transition-colors text-sm">
                  <span className="text-gray-700">All Schools</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Teachers Dropdown */}
              <div className="relative">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-400 transition-colors text-sm">
                  <span className="text-gray-700">All Teachers</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Students Dropdown */}
              <div className="relative">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-400 transition-colors text-sm">
                  <span className="text-gray-700">All Students</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Save Filter Button */}
              <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                Save Filter
              </button>
            </div>

            {/* Generate Report Button */}
            <button className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium whitespace-nowrap">
              + Generate Report
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded">
                  <School className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Schools</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1200</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3%</div>
                  <div className="text-sm text-gray-600">Dropout Rate</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded">
                  <UserX className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">30</div>
                  <div className="text-sm text-gray-600">At-Risk Students</div>
                </div>
              </div>
            </div>
          </div>

          {/* Select Report Type */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Report Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-white rounded-lg p-6 shadow-sm border-2 border-orange-500 hover:shadow-md transition-shadow text-left">
                <FileText className="w-8 h-8 text-orange-500 mb-3" />
                <div className="font-semibold text-gray-900 mb-1">Student Performance Report</div>
                <div className="text-sm text-gray-600">Academic performance metrics</div>
              </button>

              <button className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
                <TrendingDown className="w-8 h-8 text-blue-500 mb-3" />
                <div className="font-semibold text-gray-900 mb-1">Dropout Statistics</div>
                <div className="text-sm text-gray-600">Student dropout analysis</div>
              </button>

              <button className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
                <Calendar className="w-8 h-8 text-green-500 mb-3" />
                <div className="font-semibold text-gray-900 mb-1">Attendance Summary</div>
                <div className="text-sm text-gray-600">Student attendance data</div>
              </button>

              <button className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
                <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                <div className="font-semibold text-gray-900 mb-1">Regional Analysis</div>
                <div className="text-sm text-gray-600">Regional performance comparison</div>
              </button>
            </div>
          </div>

          {/* Report Parameters */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Parameters</h2>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by School name"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Regions</option>
                    <option>Region A</option>
                    <option>Region B</option>
                    <option>Region C</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <span>▶</span>
              Generate Report
            </button>
          </div>

          {/* Schools Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">School Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Region</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schools.map((school, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
                          {school.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{school.region}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                            <span>🔔</span>
                            Generate Report
                          </button>
                          <a href="#" className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                            <span>↗</span>
                            View Profile
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1 to 6 of 24 schools
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">2</button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">3</button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">4</button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Generated Reports */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Generated Reports</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Report Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date Generated</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{report.name}</td>
                      <td className="px-6 py-4 text-gray-700">{report.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          report.status === 'Ready' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}