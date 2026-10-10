import { ApolloClient, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import fetch from "cross-fetch";

import { cache, sessionRecoveryVar } from "cache";
import { FETCH_POLICY } from "shared/constants";

import { AUTH_SESSION_URI, GRAPHQL_URI, OIDC_LOGIN_URI } from "../config";

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  fetch,
  credentials: "include",
});

const PRIVATE_ADVISORY_OPERATIONS = [
  "homeWorkAdvisoryDraft",
  "saveHomeWorkAdvisoryDraft",
  "homeWorkAdvisoryDraftAudit",
];

let sessionCheck: Promise<boolean> | null = null;

function sessionIsDead(): Promise<boolean> {
  sessionCheck ??= fetch(AUTH_SESSION_URI, { credentials: "include" })
    .then((response) => response.status === 401)
    .catch(() => false)
    .finally(() => {
      sessionCheck = null;
    });
  return sessionCheck;
}

function redirectToIdpOnDeadSession() {
  sessionRecoveryVar(true);
  setTimeout(() => sessionRecoveryVar(false), 10000);
  sessionIsDead().then((dead) => {
    if (dead) {
      window.location.assign(OIDC_LOGIN_URI);
    } else {
      sessionRecoveryVar(false);
    }
  });
}

function handleUnauthorized(message?: string) {
  if (message === "Access Denied") {
    redirectToIdpOnDeadSession();
    return;
  }
  window.location.assign(OIDC_LOGIN_URI);
}

export const errorLink = onError(
  ({ operation, graphQLErrors, networkError }) => {
    if (PRIVATE_ADVISORY_OPERATIONS.includes(operation.operationName)) return;

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.classification === "UNAUTHORIZED") {
          handleUnauthorized(err.message);
          return;
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const retryLink = new RetryLink({
  attempts: { max: 3 },
  delay: { initial: 300, max: 2000, jitter: true },
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, retryLink, httpLink]),
  cache,
  devtools: { enabled: import.meta.env?.MODE === "development" },
  defaultOptions: {
    watchQuery: {
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    },
  },
});

export { client };
