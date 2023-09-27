import React from "react";
import { UserDto } from "api/graphql/generated/graphql";

export interface IUserRow {
  icon?: React.ComponentType;
  user: UserDto;
  date?: string;
  width?: string | number;
  height?: string | number;
  variant?: "body2" | "subtitle1" | "subtitle2";
}
