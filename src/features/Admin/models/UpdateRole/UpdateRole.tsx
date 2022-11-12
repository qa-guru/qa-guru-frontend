import { useUpdateRoleMutation } from "../../../../api/graphql/user/updateRole";
import React, { useState } from "react";
import { IUpdateRole } from "./UpdateRole.types";
import { client } from "../../../../http";
import { InputMaybe, UserRole } from "../../../../generated/graphql";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import styles from "./UpdateRole.module.scss";
import RHF from "../../../../shared/ui/InputRHF";
import { useForm } from "react-hook-form";

const UpdateRole: React.FC<IUpdateRole> = ({ id }) => {
  const [updateRole] = useUpdateRoleMutation();
  const [clickSetRole, setClickSetRole] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onUpdatePerson = (event: SelectChangeEvent) => {
    if (id)
      updateRole({
        variables: { id, roles: event.target.value },
        onCompleted: () => client.refetchQueries({ include: ["Users"] }),
      });
  };

  return (
    <>
      {clickSetRole ? (
        <RHF.Select
          onChange={onUpdatePerson}
          name="techStack"
          control={control}
          placeholder="Select TechStack"
          content={["ADMIN", "MASTER", "MENTOR", "LECTOR", "USER"]}
          defaultValue=""
        />
      ) : (
        // <Select
        //   value={role}
        //   onChange={onUpdatePerson}
        //   placeholder="Select Role"
        // >
        //   <MenuItem value="ADMIN">ADMIN</MenuItem>
        //   <MenuItem value="MASTER">MASTER</MenuItem>
        //   <MenuItem value="MENTOR">MENTOR</MenuItem>
        //   <MenuItem value="LECTOR">LECTOR</MenuItem>
        //   <MenuItem value="USER">USER</MenuItem>
        // </Select>
        <Button onClick={() => setClickSetRole(true)} variant="contained">
          Set Role
        </Button>
      )}
    </>
  );
};

export default UpdateRole;
