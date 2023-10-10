import { UserRole } from "api/graphql/generated/graphql";

export const getUpdatedAllowedColumns = (
  columnId: string,
  userId?: string | null,
  mentorId?: string | null,
  userRoles?: (UserRole | null)[] | null
) => {
  const hasManagerRole = userRoles?.some((role) => role === "MANAGER");

  if (hasManagerRole) {
    return [];
  }

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
