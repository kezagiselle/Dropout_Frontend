import { useState } from 'react'
import { useTheme } from '../Hod'
import { IoIosPeople, IoIosWarning, IoIosCheckmarkCircle, IoIosTime } from 'react-icons/io'
import { FaSearch, FaDownload, FaFilter, FaExternalLinkAlt } from 'react-icons/fa'
import { FaClipboardCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Teacher from '../Forms/Teacher';


interface Teacher {
  id: number
  name: string
  email: string
  department: string
  assignedCourses: string[]
  status: 'Active' | 'On Leave' | 'Inactive'
}

const Teachers = () => {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [teachers] = useState<Teacher[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@school.edu',
      department: 'Mathematics',
      assignedCourses: ['Algebra', 'Calculus'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'David Smith',
      email: 'david.smith@school.edu',
      department: 'Science',
      assignedCourses: ['Biology', 'Chemistry'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Sarah Lee',
      email: 'sarah.lee@school.edu',
      department: 'English',
      assignedCourses: ['Literature', 'Writing'],
      status: 'On Leave'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800'
      case 'Inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCourseColor = (index: number, teacherName: string) => {
    if (teacherName === 'Sarah Lee') {
      return 'bg-purple-100 text-purple-800'
    }
    if (teacherName === 'David Smith') {
      return 'bg-green-100 text-green-800'
    }
    return 'bg-blue-100 text-blue-800'
  }

  if (showTeacherForm) {
    return <Teacher onBack={() => setShowTeacherForm(false)} />;
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Teachers Management
          </h1>
          <p className={`text-xs sm:text-sm lg:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage Teachers Activities
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-none sm:w-64 lg:w-80">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
            <input
              type="text"
              placeholder="Search Teacher"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          {/* Add Teacher Button */}
          <button 
            onClick={() => setShowTeacherForm(true)}
            className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
          >
            <span className="text-sm sm:text-base">+</span>
            <span>Add Teacher</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Teachers */}
        <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-sm font-bold text-gray-600 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Teachers
              </p>
              <p className="text-3xl font-bold mt-2 text-black">72</p>
              <div className="flex items-center mt-2">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-600 font-medium">+3.2% vs last term</span>
              </div>
            </div>
            <IoIosPeople className="w-6 h-6 text-blue-400 ml-4" />
          </div>
        </div>

        {/* On Leave */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
                  theme === 'dark'
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                On leave
              </p>
              <p className="text-3xl font-bold mt-2 text-orange-400">3</p>
              <div className="flex items-center mt-1">
                <svg className="w-3 h-3 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
                <span className="text-xs text-orange-400 font-medium">-8.1% vs last term</span>
              </div>
            </div>
            <IoIosWarning className="w-6 h-6 text-orange-600 ml-4" />
          </div>
        </div>

        {/* Available */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Available
              </p>
              <p className="text-xl sm:text-2xl font-bold mt-1 text-green-600">28</p>
            </div>
            <FaClipboardCheck className="w-6 h-6 text-green-600 ml-4" />
          </div>
        </div>

        {/* Substitutes Needed */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Substitutes Needed
              </p>
              <p className="text-xl sm:text-2xl font-bold mt-1 text-red-600">2</p>
              <p className="text-xs text-gray-500 mt-1">8 registrations, 4 timetable</p>
            </div>
            <IoIosTime className="w-6 h-6 text-red-600 ml-4" />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className={`text-sm font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Filters
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
            {/* Department Filter */}
            <div className="flex items-center space-x-2">
              <label className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Department:
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Departments</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>History</option>
                <option>Art</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <label className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Status:
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All...</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>
            </div>
            
          <div className="flex items-center space-x-3">
            <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-800'
            }`}>
              <FaFilter className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-bold transition-colors duration-200">
              Clear All
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers List Table */}
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
            <h2 className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Teachers List
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
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Teacher Name
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Department
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Assigned Courses
                 </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
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
              {teachers.map((teacher) => (
                <tr key={teacher.id} className={`hover:transition-colors duration-200 ${
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
                      }`}>{teacher.name}</div>
                        <div className={`text-xs transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{teacher.department}</div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                       {teacher.assignedCourses.map((course, index) => (
                         <span
                           key={course}
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCourseColor(index, teacher.name)}`}
                         >
                           {course}
                         </span>
                       ))}
                     </div>
                   </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(teacher.status)}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-1 sm:space-x-2">
                      <FaExternalLinkAlt className="w-3 h-3" />
                      <span>View Profile</span>
                       </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`text-xs sm:text-sm transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
            <span className="font-medium">3</span> results
          </div>
          <div>
            <nav className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2">
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                &lt; Previous
              </button>
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-orange-400 text-white rounded-md font-medium">
                 1
               </button>
              <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                Next &gt;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teachers


