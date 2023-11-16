import { ComponentType } from "react";
import { UserDto, UserRole } from "api/graphql/generated/graphql";

export interface IUserRow {
  icon?: ComponentType;
  user?: UserDto | null;
  email?: string | null;
  date?: string;
  width?: string | number;
  height?: string | number;
  variant?: "body1" | "body2" | "subtitle1" | "subtitle2";
  roles?: Array<UserRole | null> | null;
  hideFullName?: boolean;
}
