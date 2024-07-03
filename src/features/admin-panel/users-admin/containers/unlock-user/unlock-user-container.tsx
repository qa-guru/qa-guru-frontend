import {
  Maybe,
  Order,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useUnlockUserMutation,
  UserDto,
} from "api/graphql/generated/graphql";
import { FC } from "react";

import { useTableAdminFilter } from "../../context/admin-table-context";
import UnlockUser from "../../views/unlock-user";

interface IUnlockUserContainer {
  id?: Maybe<string>;
  user: Maybe<UserDto>;
}

const UnlockUserContainer: FC<IUnlockUserContainer> = ({ id, user }) => {
  const { filter } = useTableAdminFilter();

  const [unlockUser] = useUnlockUserMutation({
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
        user?.id === id ? { ...user, locked: false } : user
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

  return <UnlockUser unlockUser={unlockUser} id={id} user={user} />;
};

export default UnlockUserContainer;
