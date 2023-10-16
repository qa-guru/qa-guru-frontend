import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { createCustomTheme } from "theme";
import useSettings from "shared/hooks/use-settings";

export const withMui = (component: () => ReactNode) => {
  return function WithMuiComponent() {
    const { settings } = useSettings();

    const theme = createCustomTheme({
      theme: settings.theme,
      responsiveFontSizes: settings.responsiveFontSizes,
    });

    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>{component()}</ThemeProvider>
      </>
    );
  };
};
