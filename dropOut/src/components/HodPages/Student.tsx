import React, { useState } from 'react'
import { useTheme } from '../Hod'

interface Student {
  id: number
  name: string
  grade: string
  riskStatus: 'At-risk' | 'Normal'
  enrollmentStatus: 'Enrolled' | 'Pending'
}

const Student = () => {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [students] = useState<Student[]>([
    {
      id: 1,
      name: 'John Doe',
      grade: 'Grade 11',
      riskStatus: 'At-risk',
      enrollmentStatus: 'Enrolled'
    },
    {
      id: 2,
      name: 'Maria Gonzalez',
      grade: 'Grade 12',
      riskStatus: 'Normal',
      enrollmentStatus: 'Enrolled'
    },
    {
      id: 3,
      name: 'Ahmed Ali',
      grade: 'Grade 10',
      riskStatus: 'At-risk',
      enrollmentStatus: 'Pending'
    }
  ])

  const getRiskStatusColor = (status: string) => {
    return status === 'At-risk' 
      ? 'bg-red-500 text-white' 
      : 'bg-green-500 text-white'
  }

  const getEnrollmentStatusColor = (status: string) => {
    return status === 'Enrolled' 
      ? 'bg-green-500 text-white' 
      : 'bg-yellow-500 text-white'
  }

  return (
    <div className="w-full">
      {/* Header */}
      <header className={`shadow-sm border-b px-3 sm:px-4 md:px-6 py-3 sm:py-4 mb-3 sm:mb-4 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center justify-center sm:justify-start">
            <h2 className={`text-lg sm:text-xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>EduTrack</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300'
                }`}
              />
            </div>
            <button className="bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-orange-700 transition-colors text-sm sm:text-base w-full sm:w-auto">
              <span>Filters</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Table Header */}
          <div className={`px-3 sm:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Students</h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`transition-colors duration-200 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <tr>
                  <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Student Name
                  </th>
                  <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Grade
                  </th>
                  <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Risk Status
                  </th>
                  <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Enrollment Status
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
                {students.map((student) => (
                  <tr key={student.id} className={`hover:transition-colors duration-200 ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{student.name}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className={`text-sm transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{student.grade}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskStatusColor(student.riskStatus)}`}>
                        {student.riskStatus}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEnrollmentStatusColor(student.enrollmentStatus)}`}>
                        {student.enrollmentStatus}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button className="bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs hover:bg-blue-700 transition-colors">
                          View Profile
                        </button>
                        <button className="bg-gray-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs hover:bg-gray-700 transition-colors">
                          Update Enrollment
                        </button>
                        <button className="bg-orange-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs hover:bg-orange-700 transition-colors">
                          Log Intervention
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Student
