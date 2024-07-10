import { useRoleAccess } from "shared/hooks";

import { IPages } from "../types";

export const useRoleFilterPages = (configs: IPages[]): IPages[] =>
  configs.reduce<IPages[]>((filteredConfigs, config) => {
    const kanbanPages = config.kanbanPages?.filter((kanbanPage) =>
      useRoleAccess({ allowedRoles: kanbanPage.roles })
    );

    const hasRoleAccess =
      config.roles && useRoleAccess({ allowedRoles: config.roles });

    if (hasRoleAccess || kanbanPages) {
      filteredConfigs.push({ ...config, kanbanPages });
    }

    return filteredConfigs;
  }, []);
