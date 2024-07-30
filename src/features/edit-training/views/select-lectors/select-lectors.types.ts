import { Control } from "react-hook-form";
import { DebouncedFunc } from "lodash";

import { UsersQuery } from "api/graphql/generated/graphql";

export interface ISelectLectors {
  control: Control;
  data?: UsersQuery;
  onSearchChange: DebouncedFunc<(searchValue: string) => void>;
  loading: boolean;
  name: string;
}
