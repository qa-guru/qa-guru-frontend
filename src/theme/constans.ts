import { Theme } from "@mui/material";

export const THEMES = {
  LIGHT: "light",
};

export const lightTheme = (theme: Theme) => theme.palette.mode === "light";
