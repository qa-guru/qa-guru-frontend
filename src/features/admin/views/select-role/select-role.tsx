import { IconButton, Typography } from "@mui/material";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { InputSelect } from "shared/components/form";
import { formatRole } from "shared/helpers";
import EditIcon from "@mui/icons-material/Edit";

import { StyledStack } from "./select-role.styled";

interface ISelectRole {
  roles?: Maybe<Maybe<UserRole>[]>;
}

const SelectRole: FC<ISelectRole> = ({ roles }) => {
  console.log(roles);

  const [edit, setEdit] = useState(false);

  const { control } = useForm({
    defaultValues: {
      roles: "",
    },
  });

  const rolesOptions = roles?.map((role) => ({
    value: role,
    label: `${role}`,
  }));

  return (
    <>
      {edit ? (
        <InputSelect control={control} options={rolesOptions} name="roles" />
      ) : (
        <StyledStack>
          <Typography variant="body2">{formatRole(roles)}</Typography>
          <IconButton onClick={() => setEdit(true)}>
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
        </StyledStack>
      )}
    </>
  );
};

export default SelectRole;
