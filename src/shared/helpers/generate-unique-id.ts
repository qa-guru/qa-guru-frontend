export const generateUniqueId = () => {
  return `_${Math.random().toString(36).slice(2, 11)}_${Date.now()}`;
};
