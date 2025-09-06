import React, { useState } from 'react'
import { useTheme } from '../Hod'
import { IoIosPeople, IoIosWarning, IoIosCheckmarkCircle, IoIosTime } from 'react-icons/io'
import { FaSearch, FaDownload, FaFilter, FaExternalLinkAlt, FaFileAlt, FaUser, FaClipboardCheck } from 'react-icons/fa'


interface Student {
  id: string
  name: string
  studentId: string
  grade: string
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk'
  attendance: number
  gpa: number
}

const Student = () => {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('All Grades')
  const [selectedRisk, setSelectedRisk] = useState('All Risk Levels')
  const [selectedAttendance, setSelectedAttendance] = useState('All Attendance')
  const [selectedGPA, setSelectedGPA] = useState('All GPA')
  const [selectedDepartment, setSelectedDepartment] = useState('All Department')

  const students: Student[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      studentId: '2024001',
      grade: 'Grade 11',
      riskLevel: 'High Risk',
      attendance: 65,
      gpa: 2.1
    },
    {
      id: '2',
      name: 'Michael Chen',
      studentId: '2024002',
      grade: 'Grade 10',
      riskLevel: 'Medium Risk',
      attendance: 78,
      gpa: 2.8
    },
    {
      id: '3',
      name: 'Emma Davis',
      studentId: '2024003',
      grade: 'Grade 12',
      riskLevel: 'Low Risk',
      attendance: 92,
      gpa: 3.7
    },
    {
      id: '4',
      name: 'James Wilson',
      studentId: '2024004',
      grade: 'Grade 9',
      riskLevel: 'High Risk',
      attendance: 58,
      gpa: 1.9
    },
    {
      id: '5',
      name: 'William Smith',
      studentId: '2024005',
      grade: 'Grade 4',
      riskLevel: 'High Risk',
      attendance: 30,
      gpa: 0.9
    }
  ]

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High Risk':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium Risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low Risk':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600'
    if (gpa >= 2.5) return 'text-yellow-600'
    return 'text-red-600'
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
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
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
          <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base">
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
              }`}>1,247</p>
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
              }`}>47</p>
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
              <p className={`text-xl lg:text-2xl font-bold mt-1 text-green-600`}>94.2%</p>
              <p className={`text-xs lg:text-sm transition-colors duration-200 mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>1,152 present / 47 absent</p>
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
              {/* Grade Filter */}
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Grades</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
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

              {/* Attendance Filter */}
              <select
                value={selectedAttendance}
                onChange={(e) => setSelectedAttendance(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Attendance</option>
                <option>90%+</option>
                <option>70-89%</option>
                <option>Below 70%</option>
              </select>

              {/* GPA Filter */}
              <select
                value={selectedGPA}
                onChange={(e) => setSelectedGPA(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All GPA</option>
                <option>3.5+</option>
                <option>2.5-3.4</option>
                <option>Below 2.5</option>
              </select>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Department</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>History</option>
              </select>
            </div>
            
            <button className="text-blue-600 hover:text-blue-700 text-sm font-bold transition-colors duration-200">
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
                  Grade
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
              {students.map((student) => (
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
                          ID: {student.studentId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.grade}
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskLevelColor(student.riskLevel)}`}>
                      {student.riskLevel}
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
                      <button className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Student