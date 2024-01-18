import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useContext } from "react";
import { createCustomTheme } from "theme";
import SettingsProvider, {
  SettingsContext,
} from "shared/context/setting-context";

export const withMui = (component: () => ReactNode) => {
  return function WithMuiComponent() {
    const { settings } = useContext(SettingsContext);

    const theme = createCustomTheme({
      theme: settings.theme,
      responsiveFontSizes: settings.responsiveFontSizes,
    });

    console.log(settings.theme);

    return (
      <SettingsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {component()}
        </ThemeProvider>
      </SettingsProvider>
    );
  };
};
