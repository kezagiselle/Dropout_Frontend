import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../../context/useUserAuth";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { FaFilter, FaDownload, FaChartLine, FaExclamationTriangle, FaUserGraduate } from 'react-icons/fa';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Prediction = () => {
  const { user, token } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState({
    dropoutRisk: [],
    performancePredictions: [],
    attendanceTrends: [],
    interventionEffectiveness: [],
    summary: {
      highRiskCount: 0,
      mediumRiskCount: 0,
      predictedImprovements: 0,
      recommendedInterventions: 0
    }
  });
  
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Next Month');
  const [selectedMetric, setSelectedMetric] = useState('Dropout Risk');

  useEffect(() => {
    fetchPredictions();
  }, [user?.schoolId, token]);

  const fetchPredictions = async () => {
    if (!user?.schoolId || !token) return;
    
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockData = {
        dropoutRisk: [
          { student: 'Alex Johnson', grade: '10A', riskScore: 85, predictedDropout: 'High', confidence: 92 },
          { student: 'Emma Davis', grade: '9B', riskScore: 72, predictedDropout: 'Medium', confidence: 88 },
          { student: 'Michael Chen', grade: '11A', riskScore: 45, predictedDropout: 'Low', confidence: 76 },
          { student: 'Sarah Miller', grade: '12C', riskScore: 68, predictedDropout: 'Medium', confidence: 85 },
          { student: 'James Wilson', grade: '10B', riskScore: 91, predictedDropout: 'Critical', confidence: 94 },
        ],
        performancePredictions: [
          { subject: 'Mathematics', currentAvg: 72, predictedAvg: 78, trend: 'up', improvement: 8 },
          { subject: 'Science', currentAvg: 68, predictedAvg: 65, trend: 'down', improvement: -4 },
          { subject: 'English', currentAvg: 82, predictedAvg: 85, trend: 'up', improvement: 4 },
          { subject: 'History', currentAvg: 75, predictedAvg: 80, trend: 'up', improvement: 7 },
          { subject: 'Physics', currentAvg: 64, predictedAvg: 70, trend: 'up', improvement: 9 },
        ],
        attendanceTrends: [
          { month: 'Jan', actual: 88, predicted: 85 },
          { month: 'Feb', actual: 86, predicted: 84 },
          { month: 'Mar', actual: 84, predicted: 82 },
          { month: 'Apr', actual: 85, predicted: 83 },
          { month: 'May', actual: 83, predicted: 81 },
          { month: 'Jun', actual: null, predicted: 80 },
          { month: 'Jul', actual: null, predicted: 79 },
        ],
        interventionEffectiveness: [
          { intervention: 'Extra Tutoring', effectiveness: 85, studentsAffected: 24 },
          { intervention: 'Parent Meetings', effectiveness: 72, studentsAffected: 18 },
          { intervention: 'Counseling', effectiveness: 90, studentsAffected: 12 },
          { intervention: 'Study Groups', effectiveness: 68, studentsAffected: 32 },
          { intervention: 'Attendance Monitoring', effectiveness: 78, studentsAffected: 45 },
        ],
        summary: {
          highRiskCount: 8,
          mediumRiskCount: 15,
          predictedImprovements: 23,
          recommendedInterventions: 14
        }
      };
      
      // Simulate API delay
      setTimeout(() => {
        setPredictions(mockData);
        setLoading(false);
      }, 1000);
      
      // Actual API call would look like:
      /*
      const res = await fetch(`${baseUrl}/api/principal/predictions/${user.schoolId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await res.json();
      if (result.success) {
        setPredictions(result.data);
      }
      setLoading(false);
      */
      
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setLoading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskTextColor = (score) => {
    if (score >= 80) return 'text-red-700';
    if (score >= 60) return 'text-orange-700';
    if (score >= 40) return 'text-yellow-700';
    return 'text-green-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading predictions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Predictive Analytics</h1>
          <p className="text-gray-600">AI-powered insights and future predictions based on student data</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <FaDownload />
            <span>Export Report</span>
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
            <FaChartLine />
            <span>Generate Insights</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option>All</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option>Next Month</option>
              <option>Next Term</option>
              <option>Next Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metric</label>
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option>Dropout Risk</option>
              <option>Performance</option>
              <option>Attendance</option>
              <option>Engagement</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center space-x-2">
              <FaFilter />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Risk Students</p>
              <p className="text-2xl font-bold text-red-600">{predictions.summary.highRiskCount}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Predicted to dropout in next term</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Medium Risk</p>
              <p className="text-2xl font-bold text-orange-600">{predictions.summary.mediumRiskCount}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FaExclamationTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Requires monitoring</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Predicted Improvements</p>
              <p className="text-2xl font-bold text-green-600">{predictions.summary.predictedImprovements}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaChartLine className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">With current interventions</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recommended Actions</p>
              <p className="text-2xl font-bold text-blue-600">{predictions.summary.recommendedInterventions}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUserGraduate className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Interventions needed</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dropout Risk Prediction */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Dropout Risk Prediction</h3>
          <div className="space-y-4">
            {predictions.dropoutRisk.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(student.riskScore)}`}></div>
                  <div>
                    <p className="font-medium">{student.student}</p>
                    <p className="text-sm text-gray-500">{student.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskTextColor(student.riskScore)} bg-opacity-20 ${getRiskColor(student.riskScore).replace('bg-', 'bg-').replace('-500', '-100')}`}>
                    {student.predictedDropout} Risk
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{student.confidence}% confidence</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Predictions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Performance Predictions</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={predictions.performancePredictions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="currentAvg" name="Current Average" fill="#8884d8" />
                <Bar dataKey="predictedAvg" name="Predicted Average" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Attendance Trends & Predictions</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictions.attendanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual Attendance" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  name="Predicted Attendance" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Intervention Effectiveness */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Intervention Effectiveness</h3>
          <div className="space-y-4">
            {predictions.interventionEffectiveness.map((intervention, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{intervention.intervention}</span>
                  <span className="font-semibold text-green-600">{intervention.effectiveness}% effective</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${intervention.effectiveness}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{intervention.studentsAffected} students affected</span>
                  <span>Recommended: {intervention.effectiveness > 70 ? '✓' : 'Review'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Immediate Actions</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Schedule parent meetings for 5 high-risk students</li>
              <li>• Assign Math tutor to Grade 10B</li>
              <li>• Review attendance policies for Grade 9</li>
              <li>• Implement early warning system for Grade 11</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Long-term Strategies</h4>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Develop peer mentoring program</li>
              <li>• Enhance counseling services</li>
              <li>• Implement predictive analytics dashboard</li>
              <li>• Train teachers on early intervention techniques</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;