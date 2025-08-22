import React, { useState } from 'react'
import { useTheme } from '../Hod'

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
        return 'bg-green-500 text-white'
      case 'On Leave':
        return 'bg-yellow-500 text-white'
      case 'Inactive':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getCourseColor = (index: number) => {
    const colors = ['bg-blue-300', 'bg-green-300', 'bg-blue-300', 'bg-green-300']
    return colors[index % colors.length]
  }

  const clearFilters = () => {
    setSelectedDepartment('All Departments')
    setSelectedStatus('All')
    setSearchTerm('')
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className={`shadow-sm border-b px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Teachers</h1>
            <p className={`mt-1 text-sm sm:text-base transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Manage teacher profiles and assignments</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 pl-8 sm:pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300'
                }`}
              />
              <svg className={`w-4 sm:w-5 h-4 sm:h-5 absolute left-2 sm:left-3 top-2.5 transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-orange-700 transition-colors text-sm sm:text-base w-full sm:w-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Teacher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`shadow-sm border rounded-lg px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <label className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Department:</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`px-2 sm:px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300'
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
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <label className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-2 sm:px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300'
                }`}
              >
                <option>All</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <button
            onClick={clearFilters}
            className={`flex items-center justify-center sm:justify-start space-x-2 transition-colors duration-200 text-sm ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className={`shadow-sm border rounded-lg transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`transition-colors duration-200 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Teacher Name
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Department
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                   Assigned<br />Courses
                 </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
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
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
    <div>
                      <div className={`text-sm font-medium transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{teacher.name}</div>
                      <div className={`text-xs sm:text-sm transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{teacher.email}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{teacher.department}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                     <div className="flex flex-col gap-1">
                       {teacher.assignedCourses.map((course, index) => (
                         <span
                           key={course}
                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getCourseColor(index)}`}
                         >
                           {course}
                         </span>
                       ))}
                     </div>
                   </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <button className="text-orange-600 hover:text-orange-900 flex items-center justify-center sm:justify-start space-x-1 transition-colors text-sm">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                         </svg>
                         <span>Edit Profile</span>
                       </button>
                       <button className="text-orange-600 hover:text-orange-900 flex items-center justify-center sm:justify-start space-x-1 transition-colors text-sm">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                         </svg>
                         <span>Manage Assignments</span>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`px-3 sm:px-6 py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`text-sm transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
            <span className="font-medium">3</span> results
          </div>
          <div>
            <nav className="flex items-center justify-center sm:justify-start space-x-2">
              <button className="px-2 sm:px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                &lt; Previous
              </button>
                             <button className="px-2 sm:px-3 py-1 text-sm bg-orange-600 text-white rounded-md">
                 1
               </button>
              <button className="px-2 sm:px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
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
