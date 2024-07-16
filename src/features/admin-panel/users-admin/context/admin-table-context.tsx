import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { InputMaybe, UsersFilter } from "api/graphql/generated/graphql";

interface ITableAdminFilterProvider {
  children: ReactNode;
}

interface ITableAdminFilterContext {
  filter: InputMaybe<UsersFilter>;
  setFilter: Dispatch<SetStateAction<InputMaybe<UsersFilter>>>;
}

export const TableAdminFilterContext = createContext<ITableAdminFilterContext>({
  filter: null,
  setFilter: () => {},
});

export const useTableAdminFilter = () => {
  const context = useContext(TableAdminFilterContext);
  if (!context) {
    throw new Error(
      "useTableAdminFilter must be used within a TableAdminFilterProvider"
    );
  }
  return context;
};

export const TableAdminFilterProvider: FC<ITableAdminFilterProvider> = ({
  children,
}) => {
  const [filter, setFilter] = useState<InputMaybe<UsersFilter>>(null);

  return (
    <TableAdminFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </TableAdminFilterContext.Provider>
  );
};
