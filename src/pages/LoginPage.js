import React, { useState } from 'react';
import { useTheme } from '../context/Themecontext';

const LoginPage = ({ onLogin }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div 
        className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg border"
        style={{ 
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder,
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="Bridgebound Logo" width="84" height="84" />
          <h2 className="text-3xl font-bold text-center" style={{ color: colors.textPrimary }}>
            Bridgebound College Portal
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
                color: colors.textPrimary,
              }}
              placeholder="rep@college.edu"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
                color: colors.textPrimary,
              }}
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200"
              style={{ backgroundColor: colors.primary }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.primaryHover}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center text-sm" style={{ color: colors.textMuted }}>
          <p>Demo Credentials:</p>
          <p>Email: <span className="font-medium" style={{ color: colors.textSecondary }}>rep@college.edu</span></p>
          <p>Password: <span className="font-medium" style={{ color: colors.textSecondary }}>password</span></p>
          <p>(Any input will work for this demo)</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;