import { useRoleAccess } from "shared/hooks";

import { IPages } from "../types";

export const useRoleFilterPages = (configs: IPages[]): IPages[] => {
  return configs.filter((config) =>
    useRoleAccess({ allowedRoles: config.roles })
  );
};
