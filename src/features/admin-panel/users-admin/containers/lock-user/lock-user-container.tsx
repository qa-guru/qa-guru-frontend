import {
  Maybe,
  Order,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useLockUserMutation,
  UserDto,
} from "api/graphql/generated/graphql";
import { FC } from "react";

import { useTableAdminFilter } from "../../context/admin-table-context";
import LockUser from "../../views/lock-user";

interface ILockUserContainer {
  id: Maybe<string> | undefined;
  user: Maybe<UserDto>;
}

const LockUserContainer: FC<ILockUserContainer> = ({ id, user }) => {
  const { filter } = useTableAdminFilter();

  const [lockUser] = useLockUserMutation({
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

  return <LockUser lockUser={lockUser} id={id} user={user} />;
};

export default LockUserContainer;
