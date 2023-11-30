// eslint-disable-next-line import/named
import { Theme } from "@mui/material";

const components = (theme: Theme) => {
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
        "*::-webkit-scrollbar": {
          width: "4px",
          height: "4px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.grey[300],
        },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: "8px",
          backgroundColor: theme.palette.grey[500],
          "&:hover": {
            backgroundColor: theme.palette.grey[700],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          fontSize: "0.72rem",
          color: white.main,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: white.main,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: white.main,
          fontSize: "14px",
          backgroundColor: white.main,
          [theme.breakpoints.down("sm")]: {
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          backgroundColor: white.main,
          fontSize: "0.9rem",
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: white.main,
          "& .MuiInputLabel-root": {
            fontSize: "0.9rem",
          },
        },
      },
    },
  };
};

export default components;
