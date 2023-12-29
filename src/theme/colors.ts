export const primary = {
  main: "#20AEE3",
};

export const secondary = {
  main: "#E0E0E0",
};

export const app = {
  primary: "#20AEE3",
  secondary: "#E0E0E0",
  white: "#FFFFFF",
  purple: "#4A4458",
  black: "#212121",
  grey: "#808080",
  lightGray: "#FAFAFA",
  whiteGrey: "#EEEEEE",
  indigo: "#303F9F",
  red: "#FF0000",
};

export const editor = {
  black: "#000000",
  white: "#ffffff",
  grey: "#888888",
  red: "#ff0000",
  orange: "#ff9900",
  yellow: "#ffff00",
  green: "#00d000",
  blue: "#0000ff",
};

export const highlight = {
  darkGrey: "#595959",
  lightGrey: "#dddddd",
  lightRed: "#ffa6a6",
  lightOrange: "#ffd699",
  yellow: "#ffff00",
  lightGreen: "#99cc99",
  lightBlue: "#90c6ff",
  lightPurple: "#8085e9",
};

const palette = {
  app,
  editor,
  highlight,
  primary,
  secondary,
};

export const lightPalette = {
  ...palette,
  mode: "light",
  background: { default: "#FFFFFF", paper: "#FFFBFE" },
};
