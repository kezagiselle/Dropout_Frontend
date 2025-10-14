import React, { useState } from 'react';
import { ArrowLeft, Calendar, Check, X, User, ChevronDown, Bell, Save } from 'lucide-react';
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
    const baseClass = "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all";
    
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daily Attendance Recording</h1>
            <p className="text-sm text-gray-600 mt-1">Mark attendance for your students quickly and efficiently</p>
          </div>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-end gap-4 justify-between">
            <div className="flex items-end gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Class / Grade</label>
                <div className="relative">
                  <select 
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="appearance-none w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Grade 5A</option>
                    <option>Grade 5B</option>
                    <option>Grade 6A</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <div className="relative">
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <button 
              onClick={markAllPresent}
              className="px-5 py-2.5 bg-blue-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-300 transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark All Present
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-200 rounded-full"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{counts.present || 0}</p>
                <p className="text-sm text-gray-600">Present</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{counts.absent || 0}</p>
                <p className="text-sm text-gray-600">Absent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{counts.late || 0}</p>
                <p className="text-sm text-gray-600">Late</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{counts.excused || 0}</p>
                <p className="text-sm text-gray-600">Excused</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Student List ({students.length} Students)</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-orange-600 font-medium flex items-center gap-2 hover:bg-orange-50 rounded-lg transition-colors">
                <Bell className="w-4 h-4" />
                Notify Parents
              </button>
              <button className="px-4 py-2 bg-green-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-green-300 transition-colors">
                <Save className="w-4 h-4" />
                Save Attendance
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">ID: {student.id}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(student.id, 'present')}
                    className={getStatusButtonClass(student.status, 'present')}
                  >
                    <Check className="w-4 h-4" />
                    Present
                  </button>
                  <button 
                    onClick={() => updateStatus(student.id, 'absent')}
                    className={getStatusButtonClass(student.status, 'absent')}
                  >
                    <X className="w-4 h-4" />
                    Absent
                  </button>
                  <button 
                    onClick={() => updateStatus(student.id, 'late')}
                    className={getStatusButtonClass(student.status, 'late')}
                  >
                    <IoTimeSharp className="w-4 h-4" />
                    Late
                  </button>
                  <button 
                    onClick={() => updateStatus(student.id, 'excused')}
                    className={getStatusButtonClass(student.status, 'excused')}
                  >
                    <User className="w-4 h-4" />
                    Excused
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Last saved: 2 minutes ago</p>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-orange-600 transition-colors">
              <Check className="w-4 h-4" />
              Submit Attendance
            </button>
            <button className="px-6 py-3 bg-green-200 text-gray-800 rounded-lg font-medium flex items-center gap-2 hover:bg-green-300 transition-colors">
              <Bell className="w-4 h-4" />
              Notify Parents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}