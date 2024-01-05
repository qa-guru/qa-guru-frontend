import { Dispatch, SetStateAction } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export interface IMenuBurger {
  setAnchorElNav: Dispatch<SetStateAction<Maybe<HTMLElement>>>;
  handleClickNavMenu: (pageURL: string) => void;
  anchorElNav: Maybe<HTMLElement>;
  pages: { pageURL: string; title: JSX.Element; id: number }[];
}
