import { Maybe } from "api/graphql/generated/graphql";

export interface IUserName {
  fullName: string;
  userId?: Maybe<string>;
  hasLink?: boolean;
  variant?: "body1" | "body2" | "subtitle1" | "subtitle2";
}
