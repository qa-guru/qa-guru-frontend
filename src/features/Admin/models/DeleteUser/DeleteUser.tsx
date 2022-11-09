import React from "react";
import { IDeleteUser } from "./DeleteUser.types";
import { useDeleteUserMutation } from "../../../../generated/graphql";
import { client } from "../../../../http";
import { Button } from "@mui/material";

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
    <Button variant="outlined" color="error" onClick={onDeleteUser}>
      Delete User
    </Button>
  );
};

export default DeleteUser;
