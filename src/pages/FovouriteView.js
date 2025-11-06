import React from 'react';
import { useTheme } from '../context/Themecontext';
import { meetsCriteria } from '../utlis/helper';
import Avatar from '../components/common/Avatar';
import { CheckCircle, Star } from '../components/icons';

const FavouritesView = ({ criteria, allStudents, favouritedStudents, toggleFavourite }) => {
  const { colors } = useTheme();
  
  const favouriteList = allStudents.filter(student => favouritedStudents.has(student.id));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
        Favourite Students
      </h1>
      
      {favouriteList.length === 0 ? (
        <p className="text-lg" style={{ color: colors.textSecondary }}>
          You haven't favourited any students yet. Click the star icon on the
          <span className="font-semibold"> Student Profiles</span> page to add them here.
        </p>
      ) : (
        <>
          <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
            Showing {favouriteList.length} favourited applicants.
          </p>

          {/* Header */}
          <div 
            className="grid grid-cols-12 items-center px-6 py-3 text-xs font-medium uppercase tracking-wider rounded-lg shadow-sm"
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
            {favouriteList.map((student) => {
              const rank = allStudents.findIndex(s => s.id === student.id) + 1;
              const passed = meetsCriteria(student, criteria);
              const isFavourited = favouritedStudents.has(student.id);

              return (
                <div
                  key={student.id}
                  className="grid grid-cols-12 items-center p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  }}
                >
                  <div className="col-span-1 text-xl font-bold" style={{ color: colors.textPrimary }}>
                    {rank}
                  </div>
                  
                  <div className="col-span-5 flex items-center space-x-3">
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
                  
                  <div className="col-span-1 text-center text-sm font-semibold" style={{ color: colors.textSecondary }}>
                    {student.gre}
                  </div>
                  <div className="col-span-1 text-center text-sm font-semibold" style={{ color: colors.textSecondary }}>
                    {student.gmat}
                  </div>
                  <div className="col-span-2 text-center text-sm font-bold" style={{ color: colors.info }}>
                    {student.class12}%
                  </div>

                  <div className="col-span-2 flex justify-center">
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
        </>
      )}
    </div>
  );
};

export default FavouritesView;