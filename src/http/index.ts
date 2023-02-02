import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import axios from "axios";
import { GRAPHQL_URI } from "../config";
import fetch from "cross-fetch";

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
