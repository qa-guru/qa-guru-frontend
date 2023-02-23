const primaryMain = "#2CCCA6";
export const primary = {
  main: primaryMain,
};

const secondaryMain = "#4a4458";
export const secondary = {
  main: secondaryMain,
};

export const grey = {
  main: "#CAC4D0",
};

export const white = {
  main: "#FFFFFF",
};

export const black = {
  main: "#212121",
};

const palette = {
  primary,
  secondary,
  white,
};

export const lightPalette = {
  ...palette,
  mode: "light",
  background: { default: "#FFFFFF", paper: "#FFFBFE" },
};
