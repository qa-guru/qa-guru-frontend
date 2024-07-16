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
import { enqueueSnackbar } from "notistack";

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

const isValidateSelectRole = (select: UserRole[]) => {
  const allowedCombinations = [
    [UserRole.Student],
    [UserRole.Student, UserRole.Lector],
    [UserRole.Student, UserRole.Mentor],
    [UserRole.Admin],
    [],
  ];

  const isValid = allowedCombinations.some(
    (combination) => JSON.stringify(combination) === JSON.stringify(select)
  );

  if (!isValid) {
    enqueueSnackbar("Нельзя назначить данную комбинацию ролей", {
      variant: "error",
    });
  }

  return isValid;
};

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
    const isValidCombination = isValidateSelectRole(select);

    if (isValidCombination) {
      updateRole({
        variables: {
          id: id!,
          roles: select,
        },
      });
    } else {
      setValue("roles", roles);
    }
  };

  const handleDeleteRole = (value: UserRole) => {
    const updatedRoles = roles?.filter((role) => role !== value) as UserRole[];
    const isValidCombination = isValidateSelectRole(updatedRoles);

    if (isValidCombination) {
      setValue("roles", updatedRoles);

      updateRole({
        variables: {
          id: id!,
          roles: updatedRoles,
        },
      });
    }
  };

  const handleClickEdit = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  const renderEditSelect = () => (
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
  );

  const renderEditIcon = () => (
    <StyledStack>
      <Typography variant="body2">{formatRole(roles)}</Typography>
      <StyledIconButton size="small" onClick={handleClickEdit}>
        <Edit fontSize="small" color="primary" />
      </StyledIconButton>
    </StyledStack>
  );

  return (
    <StyledWrapper>
      {edit ? renderEditSelect() : renderEditIcon()}
    </StyledWrapper>
  );
};

export default SelectRole;
