import { UserRole, useUserIdQuery } from "api/graphql/generated/graphql";
import useRoleAccess from "shared/hooks/use-role-access";

import { STATUS_COLUMN } from "../constants";

export const getUpdatedAllowedColumns = (
  columnId: string,
  mentorId?: string | null
) => {
  const { data: userId } = useUserIdQuery({
    fetchPolicy: "cache-first",
  });

  const hasManagerAccess = useRoleAccess({ allowedRoles: [UserRole.Manager] });
  const hasMentorAccess = useRoleAccess({ allowedRoles: [UserRole.Mentor] });

  if (hasManagerAccess && !hasMentorAccess) {
    return [];
  }

  let allowedColumns: string[] = [];

  switch (columnId) {
    case STATUS_COLUMN.NEW:
      allowedColumns = [STATUS_COLUMN.IN_REVIEW];
      break;
    case STATUS_COLUMN.IN_REVIEW:
      if (userId === mentorId) {
        allowedColumns = [STATUS_COLUMN.APPROVED, STATUS_COLUMN.NOT_APPROVED];
      }
      break;
    case STATUS_COLUMN.APPROVED:
      if (userId === mentorId) {
        allowedColumns = [];
      }
      break;
    case STATUS_COLUMN.NOT_APPROVED:
      if (userId === mentorId) {
        allowedColumns = [STATUS_COLUMN.APPROVED];
      }
      break;
    default:
      allowedColumns = [];
  }

  return allowedColumns;
};
