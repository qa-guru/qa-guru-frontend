import { UserRole } from "api/graphql/generated/graphql";

import { useRoleBasedPages } from "./useRoleBasedPages";

export const useKanbanPages = () => {
  const configs = [
    {
      roles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
      page: { title: "Доска заданий", pageURL: "/kanban", id: 1 },
    },
    {
      roles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
      page: { title: "Доска ментора", pageURL: "/kanban-mentor", id: 2 },
    },
    {
      roles: [UserRole.Student, UserRole.Admin],
      page: { title: "Доска студента", pageURL: "/kanban-student", id: 4 },
    },
  ];

  return useRoleBasedPages(configs);
};
