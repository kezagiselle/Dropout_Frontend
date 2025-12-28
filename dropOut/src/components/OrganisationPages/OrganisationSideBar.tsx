import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Building2, 
  Users, 
  GraduationCap, 
  CalendarDays,
  BookOpen,
  FileText,
  Settings,
  LogOut 
} from 'lucide-react';
import { useUserAuth } from '../../context/useUserAuth';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface OrganizationSidebarProps {
  activeTab: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigation: (path: string, tabName: string) => void;
}

const OrganizationSidebar: React.FC<OrganizationSidebarProps> = ({
  activeTab,
  sidebarOpen,
  setSidebarOpen,
  handleNavigation
}) => {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  
  const menuItems: MenuItem[] = [
    { icon: Building2, label: 'Schools', path: '/org-schools' },
    { icon: Users, label: 'Students', path: '/student-page' },
    { icon: GraduationCap, label: 'Teachers', path: '/teacher-page' },
    { icon: BookOpen, label: 'Courses & Timetable', path: '/courses-timetable' },
    { icon: CalendarDays, label: 'Exams & Grades', path: '/exams-grades' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/organization-settings' }
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
      
      <nav className="p-3 sm:p-4 relative z-50 bg-white h-full flex flex-col">
        <div className="flex-1">
          {/* Dashboard Button */}
          <button 
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 ${
              activeTab === 'Dashboard' 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
            }`}
            onClick={() => handleNavigation('/org-dash', 'Dashboard')}
          >
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Dashboard</span>
          </button>
          
          {/* Menu Items */}
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
        </div>

        {/* Logout Button pinned to sidebar bottom */}
        <div className="mt-4 mb-2">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200 text-base bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default OrganizationSidebar;