import React, { useState } from 'react'

interface Teacher {
  id: number
  name: string
  email: string
  department: string
  assignedCourses: string[]
  status: 'Active' | 'On Leave' | 'Inactive'
}

const Teachers = () => {
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
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
            <p className="text-gray-600 mt-1">Manage teacher profiles and assignments</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Teacher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg px-6 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Department:</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Departments</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>History</option>
                <option>Art</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm">Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Assigned<br />Courses
                 </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                      <div className="text-sm text-gray-500">{teacher.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.department}</div>
                  </td>
                                     <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(teacher.status)}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-4">
                                             <button className="text-orange-600 hover:text-orange-900 flex items-center space-x-1 transition-colors">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                         </svg>
                         <span>Edit Profile</span>
                       </button>
                       <button className="text-orange-600 hover:text-orange-900 flex items-center space-x-1 transition-colors">
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
        <div className="bg-white px-6 py-3 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
            <span className="font-medium">3</span> results
          </div>
          <div className="mt-3 sm:mt-0">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                &lt; Previous
              </button>
                             <button className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md">
                 1
               </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
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
