import { InMemoryCache, makeVar } from "@apollo/client";

export const userIdVar = makeVar<string | null>(null);

export const cache = new InMemoryCache();
