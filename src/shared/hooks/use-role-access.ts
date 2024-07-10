import {
  Maybe,
  UserRole,
  useUserRolesQuery,
} from "api/graphql/generated/graphql";
import { useMemo } from "react";

interface UseRoleAccessProps {
  allowedRoles: UserRole[];
  roles?: Maybe<Maybe<UserRole>[]>;
}

export const useRoleAccess = ({ allowedRoles, roles }: UseRoleAccessProps) => {
  const { data } = useUserRolesQuery({
    fetchPolicy: "cache-first",
    skip: !!roles,
  });

  const userRoles = roles || data?.user?.roles || [];

  return useMemo(
    () => allowedRoles.some((role) => userRoles.includes(role!)),
    [userRoles, allowedRoles]
  );
};
