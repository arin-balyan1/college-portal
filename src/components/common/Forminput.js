import React from 'react';
import { useTheme } from '../../context/Themecontext';

const FormInput = ({ label, id, type = 'text', value, onChange, placeholder }) => {
  const { colors } = useTheme();
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium mb-2"
        style={{ color: colors.textSecondary }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          backgroundColor: colors.inputBg,
          borderColor: colors.inputBorder,
          color: colors.textPrimary,
        }}
        className="w-full px-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2"
        onFocus={(e) => {
          e.target.style.borderColor = colors.inputFocus;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = colors.inputBorder;
        }}
      />
    </div>
  );
};

export default FormInput;