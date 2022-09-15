import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { I18nProvider } from "./i18n/providers/I18nProvider";
import { ServerErrorInterceptor } from "./error/ServerErrorInterceptor";
import { AuthContext } from "./features/Authorization/context/AuthContext";
import { AuthStore } from "./features/Authorization/store/AuthStore";
import { client, serverErrorEmitter } from "./http";
import "./styles/index.scss";

const authStore = new AuthStore(client);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authStore}>
        <I18nProvider>
          <BrowserRouter>
            <ServerErrorInterceptor serverErrorEmitter={serverErrorEmitter}>
              <DevSupport
                ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
              >
                <App />
              </DevSupport>
            </ServerErrorInterceptor>
          </BrowserRouter>
        </I18nProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
