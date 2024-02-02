import { useState } from "react";
import { InputMaybe, UsersFilter } from "api/graphql/generated/graphql";

const useTableAdminState = () => {
  const [filter, setFilter] = useState<InputMaybe<UsersFilter>>(null);

  return {
    filter,
    setFilter,
  };
};

export default useTableAdminState;
