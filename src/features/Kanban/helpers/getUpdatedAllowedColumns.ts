export const getUpdatedAllowedColumns = (columnId: string) => {
  switch (columnId) {
    case "1":
      return ["2"];
    case "2":
      return ["3", "4"];
    case "3":
      return [];
    case "4":
      return ["3"];
    default:
      return [];
  }
};
