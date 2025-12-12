import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, AlertTriangle, Plus, Calendar } from 'lucide-react';

const attendanceData = [
  { day: 'Monday', Present: 90, Absent: 5, Late: 10 },
  { day: 'Tuesday', Present: 85, Absent: 10, Late: 30 },
  { day: 'Wednesday', Present: 88, Absent: 5, Late: 25 },
  { day: 'Thursday', Present: 82, Absent: 12, Late: 25 },
  { day: 'Friday', Present: 75, Absent: 20, Late: 28 },
];

export default function AttendanceBehavior() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Attendance & Behavior</h1>
            <p className="text-sm text-gray-600">Track student attendance patterns and behavioral records</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">2 Children</span>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Attendance Overview</h2>
            
            {/* Chart Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">Weekly Attendance Trend</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Late</span>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={attendanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Attendance (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                  />
                  <Tooltip />
                  <Bar dataKey="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Late" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">85%</p>
                <p className="text-sm text-gray-600 mt-1">Total Present</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">10%</p>
                <p className="text-sm text-gray-600 mt-1">Total Absent</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">5%</p>
                <p className="text-sm text-gray-600 mt-1">Total Late</p>
              </div>
            </div>
          </div>
        </div>

        {/* Behavior Records */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Behavior Records</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Incidents */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="text-base font-semibold text-gray-900">Recent Incidents</h3>
                </div>

                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-sm font-semibold text-gray-900">Sept 20</span>
                      </div>
                      <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full font-medium">
                        Red Tag
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 ml-4">Disruptive behavior</p>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-sm font-semibold text-gray-900">Sept 15</span>
                      </div>
                      <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full font-medium">
                        Orange Tag
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 ml-4">Late submission</p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-sm font-semibold text-gray-900">Sept 12</span>
                      </div>
                      <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full font-medium">
                        Red Tag
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 ml-4">Absent without excuse</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Positive Commendations */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-5 h-5 text-green-600" />
                  <h3 className="text-base font-semibold text-gray-900">Positive Commendations</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-semibold text-gray-900">Sept 18</span>
                      </div>
                      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                        Green Tag
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 ml-4">Excellent participation</p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm font-semibold text-gray-900">Sept 14</span>
                      </div>
                      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                        Green Tag
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 ml-4">Helped classmates</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <p className="text-4xl font-bold text-green-600 mb-1">2</p>
                  <p className="text-sm text-gray-700">This Month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex justify-end">
            <button className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition font-medium flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              View Full Attendance History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}