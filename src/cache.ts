import { InMemoryCache, makeVar } from "@apollo/client";
import { Maybe, UserRole } from "api/graphql/generated/graphql";

export const userIdVar = makeVar<Maybe<string>>(null);

export const userRolesVar = makeVar<Maybe<Maybe<UserRole>[]>>([]);

export const cache = new InMemoryCache();
