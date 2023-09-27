import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "api";

export const withApollo = (Component: React.ComponentType) => () =>
  (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
