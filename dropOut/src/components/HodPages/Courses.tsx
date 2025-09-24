import { useState } from 'react'
import { useTheme } from '../Hod'
import { IoIosPeople } from 'react-icons/io'
import { FaSearch, FaDownload, FaFilter, FaPlus, FaBook, FaFileAlt, FaFire, FaSync } from 'react-icons/fa'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { MdCancel } from 'react-icons/md'
import Course from '../Forms/Course'

interface Course {
  id: number
  courseCode: string
  courseName: string
  grade: string
  teacher: string
  section: string
  creditHours: number
  status: 'Active' | 'Pending' | 'Inactive'
  atRiskStudents: number
}

interface TimetableSlot {
  period: string
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
}

const Courses = () => {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [courses] = useState<Course[]>([
    {
      id: 1,
      courseCode: 'MATH301',
      courseName: 'Advanced Mathematics',
      grade: 'Grade 12',
      teacher: 'Dr. Smith',
      section: 'Section A',
      creditHours: 4,
      status: 'Active',
      atRiskStudents: 5
    },
    {
      id: 2,
      courseCode: 'PHYS201',
      courseName: 'Physics',
      grade: 'Grade 11',
      teacher: 'Prof. Johnson',
      section: 'Section B',
      creditHours: 3,
      status: 'Pending',
      atRiskStudents: 8
    },
    {
      id: 3,
      courseCode: 'LIT101',
      courseName: 'Literature',
      grade: 'Grade 10',
      teacher: 'Ms. Williams',
      section: 'Section A',
      creditHours: 3,
      status: 'Active',
      atRiskStudents: 2
    },
    {
      id: 4,
      courseCode: 'HIST201',
      courseName: 'World History',
      grade: 'Grade 11',
      teacher: 'Mr. Davis',
      section: 'Section C',
      creditHours: 3,
      status: 'Inactive',
      atRiskStudents: 0
    },
    {
      id: 5,
      courseCode: 'BIO301',
      courseName: 'Biology',
      grade: 'Grade 12',
      teacher: 'Dr. Miller',
      section: 'Section B',
      creditHours: 4,
      status: 'Active',
      atRiskStudents: 3
    }
  ])

  const [timetable] = useState<TimetableSlot[]>([
    {
      period: '1',
      time: '8:00-9:00',
      monday: 'Mathematics, Mr. Johnson • 10A',
      tuesday: 'Physics, Dr. Smith • 11A',
      wednesday: 'Chemistry, Ms. Brown • 12A',
      thursday: 'English, Ms. Davis • 10B',
      friday: 'CONFLICT - Room 205 • 2 classes'
    },
    {
      period: '2',
      time: '9:00-10:00',
      monday: 'Biology, Dr. Wilson • 11B',
      tuesday: 'History, Mr. Taylor • 10A',
      wednesday: 'Literature, Ms. Garcia • 12B',
      thursday: 'Mathematics, Mr. Johnson • 11C',
      friday: 'Art, Ms. Lee • 10C'
    }
  ])

  if (showCourseForm) {
    return <Course onBack={() => setShowCourseForm(false)} />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-600 text-white font-bold'
      case 'Pending':
        return 'bg-orange-600 text-white font-bold'
      case 'Inactive':
        return 'bg-gray-600 text-white font-bold'
      default:
        return 'bg-gray-100 text-gray-900 font-bold'
    }
  }

  const getTimetableColor = (content: string) => {
    if (content.includes('CONFLICT')) return 'bg-red-50 text-red-700 border border-red-200'
    if (content.includes('Mathematics')) return 'bg-blue-50 text-blue-700'
    if (content.includes('Biology')) return 'bg-green-50 text-green-700'
    if (content.includes('Physics')) return 'bg-green-50 text-green-700'
    if (content.includes('History')) return 'bg-blue-50 text-blue-700'
    if (content.includes('Chemistry')) return 'bg-orange-50 text-orange-700'
    if (content.includes('Literature')) return 'bg-orange-50 text-orange-700'
    if (content.includes('English')) return 'bg-blue-50 text-blue-700'
    if (content.includes('Art')) return 'bg-blue-50 text-blue-700'
    return 'bg-gray-50 text-gray-700'
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
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
              <p className="text-3xl font-bold mt-2 text-green-400">72</p>
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

        {/* Active Sections */}
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
                Active Sections
              </p>
              <p className="text-3xl font-bold mt-2 text-orange-400">12</p>
            </div>
            <IoIosPeople className="w-6 h-6 text-orange-400 ml-4" />
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
              <p className="text-3xl font-bold mt-2 text-blue-400">36</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-blue-400 font-medium">+3%</span>
              </div>
            </div>
            <FaBook className="w-5 h-5 text-blue-400 ml-4" />
          </div>
        </div>

        {/* Conflicts Detected */}
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
                Conflicts Detected
              </p>
              <p className="text-3xl font-bold mt-2 text-red-600">4</p>
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
                  <span className="hidden sm:inline">At-Risk Students</span>
                  <span className="sm:hidden">At-Risk</span>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-800 divide-gray-700' 
                : 'bg-white divide-gray-200'
            }`}>
              {courses.map((course) => (
                <tr key={course.id} className={`hover:transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{course.courseName}</div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{course.grade}</div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{course.teacher}</div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{course.creditHours}</div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{course.atRiskStudents}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Timetable Section */}
      <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        {/* Table Header */}
        <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Weekly Timetable
          </h2>
        </div>

        {/* Timetable Grid */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] sm:min-w-[800px]">
            <thead className="transition-colors duration-200">
              <tr>
                <th className="px-0.5 sm:px-1 py-1 sm:py-2">
                  <div className="w-full p-2 sm:p-4 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex flex-col items-center justify-center bg-blue-200 text-blue-900">
                    <div className="text-xs sm:text-sm font-bold uppercase">Period</div>
                  </div>
                </th>
                <th className="px-0.5 sm:px-1 py-1 sm:py-2">
                  <div className="w-full p-2 sm:p-4 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center bg-blue-200 text-blue-900">
                    <div className="text-xs sm:text-sm font-bold uppercase">
                      <span className="hidden sm:inline">Monday</span>
                      <span className="sm:hidden">Mon</span>
                    </div>
                  </div>
                </th>
                <th className="px-0.5 sm:px-1 py-1 sm:py-2">
                  <div className="w-full p-2 sm:p-4 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center bg-blue-200 text-blue-900">
                    <div className="text-xs sm:text-sm font-bold uppercase">
                      <span className="hidden sm:inline">Tuesday</span>
                      <span className="sm:hidden">Tue</span>
                    </div>
                  </div>
                </th>
                <th className="px-0.5 sm:px-1 py-1 sm:py-2">
                  <div className="w-full p-2 sm:p-4 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center bg-blue-200 text-blue-900">
                    <div className="text-xs sm:text-sm font-bold uppercase">
                      <span className="hidden sm:inline">Wednesday</span>
                      <span className="sm:hidden">Wed</span>
                    </div>
                  </div>
                </th>
                <th className="px-0.5 sm:px-1 py-1 sm:py-2">
                  <div className="w-full p-2 sm:p-4 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center bg-blue-200 text-blue-900">
                    <div className="text-xs sm:text-sm font-bold uppercase">
                      <span className="hidden sm:inline">Thursday</span>
                      <span className="sm:hidden">Thu</span>
                    </div>
                  </div>
                </th>
                <th className="px-0.5 sm:px-1 py-1 sm:py-2">
                  <div className="w-full p-2 sm:p-4 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center bg-blue-200 text-blue-900">
                    <div className="text-xs sm:text-sm font-bold uppercase">
                      <span className="hidden sm:inline">Friday</span>
                      <span className="sm:hidden">Fri</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-800 divide-gray-700' 
                : 'bg-white divide-gray-200'
            }`}>
              {timetable.map((slot, index) => (
                <tr key={index} className={`hover:transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-0.5 sm:px-1 py-1 sm:py-2">
                    <div className={`w-full px-1 sm:px-2 py-2 sm:py-3 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex flex-col items-center justify-center transition-colors duration-200 ${
                      theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                    }`}>
                      <div className="text-xs sm:text-sm font-bold">{slot.period}</div>
                      <div className="text-xs font-semibold mt-1 hidden sm:block">{slot.time}</div>
                    </div>
                  </td>
                  <td className="px-0.5 sm:px-1 py-1 sm:py-2">
                    <div className={`w-full px-1 sm:px-2 py-2 sm:py-3 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center ${getTimetableColor(slot.monday)}`}>
                      <div className="text-xs sm:text-sm font-bold break-words">{slot.monday}</div>
                    </div>
                  </td>
                  <td className="px-0.5 sm:px-1 py-1 sm:py-2">
                    <div className={`w-full px-1 sm:px-2 py-2 sm:py-3 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center ${getTimetableColor(slot.tuesday)}`}>
                      <div className="text-xs sm:text-sm font-bold break-words">{slot.tuesday}</div>
                    </div>
                  </td>
                  <td className="px-0.5 sm:px-1 py-1 sm:py-2">
                    <div className={`w-full px-1 sm:px-2 py-2 sm:py-3 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center ${getTimetableColor(slot.wednesday)}`}>
                      <div className="text-xs sm:text-sm font-bold break-words">{slot.wednesday}</div>
                    </div>
                  </td>
                  <td className="px-0.5 sm:px-1 py-1 sm:py-2">
                    <div className={`w-full px-1 sm:px-2 py-2 sm:py-3 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center ${getTimetableColor(slot.thursday)}`}>
                      <div className="text-xs sm:text-sm font-bold break-words">{slot.thursday}</div>
                    </div>
                  </td>
                  <td className="px-0.5 sm:px-1 py-1 sm:py-2">
                    <div className={`w-full px-1 sm:px-2 py-2 sm:py-3 rounded-lg text-center min-h-[50px] sm:min-h-[60px] flex items-center justify-center ${getTimetableColor(slot.friday)}`}>
                      <div className="text-xs sm:text-sm font-bold break-words">{slot.friday}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
