import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronDown, 
  Calendar, 
  Eye, 
  FileText, 
  BarChart,
  BarChart3, 
  Building2, 
  Users, 
  CalendarDays,
  BookOpen,
  Settings,
  LogOut,
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
    { icon: FileText, label: 'Reports', path: '/organ-report' },
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

// Main ReportsView Component
export default function ReportsView() {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [department, setDepartment] = useState('HoD');
  const [grade, setGrade] = useState('All Grades');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Reports');
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleClearFilters = () => {
    setReportType('');
    setStartDate('');
    setEndDate('');
    setDepartment('HoD');
    setGrade('All Grades');
  };

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

  // Handle Back button click - navigates back to ReportPage
  const handleBackButton = () => {
    navigate('/organ-report'); // Navigate to the ReportPage
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
        <main className="flex-1 min-w-0">
          {/* Page Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
                <p className="text-blue-500 text-sm mt-1">Westfield High School</p>
              </div>
              <button 
                onClick={handleBackButton}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
              {/* Report Generation Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Report Generation</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Configure your report parameters and generate comprehensive reports
                </p>

                {/* Select Report Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Select Report Type
                  </label>
                  <div className="relative">
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                    >
                      <option value="">Choose report type...</option>
                      <option value="performance">Student Performance Report</option>
                      <option value="attendance">Attendance Summary</option>
                      <option value="dropout">Dropout Statistics</option>
                      <option value="regional">Regional Analysis</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Filters */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                      >
                        <option value="HoD">HoD</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                        <option value="History">History</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Grade/Class */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade/Class
                    </label>
                    <div className="relative">
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                      >
                        <option value="All Grades">All Grades</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Preview */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Report Preview</h3>
                </div>
                
                <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 py-12 sm:py-16 flex flex-col items-center justify-center">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center text-sm sm:text-base">
                    Select report type and filters to see preview
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  <BarChart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Generate Report
                </button>
                <button 
                  onClick={handleClearFilters}
                  className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}