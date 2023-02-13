import { Theme } from "@mui/material";

const components = (theme: Theme): any => {
  // @ts-ignore
  const { white } = theme.palette;
  return {
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
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: white.main,
          fontSize: "16px",
          backgroundColor: white.main,
          [theme.breakpoints.down("md")]: {
            "& .MuiInputBase-input": {
              padding: "12.5px 14px",
            },
            "& .MuiFormLabel-root": {
              fontSize: "0.9rem",
            },
          },
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
  };
};

export default components;
