import { UserRole, useUserRolesQuery } from "api/graphql/generated/graphql";

interface UseRoleAccessProps {
  allowedRoles: UserRole[];
}

const useRoleAccess = ({ allowedRoles }: UseRoleAccessProps) => {
  const { data } = useUserRolesQuery();

  return data?.user?.roles?.some((role) => allowedRoles.includes(role!));
};

export default useRoleAccess;
