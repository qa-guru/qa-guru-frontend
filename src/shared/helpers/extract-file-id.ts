export const extractFileId = (content: string): string[] => {
  const regex = /\/file\/(\d+)/g;
  const matches = [];
  let match;

  // Ищем все совпадения по регулярному выражению
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1]); // Добавляем найденный fileId в список
  }

  return matches;
};
