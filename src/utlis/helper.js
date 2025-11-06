export const meetsCriteria = (student, criteria) => {
  let passed = true;
  if (criteria.class12.minPercentage && parseFloat(student.class12) < parseFloat(criteria.class12.minPercentage)) passed = false;
  if (criteria.gre.minTotal && parseFloat(student.gre) < parseFloat(criteria.gre.minTotal)) passed = false;
  if (criteria.ielts.minOverall && parseFloat(student.ielts) < parseFloat(criteria.ielts.minOverall)) passed = false;
  if (criteria.gmat.minTotal && parseFloat(student.gmat) < parseFloat(criteria.gmat.minTotal)) passed = false;
  return passed;
};