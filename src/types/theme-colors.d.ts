import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    app: {
      primary: string;
      secondary: string;
      white: string;
      purple: string;
      black: string;
      grey: string;
      lightGray: string;
      indigo: string;
      red: string;
      rating: {
        upTo50: string;
        upTo100: string;
        upTo200: string;
        upTo500: string;
        upTo1000: string;
        upTo2000: string;
      };
    };
    editor: {
      black: string;
      white: string;
      grey: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      darkGrey: string;
      lightRed: string;
      lightOrange: string;
      lightGreen: string;
      lightYellow: string;
      lightBlue: string;
    };
    highlight: {
      darkGrey: string;
      lightGrey: string;
      lightRed: string;
      lightOrange: string;
      yellow: string;
      lightGreen: string;
      lightBlue: string;
      lightPurple: string;
    };
  }
  interface PaletteOptions {
    app?: {
      primary?: string;
      secondary?: string;
      white?: string;
      purple?: string;
      black?: string;
      grey?: string;
      lightGray?: string;
      indigo?: string;
      red?: string;
    };
    editor?: {
      black?: string;
      white?: string;
      grey?: string;
      red?: string;
      orange?: string;
      yellow?: string;
      green?: string;
      blue?: string;
      darkGrey?: string;
      lightRed?: string;
      lightOrange?: string;
      lightGreen?: string;
      lightYellow?: string;
      lightBlue?: string;
    };
    highlight?: {
      darkGrey?: string;
      lightGrey?: string;
      lightRed?: string;
      lightOrange?: string;
      yellow?: string;
      lightGreen?: string;
      lightBlue?: string;
      lightPurple?: string;
    };
  }
}
