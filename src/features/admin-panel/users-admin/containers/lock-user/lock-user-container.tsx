import { FC } from "react";

import {
  Maybe,
  Order,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useLockUserMutation,
} from "api/graphql/generated/graphql";

import { useTableAdminFilter } from "../../context/admin-table-context";
import LockUser from "../../views/lock-user";

interface ILockUserContainer {
  id: Maybe<string> | undefined;
}

const LockUserContainer: FC<ILockUserContainer> = ({ id }) => {
  const { filter } = useTableAdminFilter();

  const [lockUser, { loading }] = useLockUserMutation({
    update: (cache) => {
      const existingUsers: Maybe<UsersQuery> = cache.readQuery({
        query: UsersDocument,
        variables: {
          offset: 0,
          limit: 10,
          sort: { field: UserSortField.Email, order: Order.Desc },
          filter: filter || {},
        },
      });

      const updatedUser = existingUsers?.users?.items?.map((user) =>
        user?.id === id ? { ...user, locked: true } : user
      );

      cache.writeQuery({
        query: UsersDocument,
        variables: {
          offset: 0,
          limit: 10,
          sort: { field: UserSortField.Email, order: Order.Desc },
          filter: filter || {},
        },
        data: {
          users: {
            ...existingUsers?.users,
            items: updatedUser,
          },
        },
      });
    },
  });

  return <LockUser lockUser={lockUser} id={id} loading={loading} />;
};

export default LockUserContainer;
