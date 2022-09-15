import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import en from "../i18n/messages/en.json";
import { GRAPHQL_URI, REQUEST_SAME_ORIGIN } from "../config";
import { onError } from "@apollo/client/link/error";
import { act } from "react-dom/test-utils";
import { AuthContext } from "../features/Authorization/context/AuthContext";
import { AuthStore } from "../features/Authorization/store/AuthStore";

it("renders without crashing", () => {
  axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

  const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
    credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include",
  });

  const logoutLink = onError(({ networkError }) => {
    if (networkError == null || !("statusCode" in networkError)) {
      return;
    }
    if (networkError.statusCode === 401) {
      authStore.logout();
    }
  });

  const client = new ApolloClient({
    link: logoutLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
  });

  const authStore = new AuthStore(client);

  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <AuthContext.Provider value={authStore}>
            <IntlProvider locale="en" messages={en}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </IntlProvider>
          </AuthContext.Provider>
        </ApolloProvider>
      </React.StrictMode>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
