import { UserRole } from "api/graphql/generated/graphql";

export interface ILayout {
  userRoles: Array<UserRole | null>;
}
