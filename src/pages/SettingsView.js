import React, { useState } from 'react';
import { useTheme } from '../context/Themecontext';

const SettingsView = () => {
  const { colors, theme, toggleTheme } = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    alert('Password change requested (demo only).');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePrefsSubmit = (e) => {
    e.preventDefault();
    alert('Preferences saved (demo only).');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
        Settings
      </h1>
      <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
        Manage your account and application preferences.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password */}
        <form 
          onSubmit={handlePasswordSubmit}
          className="p-6 rounded-xl shadow-sm border space-y-4"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>Change Password</h2>
          <div>
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg focus:outline-none"
              style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.textPrimary }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none"
                style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.textPrimary }}
              />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none"
                style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.textPrimary }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn">Update Password</button>
          </div>
        </form>

        {/* Preferences */}
        <form 
          onSubmit={handlePrefsSubmit}
          className="p-6 rounded-xl shadow-sm border space-y-4"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>Preferences</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
              <span style={{ color: colors.textSecondary }}>Email alerts for new applications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} />
              <span style={{ color: colors.textSecondary }}>SMS reminders for interviews</span>
            </label>
          </div>
          <div className="pt-2">
            <h3 className="text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>Appearance</h3>
            <button 
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: colors.primary }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn">Save Preferences</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsView;


