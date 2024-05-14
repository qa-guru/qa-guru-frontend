import { ComponentType } from "react";
import {
  Maybe,
  RatingUserDto,
  UserDto,
  UserRole,
} from "api/graphql/generated/graphql";
import { SxProps } from "@mui/material/styles";

export interface IUserRow {
  icon?: ComponentType;
  user?: Maybe<UserDto>;
  email?: Maybe<string>;
  date?: string;
  width?: string | number;
  height?: string | number;
  variant?: "body1" | "body2" | "subtitle1" | "subtitle2";
  roles?: Maybe<Array<Maybe<UserRole>>>;
  hideFullName?: boolean;
  hideAvatar?: boolean;
  hideRoles?: boolean;
  hideRating?: boolean;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  rating?: Maybe<RatingUserDto>;
  userId?: Maybe<string>;
  hasLink?: boolean;
}
