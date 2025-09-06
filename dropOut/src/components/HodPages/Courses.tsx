import { useState } from 'react'
import { useTheme } from '../Hod'
import { IoIosPeople, IoIosWarning, IoIosCheckmarkCircle, IoIosTime } from 'react-icons/io'
import { FaSearch, FaDownload, FaFilter, FaExternalLinkAlt, FaFileAlt, FaUser, FaClipboardCheck, FaChartLine, FaFile, FaTimes, FaFire, FaSync, FaBook } from 'react-icons/fa'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { MdCancel } from 'react-icons/md'

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
      period: 'Period 1',
      time: '8:00-9:00',
      monday: 'Mathematics, Mr. Johnson • 10A',
      tuesday: 'Physics, Dr. Smith • 11A',
      wednesday: 'Chemistry, Ms. Brown • 12A',
      thursday: 'English, Ms. Davis • 10B',
      friday: 'CONFLICT - Room 205 • 2 classes'
    },
    {
      period: 'Period 2',
      time: '9:00-10:00',
      monday: 'Biology, Dr. Wilson • 11B',
      tuesday: 'History, Mr. Taylor • 10A',
      wednesday: 'Literature, Ms. Garcia • 12B',
      thursday: 'Mathematics, Mr. Johnson • 11C',
      friday: 'Art, Ms. Lee • 10C'
    }
  ])

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
    if (content.includes('CONFLICT')) return 'bg-red-100 text-red-800'
    if (content.includes('Mathematics') || content.includes('Biology')) return 'bg-green-100 text-green-800'
    if (content.includes('Chemistry') || content.includes('Literature')) return 'bg-orange-100 text-orange-800'
    if (content.includes('English')) return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
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
        
        <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base">
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
            <FaBook className="w-6 h-6 text-blue-400 ml-4" />
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
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors duration-200">
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
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Course Code
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Course Name
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Grade
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Teacher
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Section
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Credit Hours
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  Status
                </th>
                <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider text-white !important" style={{color: 'white'}}>
                  At-Risk Students
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
                    <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{course.courseCode}</div>
                  </td>
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
                    }`}>{course.section}</div>
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
          <table className="w-full min-w-[800px]">
            <thead className={`transition-colors duration-200 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Period
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Monday
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Tuesday
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Wednesday
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Thursday
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Friday
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
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{slot.period}</div>
                    <div className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>{slot.time}</div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTimetableColor(slot.monday)}`}>
                      {slot.monday}
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTimetableColor(slot.tuesday)}`}>
                      {slot.tuesday}
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTimetableColor(slot.wednesday)}`}>
                      {slot.wednesday}
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTimetableColor(slot.thursday)}`}>
                      {slot.thursday}
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTimetableColor(slot.friday)}`}>
                      {slot.friday}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors duration-200">
          <FaDownload className="w-4 h-4" />
          <span>Export PDF</span>
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors duration-200">
          <FaFileAlt className="w-4 h-4" />
          <span>Export Excel</span>
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors duration-200">
          <FaFire className="w-4 h-4" />
          <span>Publish Changes</span>
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors duration-200">
          <FaSync className="w-4 h-4" />
          <span>Sync Updates</span>
        </button>
      </div>
    </div>
  )
}

export default Courses
