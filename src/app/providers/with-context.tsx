import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";

import { useSettings } from "shared/hooks";
import { createCustomTheme } from "theme";

export const withContext = (component: () => ReactNode) => {
  return function WithContextComponent() {
    const { settings } = useSettings();

    const theme = createCustomTheme({
      theme: settings.theme,
      responsiveFontSizes: settings.responsiveFontSizes,
    });

    return <ThemeProvider theme={theme}>{component()}</ThemeProvider>;
  };
};
