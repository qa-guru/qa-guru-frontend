import { IconButton, Typography } from "@mui/material";
import {
  Maybe,
  UpdateRoleMutationFn,
  UserRole,
} from "api/graphql/generated/graphql";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputChip } from "shared/components/form";
import { formatRole } from "shared/helpers";
import { Edit, Check } from "@mui/icons-material";
import useResponsive from "shared/hooks/use-responsive";

import {
  StyledBox,
  StyledIconButton,
  StyledStack,
  StyledWrapper,
} from "./select-role.styled";

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
  const { isMobile } = useResponsive();
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
    <StyledWrapper>
      {edit ? (
        <>
          <StyledBox>
            <InputChip<ISelectRoleForm, UserRole>
              control={control}
              options={rolesOptions}
              name="roles"
              size="small"
              onChange={handleSelectRoleChange}
              onDelete={handleDeleteRole}
            />
          </StyledBox>
          <IconButton onClick={handleCloseEdit}>
            <Check fontSize="small" color="primary" />
          </IconButton>
        </>
      ) : (
        <StyledStack>
          <Typography variant="body2">{formatRole(roles)}</Typography>
          <StyledIconButton size="small" onClick={handleClickEdit}>
            <Edit fontSize="small" color="primary" />
          </StyledIconButton>
        </StyledStack>
      )}
    </StyledWrapper>
  );
};

export default SelectRole;
