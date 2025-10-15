import React, { useState } from 'react';
import { Download, Eye, ChevronDown, Filter, Plus, MoreVertical, ChevronLeft, ChevronRight, BarChart3, Bell, Search, Calendar } from 'lucide-react';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaClipboardCheck } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate, useLocation } from 'react-router-dom';

interface Report {
  id: number;
  name: string;
  type: 'Commendation' | 'Minor Incident' | 'Major Incident';
  grade: string;
  time: string;
  description: string;
  color: 'green' | 'orange' | 'red';
}

type ReportType = 'Commendation' | 'Minor Incident' | 'Major Incident';
type ColorType = 'green' | 'orange' | 'red';

export default function Behavior() {
  const [activeTab, setActiveTab] = useState('Behavior Reports');
  const [selectedStudent, setSelectedStudent] = useState<string>('All Students');
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Date (Latest)');
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: LiaChalkboardTeacherSolid, label: 'My Classes', path: '/my-classes' },
    { icon: FaClipboardCheck, label: 'Attendance', path: '/attendance' },
    { icon: TbReport, label: 'Behavior Reports', path: '/behavior' },
    { icon: IoIosPeople, label: 'Student Profiles', path: '/student-profiles' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  const reports: Report[] = [
    {
      id: 1,
      name: 'Emma Johnson',
      type: 'Commendation',
      grade: 'Grade 10B',
      time: 'Today, 2:30 PM',
      description: 'Excellent participation in class discussion and helped struggling classmates with math problems.',
      color: 'green'
    },
    {
      id: 2,
      name: 'Michael Brown',
      type: 'Minor Incident',
      grade: 'Grade 9A',
      time: 'Today, 1:15 PM',
      description: 'Disrupting class by talking during lesson. Student was given a verbal warning.',
      color: 'orange'
    },
    {
      id: 3,
      name: 'James Wilson',
      type: 'Major Incident',
      grade: 'Grade 11C',
      time: 'Yesterday, 3:45 PM',
      description: 'Physical altercation with another student during lunch break. Parents contacted, detention assigned.',
      color: 'red'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      type: 'Commendation',
      grade: 'Grade 10A',
      time: 'Yesterday, 11:20 AM',
      description: 'Outstanding leadership during group project and demonstrated excellent teamwork skills.',
      color: 'green'
    },
    {
      id: 5,
      name: 'Alex Martinez',
      type: 'Minor Incident',
      grade: 'Grade 9B',
      time: '2 days ago, 8:15 AM',
      description: 'Late to class for the third time this week. Student counseled about punctuality.',
      color: 'orange'
    }
  ];

  const getIconBg = (color: ColorType): string => {
    const colors = {
      green: 'bg-green-100',
      orange: 'bg-orange-100',
      red: 'bg-red-100'
    };
    return colors[color];
  };

  const getIcon = (color: ColorType): React.ReactElement => {
    const icons = {
      green: (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      orange: (
        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      red: (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[color];
  };

  const getBorderColor = (color: ColorType): string => {
    const colors = {
      green: 'border-l-green-500',
      orange: 'border-l-orange-500',
      red: 'border-l-red-500'
    };
    return colors[color];
  };

  const getTypeBadge = (type: ReportType): string => {
    const badges = {
      'Commendation': 'bg-green-100 text-green-700',
      'Minor Incident': 'bg-orange-100 text-orange-700',
      'Major Incident': 'bg-red-100 text-red-700'
    };
    return badges[type];
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
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <button 
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 mb-2 ${
                activeTab === 'Dashboard' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation('/', 'Dashboard')}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            {menuItems.filter(item => item.label !== 'Dashboard').map((item, idx) => (
              <button 
                key={idx} 
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 ${
                  activeTab === item.label 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Behavior Reports</h1>
                  <p className="text-sm text-gray-600 mt-1">Track and manage student behavior incidents and commendations</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" />
                    Log New Behavior Report
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Eye className="w-4 h-4" />
                    View All Reports
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <div className="relative">
                  <select 
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Students</option>
                    <option>Emma Johnson</option>
                    <option>Michael Brown</option>
                    <option>James Wilson</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Classes</option>
                    <option>Grade 9A</option>
                    <option>Grade 10B</option>
                    <option>Grade 11C</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Types</option>
                    <option>Commendation</option>
                    <option>Minor Incident</option>
                    <option>Major Incident</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <input 
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Date (Latest)</option>
                      <option>Date (Oldest)</option>
                      <option>Student Name</option>
                      <option>Type</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">24</div>
                <div className="text-sm text-gray-600">Commendations</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-4xl font-bold text-orange-500 mb-1">8</div>
                <div className="text-sm text-gray-600">Minor Incidents</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-4xl font-bold text-red-500 mb-1">3</div>
                <div className="text-sm text-gray-600">Major Incidents</div>
              </div>
            </div>

            {/* Reports List */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Behavior Reports</h2>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div 
                    key={report.id}
                    className={`bg-white rounded-lg shadow-sm border-l-4 ${getBorderColor(report.color)} p-6 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full ${getIconBg(report.color)} flex items-center justify-center flex-shrink-0`}>
                        {getIcon(report.color)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-gray-900">{report.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadge(report.type)}`}>
                              {report.type}
                            </span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            <span>{report.grade}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>{report.time}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700">{report.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1 to 5 of 5 results
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}