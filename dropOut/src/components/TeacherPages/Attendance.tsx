import React, { useState } from 'react';
import { ChevronDown, Calendar, Users, BookOpen, BarChart3, UserCircle, MessageSquare, Settings, Bell, Search, TrendingUp, UserX, Clock } from 'lucide-react';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaClipboardCheck } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import pe1 from "../../../src/img/pe1.png";
import pe2 from "../../../src/img/pe2.png";
import pe3 from "../../../src/img/pe3.png";


interface Student {
  id: number;
  name: string;
  studentId: string;
  avatar: string;
  statuses: string[];
  activeStatus: string;
}

interface ChronicAbsence {
  name: string;
  grade: string;
  days: string;
  risk: string;
  avatar: string;
}

interface ChartData {
  date: string;
  uv: number;
  pv: number;
  amt: number;
}


interface TickProps {
  x: number;
  y: number;
  payload: {
    value: string;
    offset: number;
  };
  width: number;
  visibleTicksCount: number;
}


const monthTickFormatter = (tick: string): string => {
  const date = new Date(tick);
  return (date.getMonth() + 1).toString();
};

const renderQuarterTick = (tickProps: TickProps): React.ReactElement => {
  const { x, y, payload, width, visibleTicksCount } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;

  if (month % 3 === 1) {
    return (
      <text 
        x={x + width / visibleTicksCount / 2 - offset} 
        y={y - 4} 
        textAnchor="middle"
      >
        {`Q${quarterNo}`}
      </text>
    );
  }

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x - offset + width / visibleTicksCount : x - offset) + 0.5;
    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
  }
  return<></>
};

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('Attendance');
  const [selectedWeek, setSelectedWeek] = useState<string>('This Week');
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 5A');
  const navigate = useNavigate();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: LiaChalkboardTeacherSolid, label: 'My Classes', path: '/my-classes' },
    { icon: TbReport, label: 'Behavior Reports', path: '/behavior-reports' },
    { icon: IoIosPeople, label: 'Student Profiles', path: '/student-profiles' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  
  const chartData: ChartData[] = [
    { date: '2000-01', uv: 4000, pv: 2400, amt: 2400 },
    { date: '2000-02', uv: 3000, pv: 1398, amt: 2210 },
    { date: '2000-03', uv: 2000, pv: 9800, amt: 2290 },
    { date: '2000-04', uv: 2780, pv: 3908, amt: 2000 },
    { date: '2000-05', uv: 1890, pv: 4800, amt: 2181 },
    { date: '2000-06', uv: 2390, pv: 3800, amt: 2500 },
    { date: '2000-07', uv: 3490, pv: 4300, amt: 2100 },
    { date: '2000-08', uv: 4000, pv: 2400, amt: 2400 },
    { date: '2000-09', uv: 3000, pv: 1398, amt: 2210 },
    { date: '2000-10', uv: 2000, pv: 9800, amt: 2290 },
    { date: '2000-11', uv: 2780, pv: 3908, amt: 2000 },
    { date: '2000-12', uv: 1890, pv: 4800, amt: 2181 },
  ];

  const students: Student[] = [
    {
      id: 1,
      name: 'Emma Johnson',
      studentId: 'Student ID: 2024001',
      avatar: pe1,
      statuses: ['Present', 'Absent', 'Late', 'Excused'],
      activeStatus: 'Present' 
    },
    {
      id: 2,
      name: 'Michael Chen',
      studentId: 'Student ID: 2024002',
      avatar: pe2,
      statuses: ['Present', 'Absent', 'Late', 'Excused'],
      activeStatus: 'Absent' // Changed to Absent for orange color
    },
    {
      id: 3,
      name: 'Sarah Williams',
      studentId: 'Student ID: 2024003',
      avatar: pe3,
      statuses: ['Present', 'Absent', 'Late', 'Excused'],
      activeStatus: 'Present' 
    },
    {
      id: 4,
      name: 'David Martinez',
      studentId: 'Student ID: 2024004',
      avatar: pe1,
      statuses: ['Present', 'Absent', 'Late', 'Excused'],
      activeStatus: 'Late' 
    }
  ];

  const chronicAbsences: ChronicAbsence[] = [
    { name: 'Alex Thompson', grade: 'Grade 5A', days: '12 day', risk: 'High Risk', avatar: pe2 },
    { name: 'Jessica Lee', grade: 'Grade 5B', days: '8 day', risk: 'Medium Risk', avatar: pe3 },
    { name: 'Ryan Garcia', grade: 'Grade 6A', days: '6 day', risk: 'Watch List', avatar: pe1 }
  ];

  
  const getStatusStyle = (status: string, student: Student): string => {
    if (status === student.activeStatus) {
      switch(status) {
        case 'Present': 
          if (student.name === 'Michael Chen') {
            return 'bg-gray-300 text-gray-700'; // Light gray for Michael's Present
          }
          return 'bg-green-400 text-white'; 
        case 'Absent':
          if (student.name === 'Michael Chen') {
            return 'bg-orange-500 text-white'; // Orange for Michael's Absent
          }
          return 'bg-gray-300 text-gray-700';
        case 'Late':
          if (student.name === 'David Martinez') {
            return 'bg-yellow-600 text-white'; 
          }
          return 'bg-gray-300 text-gray-700'; 
        default:
          return 'bg-gray-300 text-gray-700'; 
      }
    }
    
    
    return 'bg-gray-200 text-gray-500';
  };

  const getRiskStyle = (risk: string): string => {
    switch(risk) {
      case 'High Risk': return 'bg-red-500 text-white';
      case 'Medium Risk': return 'bg-orange-500 text-white';
      case 'Watch List': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getChronicAbsenceBg = (risk: string): string => {
    switch(risk) {
      case 'High Risk': return 'bg-red-50 border-red-200';
      case 'Medium Risk': return 'bg-orange-50 border-orange-200';
      case 'Watch List': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
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
              onClick={() => handleNavigation('/teacher-dashboard', 'Dashboard')}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button 
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 mb-2 ${
                activeTab === 'My Classes' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation('/my-classes', 'My Classes')}
            >
              <LiaChalkboardTeacherSolid className="w-5 h-5" />
              <span className="font-medium">My Classes</span>
            </button>
            <button 
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 mb-2 ${
                activeTab === 'Attendance' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
            >
              <FaClipboardCheck className="w-5 h-5" />
              <span className="font-medium">Attendance</span>
            </button>
            {menuItems.filter(item => item.label !== 'Dashboard' && item.label !== 'My Classes' && item.label !== 'Attendance').map((item, idx) => (
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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Attendance Overview</h1>
            <p className="text-gray-600 text-sm mt-1">Manage daily attendance and track student participation</p>
          </div>

          {/* Stats Cards - Single row above */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Overall Attendance</p>
                  <p className="text-3xl font-bold text-gray-900">94.2%</p>
                </div>
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                </div>
              </div>
              <p className="text-xs text-green-600">↗ +2.1% from last week</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Present Today</p>
                  <p className="text-3xl font-bold text-gray-900">127</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-600">Out of 135 students</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Absent Today</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <UserX className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-xs text-gray-600">Including 3 excused</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Late Arrivals</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs text-red-600">↗ +1 from yesterday</p>
            </div>
          </div>

          {/* Chart Section - Below the cards */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Weekly Attendance Trends</h2>
                <p className="text-sm text-gray-600">Track attendance patterns across all your classes</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedWeek === 'This Week' ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-600 border border-gray-300'}`}
                  onClick={() => setSelectedWeek('This Week')}
                >
                  This Week
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedWeek === 'Last 4 Weeks' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
                  onClick={() => setSelectedWeek('Last 4 Weeks')}
                >
                  Last 4 Weeks
                </button>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tick={renderQuarterTick as any}
                    height={1}
                    scale="band"
                    xAxisId="quarter"
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Daily Attendance Recording</h2>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                    {selectedGrade}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="px-5 py-2 bg-blue-300 text-white rounded-lg text-sm font-medium hover:bg-blue-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Mark All Present
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {student.statuses.map((status, idx) => (
                        <button
                          key={idx}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${getStatusStyle(status, student)}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm">
                  See All
                </button>
              </div>
            </div>

            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">Chronic Absences</h2>
                <p className="text-sm text-gray-600">Students requiring attention</p>
              </div>

              <div className="space-y-4">
                {chronicAbsences.map((student, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${getChronicAbsenceBg(student.risk)}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.grade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium mb-1 ${getRiskStyle(student.risk)}`}>
                        {student.days}
                      </div>
                      <p className="text-xs text-gray-600">{student.risk}</p>
                    </div>
                  </div>
                ))}
              </div>
            
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}