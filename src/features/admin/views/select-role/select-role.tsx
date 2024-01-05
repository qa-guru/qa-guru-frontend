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
import CloseIcon from "@mui/icons-material/Close";

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
            />
          </Box>
          <IconButton onClick={() => setEdit(false)}>
            <CloseIcon fontSize="small" color="primary" />
          </IconButton>
        </>
      ) : (
        <StyledStack>
          <Typography variant="body2">{formatRole(roles)}</Typography>
          <IconButton onClick={() => setEdit(true)}>
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        </StyledStack>
      )}
    </Stack>
  );
};

export default SelectRole;
