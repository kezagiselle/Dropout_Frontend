import React, { useState } from 'react';
import { Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StudentRiskTable() {
  const [students] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      riskLevel: 'High',
      prediction: 'At Risk of Dropping Out',
      information: 'Low attendance, declining grades'
    },
    {
      id: 2,
      name: 'Bob Smith',
      riskLevel: 'Medium',
      prediction: 'Needs Support',
      information: 'Struggling with mathematics'
    },
    {
      id: 3,
      name: 'Carol Williams',
      riskLevel: 'Low',
      prediction: 'On Track',
      information: 'Good performance across subjects'
    }
  ]);

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="w-full mx-auto p-2 sm:p-3 md:p-4 lg:p-6"> {/* Responsive padding */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header with responsive layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-0">Students List</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 text-sm"
              aria-label="Export data"
            >
              <Download size={18} className="text-gray-600" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 text-sm"
              aria-label="Filter results"
            >
              <Filter size={18} className="text-gray-600" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Mobile card view for small screens */}
        <div className="sm:hidden p-3">
          {students.map((student) => (
            <div key={student.id} className="mb-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border shrink-0 ${getRiskLevelColor(student.riskLevel)}`}>
                  {student.riskLevel}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Prediction:</span> {student.prediction}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Info:</span> {student.information}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table view (hidden on mobile) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Student
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Risk Level
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Prediction
                </th>
                <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Information
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 sm:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRiskLevelColor(student.riskLevel)}`}>
                      {student.riskLevel}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm text-gray-700">
                    {student.prediction}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm text-gray-600">
                    {student.information}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-3 sm:mb-0 text-center sm:text-left">
            Showing 1 to {students.length} of {students.length} results
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded transition-colors flex items-center gap-1 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              1
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded transition-colors flex items-center gap-1 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}