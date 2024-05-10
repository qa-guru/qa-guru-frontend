export const primary = {
  main: "#20AEE3",
};

export const secondary = {
  main: "#E0E0E0",
};

export const app = {
  primary: "#20AEE3",
  secondary: "#E0E0E0",
  pinkMain: "#c93ae0",
  white: "#FFFFFF",
  purple: "#3A3448",
  purplePaper: "#4A4458",
  black: "#212121",
  grey: "#808080",
  lightGray: "#FAFAFA",
  whiteGrey: "#EEEEEE",
  red: "#FF0000",
  hoverBlue: "#20aee3",
  textPrimary: "#000000DE",
  textSecondary: "#00000099",
  deepPurple: "#512DA8",
  pink: "#C2185B",
  deepOrange: "#E64A19",
  amber: "#FFA000",
  indigo: "#303F9F",
  lightBlue: "#0288D1",
  green: "#388E3C",
  cyan: "#0097A7",
  teal: "#00796B",
  blueGrey: "#455A64",
  menu: "#FFFFFF",
  rating: {
    upTo50: "#20AEE3",
    upTo100: "#0097A7",
    upTo200: "#303F9F",
    upTo500: "#FFA000",
    upTo1000: "#C2185B",
    upTo2000: "#E64A19",
  },
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
  darkGrey: "#616161",
  lightRed: "#f98181",
  lightOrange: "#fbbc88",
  lightGreen: "#b9f18d",
  lightYellow: "#faf594",
  lightBlue: "#70cff8",
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

export const dark = {
  ...app,
  secondary: "#4A4458",
  textPrimary: "#FFFFFF",
  textSecondary: "#D9D9D9",
  deepPurple: "#B39DDB",
  pink: "#F06292",
  deepOrange: "#FF7043",
  indigo: "#C5CAE9",
  lightBlue: "#29B6F6",
  green: "#81C784",
  cyan: "#26C6DA",
  teal: "#80CBC4",
  blueGrey: "#B0BEC5",
  menu: "#676273",
  rating: {
    upTo50: "#20AEE3",
    upTo100: "#26C6DA",
    upTo200: "#C5CAE9",
    upTo500: "#FFA000",
    upTo1000: "#F06292",
    upTo2000: "#FF7043",
  },
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
  background: { default: "#FFFFFF", paper: "#FFF" },
};

export const darkPalette = {
  ...palette,
  app: dark,
  mode: "dark",
  background: { default: "#3A3448", paper: "#4A4458" },
};
