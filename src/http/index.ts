import { ApolloClient, HttpLink } from "@apollo/client";
import axios from "axios";
import { GRAPHQL_URI } from "../config";
import fetch from "cross-fetch";
import { cache } from "../cache";

axios.defaults.withCredentials = true;

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URI, fetch }),
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
