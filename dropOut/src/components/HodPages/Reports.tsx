import { useState } from "react";
import { FaDownload, FaPlus, FaUsers, FaExclamationTriangle, FaChartLine, FaHeart, FaChevronDown, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { useTheme } from '../Hod';


const Reports = () => {
  const { theme } = useTheme();
  const [timePeriod, setTimePeriod] = useState("Last 30 Days");
  const [gradeLevel, setGradeLevel] = useState("All Grades");
  const [riskLevel, setRiskLevel] = useState("All Risk Levels");
  const [department, setDepartment] = useState("All Departments");

  const highRiskStudents = [
    {
      name: "Michael Johnson",
      grade: "Grade 10",
      riskScore: 92,
      lastIntervention: "2 days ago",
      status: "In Progress",
      statusColor: "yellow"
    },
    {
      name: "Sarah Williams", 
      grade: "Grade 11",
      riskScore: 88,
      lastIntervention: "1 week ago",
      status: "Critical",
      statusColor: "red"
    },
    {
      name: "David Brown",
      grade: "Grade 9", 
      riskScore: 85,
      lastIntervention: "3 days ago",
      status: "Improving",
      statusColor: "green"
    }
  ];

  const riskFactors = [
    { name: "Attendance Rate", percentage: 78, color: "red" },
    { name: "Grade Performance", percentage: 65, color: "yellow" },
    { name: "Behavioral Issues", percentage: 45, color: "red" },
    { name: "Family Engagement", percentage: 52, color: "yellow" }
  ];

  const getStatusBadgeColor = (statusColor: string) => {
    switch (statusColor) {
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "red":
        return "bg-red-100 text-red-800";
      case "green":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressBarColor = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "orange":
        return "bg-orange-500";
      case "yellow":
        return "bg-yellow-600";
      case "green":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Reports Management
          </h1>
          <p className={`text-xs sm:text-sm md:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Comprehensive analytics on student dropout risks and trends
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base w-full sm:w-auto">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base w-full sm:w-auto">
            <FaPlus className="w-4 h-4" />
            <span>Add Report</span>
          </button>
        </div>
      </div>

      {/* Report Filters */}
      <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-base sm:text-lg font-bold mb-4 transition-colors duration-200 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Report Filters
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Time Period
              </label>
              <div className="relative">
                <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
                </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
            </div>
          </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
              Grade Level
                </label>
                <div className="relative">
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option>All Grades</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
              Risk Level
                </label>
                <div className="relative">
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option>All Risk Levels</option>
                <option>Low Risk</option>
                <option>Medium Risk</option>
                <option>High Risk</option>
                <option>Critical Risk</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Department
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  >
                    <option>All Departments</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>History</option>
                    <option>Art</option>
                  </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
            </div>
          </div>
                </div>
              </div>
              
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Students Card */}
        <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-start justify-between">
              <div>
              <p className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Students
              </p>
              <p className={`text-2xl sm:text-3xl font-bold mt-1 transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                1,247
              </p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">+2.5% from last month</span>
              </div>
            </div>
            <FaUsers className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          </div>
                </div>

        {/* High Risk Students Card */}
        <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                High Risk Students
              </p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 text-red-800 dark:text-red-400">
                89
              </p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-xs text-red-600 font-medium">+12% from last month</span>
              </div>
            </div>
            <FaExclamationTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5" />
              </div>
            </div>
            
        {/* Dropout Rate Card */}
        <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Dropout Rate
              </p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 text-yellow-800 dark:text-yellow-400">
                7.2%
              </p>
              <div className="flex items-center mt-2">
                <FaArrowDown className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">-0.8% from last month</span>
              </div>
            </div>
            <FaChartLine className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            </div>
          </div>

        {/* Interventions Active Card */}
        <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Interventions Active
              </p>
              <p className="text-2xl sm:text-3xl font-bold mt-1" style={{ color: '#16a34a' }}>
                156
              </p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-medium">+18% from last month</span>
              </div>
            </div>
            <FaHandHoldingHeart className="w-6 h-6 mt-0.5" style={{ color: '#166534' }} />
          </div>
        </div>
      </div>

      {/* High Risk Students and Key Risk Factors Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* High Risk Students Section */}
        <div className={`rounded-lg shadow-sm transition-colors duration-200 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="px-4 sm:px-6 py-4">
            <h2 className={`text-base sm:text-lg font-bold mb-4 transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              High Risk Students
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className={`border-b transition-colors duration-200 ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <th className={`text-left py-3 px-4 font-bold text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Student
                  </th>
                  <th className={`text-left py-3 px-4 font-bold text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Grade
                  </th>
                  <th className={`text-left py-3 px-4 font-bold text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Risk Score
                  </th>
                  <th className={`text-left py-3 px-4 font-bold text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Last Intervention
                  </th>
                  <th className={`text-left py-3 px-4 font-bold text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {highRiskStudents.map((student, index) => (
                  <tr key={index} className={`border-b transition-colors duration-200 ${
                    theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <td className={`py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.name}
                    </td>
                    <td className={`py-3 px-4 text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {student.grade}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-red-600 font-semibold">{student.riskScore}%</span>
                    </td>
                    <td className={`py-3 px-4 text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {student.lastIntervention}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(student.statusColor)}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Risk Factors Section */}
        <div className={`rounded-lg shadow-sm p-4 sm:p-6 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-base sm:text-lg font-bold mb-4 transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Key Risk Factors
          </h2>
          
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {factor.name}
                  </span>
                  <span className={`text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {factor.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(factor.color)}`}
                    style={{ width: `${factor.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;