import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";
import AuthService from "api/rest/auth-service";

import { GRAPHQL_URI } from "../config";

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  fetch,
  credentials: "include",
});

const errorLink = onError(
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.message === "Acess is denied") {
          return new Observable((observer) => {
            AuthService.refreshToken()
              .then(() => {
                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch((error) => {
                AuthService.logout().then(() => {
                  window.location.href = "/authorization";
                });
                observer.error(error);
              });
          });
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.MODE === "development",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export { client };
