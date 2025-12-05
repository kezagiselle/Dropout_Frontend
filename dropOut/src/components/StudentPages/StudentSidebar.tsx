import React from 'react';
import { BarChart3, FileText } from 'lucide-react';
import { SiGoogleclassroom } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { FaCalendarCheck } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface StudentSidebarProps {
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigation: (path: string, tabName: string) => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({
  activeTab,
  sidebarOpen,
  setSidebarOpen,
  handleNavigation
}) => {
  const menuItems: MenuItem[] = [
    { icon: SiGoogleclassroom, label: 'My Classes', path: '/student-class' },
    { icon: FileText, label: 'My Assignments', path: '/my-assignments' },
    { icon: FaCalendarCheck, label: 'My Attendance', path: '/student-attendance' },
    { icon: TbReport, label: 'My Behavior', path: '/student-behavior' },
    { icon: IoMdSettings, label: 'My Profile', path: '/student-settings' }
  ];

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
    >
      {/* Mobile Close Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <nav className="p-3 sm:p-4 relative z-50 bg-white h-full">
        <button 
          className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 ${
            activeTab === 'Dashboard' 
              ? 'bg-orange-500 text-white' 
              : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
          }`}
          onClick={() => handleNavigation('/student-dash', 'Dashboard')}
        >
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-sm sm:text-base">Dashboard</span>
        </button>
        {menuItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <button 
              key={idx} 
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 ${
                activeTab === item.label 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
              onClick={() => handleNavigation(item.path, item.label)}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default StudentSidebar;