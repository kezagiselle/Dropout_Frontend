import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Bell,
  Calendar
} from 'lucide-react';
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface School {
  schoolId: string;
  schoolName: string;
  region: string;
  numberOfTeachers: number;
}

interface TeachersData {
  schools: School[];
}

export default function TeacherPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('GASABO');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All Risk Levels');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [activeTab, setActiveTab] = useState('Teachers');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, token, logout } = useUserAuth();
  
  // API integration state
  const [teachersData, setTeachersData] = useState<TeachersData>({ schools: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch teachers data from API
  useEffect(() => {
    const fetchTeachersData = async () => {
      if (!token) return;
      
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${baseUrl}/api/government/teachers-overview`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setTeachersData(result.data);
        } else {
          setError(result.message || 'Failed to fetch teachers data');
        }
      } catch (err) {
        setError('Failed to load teachers data');
        console.error('Teachers API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachersData();
  }, [token]);

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
          {/* Left Section - Mobile Menu Button and Organization Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base truncate max-w-[120px] sm:max-w-none">
                {user?.name || 'Education Organization'}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
              {/* Top menu bar removed as requested */}
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
              <img 
                src={userr} 
                alt="User profile" 
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" 
              />
              <span className="text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[100px] lg:max-w-none">
                {user?.name || 'Admin'}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Organization Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Filters Bar - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Filters:</span>
              
              {/* All Schools Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Schools</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* All Teachers Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Teachers</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* All Students Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Students</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* Save Filter Button */}
              <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap">
                Save Filter
              </button>
            </div>

            {/* Add School Button */}
            <button
              onClick={() => navigate('/add-school')}
              className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap mt-2 sm:mt-0"
            >
              + Add School
            </button>
          </div>

          {/* Search and Filters - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by School name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              {/* All Regions Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 pr-8 sm:pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                >
                  <option value="All Regions">All Regions</option>
                  <option value="Region A">Region A</option>
                  <option value="Region B">Region B</option>
                  <option value="Region C">Region C</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* All Risk Levels Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedRiskLevel}
                  onChange={(e) => setSelectedRiskLevel(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 pr-8 sm:pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                >
                  <option value="All Risk Levels">All Risk Levels</option>
                  <option value="High Risk">High Risk</option>
                  <option value="Medium Risk">Medium Risk</option>
                  <option value="Low Risk">Low Risk</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Schools Table - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 sm:mb-6">
            {loading ? (
              /* Skeleton Loading */
              <div className="animate-pulse">
                <div className="bg-gray-50 border-b border-gray-200">
                  <div className="flex px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 gap-4">
                    <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="flex px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 gap-4">
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">School Name</th>
                      <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Region</th>
                      <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Number of Teachers</th>
                      <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teachersData.schools.length > 0 ? (
                      teachersData.schools.map((school) => (
                        <tr key={school.schoolId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm lg:text-base truncate block max-w-[150px] sm:max-w-none">
                              {school.schoolName}
                            </a>
                          </td>
                          <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-gray-700 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                            {school.region}
                          </td>
                          <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                            <span className="text-gray-700 text-xs sm:text-sm lg:text-base font-medium">
                              {school.numberOfTeachers}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                            <button 
                              onClick={() => navigate('/view-teachers', { state: { schoolId: school.schoolId } })}
                              className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm whitespace-nowrap"
                            >
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>View Teachers</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-gray-400">
                          No schools found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination - Enhanced Responsiveness */}
          {!loading && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                Showing {teachersData.schools.length} schools
              </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
                disabled={currentPage === 4}
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}