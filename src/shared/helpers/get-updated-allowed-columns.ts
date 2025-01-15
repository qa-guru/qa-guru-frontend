import { useReactiveVar } from "@apollo/client";

import { userIdVar } from "cache";
import { UserRole, Maybe } from "api/graphql/generated/graphql";
import { useRoleAccess } from "shared/hooks";

import { STATUS_COLUMN } from "../constants";

export const getUpdatedAllowedColumns = (
  columnId: string,
  mentorId?: Maybe<string>
) => {
  const currentUserId = useReactiveVar(userIdVar);

  const hasDraggAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  });

  const hasAdminRoleAcces = useRoleAccess({
    allowedRoles: [UserRole.Admin],
  });

  if (!hasDraggAccess) {
    return [];
  }

  let allowedColumns: string[] = [];

  switch (columnId) {
    case STATUS_COLUMN.NEW:
      allowedColumns = [STATUS_COLUMN.IN_REVIEW];
      break;
    case STATUS_COLUMN.IN_REVIEW:
      if (hasAdminRoleAcces || currentUserId === mentorId) {
        allowedColumns = [STATUS_COLUMN.APPROVED, STATUS_COLUMN.NOT_APPROVED];
      }
      break;
    case STATUS_COLUMN.APPROVED:
      if (hasAdminRoleAcces || currentUserId === mentorId) {
        allowedColumns = [];
      }
      break;
    case STATUS_COLUMN.NOT_APPROVED:
      if (hasAdminRoleAcces || currentUserId === mentorId) {
        allowedColumns = [STATUS_COLUMN.APPROVED];
      }
      break;
    default:
      allowedColumns = [];
  }

  return allowedColumns;
};
