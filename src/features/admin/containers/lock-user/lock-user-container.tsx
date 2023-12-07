import {
  Maybe,
  Order,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useLockUserMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";

import LockUser from "../../views/lock-user";

interface ILockUserContainer {
  id: Maybe<string> | undefined;
}

const LockUserContainer: FC<ILockUserContainer> = ({ id }) => {
  const [lockUser] = useLockUserMutation({
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
        user?.id === id ? { ...user, locked: true } : user
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

  return <LockUser lockUser={lockUser} id={id} />;
};

export default LockUserContainer;
