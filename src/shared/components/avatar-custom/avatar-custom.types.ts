import { Maybe } from "api/graphql/generated/graphql";

export interface IAvatarCustom {
  fullName: string;
  width?: Object;
  height?: Object;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2";
  userId?: Maybe<string>;
  hasLink?: boolean;
  img?: Maybe<string>;
}
