import {
  Maybe,
  Order,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useUnlockUserMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";

import UnlockUser from "../../views/unlock-user";

interface IUnlockUserContainer {
  id: Maybe<string> | undefined;
}

const UnlockUserContainer: FC<IUnlockUserContainer> = ({ id }) => {
  const [unlockUser] = useUnlockUserMutation({
    update: (cache) => {
      const existingUsers: UsersQuery | null = cache.readQuery({
        query: UsersDocument,
        variables: {
          offset: 0,
          limit: 50,
          sort: { field: UserSortField.Email, order: Order.Desc },
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
