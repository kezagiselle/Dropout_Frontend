import { useState, useEffect } from 'react';
import { ChevronDown, Search, ArrowLeft, TrendingUp, TrendingDown, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/useUserAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface GradeData {
  studentId: string;
  studentName: string;
  markName: string;
  marks: number;
  gradeType: string;
}

interface CourseGradeData {
  courseName: string;
  students: GradeData[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: CourseGradeData[];
}

interface StudentRow {
  studentId: string;
  studentName: string;
  grades: { [markName: string]: number };
  totalMarks: number;
  averageMarks: number;
}

function ViewMarks() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allGradesData, setAllGradesData] = useState<CourseGradeData[]>([]);
  const [transformedData, setTransformedData] = useState<StudentRow[]>([]);
  const [uniqueMarkNames, setUniqueMarkNames] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { token, user } = useUserAuth();

  const gradeTypeOptions = ['QUIZ', 'ASSIGNMENT', 'GROUPWORK', 'EXAM'];

  // Fetch grades data from API
  useEffect(() => {
    const fetchGradesData = async () => {
      if (!token || !user?.userId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${baseUrl}/api/grades/by-teacher/${user.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch grades data');
        }

        const result: ApiResponse = await response.json();
        
        if (result.success) {
          setAllGradesData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch grades data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching grades:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGradesData();
  }, [token, user?.userId]);

  // Transform data when course is selected or data changes
  useEffect(() => {
    if (!selectedCourse || !allGradesData.length) {
      setTransformedData([]);
      setUniqueMarkNames([]);
      return;
    }

    const courseData = allGradesData.find(course => course.courseName === selectedCourse);
    if (!courseData) {
      setTransformedData([]);
      setUniqueMarkNames([]);
      return;
    }

    // Filter by grade type if selected
    const filteredStudents = selectedFilter 
      ? courseData.students.filter(grade => grade.gradeType === selectedFilter)
      : courseData.students;

    // Get all unique mark names for table columns (from filtered data)
    const markNames = [...new Set(filteredStudents.map(item => item.markName))].sort();
    setUniqueMarkNames(markNames);

    // Group by student and calculate totals
    const studentMap = new Map<string, StudentRow>();
    
    filteredStudents.forEach(grade => {
      if (!studentMap.has(grade.studentId)) {
        studentMap.set(grade.studentId, {
          studentId: grade.studentId,
          studentName: grade.studentName,
          grades: {},
          totalMarks: 0,
          averageMarks: 0
        });
      }
      
      const student = studentMap.get(grade.studentId)!;
      student.grades[grade.markName] = grade.marks;
    });

    // Calculate totals and averages
    const transformed = Array.from(studentMap.values()).map(student => {
      const gradeValues = Object.values(student.grades);
      const total = gradeValues.reduce((sum, grade) => sum + grade, 0);
      const average = gradeValues.length > 0 ? total / gradeValues.length : 0;
      
      return {
        ...student,
        totalMarks: Math.round(total * 100) / 100,
        averageMarks: Math.round(average * 100) / 100
      };
    });

    setTransformedData(transformed);
  }, [selectedCourse, allGradesData, selectedFilter]);

  // Filter data based on search term and selected filters
  const filteredData = transformedData.filter(student => 
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get available courses from API data
  const availableCourses = allGradesData.map(course => course.courseName);

  // Calculate summary stats
  const summaryStats = {
    totalRecords: filteredData.length,
    averageMarks: filteredData.length > 0 
      ? Math.round(filteredData.reduce((acc, curr) => acc + curr.averageMarks, 0) / filteredData.length * 100) / 100
      : 0,
    highestScore: filteredData.length > 0 
      ? Math.max(...filteredData.map(student => student.averageMarks))
      : 0,
    lowestScore: filteredData.length > 0 
      ? Math.min(...filteredData.map(student => student.averageMarks))
      : 0
  };

  // Function to handle back navigation
  const handleBack = () => {
    navigate('/marks');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 w-full">
      <div className="w-full max-w-none space-y-4 sm:space-y-6">
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">View Marks</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage and view student marks across all courses</p>
          </div>
          <button 
            onClick={handleBack}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marks
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2 text-gray-600">Loading grades...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Enhanced Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {/* Total Records */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryStats.totalRecords}</p>
                <div className="flex items-center mt-2">
                  <Users className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600 font-medium">Active Records</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Average Marks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Average Score</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryStats.averageMarks}<span className="text-lg text-gray-500">/20</span></p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">Class Average</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Highest Score */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Highest Score</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryStats.highestScore}<span className="text-lg text-gray-500">/20</span></p>
                <div className="flex items-center mt-2">
                  <Award className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-yellow-600 font-medium">Best Performance</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Lowest Score */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Lowest Score</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryStats.lowestScore}<span className="text-lg text-gray-500">/20</span></p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600 font-medium">Needs Support</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 transition-all duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Courses Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Course
              </label>
              <div className="relative">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors duration-200 hover:border-gray-400"
                >
                  <option value="">Select a course</option>
                  {availableCourses.map((courseName) => (
                    <option key={courseName} value={courseName}>
                      {courseName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Grade Type Filter Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Grade Type Filter
              </label>
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors duration-200 hover:border-gray-400"
                >
                  <option value="">All Grade Types</option>
                  {gradeTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Enhanced Search Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Students
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 hover:border-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                    Student Name
                  </th>
                  {uniqueMarkNames.map((markName, index) => (
                    <th key={markName} className={`px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider ${
                      index % 2 === 0 ? 'bg-blue-50' : 'bg-purple-50'
                    }`}>
                      {markName}
                    </th>
                  ))}
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-green-50">
                    Total Marks
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-yellow-50">
                    Average Marks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredData.map((student, studentIndex) => (
                  <tr key={student.studentId} className={`transition-colors duration-200 hover:bg-gray-50 ${
                    studentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap sticky left-0 bg-white shadow-sm z-10">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          {student.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {student.studentName}
                        </div>
                      </div>
                    </td>
                    {uniqueMarkNames.map((markName, index) => (
                      <td key={markName} className={`px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap ${
                        index % 2 === 0 ? 'bg-blue-25' : 'bg-purple-25'
                      }`}>
                        <div className="text-sm font-semibold text-gray-900">
                          {student.grades[markName] !== undefined ? student.grades[markName] : '-'}
                        </div>
                      </td>
                    ))}
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap bg-green-25">
                      <div className="text-sm font-bold text-green-700">
                        {student.totalMarks}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap bg-yellow-25">
                      <div className="text-sm font-bold text-yellow-700">
                        {student.averageMarks}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Empty State */}
          {(!selectedCourse || filteredData.length === 0) && !loading && (
            <div className="text-center py-16 px-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {!selectedCourse ? 'Please select a course to view marks' : 'No marks found'}
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                {!selectedCourse ? 'Choose a course from the dropdown above to see student grades and performance data.' : 'Try adjusting your search or filters to find the data you\'re looking for.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewMarks;