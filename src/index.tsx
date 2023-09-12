import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { client } from "./api";
import "./i18n/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
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
        <App />
      </SnackbarProvider>
    </ApolloProvider>
  </BrowserRouter>
);
