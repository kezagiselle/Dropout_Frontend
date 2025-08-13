import React, { useState } from 'react'

interface Student {
  id: number
  name: string
  grade: string
  riskStatus: 'At-risk' | 'Normal'
  enrollmentStatus: 'Enrolled' | 'Pending'
}

const Student = () => {
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
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">EduTrack</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.grade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskStatusColor(student.riskStatus)}`}>
                        {student.riskStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEnrollmentStatusColor(student.enrollmentStatus)}`}>
                        {student.enrollmentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                          View Profile
                        </button>
                        <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">
                          Update Enrollment
                        </button>
                        <button className="bg-orange-600 text-white px-3 py-1 rounded text-xs hover:bg-orange-700 transition-colors">
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
