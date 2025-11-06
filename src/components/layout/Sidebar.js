import React from 'react';
import { useTheme } from '../../context/Themecontext';
import {
  LayoutDashboard,
  FileText,
  Users,
  Star,
  Settings,
  LogOut,
  Sun,
  Moon,
} from '../icons';

const Sidebar = ({ currentPage, setCurrentPage, onLogout }) => {
  const { colors, theme, toggleTheme } = useTheme();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
    { id: 'eligibility', label: 'Eligibility Criteria', icon: <FileText /> },
    { id: 'students', label: 'Student Profiles', icon: <Users /> },
    { id: 'favourites', label: 'Favourite Students', icon: <Star /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  return (
    <aside 
      className="flex flex-col w-64 h-screen px-4 py-8"
      style={{ backgroundColor: colors.sidebarBg, borderRight: `1px solid ${colors.border}` }}
    >
      <div className="flex items-center justify-between px-4 mb-10">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight" style={{ color: colors.sidebarText }}>
            Bridgebound College Portal
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full"
          style={{ color: colors.sidebarText, backgroundColor: colors.sidebarHover }}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className="flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200"
                style={{
                  color: isActive ? colors.sidebarActive : colors.sidebarText,
                  backgroundColor: isActive ? colors.sidebarHover : 'transparent',
                }}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = colors.sidebarHover)}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200"
            style={{ color: colors.sidebarText }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.sidebarHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut />
            <span className="ml-3 font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;