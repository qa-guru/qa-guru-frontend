import { useRoleAccess } from "shared/hooks";

import { IPages } from "../types";

export const useRoleFilterPages = (configs: IPages[]): IPages[] =>
  configs.reduce<IPages[]>((filteredPages, pageConfig) => {
    const filteredMenuPages = pageConfig.menuPages?.filter((menuPage) =>
      useRoleAccess({ allowedRoles: menuPage.roles || [] })
    );

    const hasPageAccess = useRoleAccess({
      allowedRoles: pageConfig.roles || [],
    });

    if (hasPageAccess || filteredMenuPages?.length! > 0) {
      filteredPages.push({ ...pageConfig, menuPages: filteredMenuPages });
    }

    return filteredPages;
  }, []);
