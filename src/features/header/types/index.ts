import { UserRole } from "api/graphql/generated/graphql";

export interface IPages {
  pageURL: string;
  title: string;
  roles: UserRole[];
}
