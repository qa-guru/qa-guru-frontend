import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6750A4",
    },
    secondary: {
      main: "#D0BCFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
        },
      },
    },
  },
});

export default theme;
