import React, { useState} from 'react';
import type { ChangeEvent } from 'react';
import { ArrowLeft, User, AlertTriangle, FileText, Calendar, Bell, Upload, X } from 'lucide-react';
import { IoMdSave } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function LogBehaviorReport() {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [classGrade, setClassGrade] = useState<string>('');
  const [behaviorType, setBehaviorType] = useState<'incident' | 'commendation'>('incident');
  const [severity, setSeverity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [notifyParents, setNotifyParents] = useState<boolean>(false);
  const [notifyAdmin, setNotifyAdmin] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const navigate = useNavigate();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', {
      selectedStudent,
      classGrade,
      behaviorType,
      severity,
      description,
      date,
      time,
      notifyParents,
      notifyAdmin,
      uploadedFiles
    });
    alert('Behavior Report Saved!');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/behavior-reports'); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Updated to align with centered content */}
      <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">Log Behavior Report</h1>
              <p className="text-xs sm:text-sm text-gray-600">Record student behavior incidents or commendations with detailed information and notifications.</p>
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
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Student Information */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Student Information</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student(s)*
                </label>
                <div className="relative">
                  <select
                    value={selectedStudent}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                  >
                    <option value="">Choose a student...</option>
                    <option value="emma">Emma Johnson</option>
                    <option value="michael">Michael Brown</option>
                    <option value="james">James Wilson</option>
                    <option value="sarah">Sarah Davis</option>
                    <option value="alex">Alex Martinez</option>
                  </select>
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class / Grade
                </label>
                <input
                  type="text"
                  value={classGrade}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setClassGrade(e.target.value)}
                  placeholder="Grade 5A"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Behavior Type */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Behavior Type</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type*
                </label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="behaviorType"
                      value="incident"
                      checked={behaviorType === 'incident'}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setBehaviorType(e.target.value as 'incident')}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Incident
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="behaviorType"
                      value="commendation"
                      checked={behaviorType === 'commendation'}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setBehaviorType(e.target.value as 'commendation')}
                      className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      Commendation
                    </span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity / Risk Level*
                </label>
                <div className="relative">
                  <select
                    value={severity}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSeverity(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                  >
                    <option value="">Select severity...</option>
                    <option value="low">Low - Minor Issue</option>
                    <option value="medium">Medium - Requires Attention</option>
                    <option value="high">High - Serious Incident</option>
                    <option value="critical">Critical - Immediate Action</option>
                  </select>
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Description */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Details & Description</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes / Description*
                </label>
                <textarea
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Provide detailed description of the behavior incident or commendation..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Optional Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-orange-300 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Click to upload photos, documents, or drag and drop</p>
                    <p className="text-xs text-gray-500">Supports: JPG, PNG, PDF (Max 10MB)</p>
                  </label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-xs sm:text-sm text-gray-700 truncate flex-1 mr-2">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Date & Time</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Incident / Commendation*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time (Optional)
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={time}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
                    placeholder="--:-- --"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyParents}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNotifyParents(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">📧 Notify Parents</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyAdmin}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNotifyAdmin(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">📧 Notify Administrator</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-blue-300 hover:bg-blue-400 text-white rounded-lg font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center mb-3 sm:mb-0"
            >
              <IoMdSave className="w-4 h-4" />
              Save Behavior Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}