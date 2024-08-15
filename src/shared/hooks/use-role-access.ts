import { useReactiveVar } from "@apollo/client";
import { useMemo } from "react";

import { userRolesVar } from "cache";
import { Maybe, UserRole } from "api/graphql/generated/graphql";

interface UseRoleAccessProps {
  allowedRoles: UserRole[];
  roles?: Maybe<Maybe<UserRole>[]>;
}

export const useRoleAccess = ({ allowedRoles, roles }: UseRoleAccessProps) => {
  const currentRoles = useReactiveVar(userRolesVar);

  const userRoles = roles || currentRoles || [];

  return useMemo(
    () => allowedRoles.some((role) => userRoles.includes(role!)),
    [userRoles, allowedRoles]
  );
};
