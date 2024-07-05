import { useMemo } from "react";
import { UserRole } from "api/graphql/generated/graphql";
import { useRoleAccess } from "shared/hooks";

interface IPages {
  pageURL: string;
  title: string;
  id: number;
}

interface RoleBasedPageConfig {
  roles: UserRole[];
  page: IPages;
}

export const useRoleBasedPages = (configs: RoleBasedPageConfig[]) => {
  const accessCheckedConfigs = configs.map((config) => {
    const hasAccess = useRoleAccess({ allowedRoles: config.roles });
    return { ...config, hasAccess };
  });

  return useMemo(() => {
    return accessCheckedConfigs
      .filter((config) => config.hasAccess)
      .map((config) => config.page);
  }, [accessCheckedConfigs]);
};
