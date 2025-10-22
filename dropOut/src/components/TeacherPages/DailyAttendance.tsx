/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Check, X, User, ChevronDown, Bell, Save, Menu } from 'lucide-react';
import { IoTimeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import pe1 from "../../../src/img/pe1.png";
import pe2 from "../../../src/img/pe2.png";
import pe3 from "../../../src/img/pe3.png";

interface Student {
  id: string;
  name: string;
  avatar: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

interface Counts {
  present?: number;
  absent?: number;
  late?: number;
  excused?: number;
}

export default function DailyAttendance() {
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 5A');
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');
  const navigate = useNavigate();
  
  const [students, setStudents] = useState<Student[]>([
    { id: 'STU001', name: 'Emma Johnson', avatar: pe1, status: 'present' },
    { id: 'STU002', name: 'Michael Chen', avatar: pe2, status: 'present' },
    { id: 'STU003', name: 'Sarah Williams', avatar: pe3, status: 'absent' },
    { id: 'STU004', name: 'David Rodriguez', avatar: pe1, status: 'late' },
    { id: 'STU005', name: 'Jessica Brown', avatar: pe2, status: 'excused' },
  ]);

  const updateStatus = (studentId: string, newStatus: Student['status']): void => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
  };

  const markAllPresent = (): void => {
    setStudents(students.map(student => ({ ...student, status: 'present' })));
  };

  const handleBack = (): void => {
    navigate('/attendance');
  };

  const counts: Counts = students.reduce((acc: Counts, student) => {
    acc[student.status] = (acc[student.status] || 0) + 1;
    return acc;
  }, {});

  const getStatusButtonClass = (currentStatus: Student['status'], buttonStatus: Student['status']): string => {
    const isActive = currentStatus === buttonStatus;
    const baseClass = "px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all flex-1 justify-center";
    
    switch(buttonStatus) {
      case 'present':
        return `${baseClass} ${isActive ? 'bg-green-200 text-gray-800 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      case 'absent':
        return `${baseClass} ${isActive ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      case 'late':
        return `${baseClass} ${isActive ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      case 'excused':
        return `${baseClass} ${isActive ? 'bg-green-200 text-gray-800 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="w-full max-w-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Attendance Recording</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Mark attendance for your students quickly and efficiently</p>
            </div>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-none px-4 sm:px-6 py-4 sm:py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Class / Grade</label>
                <div className="relative">
                  <select 
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="appearance-none w-full sm:w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Grade 5A</option>
                    <option>Grade 5B</option>
                    <option>Grade 6A</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 sm:flex-none">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <div className="relative">
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <button 
              onClick={markAllPresent}
              className="px-4 sm:px-5 py-2.5 bg-blue-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-300 transition-colors w-full sm:w-auto justify-center mt-2 sm:mt-0"
            >
              <Check className="w-4 h-4" />
              Mark All Present
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-200 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.present || 0}</p>
                <p className="text-sm text-gray-600 truncate">Present</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.absent || 0}</p>
                <p className="text-sm text-gray-600 truncate">Absent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.late || 0}</p>
                <p className="text-sm text-gray-600 truncate">Late</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-500 rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{counts.excused || 0}</p>
                <p className="text-sm text-gray-600 truncate">Excused</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Student List ({students.length} Students)</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="px-4 py-2 text-orange-600 font-medium flex items-center gap-2 hover:bg-orange-50 rounded-lg transition-colors justify-center text-sm">
                <Bell className="w-4 h-4" />
                Notify Parents
              </button>
              <button className="px-4 py-2 bg-green-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-green-300 transition-colors justify-center text-sm">
                <Save className="w-4 h-4" />
                Save Attendance
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{student.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">ID: {student.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => updateStatus(student.id, 'present')}
                    className={getStatusButtonClass(student.status, 'present')}
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Present</span>
                  </button>
                  <button 
                    onClick={() => updateStatus(student.id, 'absent')}
                    className={getStatusButtonClass(student.status, 'absent')}
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Absent</span>
                  </button>
                  <button 
                    onClick={() => updateStatus(student.id, 'late')}
                    className={getStatusButtonClass(student.status, 'late')}
                  >
                    <IoTimeSharp className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Late</span>
                  </button>
                  <button 
                    onClick={() => updateStatus(student.id, 'excused')}
                    className={getStatusButtonClass(student.status, 'excused')}
                  >
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Excused</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">Last saved: 2 minutes ago</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-orange-600 transition-colors justify-center text-sm sm:text-base">
              <Check className="w-4 h-4" />
              Submit Attendance
            </button>
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-green-300 transition-colors justify-center text-sm sm:text-base">
              <Bell className="w-4 h-4" />
              Notify Parents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}