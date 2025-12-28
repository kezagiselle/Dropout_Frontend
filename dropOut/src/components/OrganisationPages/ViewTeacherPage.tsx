import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Edit2, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Bell,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { IoPersonSharp } from "react-icons/io5";
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar'; // Adjust path as needed
import userr from "../../../src/img/userr.png"; // Adjust path as needed
import { useUserAuth } from '../../context/useUserAuth'; // Adjust path as needed

export default function ViewTeacherPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [activeTab, setActiveTab] = useState('Teachers');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const teachers = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@school.edu',
      department: 'Mathematics',
      courses: ['Algebra', 'Calculus'],
      courseColors: ['bg-blue-100 text-blue-700', 'bg-blue-100 text-blue-700'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'David Smith',
      email: 'david.smith@school.edu',
      department: 'Science',
      courses: ['Biology', 'Chemistry'],
      courseColors: ['bg-green-100 text-green-700', 'bg-green-100 text-green-700'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Sarah Lee',
      email: 'sarah.lee@school.edu',
      department: 'English',
      courses: ['Literature', 'Writing'],
      courseColors: ['bg-purple-100 text-purple-700', 'bg-purple-100 text-purple-700'],
      status: 'On Leave'
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                onClick={() => handleNavigation('/teachers', 'Teachers')}
                className="hover:text-orange-600 transition-colors"
              >
                Teachers
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

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Teachers</h1>
            <p className="text-blue-600 text-sm mt-1">Westfield High School</p>
          </div>

          {/* Search and Filters - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-start md:items-center">
              {/* Search Bar */}
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              {/* Department Filter */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 w-full xs:w-auto">
                <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Department:</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full xs:w-auto px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                >
                  <option>All Departments</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2 w-full xs:w-auto">
                <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Status:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full xs:w-auto px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 self-start xs:self-center mt-2 xs:mt-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>

          {/* Table - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teacher Name
                    </th>
                    <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Courses
                    </th>
                    <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex items-center justify-center flex-shrink-0">
                            <IoPersonSharp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{teacher.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">{teacher.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4 text-xs sm:text-sm text-gray-700 truncate">
                        {teacher.department}
                      </td>
                      <td className="px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {teacher.courses.map((course, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${teacher.courseColors[idx]} truncate max-w-[100px] sm:max-w-none`}
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
                        <span
                          className={`inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
                            teacher.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          } whitespace-nowrap`}
                        >
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
                        <button className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-800 text-xs sm:text-sm whitespace-nowrap">
                          <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="hidden xs:inline">View Profile</span>
                          <span className="xs:hidden">View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination - Enhanced Responsiveness */}
            <div className="px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4 border-t flex flex-col xs:flex-row items-center justify-between gap-2 sm:gap-3">
              <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap mb-2 xs:mb-0">
                Showing 1 to {filteredTeachers.length} of {teachers.length} results
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-orange-500 text-white rounded text-xs sm:text-sm font-medium flex items-center justify-center">
                  1
                </button>
                <button className="px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}