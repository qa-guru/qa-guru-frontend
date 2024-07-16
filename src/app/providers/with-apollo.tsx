import { ComponentType } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "api";

export const withApollo = (Component: ComponentType) => () =>
  (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
