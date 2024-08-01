import { FC, useCallback, useEffect, useState } from "react";
import { Control } from "react-hook-form";
import debounce from "lodash/debounce";

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

  const { data, loading, refetch } = useUsersQuery({
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

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setFilterName(searchValue);
    }, 200),
    []
  );

  useEffect(() => {
    refetch();
  }, [filterName, refetch]);

  return (
    <SelectLectors
      data={data}
      control={control}
      onSearchChange={debouncedSearch}
      loading={loading}
      name={name}
    />
  );
};

export default UsersContainer;
