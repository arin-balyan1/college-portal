import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/Themecontext';
import { bestStudents } from '../data/Mockdata';
import { Bell } from '../components/icons';

const DashboardView = () => {
  const { colors } = useTheme();
  
  const totalApplicants = 891;
  const underReview = 632;
  const notSeen = totalApplicants - underReview;

  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);
  const notifications = [
    { id: 1, title: '3 applications awaiting review', time: 'Just now' },
    { id: 2, title: '2 interviews scheduled for tomorrow', time: '1h ago' },
    { id: 3, title: 'New message from applicant Rohan Gupta', time: '2h ago' },
  ];
  const unreadCount = notifications.length;

  useEffect(() => {
    if (!showNotifs) return;
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [showNotifs]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Bridgebound College Portal
          </h1>
          <p className="text-lg" style={{ color: colors.textSecondary }}>
            Welcome, Representative!
          </p>
        </div>
        <div ref={notifRef} className="relative">
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-full transition-colors"
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surfaceHover}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={() => setShowNotifs((s) => !s)}
        >
          <Bell />
          <span
            className="absolute -top-1 -right-1 h-5 min-w-[20px] text-xs px-1 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.warning, color: colors.textInverse }}
          >{unreadCount}</span>
          {showNotifs && (
            <div 
              className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg border z-10"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: colors.cardBorder }}>
                <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>Notifications</h3>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 hover:bg-black hover:bg-opacity-5">
                    <div className="text-sm" style={{ color: colors.textPrimary }}>{n.title}</div>
                    <div className="text-xs" style={{ color: colors.textMuted }}>{n.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div 
          className="p-6 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
          }}
        >
          <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            Total Applicants
          </h2>
          <p className="text-4xl font-bold mb-1" style={{ color: colors.info }}>{totalApplicants}</p>
          <p className="text-sm" style={{ color: colors.textMuted }}>Top candidates shown</p>
        </div>
        
        <div 
          className="p-6 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
          }}
        >
          <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            Applicants Under Review
          </h2>
          <p className="text-4xl font-bold mb-1" style={{ color: colors.warning }}>{underReview}</p>
          <p className="text-sm" style={{ color: colors.textMuted }}>Currently being evaluated</p>
        </div>
        
        <div 
          className="p-6 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
          }}
        >
          <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            Applicants Not Seen
          </h2>
          <p className="text-4xl font-bold mb-1" style={{ color: colors.textSecondary }}>{notSeen}</p>
          <p className="text-sm" style={{ color: colors.textMuted }}>Yet to be reviewed</p>
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Applicants */}
        <div 
          className="p-6 rounded-xl shadow-sm border"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Recent Applicants
          </h2>
          <div className="divide-y" style={{ borderColor: colors.cardBorder }}>
            {bestStudents.slice(0, 5).map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium" style={{ color: colors.textPrimary }}>{s.name}</div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    GRE {s.gre} · GMAT {s.gmat} · Class 12 {s.class12}%
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.surface, color: colors.textSecondary, border: `1px solid ${colors.cardBorder}` }}>New</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks & Notices */}
        <div 
          className="p-6 rounded-xl shadow-sm border"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Today’s Tasks
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span style={{ color: colors.textSecondary }}>Review applications in queue</span>
              <span className="text-sm font-semibold" style={{ color: colors.warning }}>{underReview}</span>
            </li>
            <li className="flex items-center justify-between">
              <span style={{ color: colors.textSecondary }}>Schedule interviews</span>
              <span className="text-sm font-semibold" style={{ color: colors.accent }}>5</span>
            </li>
            <li className="flex items-center justify-between">
              <span style={{ color: colors.textSecondary }}>Unread messages</span>
              <span className="text-sm font-semibold" style={{ color: colors.info }}>3</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;