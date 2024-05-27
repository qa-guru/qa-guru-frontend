import { ReactNode } from "react";

export interface ICustomLink {
  path: string;
  children?: ReactNode;
  opacity?: string;
  textDecorationHover?: string;
  color?: string;
}
