import { UserRole } from "api/graphql/generated/graphql";

import { IMenuPage } from "../../types";

export interface IPages {
  pageURL?: string;
  title: string;
  roles?: UserRole[];
  menuPages?: IMenuPage[];
}

export interface IAppMenu {
  pages: IPages[];
  handleClickNavMenu: (pageURL?: string) => void;
}
