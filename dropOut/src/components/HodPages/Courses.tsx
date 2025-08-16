import React, { useState } from 'react'
import { useTheme } from '../Hod'

interface PendingTimetable {
  id: number
  courseName: string
  department: string
  startDate: string
  status: 'Pending'
}

interface ApprovedTimetable {
  id: number
  courseName: string
  department: string
  startDate: string
  endDate: string
}

const Courses = () => {
  const { theme } = useTheme()
  const [pendingTimetables] = useState<PendingTimetable[]>([
    {
      id: 1,
      courseName: 'Computer Science 101',
      department: 'CS Dept.',
      startDate: '02/09/2025',
      status: 'Pending'
    },
    {
      id: 2,
      courseName: 'Algebra II',
      department: 'Mathematics',
      startDate: '02/09/2025',
      status: 'Pending'
    }
  ])

  const [approvedTimetables] = useState<ApprovedTimetable[]>([
    {
      id: 1,
      courseName: 'Physics 201',
      department: 'Physics Dept.',
      startDate: '01/15/2025',
      endDate: '05/15/2025'
    },
    {
      id: 2,
      courseName: 'Chemistry 101',
      department: 'Chemistry Dept.',
      startDate: '01/20/2025',
      endDate: '05/20/2025'
    }
  ])

  return (
    <div className="w-full">
      {/* Header */}
      <div className={`shadow-sm border-b px-3 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Courses & Timetables</h1>
          </div>
          <button className="bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-2 hover:bg-orange-700 transition-colors text-sm sm:text-base">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create New Schedule</span>
          </button>
        </div>
      </div>

      {/* Pending Timetable Approvals */}
      <div className={`shadow-sm border rounded-lg mb-4 sm:mb-6 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`px-3 sm:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Pending Timetable Approvals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`transition-colors duration-200 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Course Name
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Department
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Start Date
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
              {pendingTimetables.map((timetable) => (
                <tr key={timetable.id} className={`hover:transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{timetable.courseName}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{timetable.department}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{timetable.startDate}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-500 text-white">
                      {timetable.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button className="bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs hover:bg-green-700 transition-colors">
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs hover:bg-red-700 transition-colors">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approved Timetables */}
      <div className={`shadow-sm border rounded-lg transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`px-3 sm:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Approved Timetables</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`transition-colors duration-200 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Course Name
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Department
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Start Date
                </th>
                <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  End Date
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
              {approvedTimetables.map((timetable) => (
                <tr key={timetable.id} className={`hover:transition-colors duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{timetable.courseName}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{timetable.department}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{timetable.startDate}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{timetable.endDate}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button className="bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button className="bg-gray-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs hover:bg-gray-700 transition-colors">
                        Notify Stakeholders
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

export default Courses
