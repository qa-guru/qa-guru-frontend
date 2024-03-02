import {
  Maybe,
  Order,
  UserRole,
  UserSortField,
  UsersDocument,
  UsersQuery,
  useUpdateRoleMutation,
} from "api/graphql/generated/graphql";
import SelectRole from "features/admin-panel/users-admin/views/select-role";
import { FC } from "react";

import { useTableAdminFilter } from "../../context/admin-table-context";

interface IUpdateRoleContainer {
  id?: Maybe<string>;
  roles?: Maybe<Maybe<UserRole>[]>;
}

const UpdateRoleContainer: FC<IUpdateRoleContainer> = ({ id, roles }) => {
  const { filter } = useTableAdminFilter();

  const [updateRole] = useUpdateRoleMutation({
    update: (cache, { data }) => {
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
        user?.id === id ? { ...user, roles: data?.updateRole?.roles } : user
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

  return <SelectRole updateRole={updateRole} id={id} roles={roles} />;
};

export default UpdateRoleContainer;
