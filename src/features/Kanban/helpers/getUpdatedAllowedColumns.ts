export const getUpdatedAllowedColumns = (
  columnId: string,
  userId: string,
  mentorId: string
) => {
  let allowedColumns: string[] = [];

  switch (columnId) {
    case "1":
      allowedColumns = ["2"];
      break;
    case "2":
      if (userId === mentorId) {
        allowedColumns = ["3", "4"];
      }
      break;
    case "3":
      if (userId === mentorId) {
        allowedColumns = [];
      }
      break;
    case "4":
      if (userId === mentorId) {
        allowedColumns = ["3"];
      }
      break;
    default:
      allowedColumns = [];
  }

  return allowedColumns;
};
