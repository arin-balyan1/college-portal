import React, { useState } from 'react';
import { useTheme } from './context/Themecontext';
import { bestStudents } from './data/Mockdata';

// Layout & Pages
import Sidebar from './components/layout/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardView from './pages/DashboardView';
import EligibilityView from './pages/EligibilityView';
import StudentProfilesView from './pages/StudentProfileview';
import FavouritesView from './pages/FovouriteView';
import SettingsView from './pages/SettingsView';

function App() {
  const { colors } = useTheme();

  // --- State Management ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Default criteria
  const [criteria, setCriteria] = useState({
    class12: { minPercentage: '90' },
    gre: { minTotal: '320', minVerbal: '', minQuant: '' },
    ielts: { minOverall: '7.5' },
    gmat: { minTotal: '700', minVerbal: '', minQuant: '' },
  });
  
  const [favouritedStudents, setFavouritedStudents] = useState(new Set());

  // --- Event Handlers ---
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const toggleFavourite = (studentId) => {
    setFavouritedStudents((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(studentId)) {
        newFavs.delete(studentId);
      } else {
        newFavs.add(studentId);
      }
      return newFavs;
    });
  };

  // --- Page Rendering Logic ---
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView />;
      case 'eligibility':
        return <EligibilityView criteria={criteria} setCriteria={setCriteria} />;
      case 'students':
        return (
          <StudentProfilesView
            criteria={criteria}
            allStudents={bestStudents}
            favouritedStudents={favouritedStudents}
            toggleFavourite={toggleFavourite}
          />
        );
      case 'favourites':
        return (
          <FavouritesView
            criteria={criteria}
            allStudents={bestStudents}
            favouritedStudents={favouritedStudents}
            toggleFavourite={toggleFavourite}
          />
        );
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  // --- Render ---
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex" style={{ backgroundColor: colors.background }}>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />
      <main
        className="flex-1 min-h-screen overflow-y-auto p-4 md:p-8"
        style={{ color: colors.textPrimary }}
      >
        {/* Mobile topbar */}
        <div className="md:hidden mb-4">
          <button
            aria-label="Open menu"
            className="px-3 py-2 rounded-lg text-white"
            style={{ backgroundColor: colors.primary }}
            onClick={() => setMobileSidebarOpen(true)}
          >
            Menu
          </button>
        </div>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;