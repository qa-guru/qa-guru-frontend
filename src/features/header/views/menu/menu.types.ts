import { UserRole } from "api/graphql/generated/graphql";

import { IKanbanPage } from "../../types";

export interface IPages {
  pageURL?: string;
  title: string;
  roles?: UserRole[];
  kanbanPages?: IKanbanPage[];
}

export interface IAppMenu {
  pages: IPages[];
  handleClickNavMenu: (pageURL?: string) => void;
}
