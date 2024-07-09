import { UserRole } from "api/graphql/generated/graphql";

interface IPages {
  pageURL: string;
  title: string;
  roles: UserRole[];
}

export interface IAppMenu {
  pages: IPages[];
  handleClickNavMenu: (pageURL: string) => void;
}
