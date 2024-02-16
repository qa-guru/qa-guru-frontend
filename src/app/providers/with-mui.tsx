import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ReactNode } from "react";

export const withMui = (component: () => ReactNode) => {
  return function WithMuiComponent() {
    return (
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {component()}
      </StyledEngineProvider>
    );
  };
};
