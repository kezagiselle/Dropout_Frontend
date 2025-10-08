import React, { useState } from 'react';
import { ChevronDown, Calendar, Users, BookOpen, BarChart3, UserCircle, MessageSquare, Settings, Bell, Search } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCalendarCheck } from 'react-icons/fa';
import { MdAssignment } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa6";




export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const statCards = [
    { title: 'My Students', value: '128', subtitle: '+1 from last term', icon: Users, color: 'bg-white', iconColor: 'text-blue-500' },
    { title: 'My Classes', value: '6', subtitle: 'Active classes', icon: BookOpen, color: 'bg-white', iconColor: 'text-purple-500' },
    { title: 'At-Risk Students', value: '12', subtitle: 'Needs attention', icon: UserCircle, color: 'bg-white', iconColor: 'text-red-500', alert: true },
    { title: "Today's Attendance", value: '92%', subtitle: '114 present, 10 absent', icon: BarChart3, color: 'bg-white', iconColor: 'text-green-500' }
  ];

  const attendanceData = [
    { day: 'Mon', value: 95 },
    { day: 'Tue', value: 92 },
    { day: 'Wed', value: 88 },
    { day: 'Thu', value: 94 },
    { day: 'Fri', value: 92 }
  ];

  const flaggedStudents = [
    { name: 'Sarah Johnson', grade: 'Grade 10A', risk: 'High Risk', color: 'bg-red-100 text-red-700' },
    { name: 'Michael Chen', grade: 'Grade 10B', risk: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Emma Davis', grade: 'Grade 10A', risk: 'Low Risk', color: 'bg-green-100 text-green-700' }
  ];

  const recentBehavior = [
    { name: 'Alex Thompson', behavior: 'Excellent participation', time: 'Today, 10:30 AM', type: 'positive' },
    { name: 'James Wilson', behavior: 'Disruptive behavior', time: 'Yesterday, 2:15 PM', type: 'negative' }
  ];

  const schedule = [
    { period: 'Period 1', class: 'Mathematics - Grade 10A', time: '8:00 - 8:45 AM', color: 'bg-blue-500' },
    { period: 'Period 2', class: 'Mathematics - Grade 10B', time: '8:50 - 9:35 AM', color: 'bg-green-500' },
    { period: 'Free', class: 'Free Period', time: '9:40 - 10:25 AM', color: 'bg-emerald-600' }
  ];

  const alerts = [
    { title: 'Parent meeting scheduled', time: 'Tomorrow, 3:00 PM', type: 'urgent', color: 'bg-red-500' },
    { title: 'Grade submission deadline', time: 'Due in 2 days', type: 'medium', color: 'bg-orange-500' },
    { title: 'New curriculum update', time: 'Review required', type: 'info', color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Westfield High School</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, teachers, courses..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium">Sarah Wilson</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Filters</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
            All Grades <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
            All Classes <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
            Current Term <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-4 py-1 bg-orange-500 text-white rounded text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date Filter
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <button className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            {[
              { icon: LiaChalkboardTeacherSolid, label: 'My Classes' },
              { icon: FaClipboardCheck, label: 'Attendance' },
              { icon:  MdAssignment, label: 'Assignments' },
              { icon: TbReport, label: 'Behavior Reports' },
              { icon: IoIosPeople, label: 'Student Profiles' },
              { icon: IoMdSettings, label: 'Settings' }
            ].map((item, idx) => (
              <button key={idx} className="w-full text-gray-700 px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-50">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {statCards.map((card, idx) => (
              <div key={idx} className={`${card.color} rounded-lg p-5 relative shadow-sm border border-gray-200`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
                  </div>
                  <div className={`bg-white p-2 rounded-lg border border-gray-200`}>
                    <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                </div>
                <p className="text-xs text-gray-500">{card.subtitle}</p>
                {card.alert && (
                  <div className="absolute top-2 right-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Larger */}
            <div className="col-span-2 space-y-6">
              {/* Attendance Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Attendance Overview</h2>
                  <button className="text-sm text-orange-500 font-medium">View Details</button>
                </div>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 600 200">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line key={i} x1="50" y1={40 + i * 30} x2="550" y2={40 + i * 30} stroke="#e5e7eb" strokeWidth="1" />
                    ))}
                    {/* Y-axis labels */}
                    <text x="20" y="45" fontSize="12" fill="#9ca3af">100</text>
                    <text x="20" y="105" fontSize="12" fill="#9ca3af">90</text>
                    <text x="20" y="165" fontSize="12" fill="#9ca3af">80</text>
                    {/* X-axis labels */}
                    {attendanceData.map((d, i) => (
                      <text key={i} x={100 + i * 100} y="190" fontSize="12" fill="#9ca3af" textAnchor="middle">{d.day}</text>
                    ))}
                    {/* Line path */}
                    <path
                      d={`M ${attendanceData.map((d, i) => `${100 + i * 100},${160 - (d.value - 80) * 4}`).join(' L ')}`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    {/* Fill area */}
                    <path
                      d={`M 100,160 L ${attendanceData.map((d, i) => `${100 + i * 100},${160 - (d.value - 80) * 4}`).join(' L ')} L 500,160 Z`}
                      fill="url(#lineGradient)"
                    />
                    {/* Data points */}
                    {attendanceData.map((d, i) => (
                      <g key={i}>
                        <circle cx={100 + i * 100} cy={160 - (d.value - 80) * 4} r="4" fill="white" stroke="#10b981" strokeWidth="3" />
                        <text x={100 + i * 100} y={160 - (d.value - 80) * 4 - 10} fontSize="12" fill="#10b981" fontWeight="bold" textAnchor="middle">{d.value}%</text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded flex items-center gap-2">
                  <span className="text-yellow-700 text-sm">⚠️ 3 students with chronic absences this week</span>
                </div>
              </div>

              {/* Assignments & Quizzes */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Assignments & Quizzes</h2>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">+ Create Assignment</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-sm text-gray-600 mb-2">Pending to Grade</h3>
                    <div className="text-3xl font-bold text-red-600 mb-1">24</div>
                    <p className="text-xs text-gray-500">assignments</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm text-gray-600 mb-2">Upcoming to Publish</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
                    <p className="text-xs text-gray-500">assignments</p>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
                <div className="space-y-3">
                  {schedule.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`${item.color} text-white px-3 py-1 rounded text-sm font-medium`}>
                        {item.period}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.class}</p>
                      </div>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-4 gap-4">
                  <button className="bg-blue-400 text-white p-4 rounded-lg hover:bg-blue-500 transition">
                    <Users className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Add Class</span>
                  </button>
                  <button className="bg-yellow-400 text-white p-4 rounded-lg hover:bg-yellow-500 transition">
                    <BookOpen className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Add Assignment</span>
                  </button>
                  <button className="bg-red-400 text-white p-4 rounded-lg hover:bg-red-500 transition">
                    <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Log Behavior</span>
                  </button>
                  <button className="bg-green-400 text-white p-4 rounded-lg hover:bg-green-500 transition">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Message Parent</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Flagged Students */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Flagged Students</h2>
                  <button className="text-sm text-orange-500 font-medium">View All</button>
                </div>
                <div className="space-y-3">
                  {flaggedStudents.map((student, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.grade}</p>
                      </div>
                      <span className={`${student.color} px-2 py-1 rounded text-xs font-medium`}>
                        {student.risk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Behavior */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Behavior</h2>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">+ Log Report</button>
                </div>
                <div className="space-y-3">
                  {recentBehavior.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{item.name} - {item.behavior}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts & Tasks */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Tasks</h2>
                <div className="space-y-3">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`${alert.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                        {alert.type === 'urgent' ? 'Urgent' : alert.type === 'medium' ? 'Medium' : 'Info'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}