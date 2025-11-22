import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, ChevronDown, ExternalLink, Users, Calendar, Bell, Menu, X, BarChart3, FileText } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';

interface TimelineItem {
  id: string;
  type: 'positive' | 'warning';
  title: string;
  description: string;
  teacher: string;
  date: string;
}

interface CounselingNote {
  id: string;
  title: string;
  description: string;
  counselor: string;
  date: string;
  status: 'completed' | 'in-progress';
}

const BehaviorReports: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [termFilter, setTermFilter] = useState('Current Term');

  const timelineItems: TimelineItem[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Outstanding Class Participation',
      description: 'Exceptional contribution to group discussion in Biology class',
      teacher: 'Teacher: Ms. Rodriguez',
      date: 'March 19, 2025'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Late Assignment Submission',
      description: 'Mathematics homework submitted 2 days after deadline',
      teacher: 'Teacher: Mr. Thompson',
      date: 'March 18, 2025'
    },
    {
      id: '3',
      type: 'positive',
      title: 'Peer Tutoring Recognition',
      description: 'Volunteered to help fellow classmates with Chemistry concepts',
      teacher: 'Teacher: Dr. Williams',
      date: 'March 8, 2025'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Disruptive Behavior',
      description: 'Talking during lecture after being asked to stop',
      teacher: 'Teacher: Ms. Davis',
      date: 'February 28, 2025'
    }
  ];

  const counselingNotes: CounselingNote[] = [
    {
      id: '1',
      title: 'Academic Performance Review',
      description: 'Discussed time management strategies and study habits improvement',
      counselor: 'Counselor: Mrs. Johnson | March 5, 2025',
      date: 'March 5, 2025',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Behavioral Improvement Plan',
      description: 'Follow-up session to monitor progress on classroom behavior goals',
      counselor: 'Counselor: Mrs. Johnson | March 5, 2025',
      date: 'March 5, 2025',
      status: 'in-progress'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-3 sm:p-4 lg:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Behavior Reports</h1>
            <p className="text-gray-600">Review your conduct, commendations, and counseling records</p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Types</option>
                <option>Commendations</option>
                <option>Warnings</option>
                <option>Incidents</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Current Term</option>
                <option>Last Term</option>
                <option>All Terms</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Commendations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Commendations</h3>
                    <p className="text-xs text-gray-500">Positive conduct</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-green-600 mt-1">↑ 3 from last term</div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Warnings</h3>
                    <p className="text-xs text-gray-500">Minor infractions</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <div className="text-xs text-gray-500 mt-1">Same as last term</div>
                </div>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  View Details
                </button>
              </div>
            </div>

            {/* Serious Incidents */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Serious Incidents</h3>
                    <p className="text-xs text-gray-500">Major violations</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">1</div>
                  <div className="text-xs text-green-600 mt-1">↓ 1 from last term</div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Behavior Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Behavior Timeline</h2>
            <div className="space-y-4">
              {timelineItems.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 flex items-start justify-between ${
                    item.type === 'positive'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-orange-50 border-orange-200'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.type === 'positive' ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                    >
                      {item.type === 'positive' ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                      <p className="text-xs text-gray-600">{item.teacher}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-shrink-0">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counseling Notes */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Counseling Notes</h2>
            <div className="space-y-4">
              {counselingNotes.map((note) => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{note.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        note.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {note.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{note.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600">{note.counselor}</p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Full Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Insights */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Behavioral Insights</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Your recent positive behavior has significantly improved your overall conduct record. Keep up the
                  excellent work with peer tutoring and class participation!
                </p>
                <p className="text-xs text-gray-600">
                  💡 Your project list teaches decreased by 15% this term
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              View Counseling Notes
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
              <Users className="w-4 h-4" />
              View All Reports
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Contact Counselor
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BehaviorReports;