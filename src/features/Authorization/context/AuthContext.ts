import { createContext, useContext } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { AuthStore } from "../store/AuthStore";

const client = new ApolloClient({ cache: new InMemoryCache() });

export const AuthContext = createContext(new AuthStore(client));

export function useAuthStore(): AuthStore {
  return useContext(AuthContext);
}
