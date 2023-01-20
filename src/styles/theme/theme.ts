import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6750A4",
    },
    secondary: {
      main: "#fffbfe",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h2: {
      fontSize: "32px",
      fontWeight: "400",
      lineHeight: "40px",
    },
    h3: {
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "32px",
    },
    h4: {
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
    },
    h5: {
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
        },
        body: { width: "100%", height: "100%" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          fontSize: "14px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: "#fffbfe",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          borderColor: "white",
          fontSize: "16px",
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});

export default theme;
