import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, ChevronDown, ArrowUpRight, Bell, Menu, X } from 'lucide-react';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';
import StudentSidebar from './StudentSidebar';

const summaryCards = [
  {
    label: 'Pending Tasks',
    value: '7',
    sublabel: '2 due this week',
    color: 'text-orange-500',
    dot: 'bg-orange-400',
  },
  {
    label: 'Graded Items',
    value: '24',
    sublabel: 'This semester',
    color: 'text-emerald-500',
    dot: 'bg-emerald-400',
  },
  {
    label: 'Average Score',
    value: '87%',
    sublabel: 'Across all subjects',
    color: 'text-blue-600',
    dot: 'bg-emerald-400',
  },
];

const upcomingDeadlines = [
  { title: 'Physics Lab Report', subject: 'Science', status: 'Overdue', statusColor: 'bg-red-50 text-red-600', due: 'Due 2 days ago' },
  { title: 'Math Quiz 5', subject: 'Mathematics', status: 'Due Soon', statusColor: 'bg-orange-50 text-orange-600', due: 'Due in 1 day' },
  { title: 'History Essay', subject: 'History', status: 'Due Soon', statusColor: 'bg-orange-50 text-orange-600', due: 'Due in 3 days' },
  { title: 'English Quiz 3', subject: 'English', status: 'Submitted', statusColor: 'bg-emerald-50 text-emerald-600', due: 'Submitted' },
];

const allAssignments = [
  { title: 'Physics Lab Report', subject: 'Science', type: 'Assignment', due: 'Mar 15, 2024', status: 'Overdue', statusColor: 'text-red-500', score: '-', action: 'Submit' },
  { title: 'Math Quiz 5', subject: 'Mathematics', type: 'Quiz', due: 'Mar 18, 2024', status: 'Pending', statusColor: 'text-orange-500', score: '-', action: 'Take Quiz' },
  { title: 'English Quiz 3', subject: 'English', type: 'Quiz', due: 'Mar 12, 2024', status: 'Graded', statusColor: 'text-emerald-500', score: '92%', action: 'Review' },
];

const recentFeedback = [
  {
    title: 'Math Quiz 4',
    score: '85%',
    comment: 'Great improvement in algebraic equations! Keep practicing word problems.',
    teacher: 'Mrs. Johnson',
    time: '2 days ago',
  },
  {
    title: 'Science Lab 3',
    score: '94%',
    comment: 'Excellent hypothesis and data analysis. Well-structured report!',
    teacher: 'Dr. Smith',
    time: '1 week ago',
  },
];

const Assignments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('My Assignments');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user } = useUserAuth();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          {/* Left Section - Mobile Menu Button and School Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.schoolName || 'School Name'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/student-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/student-class', 'My Classes')}
                className="hover:text-orange-600 transition-colors"
              >
                Classes
              </button>
              <button 
                onClick={() => handleNavigation('/my-assignments', 'My Assignments')}
                className="hover:text-orange-600 transition-colors"
              >
                Assignments
              </button>
              <button 
                onClick={() => handleNavigation('/student-settings', 'My Profile')}
                className="hover:text-orange-600 transition-colors"
              >
                My Profile
              </button>
            </div>
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Student'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <StudentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            {loading ? (
              <>
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 sm:h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-32"></div>
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-24"></div>
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                  </div>
                </div>
                
                {/* Summary Cards Skeleton */}
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-24"></div>
                          <div className="h-6 sm:h-8 bg-gray-200 rounded animate-pulse mb-1 w-12"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-full animate-pulse"></div>
                          {i === 3 && <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Upcoming Deadlines Skeleton */}
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-40"></div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex gap-3">
                        <div className="w-1 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="h-5 bg-gray-200 rounded-full animate-pulse w-16"></div>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-20"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-18"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Table Skeleton */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-3 sm:px-4 lg:px-6 py-3 border-b border-gray-100">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
                  </div>
                  <div className="p-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                        <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Feedback Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5">
                      <div className="flex justify-between gap-3">
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                        <div className="h-8 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Smart Insights Skeleton */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
                  <div className="flex items-start gap-2 sm:gap-3 mb-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded animate-pulse mt-1"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-32"></div>
                  </div>
                </div>
                
                {/* Bottom Actions Skeleton */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded-full animate-pulse w-28"></div>
                    <div className="h-8 bg-gray-200 rounded-full animate-pulse w-32"></div>
                    <div className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded-full animate-pulse w-36"></div>
                </div>
              </>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Assignments &amp; Quizzes</h1>
                    <p className="text-gray-500 text-xs sm:text-sm lg:text-base mt-1">
                      Track, complete, and submit your assignments and quizzes.
                    </p>
                  </div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <div className="relative min-w-[120px] sm:min-w-[140px]">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 shadow-sm text-gray-700 w-full text-xs sm:text-sm">
                    <option>All Subjects</option>
                  </select>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative min-w-[100px] sm:min-w-[120px]">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 shadow-sm text-gray-700 w-full text-xs sm:text-sm">
                    <option>All Status</option>
                  </select>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative min-w-[110px] sm:min-w-[130px]">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 shadow-sm text-gray-700 w-full text-xs sm:text-sm">
                    <option>Spring 2024</option>
                  </select>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold truncate">{card.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{card.sublabel}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100`}>
                      <CheckCircle2 className={`w-3 h-3 sm:w-4 sm:h-4 ${card.color}`} />
                    </span>
                    {card.label === 'Average Score' && (
                      <span className="flex items-center text-xs text-emerald-500 font-semibold">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +5% this month
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Deadlines */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Upcoming Deadlines</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
                {upcomingDeadlines.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 flex gap-3"
                  >
                    <div className={`w-1 rounded-full ${
                      item.status === 'Overdue' ? 'bg-red-500' :
                      item.status === 'Due Soon' ? 'bg-orange-500' :
                      'bg-emerald-500'
                    }`}></div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.statusColor} truncate`}>
                          {item.status}
                        </span>
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0 ml-2" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 truncate">{item.subject}</p>
                      </div>
                      <p className={`mt-2 sm:mt-3 text-xs font-medium ${
                        item.status === 'Overdue' ? 'text-red-500' :
                        item.status === 'Due Soon' ? 'text-orange-500' :
                        'text-emerald-500'
                      }`}>{item.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* All Assignments & Quizzes */}
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-3 sm:px-4 lg:px-6 py-3 border-b border-gray-100">
                <h2 className="text-sm sm:text-base font-bold text-gray-900">All Assignments &amp; Quizzes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-100">
                      <th className="py-3 pl-3 sm:pl-4 pr-2 sm:pr-4 text-left font-medium whitespace-nowrap">Title</th>
                      <th className="py-3 px-2 sm:px-4 text-left font-medium whitespace-nowrap hidden xs:table-cell">Subject</th>
                      <th className="py-3 px-2 sm:px-4 text-left font-medium whitespace-nowrap hidden sm:table-cell">Type</th>
                      <th className="py-3 px-2 sm:px-4 text-left font-medium whitespace-nowrap">Due Date</th>
                      <th className="py-3 px-2 sm:px-4 text-left font-medium whitespace-nowrap">Status</th>
                      <th className="py-3 px-2 sm:px-4 text-left font-medium whitespace-nowrap">Score</th>
                      <th className="py-3 pr-3 sm:pr-4 pl-2 sm:pl-4 text-left font-medium whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAssignments.map((row) => (
                      <tr key={row.title} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 pl-3 sm:pl-4 pr-2 sm:pr-4 flex items-center gap-2 text-gray-800 min-w-0">
                          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400" />
                          </span>
                          <span className="font-semibold truncate min-w-0">{row.title}</span>
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-gray-700 font-semibold whitespace-nowrap hidden xs:table-cell">
                          {row.subject}
                        </td>
                        <td className="py-3 px-2 sm:px-4 whitespace-nowrap hidden sm:table-cell">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-600">
                            {row.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-gray-700 font-semibold whitespace-nowrap">
                          <span className="sm:hidden text-xs">{row.due.split(' ')[0]}</span>
                          <span className="hidden sm:inline">{row.due}</span>
                        </td>
                        <td className="py-3 px-2 sm:px-4 whitespace-nowrap">
                          <span className={`text-xs font-semibold ${row.statusColor}`}>{row.status}</span>
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-emerald-600 font-semibold whitespace-nowrap">
                          {row.score}
                        </td>
                        <td className="py-3 pr-3 sm:pr-4 pl-2 sm:pl-4 whitespace-nowrap">
                          <button className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-300 hover:bg-blue-400 text-blue-800 text-xs font-semibold whitespace-nowrap">
                            {row.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Recent Feedback & Grades */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {recentFeedback.map((item) => (
                <div key={item.title} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{item.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 italic line-clamp-2">"{item.comment}"</p>
                    <p className="mt-2 text-xs text-gray-500">
                      {item.teacher} · {item.time}
                    </p>
                  </div>
                  <div className="flex items-center justify-start sm:justify-end">
                    <div className="inline-flex flex-col items-center px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold whitespace-nowrap">
                      <span>{item.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Smart Insights */}
            <section className="bg-blue-50 border border-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="mt-0.5 sm:mt-1 text-blue-500 flex-shrink-0">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-blue-900">Smart Insights</h3>
                  <p className="mt-1 text-xs sm:text-sm text-blue-800">
                    You&apos;ve missed 2 submissions in Science. Try to complete upcoming tasks early to boost your overall score.
                    Your Math performance has improved by 15% this month!
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white text-blue-700 border border-blue-200 text-xs sm:text-sm font-semibold whitespace-nowrap">
                  View Study Tips
                </button>
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-300 text-blue-800 text-xs sm:text-sm font-semibold whitespace-nowrap">
                  Schedule Study Time
                </button>
              </div>
            </section>

            {/* Bottom Actions - Updated to include My Profile */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold whitespace-nowrap">
                  View Pending Tasks
                </button>
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold whitespace-nowrap">
                  View Graded Tasks
                </button>
                <button 
                  onClick={() => handleNavigation('/student-settings', 'My Profile')}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap"
                >
                  <IoMdSettings className="w-3 h-3 sm:w-4 sm:h-4" />
                  My Profile
                </button>
              </div>
              <button className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-orange-500 hover:bg-orange-300 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                Submit Assignment
              </button>
            </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assignments;