export const primary = {
  main: "#20AEE3",
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
};

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
  mode: "light",
  background: { default: "#FFFFFF", paper: "#FFFBFE" },
};
