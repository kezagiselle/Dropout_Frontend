import { useState, useEffect } from 'react';
import { ChevronDown, Calendar, BarChart3, Bell, Search, Menu, X, FileText, Eye, TrendingUp, ArrowLeft } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom'; 
import { useUserAuth } from '../../context/useUserAuth';
import StudentSidebar from './StudentSidebar';

const baseUrl = import.meta.env.VITE_API_BASE_URL; 


interface Mark {
  type: string;
  title: string;
  score: number;
}

interface CourseData {
  courseName: string;
  currentGpa: number;
  marks: Mark[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: CourseData[];
}

const StudentClasses = () => {
  const [activeTab, setActiveTab] = useState<string>('My Classes');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [termFilter, setTermFilter] = useState<string>('Term 2 - 2025');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { user, token } = useUserAuth(); 

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  // Fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!token || !user?.studentId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${baseUrl}/api/students/${user.studentId}/course-overview`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }

        const result: ApiResponse = await response.json();
        
        if (result.success) {
          setCourseData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch course data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching course data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [token, user?.studentId]);

  const handleSeeMarks = (courseName: string, marks: Mark[]) => {
    // Navigate to marks detail page with course data
    navigate('/student-marks', { 
      state: { 
        courseName, 
        marks,
        studentName: user?.name || 'Student'
      } 
    });
  };

  const getGradeColor = (grade: number): string => {
    if (grade >= 18) return 'bg-indigo-500';
    if (grade >= 16) return 'bg-green-500';
    if (grade >= 14) return 'bg-teal-500';
    if (grade >= 12) return 'bg-purple-500';
    return 'bg-blue-500';
  };

  // Filter courses based on search query
  const filteredCourses = courseData.filter(course =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                onClick={() => handleNavigation('/student-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/student-class', 'My Classes')}
                className="hover:text-orange-600 transition-colors"
              >
                Classes
              </button>
              <button 
                onClick={() => handleNavigation('/my-assignments', 'My Assignments')}
                className="hover:text-orange-600 transition-colors"
              >
                Assignments
              </button>
              <button 
                onClick={() => handleNavigation('/student-settings', 'My Profile')}
                className="hover:text-orange-600 transition-colors"
              >
                My Profile
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Student'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <StudentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
            {loading ? (
              // Skeleton Loading
              <div className="animate-pulse">
                {/* Header Skeleton */}
                <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 mb-6">
                  <div className="bg-gray-200 rounded w-32 h-6 mb-4"></div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-200 rounded w-24 h-8"></div>
                    <div className="bg-gray-200 rounded w-40 h-10"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-gray-200 rounded w-20 h-8"></div>
                    <div className="bg-gray-200 rounded w-28 h-8"></div>
                  </div>
                </div>
                
                {/* Course Cards Skeleton */}
                <div className="grid gap-4 sm:gap-6 lg:gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6">
                        <div className="bg-gray-200 rounded w-48 h-6 mb-2"></div>
                        <div className="bg-gray-200 rounded w-24 h-8"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <div className="bg-gray-200 rounded w-16 h-4 mb-2"></div>
                            <div className="bg-gray-200 rounded w-12 h-6"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Courses</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleNavigation('/student-dash', 'Dashboard')}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Dashboard</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Classes</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">View your enrolled subjects, teachers, and schedules.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select 
                    value={termFilter}
                    onChange={(e) => setTermFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Term 2 - 2025</option>
                    <option>Term 1 - 2025</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Course or Subject"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-sm text-gray-600">
                  Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                </p>
              </div>
              <p className="text-sm text-gray-500 hidden sm:block">
                Total courses: {courseData.length}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {/* Summary Cards */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
              {/* Total Enrolled Classes */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Enrolled Classes</p>
                    <p className="text-2xl font-bold text-gray-900">{courseData.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <SiGoogleclassroom className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Active courses</p>
              </div>

              {/* Average GPA */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average GPA</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courseData.length > 0 
                        ? ((courseData.reduce((sum, course) => sum + course.currentGpa, 0) / courseData.length)).toFixed(1)
                        : '0.0'
                      }/20
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Overall performance</p>
              </div>

              {/* Total Assessments */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courseData.reduce((sum, course) => sum + course.marks.length, 0)}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Across all courses</p>
              </div>

              {/* Highest GPA */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Highest GPA</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courseData.length > 0 
                        ? Math.max(...courseData.map(course => course.currentGpa)).toFixed(1)
                        : '0.0'
                      }/20
                    </p>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Best performance</p>
              </div>
            </div>
          )}

          {/* Classes Grid - Updated for API data */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {filteredCourses.map((course, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg sm:text-xl text-blue-600">
                        📚
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{course.courseName}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">{course.marks.length} assessment{course.marks.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Current GPA</span>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{course.currentGpa.toFixed(1)}/20</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getGradeColor(course.currentGpa)}`}
                        style={{ width: `${(course.currentGpa / 20) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSeeMarks(course.courseName, course.marks)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    See Marks
                  </button>
                </div>
              ))}
            </div>
          )}
              </>
            )}
        </main>
      </div>
    </div>
  );
};

export default StudentClasses;