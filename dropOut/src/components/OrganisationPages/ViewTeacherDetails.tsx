import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Bell,
  Calendar,
  ChevronDown,
  ArrowLeft,
  BookOpen,
  Users
} from 'lucide-react';
import OrganizationSidebar from './OrganisationSideBar';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Teacher {
  teacherId: string;
  name: string;
  specialization: string;
  coursesTeaching: number;
  courseNames: string[];
  totalStudents: number;
}

interface TeachersData {
  totalCourses: number;
  totalStudents: number;
  teachers: Teacher[];
}

export default function ViewTeacherDetails() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [activeTab, setActiveTab] = useState('Teachers');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useUserAuth();
  
  // API integration state
  const [teachersData, setTeachersData] = useState<TeachersData>({
    totalCourses: 0,
    totalStudents: 0,
    teachers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const schoolId = location.state?.schoolId;

  // Fetch teachers data from API
  useEffect(() => {
    const fetchTeachersData = async () => {
      if (!token || !schoolId) {
        setError('Missing authentication or school ID');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${baseUrl}/api/government/schools/${schoolId}/teachers`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setTeachersData(result.data);
        } else {
          setError(result.message || 'Failed to fetch teachers data');
        }
      } catch (err) {
        setError('Failed to load teachers data');
        console.error('Teachers API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachersData();
  }, [token, schoolId]);

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
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
                onClick={() => handleNavigation('/organ-settings', 'Settings')}
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
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/teacher-page')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Schools
          </button>

          {loading ? (
            /* Skeleton Loading */
            <div className="animate-pulse">
              {/* Stats Cards Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
              
              {/* Table Skeleton */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Courses</div>
                      <div className="text-2xl font-bold text-gray-900">{teachersData.totalCourses}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Students</div>
                      <div className="text-2xl font-bold text-gray-900">{teachersData.totalStudents}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by teacher name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Teachers Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Name</th>
                        <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Specialization</th>
                        <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Courses Teaching</th>
                        <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Course Names</th>
                        <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Total Students</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {teachersData.teachers.length > 0 ? (
                        teachersData.teachers
                          .filter(teacher => 
                            teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((teacher) => (
                            <tr key={teacher.teacherId} className="hover:bg-gray-50 transition-colors">
                              <td className="px-3 py-3 sm:px-4 sm:py-4 text-gray-700 text-xs sm:text-sm font-medium whitespace-nowrap">
                                {teacher.name}
                              </td>
                              <td className="px-3 py-3 sm:px-4 sm:py-4 text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                                {teacher.specialization}
                              </td>
                              <td className="px-3 py-3 sm:px-4 sm:py-4 text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                                {teacher.coursesTeaching}
                              </td>
                              <td className="px-3 py-3 sm:px-4 sm:py-4 text-gray-700 text-xs sm:text-sm">
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {teacher.courseNames.length > 0 ? (
                                    teacher.courseNames.map((course, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                                        {course}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-gray-400 text-xs">No courses</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-3 py-3 sm:px-4 sm:py-4 text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                                {teacher.totalStudents}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-400">
                            No teachers found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}