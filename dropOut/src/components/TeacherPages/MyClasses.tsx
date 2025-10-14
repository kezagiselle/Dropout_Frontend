import React, { useState } from 'react';
import { ChevronDown, Calendar, Users, BookOpen, BarChart3, Bell, Search, Grid, List, ChevronLeft, ChevronRight, TrendingUp, AlertTriangle } from 'lucide-react';
import userr from "../../../src/img/userr.png";

interface ClassItem {
  id: number;
  grade: string;
  period: string;
  room: string;
  status: 'Normal' | 'Low Attendance' | 'High Risk';
  students: number;
  attendance: number;
  icon: string;
  upcoming: Array<{ title: string; due: string; color: string }>;
  alert?: string;
}


function MyClasses() {
  const [periodFilter, setPeriodFilter] = useState('All Periods');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [viewMode, setViewMode] = useState('grid');

  const classes = [
    {
      id: 1,
      grade: 'Grade 10 – Mathematics',
      period: '2nd Period',
      room: 'Room 204',
      status: 'Normal',
      students: 32,
      attendance: 92,
      icon: '📘',
      upcoming: [
        { title: 'Quiz: Algebra Basics', due: 'Tomorrow', color: 'text-orange-500' },
        { title: 'Assignment: Chapter 5', due: 'Due Friday', color: 'text-blue-500' }
      ]
    },
    {
      id: 2,
      grade: 'Grade 9 – Biology',
      period: '3rd Period',
      room: 'Lab 101',
      status: 'Low Attendance',
      students: 28,
      attendance: 73,
      icon: '🧪',
      upcoming: [
        { title: 'Lab: Cell Structure', due: 'Today', color: 'text-orange-500' },
        { title: 'Test: Genetics', due: 'Next Week', color: 'text-blue-500' }
      ]
    },
    {
      id: 3,
      grade: 'Grade 11 – English Literature',
      period: '1st Period',
      room: 'Room 108',
      status: 'Normal',
      students: 25,
      attendance: 88,
      icon: '📚',
      upcoming: [
        { title: 'Essay: Shakespeare Analysis', due: 'Due Monday', color: 'text-orange-500' },
        { title: 'Discussion: Hamlet Act 3', due: 'Wednesday', color: 'text-blue-500' }
      ]
    },
    {
      id: 4,
      grade: 'Grade 12 – World History',
      period: '4th Period',
      room: 'Room 302',
      status: 'High Risk',
      students: 30,
      attendance: 68,
      icon: '🏛️',
      alert: '5 students flagged for poor attendance',
      upcoming: [
        { title: 'Midterm Exam', due: 'Tomorrow', color: 'text-orange-500' },
        { title: 'Project: WWI Research', due: 'Due Friday', color: 'text-blue-500' }
      ]
    }
  ];

const getStatusColor = (status: 'Normal' | 'Low Attendance' | 'High Risk'): string => {
  switch(status) {
    case 'Normal': return 'bg-green-100 text-green-700';
    case 'Low Attendance': return 'bg-orange-100 text-orange-700';
    case 'High Risk': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getAttendanceColor = (attendance: number): string => {
  if (attendance >= 90) return 'bg-green-500';
  if (attendance >= 75) return 'bg-orange-500';
  return 'bg-red-500';
};

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
              <img src={userr} alt="User profile" className="w-8 h-8 rounded-full object-cover" />
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
        {/* Sidebar would go here */}
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-600 mt-1">Monitoring my classes</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Total Classes</p>
                  <h3 className="text-3xl font-bold text-gray-900">8</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Active classes</p>
            </div>

            <div className="bg-white rounded-lg p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Total Students</p>
                  <h3 className="text-3xl font-bold text-gray-900">247</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Enrolled students</p>
            </div>

            <div className="bg-white rounded-lg p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Avg Attendance</p>
                  <h3 className="text-3xl font-bold text-gray-900">89%</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Overall attendance rate</p>
            </div>

            <div className="bg-white rounded-lg p-5 relative shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Risk Classes</p>
                  <h3 className="text-3xl font-bold text-red-600">2</h3>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-200">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Needs attention</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Larger */}
            <div className="col-span-2 space-y-6">
              {/* Class Cards Grid */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">My Classes</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
                        {periodFilter} <ChevronDown className="w-3 h-3" />
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
                        {subjectFilter} <ChevronDown className="w-3 h-3" />
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2">
                        {statusFilter} <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{classItem.icon}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{classItem.grade}</h3>
                            <p className="text-sm text-gray-600">{classItem.period} • {classItem.room}</p>
                          </div>
                        </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status as 'Normal' | 'Low Attendance' | 'High Risk')}`}>
                                         {classItem.status}
                           </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Students</p>
                          <p className="text-xl font-bold text-gray-900">{classItem.students}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Attendance</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-bold text-gray-900">{classItem.attendance}%</p>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getAttendanceColor(classItem.attendance)}`}
                                style={{ width: `${classItem.attendance}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Alert */}
                      {classItem.alert && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <p className="text-sm text-red-700">{classItem.alert}</p>
                        </div>
                      )}

                      {/* Upcoming */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-2">Upcoming</p>
                        {classItem.upcoming.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center mb-1">
                            <p className="text-sm text-gray-700">{item.title}</p>
                            <p className={`text-sm font-medium ${item.color}`}>{item.due}</p>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600">
                          👥 View Roster
                        </button>
                        <button className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-orange-600">
                          + Add Assignment
                        </button>
                        <button className="flex-1 bg-green-400 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-500">
                          💬 Message Parents
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Showing 1 to 4 of 4 results</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium">
                      1
                    </button>
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <button className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4" />
                    Create New Class
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    Manage Students
                  </button>
                  <button className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition flex items-center gap-2 text-sm">
                    <BarChart3 className="w-4 h-4" />
                    View Reports
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">New assignment created</p>
                      <p className="text-xs text-gray-500 mt-1">Mathematics - Grade 10A</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">Low attendance alert</p>
                      <p className="text-xs text-gray-500 mt-1">Biology - Grade 9</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt=2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">Parent message sent</p>
                      <p className="text-xs text-gray-500 mt-1">English Literature - Grade 11</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyClasses;