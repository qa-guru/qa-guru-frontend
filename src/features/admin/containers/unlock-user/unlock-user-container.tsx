import {
  Maybe,
  Order,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useUnlockUserMutation,
} from "api/graphql/generated/graphql";
import { FC, useContext } from "react";
import { TableAdminFilterContext } from "features/admin/context/admin-table-context";

import UnlockUser from "../../views/unlock-user";

interface IUnlockUserContainer {
  id?: Maybe<string>;
}

const UnlockUserContainer: FC<IUnlockUserContainer> = ({ id }) => {
  const { filter } = useContext(TableAdminFilterContext);

  const [unlockUser] = useUnlockUserMutation({
    update: (cache) => {
      const existingUsers: Maybe<UsersQuery> = cache.readQuery({
        query: UsersDocument,
        variables: {
          offset: 0,
          limit: 50,
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
          limit: 50,
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

  return <UnlockUser unlockUser={unlockUser} id={id} />;
};

export default UnlockUserContainer;
