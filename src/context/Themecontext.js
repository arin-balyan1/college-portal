import React, { useState, createContext, useContext, useEffect } from 'react';

// --- Theme Configuration ---
const themes = {
  light: {
    // Primary brand (orange)
    primary: '#FF6A00',
    primaryHover: '#E65C00',

    // Secondary & accents
    secondary: '#FFA74D',
    accent: '#FF7A1A',
    warning: '#FFC266',
    success: '#37B24D',
    info: '#1E90FF',
    purple: '#A78BFA',

    // Base colors
    background: '#FFF9F3',
    surface: '#FFF4EA',
    surfaceHover: '#FFE9D6',
    border: '#FFD9B8',

    // Text colors
    textPrimary: '#2A1E12',
    textSecondary: '#6B4E3D',
    textMuted: '#9C7C67',
    textInverse: '#FFFFFF',

    // Card backgrounds
    cardBg: '#FFFFFF',
    cardBorder: '#FFD9B8',

    // Input colors
    inputBg: '#FFFFFF',
    inputBorder: '#FFBE8A',
    inputFocus: '#FF7A1A',

    // Sidebar
    sidebarBg: '#FF6A00',
    sidebarText: '#FFFFFF',
    sidebarHover: '#FF8330',
    sidebarActive: '#FFFFFF',
  },
  dark: {
    // Primary brand adapted for dark
    primary: '#FF7A1A',
    primaryHover: '#FF8F3F',

    secondary: '#FFB36B',
    accent: '#FF8A33',
    warning: '#FFD089',
    success: '#63E6BE',
    info: '#60A5FA',
    purple: '#C4B5FD',

    // Base colors (different from the sidebar for clear separation)
    background: '#0E0A07',
    surface: '#24160A',
    surfaceHover: '#2E1C0C',
    border: '#3A2510',

    // Text colors
    textPrimary: '#FFF3E6',
    textSecondary: '#FFD9B8',
    textMuted: '#E6BEA0',
    textInverse: '#1A120B',

    // Card backgrounds
    cardBg: '#2A180A',
    cardBorder: '#3A2510',

    // Input colors
    inputBg: '#2A180A',
    inputBorder: '#4A2F12',
    inputFocus: '#FF8A33',

    // Sidebar (darker for night mode)
    sidebarBg: '#1A120B',
    sidebarText: '#FFD9B8',
    sidebarHover: '#2E1C0C',
    sidebarActive: '#FF8A33',
  }
};

// --- Theme Context for Dark/Light Mode ---
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// --- Theme Provider Component ---
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Check for saved theme preference or default to 'light' mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const colors = themes[theme];

  // Push theme tokens into CSS variables so styles are dynamic and global
  useEffect(() => {
    const root = document.documentElement;
    // Color variables
    Object.entries(colors).forEach(([token, value]) => {
      root.style.setProperty(`--color-${token}`, value);
    });
    // Gradients
    root.style.setProperty('--gradient-primary', 'linear-gradient(180deg, #FF7A1A 0%, #FF6A00 100%)');
    // Typography variables (brand)
    root.style.setProperty('--font-heading', '"Battambang", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif');
    root.style.setProperty('--font-body', '"ABeeZee", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif');
    // Size scale
    root.style.setProperty('--fs-1', '2.25rem'); // 36px
    root.style.setProperty('--fs-2', '1.75rem'); // 28px
    root.style.setProperty('--fs-3', '1.5rem');  // 24px
    root.style.setProperty('--fs-4', '1.25rem'); // 20px
    root.style.setProperty('--fs-5', '1rem');    // 16px
    root.style.setProperty('--fs-6', '.875rem'); // 14px
    root.style.setProperty('--radius-md', '12px');
    root.style.setProperty('--radius-lg', '16px');
    root.style.setProperty('--shadow-sm', '0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.08)');
    root.style.setProperty('--shadow-md', '0 4px 10px rgba(0,0,0,.08)');
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};