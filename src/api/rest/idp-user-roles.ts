import { UserRole } from "api/graphql/generated/graphql";

import { IdpRole } from "./idp-roles";

export function userRolesFromIdp(role: IdpRole | null): UserRole[] {
  if (role === "staff") {
    return [UserRole.Admin];
  }

  if (role === "mentor") {
    return [UserRole.Mentor];
  }

  if (role === "student") {
    return [UserRole.Student];
  }

  return [];
}
