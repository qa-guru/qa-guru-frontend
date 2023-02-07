const primaryMain = "#6750A4";
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
