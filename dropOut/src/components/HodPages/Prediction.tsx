import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';

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
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Students List</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prediction
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Information
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRiskLevelColor(student.riskLevel)}`}>
                      {student.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student.prediction}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.information}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1 to 3 of 3 results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
              &lt; Previous
            </button>
            <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}