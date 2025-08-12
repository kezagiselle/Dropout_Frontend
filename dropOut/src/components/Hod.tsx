import React from 'react'

const Hod = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Academic Portal</h2>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-900">HoD & Registrar Dashboard</h1>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 flex items-center justify-center text-gray-600 cursor-pointer">
              ▼
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg">
              <span className="text-lg">📊</span>
              <span className="font-medium">Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-lg">🎓</span>
              <span className="font-medium">Students</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-lg">👤</span>
              <span className="font-medium">Teachers</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-lg">📅</span>
              <span className="font-medium">Courses & Timetables</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-lg">📈</span>
              <span className="font-medium">Attendance & Performance</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-lg">📄</span>
              <span className="font-medium">Reports</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-lg">💬</span>
              <span className="font-medium">Communication</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Settings</span>
            </div>
          </div>
        </nav>

                 {/* Main Content */}
         <main className="flex-1 p-4">
           {/* Summary Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
             <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                   <span className="text-xl">🎓</span>
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-600">Total Students</h3>
                   <p className="text-2xl font-bold text-gray-900">1,234</p>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                   <span className="text-xl">⚠️</span>
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-600">At-risk Students</h3>
                   <p className="text-2xl font-bold text-red-600">45</p>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                   <span className="text-xl">▶️</span>
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-600">Active Teachers</h3>
                   <p className="text-2xl font-bold text-gray-900">78</p>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                   <span className="text-xl">⏰</span>
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-600">Pending Approvals</h3>
                   <p className="text-2xl font-bold text-gray-900">3</p>
                 </div>
               </div>
             </div>
           </div>

           {/* Bottom Sections */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             {/* Alerts & Notifications */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <h2 className="text-lg font-semibold text-gray-900 mb-3">Alerts & Notifications</h2>
               <div className="space-y-3">
                 <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                   <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                     <span className="text-white text-xs">⚠️</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-red-900 text-sm">Missing Attendance Data</h4>
                     <p className="text-xs text-red-700 mt-0.5">Student John Doe missing attendance data for the past week</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                   <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                     <span className="text-white text-xs">⚠️</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-orange-900 text-sm">At-risk Student Alert</h4>
                     <p className="text-xs text-orange-700 mt-0.5">At-risk student Maria Gonzalez needs immediate intervention</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                     <span className="text-white text-xs">ℹ️</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-blue-900 text-sm">Pending Approval</h4>
                     <p className="text-xs text-blue-700 mt-0.5">Pending timetable approval for Computer Science Department</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Pending Actions */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending Actions</h2>
               <div className="space-y-3">
                 <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                   <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                     <span className="text-sm">📄</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-gray-900 text-sm">Approve Timetables</h4>
                     <p className="text-xs text-gray-600">3 pending approvals</p>
                   </div>
                   <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                     Review
                   </button>
                 </div>
                 <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                   <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                     <span className="text-sm">📈</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-gray-900 text-sm">Generate Reports</h4>
                     <p className="text-xs text-gray-600">Monthly performance reports</p>
                   </div>
                   <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                     Generate
                   </button>
                 </div>
                 <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                   <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                     <span className="text-sm">⚠️</span>
                   </div>
                   <div className="flex-1">
                     <h4 className="font-medium text-gray-900 text-sm">Send Alerts</h4>
                     <p className="text-xs text-gray-600">Notify stakeholders</p>
                   </div>
                   <button className="px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                     Send
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </main>
      </div>
    </div>
  )
}

export default Hod
