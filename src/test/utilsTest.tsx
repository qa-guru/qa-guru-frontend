import { client } from "../http";
import { cleanup, render } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { SnackbarProvider } from "notistack";
import "../i18n/config";

afterEach(() => {
  cleanup();
});

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <ApolloProvider client={client}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          variant="error"
          autoHideDuration={1500}
          maxSnack={1}
        >
          {children}
        </SnackbarProvider>
      </ApolloProvider>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
