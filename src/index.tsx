import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./i18n/providers/I18nProvider";
import { ServerErrorInterceptor } from "./error/ServerErrorInterceptor";
import { client, serverErrorEmitter } from "./http";
import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <I18nProvider>
        <BrowserRouter>
          <ServerErrorInterceptor serverErrorEmitter={serverErrorEmitter}>
            <App />
          </ServerErrorInterceptor>
        </BrowserRouter>
      </I18nProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
