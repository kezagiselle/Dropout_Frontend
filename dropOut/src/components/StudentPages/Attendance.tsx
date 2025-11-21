import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const subjects = [
  { name: 'Mathematics', total: 24, present: 20, absent: 4, percent: 83, trend: 'down' as const, color: 'text-orange-500', bar: 'bg-orange-400' },
  { name: 'English', total: 22, present: 21, absent: 1, percent: 95, trend: 'up' as const, color: 'text-emerald-500', bar: 'bg-emerald-400' },
  { name: 'Science', total: 20, present: 18, absent: 2, percent: 90, trend: 'up' as const, color: 'text-emerald-500', bar: 'bg-emerald-400' }
];

const Attendance: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Subject-wise Attendance</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs sm:text-sm text-gray-500 border-b border-gray-100">
              <th className="py-2 pr-4 text-left font-medium">Subject</th>
              <th className="py-2 px-4 text-left font-medium">Total Sessions</th>
              <th className="py-2 px-4 text-left font-medium">Present</th>
              <th className="py-2 px-4 text-left font-medium">Absent</th>
              <th className="py-2 px-4 text-left font-medium">Attendance %</th>
              <th className="py-2 pl-4 text-left font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subj) => (
              <tr key={subj.name} className="border-b border-gray-50 last:border-0">
                <td className="py-3 pr-4 text-gray-800 font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center text-xs">
                    {subj.name === 'Mathematics' && '📊'}
                    {subj.name === 'English' && '📘'}
                    {subj.name === 'Science' && '🧪'}
                  </span>
                  <span>{subj.name}</span>
                </td>
                <td className="py-3 px-4 text-gray-700">{subj.total}</td>
                <td className="py-3 px-4 text-gray-700">{subj.present}</td>
                <td className="py-3 px-4 text-gray-700">{subj.absent}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${subj.bar}`}
                        style={{ width: `${subj.percent}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${subj.color}`}>{subj.percent}%</span>
                  </div>
                </td>
                <td className="py-3 pl-4">
                  {subj.trend === 'up' ? (
                    <span className="inline-flex items-center text-emerald-500 text-xs sm:text-sm font-semibold">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      Up
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-orange-500 text-xs sm:text-sm font-semibold">
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                      Down
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;