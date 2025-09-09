import { useTheme } from '../Hod';
import { FaDownload, FaPlus, FaEye, FaBell, FaEdit, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const Exams = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-200 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Exams & Grades Management
          </h1>
          <p className={`text-xs sm:text-sm md:text-base mt-1 transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Monitor and manage student's grades to dropout risk factors
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base w-full sm:w-auto">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-black hover:bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base w-full sm:w-auto">
            <FaPlus className="w-4 h-4" />
            <span>New Exam</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Upcoming Exams Card */}
        <div className={`rounded-lg shadow-sm transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800' 
            : 'bg-white'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Upcoming Exams
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                Next 7 Days
              </span>
            </div>
            
            <div className="space-y-3">
              {/* Mathematics Final */}
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Mathematics Final
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Grade 10A • Mr. Johnson
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Tomorrow</p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      9:00 AM
                    </p>
                  </div>
                </div>
              </div>

              {/* Physics Quiz */}
              <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Physics Quiz
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Grade 11B • Dr. Smith
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 dark:text-green-400 font-semibold text-sm">Dec 20</p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* History Test */}
              <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      History Test
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Grade 9C • Ms. Davis
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600 dark:text-orange-400 font-semibold text-sm">Conflict</p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Dec 21
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Submissions Card */}
        <div className={`rounded-lg shadow-sm transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800' 
            : 'bg-white'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Pending Submissions
              </h3>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                5 Overdue
              </span>
            </div>
            
            <div className="space-y-3">
              {/* Mr. Thompson */}
              <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Mr. Thompson
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Biology • Grade 12A
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600 dark:text-orange-400 font-semibold text-sm">Overdue</p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Due: Dec 15
                    </p>
                  </div>
                </div>
              </div>

              {/* Ms. Wilson */}
              <div className={`p-3 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-600' 
                  : 'bg-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Ms. Wilson
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chemistry • Grade 11C
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>Pending</p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Due: Dec 22
                    </p>
                  </div>
                </div>
              </div>

              {/* Dr. Brown */}
              <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Dr. Brown
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      English • Grade 10B
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 dark:text-green-400 font-semibold text-sm">Submitted</p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Dec 18
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* At-Risk Students Card */}
        <div className={`rounded-lg shadow-sm transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-800' 
            : 'bg-white'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-base font-semibold transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                At-Risk Students
              </h3>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                12 Students
              </span>
            </div>
            
            <div className="space-y-3">
              {/* Sarah Johnson */}
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Sarah Johnson
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Grade 10A • Math, Physics
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-6 h-6 bg-orange-500 hover:bg-orange-300 rounded-full flex items-center justify-center transition-colors duration-200">
                      <FaEye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </button>
                    <button className="w-6 h-6 bg-blue-500 hover:bg-orange-300 rounded-full flex items-center justify-center transition-colors duration-200">
                      <FaBell className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Michael Chen */}
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Michael Chen
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Grade 11B • Chemistry
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-6 h-6 bg-orange-500 hover:bg-orange-300 rounded-full flex items-center justify-center transition-colors duration-200">
                      <FaEye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </button>
                    <button className="w-6 h-6 bg-blue-500 hover:bg-orange-300 rounded-full flex items-center justify-center transition-colors duration-200">
                      <FaBell className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Emma Davis */}
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold text-sm transition-colors duration-200 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Emma Davis
                    </p>
                    <p className={`text-xs transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Grade 9C • History, English
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-6 h-6 bg-orange-500 hover:bg-orange-300 rounded-full flex items-center justify-center transition-colors duration-200">
                      <FaEye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </button>
                    <button className="w-6 h-6 bg-blue-500 hover:bg-orange-300 rounded-full flex items-center justify-center transition-colors duration-200">
                      <FaBell className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Timetable Section */}
      <div className={`rounded-lg shadow-sm transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800' 
          : 'bg-white'
      }`}>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h2 className={`text-base sm:text-lg lg:text-xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Exam Timetable
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center space-x-1 w-full sm:w-auto">
                <FaPlus className="w-3 h-3" />
                <span className="hidden xs:inline">Schedule Exam</span>
                <span className="xs:hidden">Schedule</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-2 sm:p-3 lg:p-6">
          {/* Table */}
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Exam Name
                  </th>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject
                  </th>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Class
                  </th>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Teacher
                  </th>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date & Time
                  </th>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Duration
                  </th>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Status
                  </th>
                  <th className={`text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Mathematics Final Row */}
                <tr>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Mathematics Final
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Mathematics
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Grade 10A
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Mr. Johnson
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Dec 19, 9:00 AM
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    2 hours
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <span className="bg-green-100 text-green-800 text-xs px-1 sm:px-2 py-1 rounded-full font-medium">
                      Published
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaEdit className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </button>
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-500 rounded-full flex items-center justify-center">
                        <FaEye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* History Test Row */}
                <tr className="bg-orange-100 dark:bg-orange-900/20 transition-colors duration-200">
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    History Test
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    History
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Grade 9C
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Ms. Davis
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Dec 21, 2:00 PM
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    1.5 hours
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <span className="bg-orange-100 text-orange-800 text-xs px-1 sm:px-2 py-1 rounded-full font-medium">
                      Conflict
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <FaExclamationTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </button>
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaEdit className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Physics Quiz Row */}
                <tr>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Physics Quiz
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Physics
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Grade 11B
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Dr. Smith
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Dec 20, 2:00 PM
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    1 hour
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-1 sm:px-2 py-1 rounded-full font-medium">
                      Approved
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaEdit className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </button>
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
