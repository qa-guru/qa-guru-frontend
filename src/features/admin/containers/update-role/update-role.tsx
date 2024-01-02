import {
  Maybe,
  Order,
  UserRole,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useUpdateRoleMutation,
} from "api/graphql/generated/graphql";
import SelectRole from "features/admin/views/select-role";
import { FC } from "react";

interface IUpdateRoleContainer {
  id?: Maybe<string>;
  roles?: Maybe<Maybe<UserRole>[]>;
}

const UpdateRoleContainer: FC<IUpdateRoleContainer> = ({ id, roles }) => {
  const [updateRole] = useUpdateRoleMutation({
    update: (cache, { data }) => {
      const existingUsers: Maybe<UsersQuery> = cache.readQuery({
        query: UsersDocument,
        variables: {
          offset: 0,
          limit: 50,
          sort: { field: UserSortField.Email, order: Order.Desc },
        },
      });

      const updatedUser = existingUsers?.users?.items?.map((user) =>
        user?.id === id ? { ...user, roles: data?.updateRole?.roles } : user
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

  return <SelectRole updateRole={updateRole} id={id} roles={roles} />;
};

export default UpdateRoleContainer;
