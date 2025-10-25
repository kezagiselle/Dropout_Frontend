import { useState, useEffect } from 'react';
import { ChevronDown, Users, TrendingUp, UserX, Clock } from 'lucide-react';
import { useUserAuth } from '../../context/useUserAuth';
import pe1 from "../../../src/img/pe1.png";
import pe2 from "../../../src/img/pe2.png";
import pe3 from "../../../src/img/pe3.png";
import { useNavigate } from 'react-router-dom';

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

interface WeeklyTrend {
  courseName: string;
  weeklyAttendancePercentages: number[];
}

interface AttendanceResponse {
  totalPresentToday: number;
  totalAbsentToday: number;
  overallAttendancePercentage: number;
  weeklyTrends: WeeklyTrend[];
  students: Array<{
    name: string;
    attendance: number;
  }>;
}

const Attendance = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('This Week');
  const [selectedGrade] = useState<string>('Grade 5A');
  const [attendanceData, setAttendanceData] = useState<AttendanceResponse | null>(null);
  const { token, user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceStats = async () => {
      if (!token || !user?.userId) return;
      
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const res = await fetch(`${baseUrl}/api/teachers/attendance-stats/${user.userId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setAttendanceData(data.data);
        }
      } catch (err) {
        // Handle error silently, use fallback data
      }
    };
    fetchAttendanceStats(); 
  }, [token, user]);

  // Weekly attendance data
  const weeklyData = [
    { week: 'Week 1', grade5A: 97, grade5B: 92, grade6A: 95 },
    { week: 'Week 2', grade5A: 95, grade5B: 88, grade6A: 93 },
    { week: 'Week 3', grade5A: 99, grade5B: 87, grade6A: 92 },
    { week: 'Week 4', grade5A: 96, grade5B: 89, grade6A: 93 }
  ];

  // Generate students from API data or use fallback
  const generateStudentsFromAPI = (): Student[] => {
    if (!attendanceData?.students || !Array.isArray(attendanceData.students)) {
      // Fallback data if no API response
      return [
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
          activeStatus: 'Absent'
        },
        {
          id: 3,
          name: 'Sarah Williams',
          studentId: 'Student ID: 2024003',
          avatar: pe3,
          statuses: ['Present', 'Absent', 'Late', 'Excused'],
          activeStatus: 'Present' 
        }
      ];
    }

    // Map API students to Student interface
    return attendanceData.students.map((apiStudent, index) => ({
      id: index + 1,
      name: apiStudent.name,
      studentId: `Student ID: ${(2024001 + index)}`,
      avatar: [pe1, pe2, pe3][index % 3], // Cycle through avatars
      statuses: ['Present', 'Absent', 'Late', 'Excused'],
      activeStatus: apiStudent.attendance > 0 ? 'Present' : 'Absent'
    }));
  };

  const allStudents: Student[] = generateStudentsFromAPI();
  
  // Limit to 3 students for initial display
  const students: Student[] = allStudents.slice(0, 3);

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
            return 'bg-gray-300 text-gray-700';
          }
          return 'bg-green-400 text-white'; 
        case 'Absent':
          if (student.name === 'Michael Chen') {
            return 'bg-orange-500 text-white';
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

  const handleMarkAllPresent = () => {
    // Pass all students data to daily attendance page
    navigate('/daily-attendance', { 
      state: { 
        studentsData: allStudents,
        attendanceData: attendanceData
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full max-w-none p-4 sm:p-6">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Attendance Overview</h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">Manage daily attendance and track student participation</p>
        </div>

          {/* Stats Cards - Single row above */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-200 w-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Overall Attendance</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {attendanceData?.overallAttendancePercentage?.toFixed(1) ?? '94.2'}%
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                </div>
              </div>
              <p className="text-xs text-green-600">↗ +2.1% from last week</p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Present Today</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {attendanceData?.totalPresentToday ?? 127}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-600">Out of {(attendanceData?.totalPresentToday ?? 127) + (attendanceData?.totalAbsentToday ?? 8)} students</p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Absent Today</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {attendanceData?.totalAbsentToday ?? 8}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserX className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-xs text-gray-600">Including 3 excused</p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Late Arrivals</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">5</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs text-red-600">↗ +1 from yesterday</p>
            </div>
          </div>

          {/* Chart Section - Below the cards */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-4 sm:mb-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 w-full">
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Weekly Attendance Trends</h2>
                <p className="text-xs sm:text-sm text-gray-600">Track attendance patterns across all your classes</p>
              </div>
              <div className="flex gap-2 self-start sm:self-auto">
                <button 
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${selectedWeek === 'This Week' ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-600 border border-gray-300'}`}
                  onClick={() => setSelectedWeek('This Week')}
                >
                  This Week
                </button>
                <button 
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${selectedWeek === 'Last 4 Weeks' ? 'bg-blue-300 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
                  onClick={() => setSelectedWeek('Last 4 Weeks')}
                >
                  Last 4 Weeks
                </button>
              </div>
            </div>

            {/* Updated Chart with Connected Lines */}
            <div className="relative h-64 sm:h-80 lg:h-96 w-full">
              <svg className="w-full h-full" viewBox="0 0 800 300">
                {/* Grid lines */}
                {[70, 75, 80, 85, 90, 95, 100].map((val) => (
                  <g key={val}>
                    <line 
                      x1="80" 
                      y1={280 - (val - 70) * 7} 
                      x2="720" 
                      y2={280 - (val - 70) * 7} 
                      stroke="#f3f4f6" 
                      strokeWidth="1"
                    />
                    <text x="60" y={285 - (val - 70) * 7} className="text-xs fill-gray-500 font-medium">{val}%</text>
                  </g>
                ))}

                {/* Lines connecting the dots - Use API data if available, fallback to static */}
                {attendanceData?.weeklyTrends && attendanceData.weeklyTrends.length > 0 ? (
                  // Render API data
                  attendanceData.weeklyTrends.map((trend, courseIndex) => {
                    const colors = ['#14b8a6', '#f97316', '#3b82f6', '#8b5cf6', '#ef4444'];
                    const color = colors[courseIndex % colors.length];
                    const spacingX = 90; // More spacing between points
                    
                    return (
                      <g key={courseIndex}>
                        {/* Line connecting points */}
                        <polyline
                          points={trend.weeklyAttendancePercentages.map((percentage, weekIndex) => 
                            `${120 + weekIndex * spacingX},${280 - Math.max((percentage - 70), 0) * 7}`
                          ).join(' ')}
                          fill="none"
                          stroke={color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Points and labels */}
                        {trend.weeklyAttendancePercentages.map((percentage, weekIndex) => (
                          <g key={weekIndex}>
                            {/* Outer circle for better visibility */}
                            <circle 
                              cx={120 + weekIndex * spacingX} 
                              cy={280 - Math.max((percentage - 70), 0) * 7} 
                              r="6" 
                              fill="white"
                              stroke={color}
                              strokeWidth="3"
                            />
                            {/* Inner circle */}
                            <circle 
                              cx={120 + weekIndex * spacingX} 
                              cy={280 - Math.max((percentage - 70), 0) * 7} 
                              r="3" 
                              fill={color}
                            />
                            {/* Percentage labels above points */}
                            <text 
                              x={120 + weekIndex * spacingX} 
                              y={275 - Math.max((percentage - 70), 0) * 7 - 15} 
                              className="text-xs fill-gray-700 font-semibold" 
                              textAnchor="middle"
                            >
                              {Math.round(percentage)}%
                            </text>
                          </g>
                        ))}
                      </g>
                    );
                  })
                ) : (
                  // Fallback to static data
                  <>
                    {/* Grade 5A - Teal */}
                    <polyline
                      points={weeklyData.map((d, i) => `${120 + i * 150},${280 - (d.grade5A - 70) * 7}`).join(' ')}
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {weeklyData.map((d, i) => (
                      <g key={i}>
                        <circle cx={120 + i * 150} cy={280 - (d.grade5A - 70) * 7} r="6" fill="white" stroke="#14b8a6" strokeWidth="3" />
                        <circle cx={120 + i * 150} cy={280 - (d.grade5A - 70) * 7} r="3" fill="#14b8a6" />
                        <text x={120 + i * 150} y={275 - (d.grade5A - 70) * 7 - 15} className="text-xs fill-gray-700 font-semibold" textAnchor="middle">{d.grade5A}%</text>
                      </g>
                    ))}

                    {/* Grade 5B - Orange */}
                    <polyline
                      points={weeklyData.map((d, i) => `${120 + i * 150},${280 - (d.grade5B - 70) * 7}`).join(' ')}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {weeklyData.map((d, i) => (
                      <g key={i}>
                        <circle cx={120 + i * 150} cy={280 - (d.grade5B - 70) * 7} r="6" fill="white" stroke="#f97316" strokeWidth="3" />
                        <circle cx={120 + i * 150} cy={280 - (d.grade5B - 70) * 7} r="3" fill="#f97316" />
                        <text x={120 + i * 150} y={275 - (d.grade5B - 70) * 7 - 15} className="text-xs fill-gray-700 font-semibold" textAnchor="middle">{d.grade5B}%</text>
                      </g>
                    ))}

                    {/* Grade 6A - Blue */}
                    <polyline
                      points={weeklyData.map((d, i) => `${120 + i * 150},${280 - (d.grade6A - 70) * 7}`).join(' ')}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {weeklyData.map((d, i) => (
                      <g key={i}>
                        <circle cx={120 + i * 150} cy={280 - (d.grade6A - 70) * 7} r="6" fill="white" stroke="#3b82f6" strokeWidth="3" />
                        <circle cx={120 + i * 150} cy={280 - (d.grade6A - 70) * 7} r="3" fill="#3b82f6" />
                        <text x={120 + i * 150} y={275 - (d.grade6A - 70) * 7 - 15} className="text-xs fill-gray-700 font-semibold" textAnchor="middle">{d.grade6A}%</text>
                      </g>
                    ))}
                  </>
                )}

                {/* X-axis labels */}
                {attendanceData?.weeklyTrends && attendanceData.weeklyTrends.length > 0 && attendanceData.weeklyTrends[0]?.weeklyAttendancePercentages ? (
                  // Use API data for x-axis labels
                  attendanceData.weeklyTrends[0].weeklyAttendancePercentages.map((_, weekIndex) => (
                    <text 
                      key={weekIndex} 
                      x={120 + weekIndex * 90} 
                      y="270" 
                      className="text-sm fill-gray-600 font-medium" 
                      textAnchor="middle"
                    >
                      Week {weekIndex + 1}
                    </text>
                  ))
                ) : (
                  // Fallback to static labels
                  weeklyData.map((d, i) => (
                    <text 
                      key={i} 
                      x={120 + i * 150} 
                      y="270" 
                      className="text-sm fill-gray-600 font-medium" 
                      textAnchor="middle"
                    >
                      {d.week}
                    </text>
                  ))
                )}

                {/* Y-axis label */}
                <text 
                  x="30" 
                  y="150" 
                  className="text-sm fill-gray-600 font-medium" 
                  textAnchor="middle"
                  transform="rotate(-90, 30, 150)"
                >
                  Attendance Percentage
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
              {attendanceData?.weeklyTrends && attendanceData.weeklyTrends.length > 0 ? (
                // Dynamic legend from API data
                attendanceData.weeklyTrends.map((trend, courseIndex) => {
                  const colors = ['bg-teal-500', 'bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-red-500'];
                  const colorClass = colors[courseIndex % colors.length];
                  
                  return (
                    <div key={courseIndex} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                      <span className="text-sm text-gray-600">{trend.courseName}</span>
                    </div>
                  );
                })
              ) : (
                // Fallback static legend
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm text-gray-600">Grade 5A</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-600">Grade 5B</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Grade 6A</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex-1">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Daily Attendance Recording</h2>
                  <p className="text-xs sm:text-sm text-gray-600">Showing {students.length} of {allStudents.length} students</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm flex items-center gap-2 hover:bg-gray-50 w-full sm:w-auto justify-center">
                    {selectedGrade}
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    className="px-3 sm:px-5 py-2 bg-blue-300 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-400 flex items-center gap-2 w-full sm:w-auto justify-center"
                    onClick={handleMarkAllPresent}
                  >
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    Mark All Present
                  </button>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{student.name}</p>
                        <p className="text-xs text-gray-600 truncate">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:flex gap-1 sm:gap-2 w-full sm:w-auto">
                      {student.statuses.map((status, idx) => (
                        <button
                          key={idx}
                          className={`px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${getStatusStyle(status, student)}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-3 sm:mt-4">
                <button 
                  className="px-4 sm:px-5 py-2 sm:py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  onClick={handleMarkAllPresent}
                >
                  See All {allStudents.length} Students
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Chronic Absences</h2>
                <p className="text-xs sm:text-sm text-gray-600">Students requiring attention</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {chronicAbsences.map((student, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border-2 transition-colors ${getChronicAbsenceBg(student.risk)}`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{student.name}</p>
                        <p className="text-xs text-gray-600 truncate">{student.grade}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium mb-1 ${getRiskStyle(student.risk)}`}>
                        {student.days}
                      </div>
                      <p className="text-xs text-gray-600">{student.risk}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Attendance;