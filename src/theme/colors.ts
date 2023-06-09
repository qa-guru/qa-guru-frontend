// eslint-disable-next-line import/named
import { PaletteMode, Color } from "@mui/material";

export const primary = {
  main: "#2CCCA6",
  secondary: "#E0F2F1",
};

export const secondary = {
  main: "#E0E0E0",
};

export const purple = {
  main: "#4A4458",
};

export const grey = {
  main: "#CAC4D0",
  secondary: "#EEEEEE",
  light: "#FAFAFA",
} as Partial<Color>;

export const white = {
  main: "#FFFFFF",
};

export const black = {
  main: "#212121",
};

export const red = {
  main: "red",
};

const palette = {
  primary,
  secondary,
  white,
  red,
  grey,
  black,
  purple,
};

export const lightPalette = {
  ...palette,
  mode: "light" as PaletteMode,
  background: { default: "#FFFFFF", paper: "#FFFBFE" },
};

