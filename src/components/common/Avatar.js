import React from 'react';
import { useTheme } from '../../context/Themecontext';

const Avatar = ({ name }) => {
  const { colors } = useTheme();
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
    
  return (
    <div 
      className="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-white"
      style={{ backgroundColor: colors.primary }}
      title={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;