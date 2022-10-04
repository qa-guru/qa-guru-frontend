import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { IDeleteUser } from "./DeleteUser.types";
import { useDeleteUserMutation } from "../../../../generated/graphql";
import { client } from "../../../../http";

const DeleteUser: React.FC<IDeleteUser> = ({ id }) => {
  const [deleteUser] = useDeleteUserMutation();

  const onDeleteUser = () => {
    if (id)
      deleteUser({
        variables: { id },
        onCompleted: () => client.refetchQueries({ include: ["Users"] }),
      });
  };

  return (
    <>
      <Button
        onClick={onDeleteUser}
        type="dashed"
        danger
        icon={<CloseOutlined />}
      >
        Delete User
      </Button>
    </>
  );
};

export default DeleteUser;
