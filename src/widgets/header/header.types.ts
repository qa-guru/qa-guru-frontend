import { UserRole } from "api/graphql/generated/graphql";

export interface IHeader {
  userRoles: Array<UserRole | null>;
}
