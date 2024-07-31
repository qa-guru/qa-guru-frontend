import { FC, useCallback, useState } from "react";
import { Control } from "react-hook-form";

import {
  Order,
  UserRole,
  UserSortField,
  useUsersQuery,
} from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";

import SelectLectors from "../../views/select-lectors";

interface ILectorsContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  role: UserRole;
}

const UsersContainer: FC<ILectorsContainer> = ({ control, name, role }) => {
  const [filterName, setFilterName] = useState("");

  const { data, loading } = useUsersQuery({
    variables: {
      offset: 0,
      limit: 150,
      sort: { field: UserSortField.Email, order: Order.Desc },
      filter: {
        role,
        firstName: filterName,
      },
    },
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  const handleSearch = useCallback((searchValue: string) => {
    setFilterName(searchValue);
  }, []);

  return (
    <SelectLectors
      data={data}
      control={control}
      onSearchChange={handleSearch}
      loading={loading}
      name={name}
    />
  );
};

export default UsersContainer;
