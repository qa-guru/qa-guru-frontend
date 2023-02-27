import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import axios from "axios";
import fetch from "cross-fetch";
import { GRAPHQL_URI } from "../config";

axios.defaults.withCredentials = true;

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URI, fetch }),
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
