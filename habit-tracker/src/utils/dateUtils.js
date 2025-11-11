export const getTodayDateString = () => {
  return formatDateString(new Date());
};

export const formatDateString = (date) => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};
