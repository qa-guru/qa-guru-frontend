import {
  Order,
  UserRole,
  UserSortField,
  useUsersQuery,
} from "api/graphql/generated/graphql";
import { FC, useCallback, useState } from "react";
import { debounce } from "lodash";
import { Control } from "react-hook-form";

import SelectMainMentors from "../../views/select-mentors";

interface IMentorsContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  role: UserRole;
}

const UsersContainer: FC<IMentorsContainer> = ({ control, name, role }) => {
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
  });

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setFilterName(searchValue);
      refetch();
    }, 300),
    []
  );

  return (
    <SelectMainMentors
      data={data}
      control={control}
      onSearchChange={debouncedSearch}
      loading={loading}
      name={name}
    />
  );
};

export default UsersContainer;
