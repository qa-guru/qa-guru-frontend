import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  Maybe,
  UpdateRoleMutationFn,
  UserRole,
} from "api/graphql/generated/graphql";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputChip } from "shared/components/form";
import { formatRole } from "shared/helpers";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import { StyledStack } from "./select-role.styled";

interface ISelectRole {
  roles?: Maybe<Maybe<UserRole>[]>;
  updateRole: UpdateRoleMutationFn;
  id?: Maybe<string>;
}

interface ISelectRoleForm {
  roles?: Maybe<Maybe<UserRole>[]>;
}

const SelectRole: FC<ISelectRole> = ({ roles, updateRole, id }) => {
  const [edit, setEdit] = useState(false);
  const { control, setValue } = useForm<ISelectRoleForm>({
    defaultValues: {
      roles: [],
    },
  });
  const rolesOptions = Object.values(UserRole);

  useEffect(() => {
    setValue("roles", roles);
  }, [roles, setValue]);

  const handleSelectRoleChange = (select: UserRole[]) => {
    updateRole({
      variables: {
        id: id!,
        roles: select,
      },
    });
  };

  console.log(rolesOptions);

  const handleDeleteRole = (value: UserRole) => {
    const updatedRoles = roles?.filter((role) => role !== value);
    setValue("roles", updatedRoles);

    updateRole({
      variables: {
        id: id!,
        roles: updatedRoles,
      },
    });
  };

  const handleClickEdit = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  return (
    <Stack direction="row" alignItems="center">
      {edit ? (
        <>
          <Box maxWidth="220px">
            <InputChip<ISelectRoleForm, UserRole>
              control={control}
              options={rolesOptions}
              name="roles"
              onChange={handleSelectRoleChange}
              onDelete={handleDeleteRole}
            />
          </Box>
          <IconButton onClick={handleCloseEdit}>
            <CheckIcon fontSize="small" color="primary" />
          </IconButton>
        </>
      ) : (
        <StyledStack>
          <Typography variant="body2">{formatRole(roles)}</Typography>
          <IconButton onClick={handleClickEdit}>
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        </StyledStack>
      )}
    </Stack>
  );
};

export default SelectRole;
