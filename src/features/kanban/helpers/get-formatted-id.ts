export const getFormattedId = (id?: string | null) => {
  const lastTwoChars = id?.slice(-2).toUpperCase();
  return `JAVA-${lastTwoChars}`;
};
