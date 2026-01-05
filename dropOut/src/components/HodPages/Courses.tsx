import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../Hod'
import { useUserAuth } from '../../context/useUserAuth'
import { IoIosPeople } from 'react-icons/io'
import { FaSearch, FaDownload, FaFilter, FaBook, FaFileAlt, FaFire, FaSync } from 'react-icons/fa'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { MdCancel } from 'react-icons/md'
import Course from '../Forms/Course'

// Removed unused Course interface


interface Course {
  name: string;
  grade: string;
  credits: number;
  teacherName: string;
  active: boolean;
  enrollmentCount: number;
  atRiskStudents: number;
}

const Courses = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const { user, token } = useUserAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalActiveCourses: 0,
    totalInactiveCourses: 0,
    totalTeachers: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError('');
    let apiStats = {
      totalCourses: 0,
      totalActiveCourses: 0,
      totalInactiveCourses: 0,
      totalTeachers: 0
    };
    let apiCourses: Course[] = [];
    try {
      const schoolId = user?.schoolId;
      if (!schoolId || !token) {
        setError('No schoolId or token found');
      } else {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/api/courses/stats/${schoolId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success && data.data) {
          apiStats = {
            totalCourses: data.data.totalCourses ?? 0,
            totalActiveCourses: data.data.totalActiveCourses ?? 0,
            totalInactiveCourses: data.data.totalInactiveCourses ?? 0,
            totalTeachers: data.data.totalTeachers ?? 10
          };
          apiCourses = data.data.courses || [];
        } else {
          setError(data.message || 'Failed to fetch courses');
        }
      }
    } catch {
      // Swallow error, UI will show empty data
    }
    setStats(apiStats);
    setCourses(apiCourses);
    setLoading(false);
  }, [user, token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (showCourseForm) {
    return <Course onBack={() => setShowCourseForm(false)} onCourseCreated={fetchCourses} />;
  }

  // Removed unused getStatusColor and getTimetableColor functions

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {loading && (
        <div className="w-full text-center py-2 text-blue-500">Loading courses...</div>
      )}
      {error && (
        <div className="w-full text-center py-2 text-red-500">{error}</div>
      )}
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Courses & Timetable Management
          </h1>
          <p className={`text-xs sm:text-sm lg:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Monitor and manage courses.
          </p>
        </div>
        
        <button 
          onClick={() => setShowCourseForm(true)}
          className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
        >
          <span className="text-sm sm:text-base">+</span>
          <span>Add Course</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Teachers */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Teachers
              </p>
              <p className="text-3xl font-bold mt-2 text-green-400">{stats.totalTeachers}</p>
              <div className="flex items-center mt-2">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-600 font-medium">↑ +3.2% vs last term</span>
              </div>
            </div>
            <LiaChalkboardTeacherSolid className="w-6 h-6 text-green-400 ml-4" />
          </div>
        </div>

        {/* Total Courses */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Courses
              </p>
              <p className="text-3xl font-bold mt-2 text-blue-400">{stats.totalCourses}</p>
            </div>
            <FaBook className="w-5 h-5 text-blue-400 ml-4" />
          </div>
        </div>

        {/* Active Sections (use totalActiveCourses) */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active Courses
              </p>
              <p className="text-3xl font-bold mt-2 text-orange-400">{stats.totalActiveCourses}</p>
            </div>
            <IoIosPeople className="w-6 h-6 text-orange-400 ml-4" />
          </div>
        </div>

        {/* Inactive Courses (use totalInactiveCourses) */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Inactive Courses
              </p>
              <p className="text-3xl font-bold mt-2 text-red-600">{stats.totalInactiveCourses}</p>
            </div>
            <MdCancel className="w-6 h-6 text-red-500 ml-4" />
          </div>
        </div>
      </div>

      {/* Course Overview Section */}
      <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Table Header */}
        <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Course Overview
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-colors duration-200 w-full sm:w-auto">
                <FaFilter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-orange-500 transition-colors duration-200">
              <tr>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  <span className="hidden sm:inline">Course Name</span>
                  <span className="sm:hidden">Course</span>
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Grade
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Teacher
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  <span className="hidden sm:inline">Credit Hours</span>
                  <span className="sm:hidden">Hours</span>
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Status
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  <span className="hidden sm:inline">Enrolled Students</span>
                  <span className="sm:hidden">Enrolled</span>
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  <span className="hidden sm:inline">At Risk Students</span>
                  <span className="sm:hidden">At Risk</span>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-800 divide-gray-700' 
                : 'bg-white divide-gray-200'
            }`}>
              {courses.length > 0 ? (
                courses
                  .filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((course, idx) => (
                    <tr key={idx} className={`hover:transition-colors duration-200 ${
                      theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}>
                      <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{course.name}</div>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{course.grade}</div>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{course.teacherName}</div>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{course.credits}</div>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-full ${course.active ? 'bg-green-600 text-white font-bold' : 'bg-gray-600 text-white font-bold'}`}> 
                          {course.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{course.enrollmentCount}</div>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{course.atRiskStudents}</div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">No courses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

  {/* Removed Weekly Timetable Section and related code (timetable, getTimetableColor) */}

      {/* Action Buttons */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-end space-y-3 lg:space-y-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-colors duration-200">
            <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-colors duration-200">
            <FaFileAlt className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Export Excel</span>
            <span className="sm:hidden">Excel</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:ml-8 xl:ml-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-colors duration-200">
            <FaFire className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Publish Changes</span>
            <span className="sm:hidden">Publish</span>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium transition-colors duration-200">
            <FaSync className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Sync Updates</span>
            <span className="sm:hidden">Sync</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Courses
