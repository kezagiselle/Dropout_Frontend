import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const subjects = [
  { name: 'Mathematics', total: 24, present: 20, absent: 4, percent: 83, trend: 'down' as const, color: 'text-orange-500', bar: 'bg-orange-400' },
  { name: 'English', total: 22, present: 21, absent: 1, percent: 95, trend: 'up' as const, color: 'text-emerald-500', bar: 'bg-emerald-400' },
  { name: 'Science', total: 20, present: 18, absent: 2, percent: 90, trend: 'up' as const, color: 'text-emerald-500', bar: 'bg-emerald-400' }
];

const Attendance: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
      <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Subject-wise Attendance</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100">
              <th className="py-2 pr-2 sm:pr-4 text-left font-medium whitespace-nowrap">Subject</th>
              <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap hidden xs:table-cell">Total Sessions</th>
              <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap">Present</th>
              <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap hidden sm:table-cell">Absent</th>
              <th className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap">Attendance %</th>
              <th className="py-2 pl-2 sm:pl-4 text-left font-medium whitespace-nowrap hidden xs:table-cell">Trend</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subj) => (
              <tr key={subj.name} className="border-b border-gray-50 last:border-0">
                <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-gray-800 font-medium flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center text-xs flex-shrink-0">
                    {subj.name === 'Mathematics' && '📊'}
                    {subj.name === 'English' && '📘'}
                    {subj.name === 'Science' && '🧪'}
                  </span>
                  <span className="truncate">{subj.name}</span>
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap hidden xs:table-cell">
                  {subj.total}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap">
                  {subj.present}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap hidden sm:table-cell">
                  {subj.absent}
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-16 sm:w-20 lg:w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                      <div
                        className={`h-1.5 rounded-full ${subj.bar}`}
                        style={{ width: `${subj.percent}%` }}
                      />
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold ${subj.color} flex-shrink-0`}>
                      {subj.percent}%
                    </span>
                  </div>
                </td>
                <td className="py-2 sm:py-3 pl-2 sm:pl-4 whitespace-nowrap hidden xs:table-cell">
                  {subj.trend === 'up' ? (
                    <span className="inline-flex items-center text-emerald-500 text-xs sm:text-sm font-semibold">
                      <ArrowUpRight className="w-3 h-3 mr-1 flex-shrink-0" />
                      Up
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-orange-500 text-xs sm:text-sm font-semibold">
                      <ArrowDownRight className="w-3 h-3 mr-1 flex-shrink-0" />
                      Down
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards for extra small screens */}
      <div className="xs:hidden mt-4 space-y-3">
        {subjects.map((subj) => (
          <div key={subj.name} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center text-xs">
                  {subj.name === 'Mathematics' && '📊'}
                  {subj.name === 'English' && '📘'}
                  {subj.name === 'Science' && '🧪'}
                </span>
                <span className="font-medium text-gray-900 text-sm">{subj.name}</span>
              </div>
              {subj.trend === 'up' ? (
                <span className="inline-flex items-center text-emerald-500 text-xs font-semibold">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  Up
                </span>
              ) : (
                <span className="inline-flex items-center text-orange-500 text-xs font-semibold">
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                  Down
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Sessions:</span>
                <span className="font-medium ml-1">{subj.total}</span>
              </div>
              <div>
                <span className="text-gray-500">Present:</span>
                <span className="font-medium ml-1">{subj.present}</span>
              </div>
              <div>
                <span className="text-gray-500">Absent:</span>
                <span className="font-medium ml-1">{subj.absent}</span>
              </div>
              <div>
                <span className="text-gray-500">Percentage:</span>
                <span className={`font-medium ml-1 ${subj.color}`}>{subj.percent}%</span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full ${subj.bar}`}
                  style={{ width: `${subj.percent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;