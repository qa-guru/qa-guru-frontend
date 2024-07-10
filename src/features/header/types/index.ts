import { UserRole } from "api/graphql/generated/graphql";

export interface IKanbanPage {
  pageURL: string;
  title: string;
  roles: UserRole[];
}

export interface IPages {
  pageURL?: string;
  title: string;
  roles?: UserRole[];
  kanbanPages?: IKanbanPage[];
}
