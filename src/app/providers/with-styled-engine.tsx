import { StyledEngineProvider } from "@mui/material";
import { ReactNode } from "react";

export const withStyledEngine = (component: () => ReactNode) => () =>
  <StyledEngineProvider injectFirst>{component()}</StyledEngineProvider>;
