import {
  Maybe,
  Order,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useUnlockUserMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import useResponsive from "shared/hooks/use-responsive";

import { useTableAdminFilter } from "../../context/admin-table-context";
import UnlockUser from "../../views/unlock-user";

interface IUnlockUserContainer {
  id?: Maybe<string>;
}

const UnlockUserContainer: FC<IUnlockUserContainer> = ({ id }) => {
  const { filter } = useTableAdminFilter();
  const { isMobile } = useResponsive();

  const [unlockUser] = useUnlockUserMutation({
    update: (cache) => {
      const existingUsers: Maybe<UsersQuery> = cache.readQuery({
        query: UsersDocument,
        variables: {
          offset: 0,
          limit: isMobile ? 2 : 20,
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
          limit: 20,
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

  return <UnlockUser {...{ unlockUser, id }} />;
};

export default UnlockUserContainer;
