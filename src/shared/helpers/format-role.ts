import { Maybe, UserRole } from "api/graphql/generated/graphql";

export const formatRole = (roles: Maybe<Maybe<UserRole>[]> | undefined) => {
  return roles
    ?.map((role) =>
      role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : ""
    )
    .join(", ");
};
