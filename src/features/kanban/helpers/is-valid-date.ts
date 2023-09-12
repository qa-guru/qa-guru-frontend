export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const getValidDateOrNull = (dateString: string): string | null => {
  return isValidDate(dateString) ? dateString : null;
};
