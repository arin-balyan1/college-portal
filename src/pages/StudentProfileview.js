import React from 'react';
import { useTheme } from '../context/Themecontext';
import { meetsCriteria } from '../utlis/helper';
import Avatar from '../components/common/Avatar';
import { CheckCircle, Star } from '../components/icons';

const StudentProfilesView = ({ criteria, allStudents, favouritedStudents, toggleFavourite }) => {
  const { colors } = useTheme();

  const getRankStyle = (rank) => {
    if (rank === 1) return { 
      backgroundColor: colors.warning + '20',
      borderColor: colors.warning,
    };
    if (rank === 2) return { 
      backgroundColor: colors.textMuted + '20',
      borderColor: colors.textMuted,
    };
    if (rank === 3) return { 
      backgroundColor: colors.secondary + '20',
      borderColor: colors.secondary,
    };
    return { 
      backgroundColor: colors.cardBg,
      borderColor: colors.cardBorder,
    };
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
        Student Rankings
      </h1>
      <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
        Showing top 20 applicants. A green checkmark indicates all criteria are met.
      </p>

      {/* Header */}
      <div 
        className="hidden md:grid grid-cols-12 items-center px-6 py-3 text-xs font-medium uppercase tracking-wider rounded-lg shadow-sm"
        style={{ backgroundColor: colors.surface, color: colors.textMuted }}
      >
        <div className="col-span-1">Rank</div>
        <div className="col-span-5">Name</div>
        <div className="col-span-1 text-center">GRE</div>
        <div className="col-span-1 text-center">GMAT</div>
        <div className="col-span-2 text-center">Class 12 %</div>
        <div className="col-span-2 text-center">Favourite</div>
      </div>

      {/* Student List */}
      <div className="mt-4 space-y-3">
        {allStudents.map((student, index) => {
          const rank = index + 1;
          const passed = meetsCriteria(student, criteria);
          const isFavourited = favouritedStudents.has(student.id);
          const rankStyle = getRankStyle(rank);

          return (
            <div
              key={student.id}
              className="flex flex-col md:grid md:grid-cols-12 gap-y-2 md:gap-y-0 items-start md:items-center p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md"
              style={rankStyle}
            >
              <div className="flex items-center w-full md:w-auto md:col-span-1">
                <span className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                  {rank}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 w-full md:w-auto md:col-span-5">
                <Avatar name={student.name} />
                <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                  {student.name}
                </span>
                {passed && (
                  <span style={{ color: colors.success }} title="Meets Criteria">
                    <CheckCircle />
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-none gap-4 w-full md:w-auto md:flex md:col-span-4 md:justify-around items-center">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 md:hidden">GRE</span>
                  <span className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
                    {student.gre}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 md:hidden">GMAT</span>
                  <span className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
                    {student.gmat}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 md:hidden">Class 12</span>
                  <span className="text-sm font-bold" style={{ color: colors.info }}>
                    {student.class12}%
                  </span>
                </div>
              </div>

              <div className="flex justify-end w-full md:w-auto md:col-span-2 md:justify-center">
                <button 
                  onClick={() => toggleFavourite(student.id)}
                  className="p-2 rounded-full transition-all duration-200 hover:bg-black hover:bg-opacity-10"
                  style={{ color: isFavourited ? colors.warning : colors.textMuted }}
                  title={isFavourited ? "Remove from favourites" : "Add to favourites"}
                >
                  <Star isFilled={isFavourited} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentProfilesView;