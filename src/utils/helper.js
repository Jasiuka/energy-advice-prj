export const calculateDate = (months) => {
  // Calculates a date in the future by a given number of months or in the past.
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split("T")[0];
};
