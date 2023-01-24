import { createHttpLink, ApolloClient, from } from "@apollo/client";
import axios from "axios";
import { REQUEST_SAME_ORIGIN, GRAPHQL_URI, APP_ENDPOINT } from "../config";
import { cache } from "../cache";

axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

const httpLink = createHttpLink({
  uri: import.meta.env.DEV ? GRAPHQL_URI : APP_ENDPOINT,
  credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include",
});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: cache,
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
