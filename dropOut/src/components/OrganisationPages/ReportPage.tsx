import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Users, 
  BarChart3, 
  Calendar, 
  FileText, 
  Download,
  Building2,
  BookOpen,
  CalendarDays,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaFilePdf } from 'react-icons/fa';
import { useUserAuth } from '../../context/useUserAuth';
import userr from "../../../src/img/userr.png";

// Sidebar Component
interface OrganizationSidebarProps {
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigation: (path: string, tabName: string) => void;
}

const OrganizationSidebar: React.FC<OrganizationSidebarProps> = ({ 
  activeTab, 
  sidebarOpen, 
  setSidebarOpen, 
  handleNavigation 
}) => {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Building2, label: 'Schools', path: '/org-schools' },
    { icon: Users, label: 'Students', path: '/student-page' },
    { icon: FaChalkboardTeacher, label: 'Teachers', path: '/teacher-page' },
    { icon: BookOpen, label: 'Courses & Timetable', path: '/course-timetable' },
    { icon: CalendarDays, label: 'Exams & Grades', path: '/exams-grades' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/organ-settings' }
  ];

  return (
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
      
      <nav className="p-3 sm:p-4 relative z-50 bg-white h-full flex flex-col">
        <div className="flex-1">
          {/* Dashboard Button */}
          <button 
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 ${
              activeTab === 'Dashboard' 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
            }`}
            onClick={() => handleNavigation('/org-dash', 'Dashboard')}
          >
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Dashboard</span>
          </button>
          
          {/* Menu Items */}
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
        </div>

        {/* Logout Button pinned to sidebar bottom */}
        <div className="mt-4 mb-2">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200 text-base bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

// Main ReportPage Component
export default function ReportPage() {
      // Report types for tab selector
      const reportTypes = [
        { value: 'OVERALL', label: 'Overall' },
        { value: 'GRADES', label: 'Grades' },
        { value: 'ATTENDANCE', label: 'Attendance' },
      ];
    // School filter state
    const [selectedSchoolId, setSelectedSchoolId] = useState<string>('ALL');
  const [reportType, setReportType] = useState<'OVERALL' | 'GRADES' | 'ATTENDANCE'>('OVERALL');
  // Removed unused state: startDate, endDate, selectedSchool
  // Removed unused selectedRegion state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Reports');
  // Removed unused searchQuery state
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userAuth = useUserAuth();
  const user = userAuth.user;

  // Types for API data
  interface CourseSummary {
    courseId: string;
    courseName: string;
    teacherName: string | null;
    studentCount: number;
    averageGrade: number;
    attendanceRate: number;
    atRiskCount: number;
  }
  interface RiskDistribution {
    lowRiskCount: number;
    lowRiskPercentage: number;
    mediumRiskCount: number;
    mediumRiskPercentage: number;
    highRiskCount: number;
    highRiskPercentage: number;
    criticalRiskCount: number;
    criticalRiskPercentage: number;
    trend: string;
  }
  interface Performer {
    studentId: string;
    studentName: string;
    averageGrade: number;
    percentileRank: number;
  }
  interface AtRiskStudent {
    studentId: string;
    studentName: string;
    riskLevel: string;
    dropoutProbability: number;
    averageGrade: number;
    attendanceRate: number;
    behaviorIncidents: number;
    primaryConcern: string;
  }
  interface SchoolReport {
    schoolId: string;
    schoolName: string;
    totalStudents: number;
    totalCourses: number;
    totalTeachers: number;
    totalBehaviorIncidents: number;
    averageGrade: number;
    highestGrade: number;
    lowestGrade: number;
    averageAttendance: number;
    highestAttendance: number;
    lowestAttendance: number;
    riskDistribution: RiskDistribution;
    averageDropoutProbability: number;
    topPerformers: Performer[];
    bottomPerformers: Performer[];
    atRiskStudents: AtRiskStudent[];
    courseSummaries: CourseSummary[];
  }
  interface ReportData {
    reportType?: string;
    totalSchools: number;
    totalStudents: number;
    averageAttendance: number;
    averageGrade: number;
    totalAtRiskStudents: number;
    schoolReports: SchoolReport[];
  }

  // Fetch report data from API
  const fetchReport = async (type = reportType) => {
    setLoading(true);
    setError('');
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL ;
      let url = `${baseUrl}/api/reports/government`;
      if (type !== 'OVERALL') {
        url += `?type=${type}`;
      }
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setReportData(data.data);
      } else {
        setError(data.message || 'Failed to fetch report');
      }
    } catch {
      setError('Failed to fetch report');
    }
    setLoading(false);
          const [selectedSchoolId, setSelectedSchoolId] = useState<string>('ALL');
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line
  }, [reportType]);

  // Handle navigation to different tabs
  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  // Removed unused handleLogout

  // Function to handle View Profile click - navigates to ReportsView
  const handleViewProfile = (schoolId: string) => {
    navigate('/report-view', { state: { schoolId } });
  };

  // Removed unused getRiskLevelColor

  // Removed unused handleClearFilters


  // School filter dropdown logic
  const allSchools = reportData?.schoolReports || [];
  const filteredSchools = selectedSchoolId === 'ALL'
    ? allSchools
    : allSchools.filter((school) => school.schoolId === selectedSchoolId);

  // Aggregate metrics for all schools
  // Removed unused aggregate function

  // PDF Export (for summary table)
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Organization Report', 14, 16);
    autoTable(doc, {
      head: [[
        'School Name', 'Students', 'Courses', 'Teachers', 'Avg Grade', 'Avg Attendance', 'At-Risk'
      ]],
      body: filteredSchools.map((school) => [
        school.schoolName,
        school.totalStudents,
        school.totalCourses,
        school.totalTeachers,
        Number(school.averageGrade).toFixed(2),
        Number(school.averageAttendance).toFixed(2),
        school.atRiskStudents?.length || 0
      ]),
    });
    doc.save('organization_report.pdf');
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
                onClick={() => handleNavigation('/organ-report', 'Reports')}
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
        {/* Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Report Type Tabs (HOD-style) */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setReportType('OVERALL')}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
                  reportType === 'OVERALL'
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overall Report</span>
              </button>
              <button
                onClick={() => setReportType('ATTENDANCE')}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
                  reportType === 'ATTENDANCE'
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Attendance Report</span>
              </button>
              <button
                onClick={() => setReportType('GRADES')}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
                  reportType === 'GRADES'
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Grades Report</span>
              </button>
              <div className="flex-1 flex justify-end">
                <button onClick={handleExportPDF} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Report Parameters - Made responsive */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-6 sm:mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Parameters</h2>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by School name"
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* New School Filter Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by School</label>
              <select
                value={selectedSchoolId}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="ALL">All Schools</option>
                {allSchools.length > 0 ? (
                  allSchools.map((school) => (
                    <option key={school.schoolId} value={school.schoolId}>
                      {school.schoolName}
                    </option>
                  ))
                ) : (
                  <option disabled>No schools available</option>
                )}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>

            <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base">
              <span>▶</span>
              Generate Report
            </button>
          </div>

          {/* Per-School Report UI */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8 p-4 sm:p-6">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading report data...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : reportData && (
              <>
                {/* Metrics Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium text-gray-600">Total Schools</p>
                    <p className="text-xl font-bold mt-1 text-gray-900">{reportData.totalSchools}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium text-gray-600">Total Students</p>
                    <p className="text-xl font-bold mt-1 text-gray-900">{reportData.totalStudents}</p>
                  </div>
                  {/* Show Average Attendance only for OVERALL and ATTENDANCE */}
                  {(reportType === 'OVERALL' || reportType === 'ATTENDANCE') && (
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-xs font-medium text-gray-600">Average Attendance</p>
                      <p className="text-xl font-bold mt-1 text-gray-900">{reportData.averageAttendance?.toFixed(1)}%</p>
                    </div>
                  )}
                  {/* Show Average Grade only for OVERALL and GRADES */}
                  {(reportType === 'OVERALL' || reportType === 'GRADES') && (
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-xs font-medium text-gray-600">Average Grade</p>
                      <p className="text-xl font-bold mt-1 text-gray-900">{reportData.averageGrade?.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                {/* Per-School Sections */}
                {filteredSchools.map((school: SchoolReport) => (
                  <div key={school.schoolId} className="mb-12 border rounded-lg p-4 sm:p-6 bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                      <div>
                        <h2 className="text-lg font-bold text-blue-700 mb-1">{school.schoolName}</h2>
                        <div className="text-xs text-gray-600">Students: {school.totalStudents} | Courses: {school.totalCourses} | Teachers: {school.totalTeachers}</div>
                      </div>
                    </div>

                    {/* School Metrics - dynamic by reportType */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {reportType !== 'ATTENDANCE' && (
                        <div className="p-3 rounded-lg bg-white border">
                          <p className="text-xs font-medium text-gray-600">Avg Grade</p>
                          <p className="text-xl font-bold mt-1 text-gray-900">{school.averageGrade?.toFixed(2)}</p>
                          {typeof school.lowestGrade === 'number' && typeof school.highestGrade === 'number' && (
                            <p className="text-xs text-gray-500">Range: {school.lowestGrade} - {school.highestGrade}</p>
                          )}
                        </div>
                      )}
                      {reportType !== 'GRADES' && (
                        <div className="p-3 rounded-lg bg-white border">
                          <p className="text-xs font-medium text-gray-600">Avg Attendance</p>
                          <p className="text-xl font-bold mt-1 text-gray-900">{school.averageAttendance?.toFixed(1)}%</p>
                          {typeof school.lowestAttendance === 'number' && typeof school.highestAttendance === 'number' && (
                            <p className="text-xs text-gray-500">Range: {school.lowestAttendance}% - {school.highestAttendance}%</p>
                          )}
                        </div>
                      )}
                      {reportType === 'OVERALL' && (
                        <>
                          <div className="p-3 rounded-lg bg-white border">
                            <p className="text-xs font-medium text-gray-600">Dropout Probability</p>
                            <p className="text-xl font-bold mt-1 text-gray-900">{(school.averageDropoutProbability * 100).toFixed(1)}%</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white border">
                            <p className="text-xs font-medium text-gray-600">Risk Trend</p>
                            <p className={`text-xl font-bold mt-1 ${
                              school.riskDistribution?.trend === 'CONCERNING' ? 'text-orange-600' :
                              school.riskDistribution?.trend === 'CRITICAL' ? 'text-red-600' : 'text-green-600'
                            }`}>{school.riskDistribution?.trend}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Risk Distribution - only for OVERALL */}
                    {reportType === 'OVERALL' && school.riskDistribution && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-3 text-gray-900">Risk Distribution</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Risk Level</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Count</th>
                                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Low Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.lowRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.lowRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Medium Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.mediumRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.mediumRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">High Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.highRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.highRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 text-sm"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Critical Risk</span></td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.criticalRiskCount || 0}</td>
                                <td className="py-2 px-3 text-center text-sm">{school.riskDistribution?.criticalRiskPercentage?.toFixed(2) || 0}%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Top & Bottom Performers - only for GRADES and OVERALL */}
                    {(reportType === 'GRADES' || reportType === 'OVERALL') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Top Performers */}
                        <div>
                          <h3 className="text-base font-semibold mb-3 text-gray-900">Top Performers</h3>
                          {school.topPerformers?.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Student Name</th>
                                    <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>
                                    {reportType === 'OVERALL' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Percentile</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {school.topPerformers.map((student) => (
                                    <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                                      <td className="py-2 px-3 text-sm font-medium text-gray-900">{student.studentName}</td>
                                      <td className="py-2 px-3 text-center text-sm">
                                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                          {student.averageGrade.toFixed(2)}{reportType === 'OVERALL' ? '/20' : ''}
                                        </span>
                                      </td>
                                      {reportType === 'OVERALL' && <td className="py-2 px-3 text-center text-sm">{student.percentileRank?.toFixed(0)}%</td>}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-sm text-center py-4 text-gray-500">No top performers data available</p>
                          )}
                        </div>
                        {/* Bottom Performers */}
                        <div>
                          <h3 className="text-base font-semibold mb-3 text-gray-900">Bottom Performers</h3>
                          {school.bottomPerformers?.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Student Name</th>
                                    <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>
                                    {reportType === 'OVERALL' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Percentile</th>}
                                  </tr>
                                </thead>
                                <tbody>
                                  {school.bottomPerformers.map((student) => (
                                    <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                                      <td className="py-2 px-3 text-sm font-medium text-gray-900">{student.studentName}</td>
                                      <td className="py-2 px-3 text-center text-sm">
                                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                          {student.averageGrade.toFixed(2)}{reportType === 'OVERALL' ? '/20' : ''}
                                        </span>
                                      </td>
                                      {reportType === 'OVERALL' && <td className="py-2 px-3 text-center text-sm">{student.percentileRank?.toFixed(0)}%</td>}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-sm text-center py-4 text-gray-500">No bottom performers data available</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* At-Risk Students - only for OVERALL */}
                    {reportType === 'OVERALL' && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-3 text-gray-900">At-Risk Students</h3>
                        {school.atRiskStudents?.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Student Name</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Risk Level</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Dropout Probability</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Attendance</th>
                                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Behavior Incidents</th>
                                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Primary Concern</th>
                                </tr>
                              </thead>
                              <tbody>
                                {school.atRiskStudents.map((student) => (
                                  <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-2 px-3 text-sm font-medium text-gray-900">{student.studentName}</td>
                                    <td className="py-2 px-3 text-center">
                                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                        student.riskLevel === 'CRITICAL'
                                          ? 'bg-red-100 text-red-800'
                                          : student.riskLevel === 'HIGH'
                                          ? 'bg-orange-100 text-orange-800'
                                          : student.riskLevel === 'MEDIUM'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-green-100 text-green-800'
                                      }`}>
                                        {student.riskLevel}
                                      </span>
                                    </td>
                                    <td className={`py-2 px-3 text-center text-sm font-semibold ${
                                      student.dropoutProbability >= 0.7
                                        ? 'text-red-600'
                                        : student.dropoutProbability >= 0.5
                                        ? 'text-orange-600'
                                        : 'text-yellow-600'
                                    }`}>
                                      {(student.dropoutProbability * 100).toFixed(1)}%
                                    </td>
                                    <td className="py-2 px-3 text-center text-sm">{student.averageGrade.toFixed(2)}</td>
                                    <td className="py-2 px-3 text-center text-sm">{student.attendanceRate.toFixed(1)}%</td>
                                    <td className="py-2 px-3 text-center text-sm">{student.behaviorIncidents}</td>
                                    <td className="py-2 px-3 text-sm">{student.primaryConcern}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-sm text-center py-4 text-gray-500">No at-risk students identified</p>
                        )}
                      </div>
                    )}

                    {/* Course Summaries - dynamic by reportType */}
                    <div>
                      <h3 className="text-base font-semibold mb-3 text-gray-900">Course Summaries</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Course Name</th>
                              {reportType !== 'ATTENDANCE' && <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Teacher</th>}
                              <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Students</th>
                              {reportType !== 'ATTENDANCE' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Avg Grade</th>}
                              {reportType !== 'GRADES' && <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Attendance</th>}
                              <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">At Risk</th>
                            </tr>
                          </thead>
                          <tbody>
                            {school.courseSummaries.map((course) => (
                              <tr key={course.courseId} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-3 text-sm font-medium text-gray-900">{course.courseName}</td>
                                {reportType !== 'ATTENDANCE' && <td className="py-2 px-3 text-sm text-gray-600">{course.teacherName || 'N/A'}</td>}
                                <td className="py-2 px-3 text-center text-sm">{course.studentCount}</td>
                                {reportType !== 'ATTENDANCE' && <td className="py-2 px-3 text-center text-sm">{typeof course.averageGrade === 'number' ? course.averageGrade.toFixed(2) : '-'}</td>}
                                {reportType !== 'GRADES' && <td className="py-2 px-3 text-center text-sm">{typeof course.attendanceRate === 'number' ? course.attendanceRate.toFixed(1) + '%' : '-'}</td>}
                                <td className="py-2 px-3 text-center">{course.atRiskCount > 0 ? (
                                  <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">{course.atRiskCount}</span>
                                ) : (
                                  <span className="text-sm text-gray-400">0</span>
                                )}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Student Summaries - for GRADES and ATTENDANCE (removed, property does not exist) */}
                  </div>
                ))}
              </>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}