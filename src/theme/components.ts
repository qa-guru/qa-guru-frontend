import { type Theme } from "@mui/material";

const components = (theme: Theme) => {
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
          overscrollBehavior: "none",
        },
        body: { width: "100%", height: "100%", overscrollBehavior: "none" },
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
          fontSize: "0.7rem",
          width: "fit-content",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [theme.breakpoints.only("sm")]: {
            paddingRight: "10px",
            paddingLeft: "10px",
          },
          [theme.breakpoints.only("xs")]: {
            paddingRight: "5px",
            paddingLeft: "5px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow:
            "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
      MuiDatePicker: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: "6px",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontSize: "14px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "14px",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            zIndex: 3000,
          },
        },
      },
    },
  };
};

export default components;
