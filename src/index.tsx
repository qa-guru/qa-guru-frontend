import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./http";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme/theme";
import { SnackbarProvider } from "notistack";
import "./i18n/config";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);
