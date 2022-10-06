import { useUpdateRoleMutation } from "../../../../api/mutation/updateRole";
import { Button, Select } from "antd";
import React, { useState } from "react";
import { IUpdateRole } from "./UpdateRole.types";
import { client } from "../../../../http";
import { InputMaybe, UserRole } from "../../../../generated/graphql";
import styles from "./UpdateRole.module.scss";
const { Option } = Select;

const UpdateRole: React.FC<IUpdateRole> = ({ id }) => {
  const [updateRole] = useUpdateRoleMutation();
  const [clickSetRole, setClickSetRole] = useState(false);

  const onUpdatePerson = (
    value: InputMaybe<InputMaybe<UserRole> | InputMaybe<UserRole>[]>
  ) => {
    if (id)
      updateRole({
        variables: { id, roles: value },
        onCompleted: () => client.refetchQueries({ include: ["Users"] }),
      });
  };

  return (
    <>
      {clickSetRole ? (
        <Select
          onChange={onUpdatePerson}
          placeholder="Select Role"
          className={styles.select}
        >
          <Option value="ADMIN">ADMIN</Option>
          <Option value="MASTER">MASTER</Option>
          <Option value="MENTOR">MENTOR</Option>
          <Option value="LECTOR">LECTOR</Option>
          <Option value="USER">USER</Option>
        </Select>
      ) : (
        <Button onClick={() => setClickSetRole(true)} type="dashed">
          Set Role
        </Button>
      )}
    </>
  );
};

export default UpdateRole;
