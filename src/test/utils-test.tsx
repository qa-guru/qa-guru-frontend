import { render } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { SnackbarProvider } from "notistack";
import "../i18n/config";
import { TransitionGroup } from "react-transition-group";
import { ModalProvider } from "react-modal-hook";
import { client } from "../api";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
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
          <ModalProvider rootComponent={TransitionGroup}>
            {children}
          </ModalProvider>
        </SnackbarProvider>
      </ApolloProvider>
    ),
    ...options,
  });

export { customRender as render };
