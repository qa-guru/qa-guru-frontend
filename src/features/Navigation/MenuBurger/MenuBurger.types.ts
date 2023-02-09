import React from "react";

export interface IMenuBurger {
  setAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleClickNavMenu: (pageURL: string) => void;
  anchorElNav: HTMLElement | null;
  pages: { pageURL: string; title: JSX.Element }[];
}
