import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, ChevronDown, ExternalLink, Users, Calendar, Bell, Menu, X, BarChart3, FileText } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { FaCalendarCheck } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';

interface TimelineItem {
  id: string;
  type: 'positive' | 'warning';
  title: string;
  description: string;
  teacher: string;
  date: string;
}

interface CounselingNote {
  id: string;
  title: string;
  description: string;
  counselor: string;
  date: string;
  status: 'completed' | 'in-progress';
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const StudentBehavior: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('My Behavior');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [termFilter, setTermFilter] = useState('Current Term');
  const navigate = useNavigate();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const menuItems: MenuItem[] = [
    { icon: SiGoogleclassroom, label: 'My Classes', path: '/student-class' },
    { icon: FileText, label: 'My Assignments', path: '/my-assignments' },
    { icon: FaCalendarCheck, label: 'My Attendance', path: '/student-attendance' },
    { icon: TbReport, label: 'My Behavior', path: '/student-behavior' },
    { icon: IoMdSettings, label: 'My Profile', path: '/student-settings' } // Added My Profile
  ];

  const timelineItems: TimelineItem[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Outstanding Class Participation',
      description: 'Exceptional contribution to group discussion in Biology class',
      teacher: 'Teacher: Ms. Rodriguez',
      date: 'March 19, 2025'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Late Assignment Submission',
      description: 'Mathematics homework submitted 2 days after deadline',
      teacher: 'Teacher: Mr. Thompson',
      date: 'March 18, 2025'
    },
    {
      id: '3',
      type: 'positive',
      title: 'Peer Tutoring Recognition',
      description: 'Volunteered to help fellow classmates with Chemistry concepts',
      teacher: 'Teacher: Dr. Williams',
      date: 'March 8, 2025'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Disruptive Behavior',
      description: 'Talking during lecture after being asked to stop',
      teacher: 'Teacher: Ms. Davis',
      date: 'February 28, 2025'
    }
  ];

  const counselingNotes: CounselingNote[] = [
    {
      id: '1',
      title: 'Academic Performance Review',
      description: 'Discussed time management strategies and study habits improvement',
      counselor: 'Counselor: Mrs. Johnson | March 5, 2025',
      date: 'March 5, 2025',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Behavioral Improvement Plan',
      description: 'Follow-up session to monitor progress on classroom behavior goals',
      counselor: 'Counselor: Mrs. Johnson | March 5, 2025',
      date: 'March 5, 2025',
      status: 'in-progress'
    }
  ];

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
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">Westfield High School</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">Alex Johnson</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
        >
          {/* Mobile Close Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <nav className="p-3 sm:p-4 relative z-50 bg-white h-full">
            <button
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 ${
                activeTab === 'Dashboard'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation('/student-dash', 'Dashboard')}
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Dashboard</span>
            </button>
            {menuItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={idx}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 ${
                    activeTab === item.label
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                  }`}
                  onClick={() => handleNavigation(item.path, item.label)}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Behavior Reports</h1>
              <p className="text-gray-600 text-sm sm:text-base">Review your conduct, commendations, and counseling records</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="relative flex-1 min-w-0">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option>All Types</option>
                  <option>Commendations</option>
                  <option>Warnings</option>
                  <option>Incidents</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-1 min-w-0">
                <select
                  value={termFilter}
                  onChange={(e) => setTermFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option>Current Term</option>
                  <option>Last Term</option>
                  <option>All Terms</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Commendations */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate">Commendations</h3>
                      <p className="text-xs text-gray-500">Positive conduct</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">12</div>
                    <div className="text-xs text-green-600 mt-1">↑ 3 from last term</div>
                  </div>
                  <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
                    View Details
                  </button>
                </div>
              </div>

              {/* Warnings */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate">Warnings</h3>
                      <p className="text-xs text-gray-500">Minor infractions</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">3</div>
                    <div className="text-xs text-gray-500 mt-1">Same as last term</div>
                  </div>
                  <button className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap">
                    View Details
                  </button>
                </div>
              </div>

              {/* Serious Incidents */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate">Serious Incidents</h3>
                      <p className="text-xs text-gray-500">Major violations</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">1</div>
                    <div className="text-xs text-green-600 mt-1">↓ 1 from last term</div>
                  </div>
                  <button className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium whitespace-nowrap">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Behavior Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Behavior Timeline</h2>
              <div className="space-y-3 sm:space-y-4">
                {timelineItems.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                      item.type === 'positive'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.type === 'positive' ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                      >
                        {item.type === 'positive' ? (
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        ) : (
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-700 mb-2 line-clamp-2">{item.description}</p>
                        <p className="text-xs text-gray-600 truncate">{item.teacher}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-shrink-0">
                      <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                        {window.innerWidth < 640 ? item.date.split(' ')[0] : item.date}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Counseling Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Counseling Notes</h2>
              <div className="space-y-3 sm:space-y-4">
                {counselingNotes.map((note) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{note.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          note.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {note.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-2 line-clamp-2">{note.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <p className="text-xs text-gray-600 truncate">{note.counselor}</p>
                      <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap self-start sm:self-auto">
                        View Full Notes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral Insights */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Behavioral Insights</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">
                    Your recent positive behavior has significantly improved your overall conduct record. Keep up the
                    excellent work with peer tutoring and class participation!
                  </p>
                  <p className="text-xs text-gray-600">
                    💡 Your project list teaches decreased by 15% this term
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Updated to include My Profile */}
            <div className="flex flex-row flex-wrap gap-3 justify-center sm:justify-start">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                <span>Counseling Notes</span>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap">
                <Users className="w-4 h-4" />
                <span>All Reports</span>
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap">
                <AlertCircle className="w-4 h-4" />
                <span>Contact Counselor</span>
              </button>
              <button 
                onClick={() => handleNavigation('/student-settings', 'My Profile')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <IoMdSettings className="w-4 h-4" />
                <span>My Profile</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentBehavior;