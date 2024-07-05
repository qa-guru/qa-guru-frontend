import { UserRole } from "api/graphql/generated/graphql";

import { useRoleBasedPages } from "./useRoleBasedPages";

export const usePages = () => {
  const configs = [
    {
      roles: [UserRole.Student, UserRole.Admin],
      page: { title: "Домой", pageURL: "/", id: 0 },
    },
    {
      roles: [
        UserRole.Student,
        UserRole.Mentor,
        UserRole.Lector,
        UserRole.Admin,
      ],
      page: { title: "Топ 50", pageURL: "/top-users", id: 3 },
    },
  ];

  return useRoleBasedPages(configs);
};
