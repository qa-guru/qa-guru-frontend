import { Control } from "react-hook-form";

import { UsersQuery } from "api/graphql/generated/graphql";

export interface ISelectLectors {
  control: Control;
  data?: UsersQuery;
  onSearchChange: (searchValue: string) => void;
  loading: boolean;
  name: string;
}
