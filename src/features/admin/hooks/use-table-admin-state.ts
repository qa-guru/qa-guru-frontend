import { useState } from "react";
import { InputMaybe, UserSortField } from "api/graphql/generated/graphql";

const useTableAdminState = () => {
  const [filter, setFilter] = useState<InputMaybe<UserSortField>>(null);

  return {
    filter,
    setFilter,
  };
};

export default useTableAdminState;
