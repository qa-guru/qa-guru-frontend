import { EventEmitter } from "@amplicode/react";
import {
  createHttpLink,
  ApolloLink,
  ApolloClient,
  from,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import axios from "axios";
import { REQUEST_SAME_ORIGIN, GRAPHQL_URI } from "../config";
import { ServerErrorEvents } from "../error/ServerErrorEvents";
import { i18nStore } from "../i18n/providers/I18nProvider";

const serverErrorEmitter = new EventEmitter<ServerErrorEvents>();

axios.interceptors.response.use((response) => {
  if (response.status === 401) {
    serverErrorEmitter.emit("unauthorized");
  }
  return response;
});

axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
  credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include",
});

const errorLink = onError((errorResponse) =>
  serverErrorEmitter.emit("graphQLError", errorResponse)
);

const localeLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "accept-language": i18nStore.currentLocale || null,
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  link: from([localeLink, errorLink, httpLink]),
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

export { client, serverErrorEmitter };
