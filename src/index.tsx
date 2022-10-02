import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./i18n/providers/I18nProvider";
import { client } from "./http";
import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
