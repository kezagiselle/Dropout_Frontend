import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  AlertTriangle, 
  AlertCircle, 
  MapPin, 
  UserCheck, 
  ChevronDown,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Calendar,
  Award,
  ShieldAlert
} from 'lucide-react';
import { IoMdSchool } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { FaSchool } from "react-icons/fa6";
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface SchoolProfile {
  schoolName: string;
  location: string;
  principalName: string;
  description: string;
  totalEnrollment: number;
  teachingStaff: number;
  dropoutRate: number;
  avgAttendance: number;
  avgGrade: number;
  behaviorIncidents: number;
  atRiskStudents: number;
}

export default function SchoolDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('GASABO');
  const [activeTab, setActiveTab] = useState('Schools');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useUserAuth();
  
  // API integration state
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const schoolId = location.state?.schoolId;

  // Fetch school profile data from API
  useEffect(() => {
    const fetchSchoolProfile = async () => {
      if (!token || !schoolId) {
        setError('Missing authentication or school ID');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${baseUrl}/api/government/schools/${schoolId}/overview`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setSchoolProfile(result.data);
        } else {
          setError(result.message || 'Failed to fetch school profile');
        }
      } catch (err) {
        setError('Failed to load school profile');
        console.error('School profile API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolProfile();
  }, [token, schoolId]);

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.name || 'Education Organization'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/org-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/org-schools', 'Schools')}
                className="hover:text-orange-600 transition-colors"
              >
                Schools
              </button>
              <button 
                onClick={() => handleNavigation('/reports', 'Reports')}
                className="hover:text-orange-600 transition-colors"
              >
                Reports
              </button>
              <button 
                onClick={() => handleNavigation('/organ-settings', 'Settings')}
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Organization Admin'}</span>
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
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Filters:</span>
              
              {/* All Schools Dropdown */}
              <div className="relative">
                <button className="px-2 sm:px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm">
                  <span className="text-gray-700">All Schools</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Teachers Dropdown */}
              <div className="relative">
                <button className="px-2 sm:px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm">
                  <span className="text-gray-700">All Teachers</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Students Dropdown */}
              <div className="relative">
                <button className="px-2 sm:px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm">
                  <span className="text-gray-700">All Students</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Save Filter Button */}
              <button className="px-2 sm:px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium">
                Save Filter
              </button>
            </div>
          </div>

          {loading ? (
            /* Skeleton Loading */
            <div className="animate-pulse">
              {/* School Card Skeleton */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : !schoolProfile ? (
            <div className="text-center py-8 text-gray-400">No school data available</div>
          ) : (
            <>
              {/* School Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mb-4 sm:mb-6 gap-4">
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* School Icon */}
                    <div className="bg-green-100 rounded-lg p-4 sm:p-6 md:p-8 flex items-center justify-center w-full md:w-48 h-48 mx-auto md:mx-0">
                      <div className="text-center">
                        <FaSchool className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-orange-500 mx-auto mb-2 sm:mb-3" />
                        <div className="text-sm sm:text-base font-medium text-gray-700">{schoolProfile.schoolName}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      {/* Principal */}
                      <div className="bg-orange-50 rounded-lg p-4 sm:p-6 flex-1 min-h-[140px] sm:min-h-[192px] flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 sm:w-5 h-5 text-orange-500" />
                          <span className="text-xs sm:text-sm text-orange-600">Principal</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-orange-500">{schoolProfile.principalName}</div>
                      </div>

                      {/* Location */}
                      <div className="bg-green-50 rounded-lg p-4 sm:p-6 flex-1 min-h-[140px] sm:min-h-[192px] flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 sm:w-5 h-5 text-green-600" />
                          <span className="text-xs sm:text-sm text-green-600">Location</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-700">{schoolProfile.location}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-xs sm:text-sm text-blue-600">Total Enrollment</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">{schoolProfile.totalEnrollment}</div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span className="text-xs sm:text-sm text-green-600">Teaching Staff</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">{schoolProfile.teachingStaff}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                  {schoolProfile.description}
                </p>
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Student Statistics */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Student Statistics</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm sm:text-base text-gray-700">Total Students</span>
                        </div>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{schoolProfile.totalEnrollment}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm sm:text-base text-gray-700">Dropout Rate</span>
                        </div>
                        <span className="font-bold text-orange-600 text-sm sm:text-base">{schoolProfile.dropoutRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-blue-500" />
                          <span className="text-sm sm:text-base text-gray-700">Avg Attendance</span>
                        </div>
                        <span className="font-bold text-green-600 text-sm sm:text-base">{schoolProfile.avgAttendance.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic & Behavior */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Academic & Behavior</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm sm:text-base text-gray-700">Average Grade</span>
                        </div>
                        <span className="font-bold text-blue-600 text-sm sm:text-base">{schoolProfile.avgGrade.toFixed(1)}/20</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 text-orange-500" />
                          <span className="text-sm sm:text-base text-gray-700">Behavior Incidents</span>
                        </div>
                        <span className="font-bold text-orange-600 text-sm sm:text-base">{schoolProfile.behaviorIncidents}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm sm:text-base text-gray-700">At-Risk Students</span>
                        </div>
                        <span className="font-bold text-red-600 text-sm sm:text-base">{schoolProfile.atRiskStudents}</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 sm:mt-6">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full bg-blue-400 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                          <TbReportSearch className="w-4 h-4 sm:w-5 h-5" />
                          View Full Report
                        </button>
                        <button 
                          onClick={() => navigate('/org-schools')}
                          className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm sm:text-base"
                        >
                          Back to Schools
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}