import React from 'react';
import { useTheme } from '../context/Themecontext';
import FormInput from '../components/common/Forminput';

const EligibilityView = ({ criteria, setCriteria }) => {
  const { colors } = useTheme();

  const handleClass12Change = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      class12: { ...prev.class12, [name]: value }
    }));
  };
  
  const handleGreChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      gre: { ...prev.gre, [name]: value }
    }));
  };

  const handleIeltsChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      ielts: { ...prev.ielts, [name]: value }
    }));
  };
  
  const handleGmatChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      gmat: { ...prev.gmat, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Criteria saved successfully!");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
        Eligibility Criteria
      </h1>
      <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
        Set the minimum requirements for student applications.
      </p>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Class 12 Criteria */}
        <div 
          className="p-6 rounded-xl shadow-sm border"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Class 12
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Minimum Percentage"
              id="minPercentage"
              name="minPercentage"
              type="number"
              placeholder="e.g., 85"
              value={criteria.class12.minPercentage}
              onChange={handleClass12Change}
            />
          </div>
        </div>

        {/* GRE Criteria */}
        <div 
          className="p-6 rounded-xl shadow-sm border"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
            GRE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput
              label="Minimum Total Score"
              id="minTotal"
              name="minTotal"
              type="number"
              placeholder="e.g., 320"
              value={criteria.gre.minTotal}
              onChange={handleGreChange}
            />
            <FormInput
              label="Min Verbal"
              id="minVerbal"
              name="minVerbal"
              type="number"
              placeholder="e.g., 160"
              value={criteria.gre.minVerbal}
              onChange={handleGreChange}
            />
            <FormInput
              label="Min Quant"
              id="minQuant"
              name="minQuant"
              type="number"
              placeholder="e.g., 160"
              value={criteria.gre.minQuant}
              onChange={handleGreChange}
            />
          </div>
        </div>

        {/* IELTS Criteria */}
        <div 
          className="p-6 rounded-xl shadow-sm border"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
            IELTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Minimum Overall Band"
              id="minOverall"
              name="minOverall"
              type="number"
              step="0.5"
              placeholder="e.g., 7.5"
              value={criteria.ielts.minOverall}
              onChange={handleIeltsChange}
            />
          </div>
        </div>

        {/* GMAT Criteria */}
        <div 
          className="p-6 rounded-xl shadow-sm border"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
            GMAT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput
              label="Minimum Total Score"
              id="minTotal"
              name="minTotal"
              type="number"
              placeholder="e.g., 700"
              value={criteria.gmat.minTotal}
              onChange={handleGmatChange}
            />
            <FormInput
              label="Min Verbal"
              id="minVerbal"
              name="minVerbal"
              type="number"
              placeholder="e.g., 35"
              value={criteria.gmat.minVerbal}
              onChange={handleGmatChange}
            />
            <FormInput
              label="Min Quant"
              id="minQuant"
              name="minQuant"
              type="number"
              placeholder="e.g., 48"
              value={criteria.gmat.minQuant}
              onChange={handleGmatChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            style={{ backgroundColor: colors.primary }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.primaryHover}
            onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
          >
            Save Criteria
          </button>
        </div>
      </form>
    </div>
  );
};

export default EligibilityView;