import { useState, useEffect } from 'react'
import { useTheme } from '../Hod'
import { IoIosPeople, IoIosWarning, IoIosTime } from 'react-icons/io'
import { FaSearch, FaDownload, FaFilter, FaExternalLinkAlt, FaFileAlt, FaUser, FaClipboardCheck } from 'react-icons/fa'
import StudentForm from '../Forms/Student';
import StudentProfile from '../Forms/StudentProfile';
import { useUserAuth } from '../../context/useUserAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;


interface Student {
  id: string
  name: string
  studentId?: string
  grade?: string
  riskLevel: string
  attendance: number
  gpa: number
  courses?: string[]
}

interface StudentOverviewData {
  totalStudents: number
  totalAtRiskStudents: number
  todayAttendance: number
  students: Student[]
}

const Student = () => {
  const { theme } = useTheme()
  const { user, token } = useUserAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [showStudentForm, setShowStudentForm] = useState(false)
  const [showStudentProfile, setShowStudentProfile] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedRisk, setSelectedRisk] = useState('All Risk Levels')
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([])
  const [loadingCourses, setLoadingCourses] = useState(false)

  // Student overview data
  const [studentData, setStudentData] = useState<StudentOverviewData>({
    totalStudents: 0,
    totalAtRiskStudents: 0,
    todayAttendance: 0,
    students: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true)
      try {
        const response = await fetch(`${baseUrl}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        if (data && Array.isArray(data.data)) {
          setCourses(data.data.map((course: { id: string; name: string }) => ({
            id: course.id,
            name: course.name
          })))
        } else {
          setCourses([])
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoadingCourses(false)
      }
    }
    if (token) {
      fetchCourses()
    }
  }, [token])

  useEffect(() => {
    const fetchStudentOverview = async () => {
      if (!user?.schoolId || !token) return
      
      setLoading(true)
      setError(null)
      
      try {
        const res = await fetch(`${baseUrl}/api/principal/student-overview/${user.schoolId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (!res.ok) throw new Error('Failed to fetch student overview')
        
        const result = await res.json()
        
        if (result.success && result.data) {
          setStudentData(result.data)
        } else {
          setError(result.message || 'Error loading student data')
        }
      } catch (err: any) {
        setError(err.message || 'Error loading student data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchStudentOverview()
  }, [user?.schoolId, token])

  // Function to refresh student data
  const refreshStudentData = async () => {
    if (!user?.schoolId || !token) return
    
    try {
      const res = await fetch(`${baseUrl}/api/principal/student-overview/${user.schoolId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!res.ok) throw new Error('Failed to fetch student overview')
      
      const result = await res.json()
      
      if (result.success && result.data) {
        setStudentData(result.data)
      }
    } catch (err: any) {
      console.error('Error refreshing student data:', err)
    }
  }

  const students: Student[] = studentData.students

  const getRiskLevelColor = (riskLevel: string) => {
    const level = riskLevel?.toUpperCase()
    switch (level) {
      case 'HIGH':
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatRiskLevel = (riskLevel: string) => {
    const level = riskLevel?.toUpperCase()
    switch (level) {
      case 'HIGH':
      case 'CRITICAL':
        return 'High Risk'
      case 'MEDIUM':
        return 'Medium Risk'
      case 'LOW':
        return 'Low Risk'
      default:
        return riskLevel
    }
  }

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student)
    setShowStudentProfile(true)
  }

  // Filter students based on selected filters
  const filteredStudents = students.filter((student) => {
    // Filter by course
    const courseMatch = selectedCourse === 'All Courses' || 
      (student.courses && student.courses.some(course => {
        const selectedCourseName = courses.find(c => c.id === selectedCourse)?.name
        return selectedCourseName ? course === selectedCourseName : false
      }))
    
    // Filter by risk level
    const riskMatch = selectedRisk === 'All Risk Levels' || 
      formatRiskLevel(student.riskLevel) === selectedRisk
    
    // Filter by search term
    const searchMatch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return courseMatch && riskMatch && searchMatch
  })

  if (showStudentForm) {
    return <StudentForm onBack={() => setShowStudentForm(false)} onStudentCreated={refreshStudentData} />;
  }

  if (showStudentProfile && selectedStudent) {
    return <StudentProfile onBack={() => setShowStudentProfile(false)} studentId={selectedStudent.id} />;
  }

  if (isLoading || loading) {
    return (
      <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
          <div className="flex-1 min-w-0">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="flex space-x-3">
            <div className="h-10 bg-gray-200 rounded w-64"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-lg shadow-sm border p-4 lg:p-6 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className={`rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="flex space-x-3">
              <div className="h-10 bg-gray-200 rounded w-40"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className={`rounded-lg shadow-sm border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded mb-3"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-600">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Students Management
          </h1>
          <p className={`text-xs sm:text-sm lg:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Monitor and manage student dropout risk factors
          </p>
          </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-none sm:w-64 lg:w-80">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`} />
              <input
                type="text"
              placeholder="Search student"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          
          {/* Add Student Button */}
          <button 
            onClick={() => setShowStudentForm(true)}
            className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
          >
            <span className="text-sm sm:text-base">+</span>
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Students */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`text-xs lg:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Students</h3>
              <p className={`text-xl lg:text-2xl font-bold mt-1 transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{studentData.totalStudents}</p>
              <p className="text-xs lg:text-sm text-green-500 font-medium mt-1 flex items-center">
                <span className="mr-1">↑</span>
                +3.2% vs last term
              </p>
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2">
              <IoIosPeople className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* At-Risk Students */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`text-xs lg:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>At-Risk Students</h3>
              <p className={`text-xl lg:text-2xl font-bold mt-1 transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{studentData.totalAtRiskStudents}</p>
              <p className="text-xs lg:text-sm text-orange-500 font-medium mt-1 flex items-center">
                <span className="mr-1">↓</span>
                -8.1% vs last term
              </p>
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2">
              <IoIosWarning className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`text-xs lg:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Today's Attendance</h3>
              <p className={`text-xl lg:text-2xl font-bold mt-1 text-green-600`}>{studentData.todayAttendance}%</p>
              <p className={`text-xs lg:text-sm transition-colors duration-200 mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Today's attendance rate</p>
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2">
              <FaClipboardCheck className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`text-xs lg:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Pending Approvals</h3>
              <p className="text-xl lg:text-2xl font-bold mt-1 text-orange-600">12</p>
              <p className={`text-xs lg:text-sm transition-colors duration-200 mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>8 registrations, 4 timetable</p>
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2">
              <IoIosTime className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-3 xl:space-y-0">
          <h3 className={`text-xs sm:text-sm lg:text-base font-medium transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>Filters</h3>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {/* Course Filter */}
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                disabled={loadingCourses}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>

              {/* Risk Level Filter */}
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Risk Levels</option>
                <option>High Risk</option>
                <option>Medium Risk</option>
                <option>Low Risk</option>
              </select>
            </div>
            
            <button 
              onClick={() => {
                setSelectedCourse('All Courses')
                setSelectedRisk('All Risk Levels')
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-bold transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Students List Table */}
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
              Students List
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button className={`p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <FaFilter className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
              <thead className={`transition-colors duration-200 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <tr>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Student
                  </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Course
                  </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Risk Level
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  Attendance
                  </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                  GPA
                  </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-800 divide-gray-700' 
                  : 'bg-white divide-gray-200'
              }`}>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        No students found
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                  <tr key={student.id} className={`hover:transition-colors duration-200 ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                        <FaUser className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 truncate ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {student.name}
                        </div>
                        <div className={`text-xs transition-colors duration-200 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          ID: {student.id.substring(0, 8)}
                        </div>
                      </div>
                    </div>
                    </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.courses && student.courses.length > 0 ? student.courses.join(', ') : 'N/A'}
                    </div>
                    </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskLevelColor(student.riskLevel)}`}>
                      {formatRiskLevel(student.riskLevel)}
                      </span>
                    </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.attendance}%
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.gpa}
                    </div>
                    </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 lg:space-x-24">
                      <button 
                        onClick={() => handleViewProfile(student)}
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                        <span className="hidden sm:inline">View Profile</span>
                        <span className="sm:hidden">View</span>
                        </button>
                      <button className="text-orange-500 hover:text-orange-600 transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                        <FaFileAlt className="w-3 h-3" />
                        <span>Historic</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default Student
