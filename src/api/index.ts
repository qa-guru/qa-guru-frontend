import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import axios from "axios";
import fetch from "cross-fetch";
import { GRAPHQL_URI } from "../config";
import { offsetLimitPagination } from "@apollo/client/utilities";

axios.defaults.withCredentials = true;

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URI, fetch }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

export { client };
