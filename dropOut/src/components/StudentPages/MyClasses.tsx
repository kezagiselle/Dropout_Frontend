import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ChevronDown, Search, MessageSquare, CalendarDays, FileText } from 'lucide-react';

const MyClasses = () => {
  const [termFilter, setTermFilter] = useState('Term 2 - 2025');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [performanceFilter, setPerformanceFilter] = useState('All Performance');
  const [sortBy, setSortBy] = useState('Sort by Subject');

  const classes = [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Mr. Johnson',
      schedule: 'Mon & Wed - 10:00-11:30 AM',
      room: 'Room A-201',
      grade: 85,
      status: 'missing',
      color: 'bg-blue-500',
      icon: '📐'
    },
    {
      id: 2,
      name: 'Chemistry',
      teacher: 'Dr. Smith',
      schedule: 'Tue & Thu - 2:00-3:30 PM',
      room: 'Lab B-105',
      grade: 92,
      status: 'active',
      color: 'bg-emerald-500',
      icon: '⚗️'
    },
    {
      id: 3,
      name: 'English Literature',
      teacher: 'Ms. Davis',
      schedule: 'Mon, Wed, Fri - 9:00-10:00 AM',
      room: 'Room C-301',
      grade: 78,
      status: 'active',
      color: 'bg-purple-500',
      icon: '📚'
    },
    {
      id: 4,
      name: 'Physics',
      teacher: 'Mr. Wilson',
      schedule: 'Tue & Thu - 11:00-12:30 PM',
      room: 'Lab A-102',
      grade: null,
      status: 'pending',
      color: 'bg-red-500',
      icon: '⚛️'
    },
    {
      id: 5,
      name: 'Geography',
      teacher: 'Mrs. Brown',
      schedule: 'Wed & Fri - 1:00-2:30 PM',
      room: 'Room D-205',
      grade: 88,
      status: 'active',
      color: 'bg-teal-500',
      icon: '🌍'
    },
    {
      id: 6,
      name: 'History',
      teacher: 'Mr. Taylor',
      schedule: 'Mon & Wed - 3:00-4:30 PM',
      room: 'Room E-101',
      grade: 94,
      status: 'completed',
      color: 'bg-indigo-500',
      icon: '📜',
      isFinal: true
    }
  ];

  const upcomingClasses = [
    { name: 'Mathematics', time: 'Today, 10:00 AM', startsIn: '2h 30m' },
    { name: 'Chemistry', time: 'Today, 2:00 PM', startsIn: '6h 30m' },
    { name: 'English Literature', time: 'Tomorrow, 9:00 AM', startsIn: '1d 1h' },
    { name: 'Physics', time: 'Tomorrow, 11:00 AM', startsIn: '1d 3h' },
    { name: 'Geography', time: 'Tomorrow, 1:00 PM', startsIn: '1d 5h' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      missing: { text: 'Missing Assignment', bg: 'bg-orange-100', text_color: 'text-orange-700' },
      active: { text: 'Active', bg: 'bg-green-100', text_color: 'text-green-700' },
      pending: { text: 'Pending', bg: 'bg-yellow-100', text_color: 'text-yellow-700' },
      completed: { text: 'Completed', bg: 'bg-red-100', text_color: 'text-red-700' }
    };
    return badges[status];
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'bg-indigo-500';
    if (grade >= 85) return 'bg-green-500';
    if (grade >= 80) return 'bg-teal-500';
    if (grade >= 75) return 'bg-purple-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-500 mt-1">View your enrolled subjects, teachers, and schedules.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Term 2 - 2025</option>
                <option>Term 1 - 2025</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Class or Subject"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Classes</option>
                <option>Active Only</option>
                <option>Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select 
                value={performanceFilter}
                onChange={(e) => setPerformanceFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Performance</option>
                <option>High Performance</option>
                <option>Low Performance</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Sort by Subject</option>
                <option>Sort by Grade</option>
                <option>Sort by Teacher</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Showing 6 of 8 classes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {classes.map((cls) => {
            const badge = getStatusBadge(cls.status);
            return (
              <div key={cls.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${cls.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {cls.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                      <p className="text-sm text-gray-500">{cls.teacher}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text_color}`}>
                    {cls.status === 'active' && '● '}
                    {cls.status === 'pending' && '● '}
                    {cls.status === 'completed' && '● '}
                    {badge.text}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{cls.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{cls.room}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{cls.isFinal ? 'Final Grade' : 'Current Grade'}</span>
                    <span className="font-semibold text-gray-900">{cls.grade ? `${cls.grade}%` : '--'}</span>
                  </div>
                  {cls.grade && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getGradeColor(cls.grade)}`}
                        style={{ width: `${cls.grade}%` }}
                      />
                    </div>
                  )}
                  {!cls.grade && (
                    <div className="w-full bg-gray-200 rounded-full h-2" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {upcomingClasses.map((cls, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-1">{cls.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{cls.time}</p>
                <p className={`text-sm font-medium ${idx === 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  Starts in {cls.startsIn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <CalendarDays className="w-5 h-5" />
            View Timetable
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <MessageSquare className="w-5 h-5" />
            Message Teacher
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            <FileText className="w-5 h-5" />
            View Assignments
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;