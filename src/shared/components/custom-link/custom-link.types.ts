import { ReactNode } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export interface ICustomLink {
  path: string;
  children?: ReactNode;
  isAvatar?: boolean;
  isUserRow?: boolean;
  isButton?: boolean;
}
