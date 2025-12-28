import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  GraduationCap, 
  Users, 
  TrendingDown, 
  AlertCircle, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Calendar as CalendarIcon, 
  Shield,
  Menu,
  X,
  Bell,
  Calendar,
  BarChart3,
  Building2,
  CalendarDays,
  BookOpen,
  Settings,
  LogOut
} from 'lucide-react';
import { FaChalkboardTeacher } from "react-icons/fa";
import userr from "../../../src/img/userr.png"; // Update this path if needed
import { useUserAuth } from '../../context/useUserAuth'; // Update this path if needed

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

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
  
  const menuItems: MenuItem[] = [
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

export default function ExamPages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All Risk Levels');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const schools = [
    { id: 1, name: 'Westfield High School', region: 'Region A' },
    { id: 2, name: 'Washington High School', region: 'Region B' },
    { id: 3, name: 'Roosevelt Middle School', region: 'Region C' },
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base truncate max-w-[120px] sm:max-w-none">
                {user?.name || 'Education Organization'}
              </span>
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
                onClick={() => handleNavigation('/student-page', 'Students')}
                className="hover:text-orange-600 transition-colors"
              >
                Students
              </button>
              <button 
                onClick={() => handleNavigation('/teacher-page', 'Teachers')}
                className="hover:text-orange-600 transition-colors"
              >
                Teachers
              </button>
              <button 
                onClick={() => handleNavigation('/courses-timetable', 'Courses & Timetable')}
                className="hover:text-orange-600 transition-colors"
              >
                Courses & Timetable
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
              <img 
                src={userr} 
                alt="User profile" 
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" 
              />
              <span className="text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[100px] lg:max-w-none">
                {user?.name || 'Admin'}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Organization Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Filters Bar - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Filters:</span>
              
              {/* All Schools Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Schools</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* All Teachers Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Teachers</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* All Students Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Students</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* Save Filter Button */}
              <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap">
                Save Filter
              </button>
            </div>

            {/* Add School Button */}
            <button
              onClick={() => navigate('/add-school')}
              className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap mt-2 sm:mt-0"
            >
              + Add School
            </button>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Header with Region Selector and Clear All */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative inline-block">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>GASABO</option>
                  <option>KICUKIRO</option>
                  <option>NYARUGENGE</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Clear All
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Schools Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm font-medium">Schools</div>
                      <div className="text-2xl font-bold text-gray-900">3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Students Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm font-medium">Total Students</div>
                      <div className="text-2xl font-bold text-gray-900">1200</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dropout Rate Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm font-medium">Dropout Rate</div>
                      <div className="text-2xl font-bold text-gray-900">3%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* At-Risk Students Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm font-medium">At-Risk Students</div>
                      <div className="text-2xl font-bold text-gray-900">30</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Grades Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Academic Grades</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Latest Grades Card */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 relative">
                  <div className="absolute top-4 right-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 text-sm font-medium mb-1">Latest Grades</div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">B+</div>
                  <div className="text-blue-600 text-sm">Average: 85%</div>
                </div>

                {/* Attendance Card */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-100 relative">
                  <div className="absolute top-4 right-4">
                    <CalendarIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-green-600 text-sm font-medium mb-1">Attendance</div>
                  <div className="text-3xl font-bold text-green-700 mb-1">92%</div>
                  <div className="text-green-600 text-sm">This semester</div>
                </div>

                {/* Risk Level Card */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 relative">
                  <div className="absolute top-4 right-4">
                    <Shield className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-yellow-700 text-sm font-medium mb-1">Risk Level</div>
                  <div className="flex items-center gap-2 mt-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-lg font-semibold text-yellow-700">Medium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by School name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Region Filter */}
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full md:w-auto"
                  >
                    <option>All Regions</option>
                    <option>Region A</option>
                    <option>Region B</option>
                    <option>Region C</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Risk Level Filter */}
                <div className="relative">
                  <select
                    value={selectedRiskLevel}
                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full md:w-auto"
                  >
                    <option>All Risk Levels</option>
                    <option>Low Risk</option>
                    <option>Medium Risk</option>
                    <option>High Risk</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      School Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium text-sm">
                          {school.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">
                        {school.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Exams</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Profile</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
                <div className="text-sm text-gray-600">
                  Showing 1 to {filteredSchools.length} of {schools.length} schools
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1 text-gray-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button className="px-3.5 py-1.5 bg-orange-500 text-white rounded font-medium text-sm min-w-[36px]">
                    1
                  </button>
                  <button className="px-3.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 text-sm min-w-[36px]">
                    2
                  </button>
                  <button className="px-3.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 text-sm min-w-[36px]">
                    3
                  </button>
                  <button className="px-3.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 text-sm min-w-[36px]">
                    4
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1 text-gray-700 text-sm">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}