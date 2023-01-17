import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./http";
import { SnackbarProvider } from "notistack";
import "./i18n/config";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
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
    </BrowserRouter>
  </ApolloProvider>
);
