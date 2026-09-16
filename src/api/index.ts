import { ApolloClient, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";

import { cache } from "cache";
import { FETCH_POLICY } from "shared/constants";

import { GRAPHQL_URI, OIDC_LOGIN_URI } from "../config";

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  fetch,
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.classification === "UNAUTHORIZED") {
        if (err.message === "Access Denied") {
          continue;
        }
        window.location.assign(OIDC_LOGIN_URI);
        return;
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  connectToDevTools: import.meta.env.MODE === "development",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    },
  },
});

export { client };
