import { createContext, Dispatch, SetStateAction } from "react";
import { InputMaybe, UsersFilter } from "api/graphql/generated/graphql";

export interface ITableAdminFilterContext {
  filter: InputMaybe<UsersFilter>;
  setFilter: Dispatch<SetStateAction<InputMaybe<UsersFilter>>>;
}

export const TableAdminFilterContext = createContext<ITableAdminFilterContext>({
  filter: null,
  setFilter: () => {},
});
