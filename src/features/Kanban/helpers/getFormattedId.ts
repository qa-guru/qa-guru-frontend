export const getFormattedId = (id: string) => {
  const lastTwoChars = id.slice(-2).toUpperCase();
  return `JAVA-${lastTwoChars}`;
};
