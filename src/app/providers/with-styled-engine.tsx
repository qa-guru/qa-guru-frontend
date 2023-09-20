import { StyledEngineProvider } from "@mui/material";
import React from "react";

export const withStyledEngine = (component: () => React.ReactNode) => () => (
  <StyledEngineProvider injectFirst>{component()}</StyledEngineProvider>
);
