import { type Theme } from "@mui/material";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const lightTheme = (theme: Theme) => theme.palette.mode === "light";
