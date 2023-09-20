import React from "react";
import { SnackbarProvider } from "notistack";

export const withSnackBar = (component: () => React.ReactNode) => () => (
  <SnackbarProvider
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    variant="error"
    autoHideDuration={1500}
    maxSnack={1}
  >
    {component()}
  </SnackbarProvider>
);
