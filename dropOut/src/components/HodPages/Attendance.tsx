/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useTheme } from '../Hod';
import { useUserAuth } from '../../context/useUserAuth';
import { FaFileAlt, FaCheck, FaTimes, FaClock, FaExclamationTriangle, FaInfoCircle, FaStar, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FaDownload } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// API Response Interfaces
interface AttendanceKPIs {
  presentToday: number;
  absentToday: number;
}

interface DailyStat {
  day: string;
  averageAttendance: number;
  date: string;
}

interface WeeklyTrends {
  dailyStats: DailyStat[];
  weeklyAverages: {
    averageAttendance: number;
    totalAbsences: number;
  };
}

interface SubjectPerformance {
  subjectName: string;
  currentAverage: number;
}

interface PerformanceTrends {
  subjectPerformance: SubjectPerformance[];
  overallStats: {
    averageGPA: number;
    highestScore: number;
    lowestScore: number;
  };
}

interface AttendanceOverviewResponse {
  success: boolean;
  message: string;
  data: {
    attendanceKPIs: AttendanceKPIs;
    weeklyTrends: WeeklyTrends;
    performanceTrends: PerformanceTrends;
  };
}

// Chart colors
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Attendance = () => {
  const { theme } = useTheme();
  const { user, token } = useUserAuth();
  
  // State for API data
  const [attendanceData, setAttendanceData] = useState<AttendanceOverviewResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    course: 'All Courses',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    classSection: 'All Classes'
  });

  // Fetch attendance overview data
  useEffect(() => {
    const fetchAttendanceOverview = async () => {
      const schoolId = user?.schoolId;
      if (!schoolId || !token) {
        setError('No schoolId or token found');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/attendance/stats-overview/${schoolId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const data: AttendanceOverviewResponse = await response.json();
        
        if (data.success) {
          setAttendanceData(data.data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch attendance overview');
          console.error('Failed to fetch attendance overview:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attendance overview:', error);
        setError('Failed to fetch attendance data');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceOverview();
  }, [token, user?.schoolId]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExport = (type: string) => {
    console.log(`Exporting ${type}...`);
    // Add export logic here
  };

  // Transform daily stats for chart
  const chartData = attendanceData?.weeklyTrends?.dailyStats?.map((stat: DailyStat) => ({
    name: stat.day,
    present: stat.averageAttendance,
    absent: 100 - stat.averageAttendance,
    date: stat.date
  })) || [];

  // Transform performance data for chart
  const performanceChartData = attendanceData?.performanceTrends?.subjectPerformance?.map((subject: SubjectPerformance) => ({
    name: subject.subjectName,
    score: subject.currentAverage,
    average: subject.currentAverage,
    target: subject.currentAverage + 10 // Adding target for visualization
  })) || [];

  if (loading) {
    return (
      <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
        <div className="text-center py-8">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Attendance Management
          </h1>
          <p className={`text-xs sm:text-sm lg:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Monitor student attendance and identify at-risk patterns
          </p>
        </div>
        
        <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base">
          <FaDownload className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Present Today */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Present Today
              </p>
              <p className="text-3xl font-bold mt-2 text-green-400">
                {attendanceData?.attendanceKPIs?.presentToday || 0}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-green-600 font-medium">Real-time data</span>
              </div>
            </div>
            <FaCheck className="w-5 h-5 text-green-600 ml-4" />
          </div>
        </div>

        {/* Absent Today */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Absent Today
              </p>
              <p className="text-3xl font-bold mt-2 text-red-400">
                {attendanceData?.attendanceKPIs?.absentToday || 0}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-red-600 font-medium">Needs attention</span>
              </div>
            </div>
            <FaTimes className="w-5 h-5 text-red-600 ml-4" />
          </div>
        </div>

        {/* Late Arrivals */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Late Arrivals
              </p>
              <p className="text-3xl font-bold mt-2 text-orange-400">12</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-orange-600 font-medium">-3 from yesterday</span>
              </div>
            </div>
            <FaClock className="w-5 h-5 text-orange-600 ml-4" />
          </div>
        </div>

        {/* At Risk Students */}
        <div className={`rounded-lg shadow-sm border p-4 lg:p-6 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                At Risk Students
              </p>
              <p className="text-3xl font-bold mt-2 text-red-400">8</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-red-600 font-medium">Needs attention</span>
              </div>
            </div>
            <FaExclamationTriangle className="w-5 h-5 text-red-600 ml-4" />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Filters
          </h2>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Course</label>
              <select 
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Courses</option>
                {attendanceData?.performanceTrends?.subjectPerformance?.map((subject: SubjectPerformance, index: number) => (
                  <option key={index} value={subject.subjectName}>{subject.subjectName}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>End Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Class/Section</label>
              <select 
                value={filters.classSection}
                onChange={(e) => handleFilterChange('classSection', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option>All Classes</option>
                <option>Class 10A</option>
                <option>Class 10B</option>
                <option>Class 11A</option>
                <option>Class 11B</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Attendance Trends */}
        <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Attendance Trends
              </h2>
              <div className="flex items-center space-x-2">
                 <button 
                   onClick={() => handleExport('PDF')}
                   className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' 
                       ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                       : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                   }`}
                 >
                   <FaDownload className="w-3 h-3 text-black" />
                   <span>PDF</span>
                 </button>
                 <button 
                   onClick={() => handleExport('Excel')}
                   className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' 
                       ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                       : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                   }`}
                 >
                   <FaFileAlt className="w-3 h-3 text-black" />
                   <span>Excel</span>
                 </button>
              </div>
            </div>
          </div>
          
           <div className="p-3 sm:p-4 lg:p-6">
             {/* Attendance Trends Chart */}
             <div className="h-64 mb-6">
               {chartData.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart
                     data={chartData}
                     margin={{
                       top: 20,
                       right: 30,
                       left: 20,
                       bottom: 5,
                     }}
                   >
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                     <XAxis 
                       dataKey="name" 
                       stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                       fontSize={12}
                     />
                     <YAxis 
                       stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                       fontSize={12}
                     />
                     <Bar dataKey="present" fill="#10b981" shape={<TriangleBar />} label={{ position: 'top' }}>
                       {chartData.map((_: any, index: number) => (
                         <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               ) : (
                 <div className="flex items-center justify-center h-full">
                   <p className="text-gray-500">No attendance data available</p>
                 </div>
               )}
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Average Attendance Card */}
               <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg min-h-[120px]">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                     <FaCheck className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-base font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Average Attendance</p>
                 </div>
                 <p className="text-3xl font-bold text-green-600">
                   {attendanceData?.weeklyTrends?.weeklyAverages?.averageAttendance?.toFixed(1) || 0}%
                 </p>
               </div>
               
               {/* Total Absences Card */}
               <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg min-h-[120px]">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                     <FaTimes className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-base font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Total Absences</p>
                 </div>
                 <p className="text-3xl font-bold text-red-600">
                   {attendanceData?.weeklyTrends?.weeklyAverages?.totalAbsences || 0}
                 </p>
               </div>
             </div>
           </div>
        </div>

        {/* Performance Trends */}
        <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Performance Trends
              </h2>
              <div className="flex items-center space-x-2">
                 <button 
                   onClick={() => handleExport('PDF')}
                   className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' 
                       ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                       : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                   }`}
                 >
                   <FaDownload className="w-3 h-3 text-black" />
                   <span>PDF</span>
                 </button>
                 <button 
                   onClick={() => handleExport('Excel')}
                   className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' 
                       ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                       : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                   }`}
                 >
                   <FaFileAlt className="w-3 h-3 text-black" />
                   <span>Excel</span>
                 </button>
              </div>
            </div>
          </div>
          
           <div className="p-3 sm:p-4 lg:p-6">
             {/* Performance Trends Chart */}
             <div className="h-64 mb-6">
               {performanceChartData.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart
                     data={performanceChartData}
                     margin={{
                       top: 20,
                       right: 30,
                       left: 20,
                       bottom: 5,
                     }}
                   >
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                     <XAxis 
                       dataKey="name" 
                       stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                       fontSize={12}
                     />
                     <YAxis 
                       stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                       fontSize={12}
                     />
                     <Bar dataKey="score" fill="#3b82f6" shape={<TriangleBar />} label={{ position: 'top' }}>
                       {performanceChartData.map((_: any, index: number) => (
                         <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               ) : (
                 <div className="flex items-center justify-center h-full">
                   <p className="text-gray-500">No performance data available</p>
                 </div>
               )}
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
               {/* Average GPA Card */}
               <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                     <FaStar className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Average GPA</p>
                 </div>
                 <p className="text-2xl font-bold text-blue-600">
                   {attendanceData?.performanceTrends?.overallStats?.averageGPA?.toFixed(2) || '0.00'}
                 </p>
               </div>
               
               {/* Highest Score Card */}
               <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                     <FaArrowUp className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Highest Score</p>
                 </div>
                 <p className="text-2xl font-bold text-green-600">
                   {attendanceData?.performanceTrends?.overallStats?.highestScore?.toFixed(1) || '0.0'}
                 </p>
               </div>
               
               {/* Lowest Score Card */}
               <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                     <FaArrowDown className="w-3 h-3 text-white" />
                   </div>
                   <p className={`text-sm font-medium transition-colors duration-200 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                   }`}>Lowest Score</p>
                 </div>
                 <p className="text-2xl font-bold text-orange-600">
                   {attendanceData?.performanceTrends?.overallStats?.lowestScore?.toFixed(1) || '0.0'}
                 </p>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Automated Alerts Section */}
      <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Automated Alerts
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
              View All
            </button>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="space-y-4">
            {/* High Risk Alert */}
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 dark:bg-red-600 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sarah Johnson - 5 unexcused absences this week
                  </p>
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Action
              </button>
            </div>
            
            {/* Tardiness Pattern */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-600 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Mike Chen - Late 4 times this week
                  </p>
                </div>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Review
              </button>
            </div>
            
            {/* Attendance Improvement */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <FaInfoCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Class 10A - 98% attendance this week
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;