import { createContext, Dispatch, SetStateAction } from "react";
import { InputMaybe, UserSortField } from "api/graphql/generated/graphql";

export interface ITableAdminFilterContext {
  filter: InputMaybe<UserSortField>;
  setFilter: Dispatch<SetStateAction<InputMaybe<UserSortField>>>;
}

export const TableAdminFilterContext = createContext<ITableAdminFilterContext>({
  filter: null,
  setFilter: () => {},
});
