import {
  createHttpLink,
  ApolloLink,
  ApolloClient,
  from,
  InMemoryCache,
} from "@apollo/client";
import axios from "axios";
import { REQUEST_SAME_ORIGIN, GRAPHQL_URI } from "../config";
import { i18nStore } from "../i18n/providers/I18nProvider";

axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
  credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include",
});

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
  link: from([localeLink, httpLink]),
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

export { client };
