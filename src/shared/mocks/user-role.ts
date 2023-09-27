import { UserRole } from "api/graphql/generated/graphql";

export const mockUserRole: UserRole[] = [
  UserRole.Admin,
  UserRole.Lector,
  UserRole.Manager,
  UserRole.Master,
  UserRole.Mentor,
  UserRole.Student,
];
