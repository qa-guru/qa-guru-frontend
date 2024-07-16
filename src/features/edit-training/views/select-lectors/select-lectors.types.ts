import { Control } from "react-hook-form";
import { UsersQuery } from "api/graphql/generated/graphql";
import { DebouncedFunc } from "lodash";

export interface ISelectLectors {
  control: Control;
  data?: UsersQuery;
  onSearchChange: DebouncedFunc<(searchValue: string) => void>;
  loading: boolean;
  name: string;
}
