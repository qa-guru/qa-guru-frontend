import { makeVar, InMemoryCache } from "@apollo/client";

export const trainingIdVar = makeVar("");
export const cache = new InMemoryCache();
