import { useState } from 'react';
import { ChevronDown, Calendar, BarChart3, Bell, Menu, X, FileText, ArrowLeft, Filter } from 'lucide-react';
import userr from "../../../src/img/userr.png";
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar';

interface Mark {
  type: string;
  title: string;
  score: number;
}

interface LocationState {
  childName: string;
  courseName: string;
  marks: Mark[];
}

const ParentMarksDetail = () => {
  const [activeTab, setActiveTab] = useState<string>('Academic Progress');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserAuth();
  
  // Get data from navigation state
  const { childName, courseName, marks } = (location.state as LocationState) || {
    childName: 'Student',
    courseName: 'Unknown Course',
    marks: []
  };

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  // Filter marks based on category
  const filteredMarks = categoryFilter === 'All' 
    ? marks 
    : marks.filter(mark => mark.type === categoryFilter);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(marks.map(mark => mark.type)))];

  // Get grade color based on score
  const getGradeColor = (score: number): string => {
    if (score >= 18) return 'text-green-600 bg-green-100';
    if (score >= 16) return 'text-blue-600 bg-blue-100';
    if (score >= 14) return 'text-yellow-600 bg-yellow-100';
    if (score >= 12) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  // Calculate statistics
  const totalMarks = marks.length;
  const averageScore = marks.length > 0 
    ? (marks.reduce((sum, mark) => sum + mark.score, 0) / marks.length).toFixed(1)
    : '0';
  const highestScore = marks.length > 0 ? Math.max(...marks.map(mark => mark.score)) : 0;
  const lowestScore = marks.length > 0 ? Math.min(...marks.map(mark => mark.score)) : 0;

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
                onClick={() => handleNavigation('/parent-dashboard', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/parent-children', 'My Children')}
                className="hover:text-orange-600 transition-colors"
              >
                My Children
              </button>
              <button 
                onClick={() => handleNavigation('/parent-attendance', 'Attendance')}
                className="hover:text-orange-600 transition-colors"
              >
                Attendance
              </button>
              <button 
                onClick={() => handleNavigation('/parent-settings', 'Settings')}
                className="hover:text-orange-600 transition-colors"
              >
                Settings
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Parent'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <ParentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 mb-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/parent-academics')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Academic Progress</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{courseName} - Marks</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Student: {childName}</p>
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'All' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMarks}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}/20</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Highest Score</p>
                  <p className="text-2xl font-bold text-gray-900">{highestScore}/20</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lowest Score</p>
                  <p className="text-2xl font-bold text-gray-900">{lowestScore}/20</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Filter className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Marks Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Assessment Results
                {categoryFilter !== 'All' && (
                  <span className="text-sm text-gray-500 ml-2">({categoryFilter} only)</span>
                )}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredMarks.length} of {totalMarks} assessments for {childName}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assessment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMarks.length > 0 ? (
                    filteredMarks.map((mark, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{mark.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {mark.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{mark.score}/20</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(mark.score / 20) * 100}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getGradeColor(mark.score)}`}>
                            {mark.score >= 18 ? 'Excellent' : 
                             mark.score >= 16 ? 'Very Good' :
                             mark.score >= 14 ? 'Good' :
                             mark.score >= 12 ? 'Fair' : 'Poor'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No assessments found for the selected category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentMarksDetail;
