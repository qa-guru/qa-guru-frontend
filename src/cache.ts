import { InMemoryCache, makeVar } from "@apollo/client";

export const userIdVar = makeVar("");

export const cache = new InMemoryCache();
