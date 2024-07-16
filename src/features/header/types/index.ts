import { UserRole } from "api/graphql/generated/graphql";

export interface IMenuPage {
  pageURL: string;
  title: string;
  roles: UserRole[];
}

export interface IPages {
  pageURL?: string;
  title: string;
  roles?: UserRole[];
  menuPages?: IMenuPage[];
}
