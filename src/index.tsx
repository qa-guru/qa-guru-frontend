import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { SnackbarProvider } from "notistack";
import { client } from "./http";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
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
