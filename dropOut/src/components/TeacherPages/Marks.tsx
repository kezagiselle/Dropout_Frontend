import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ArrowLeft, User, BookOpen, FileText, BarChart3, Bell, Search, Calendar, ChevronDown, Menu, X, Eye } from 'lucide-react';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaClipboardCheck } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import userr from "../../../src/img/userr.png";
import ViewMarks from './ViewMarks';

interface StudentGrade {
  id: number;
  studentName: string;
  grade: string;
}

export default function Marks() {
  const [course, setCourse] = useState<string>('');
  const [gradeType, setGradeType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [students, setStudents] = useState<StudentGrade[]>([
    { id: 1, studentName: '', grade: '' },
    { id: 2, studentName: '', grade: '' }
  ]);
  const [activeTab, setActiveTab] = useState('Marks');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();


  
  const handleBack = () => {
    navigate('/marks');
  };

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false); 
  };

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/teacher-dashboard' },
    { icon: LiaChalkboardTeacherSolid, label: 'My Classes', path: '/my-classes' },
    { icon: FaClipboardCheck, label: 'Attendance', path: '/attendance' },
    { icon: FaRegChartBar, label: 'Marks', path: '/marks' },
    { icon: TbReport, label: 'Behavior Reports', path: '/behavior-reports' },
    { icon: IoIosPeople, label: 'Student Profiles', path: '/student-profiles' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' }
  ];

  const handleStudentNameChange = (id: number, value: string) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, studentName: value } : student
    ));
  };

  const handleGradeChange = (id: number, value: string) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, grade: value } : student
    ));
  };

  const addNewStudent = () => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents([...students, { id: newId, studentName: '', grade: '' }]);
  };

  const removeStudent = (id: number) => {
    if (students.length > 1) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleSaveAll = () => {
    console.log('All grades saved:', {
      course,
      gradeType,
      name,
      students
    });
    alert('All grades saved successfully!');
  };

  const handleSaveForm = () => {
    console.log('Form saved:', {
      course,
      gradeType,
      name
    });
    alert('Form settings saved!');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate(-1); 
    }
  };

  // Function to handle View Marks navigation
  const handleViewMarks = () => {
    navigate('/view-marks');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          {/* Left Section - Mobile Menu Button and School Name */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Westfield High School</span>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, visible on tablet and up */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, teachers, courses..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-4 h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-2">
              <img src={userr} alt="User profile" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" />
              <span className="text-sm font-medium hidden sm:block">Sarah Wilson</span>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, teachers, courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 mr-2">Filters</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2 whitespace-nowrap">
            All Grades <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2 whitespace-nowrap">
            All Classes <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center gap-2 whitespace-nowrap">
            Current Term <ChevronDown className="w-3 h-3" />
          </button>
          <button className="px-4 py-1 bg-orange-500 text-white rounded text-sm flex items-center gap-2 whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            Date Filter
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
          {/* Mobile Close Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <nav className="p-4 relative z-50 bg-white h-full">
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 mb-2 ${
                  activeTab === item.label 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
                onClick={() => handleNavigation(item.path, item.label)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Page Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">Marks Management</h1>
                  <p className="text-xs sm:text-sm text-gray-600">Manage student grades and assessments for different courses and grade types.</p>
                </div>
                <button 
                  onClick={handleCancel}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <div className="space-y-6">
              {/* Course Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Course Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Courses Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Courses *
                    </label>
                    <div className="relative">
                      <select
                        value={course}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setCourse(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 transition-colors"
                      >
                        <option value="">Select course...</option>
                        {/* Course options will be added here */}
                      </select>
                      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Grade Type Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Type *
                    </label>
                    <div className="relative">
                      <select
                        value={gradeType}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setGradeType(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 transition-colors"
                      >
                        <option value="">Select grade type...</option>
                        <option value="quiz">Quiz</option>
                        <option value="assignment">Assignment</option>
                        <option value="groupwork">Groupwork</option>
                        <option value="exam">Exam</option>
                      </select>
                      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder="Enter assessment name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 transition-colors"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSaveForm}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <IoMdSave className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>

              {/* Student Grades Table */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Student Grades</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Grades</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={student.studentName}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                handleStudentNameChange(student.id, e.target.value)
                              }
                              placeholder="Enter student name"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={student.grade}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                handleGradeChange(student.id, e.target.value)
                              }
                              placeholder="Enter grade"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            {students.length > 1 && (
                              <button
                                onClick={() => removeStudent(student.id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                              >
                                Remove
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Student Button */}
                <div className="mt-4">
                  <button
                    onClick={addNewStudent}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    + Add Student
                  </button>
                </div>

                {/* Save All and View Marks Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  {/* View Marks Button */}
                  <button
                    onClick={handleViewMarks}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Marks
                  </button>
                  
                  {/* Save All Button */}
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <IoMdSave className="w-4 h-4" />
                    Save All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}