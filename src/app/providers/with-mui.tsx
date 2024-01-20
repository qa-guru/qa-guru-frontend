import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ReactNode } from "react";
import SettingsProvider from "shared/context/setting-context";

export const withMui = (component: () => ReactNode) => {
  return function WithMuiComponent() {
    return (
      <SettingsProvider>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          {component()}
        </StyledEngineProvider>
      </SettingsProvider>
    );
  };
};
