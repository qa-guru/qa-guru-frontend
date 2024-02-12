import React, { FC } from "react";

import {
  StyledDeleteIcon,
  StyledIconButton,
  StyledSpinner,
} from "./delete-comment.styled";
import { IDeleteComment } from "./delete-comment.types";
import { client } from "../../../../api";

const DeleteComment: FC<IDeleteComment> = ({ id, deleteComment, loading }) => {
  const handleDelete = async () => {
    if (id) {
      await deleteComment({
        variables: { id },
        onCompleted: () => {
          client.refetchQueries({ include: ["commentsHomeWorkByHomeWork"] });
        },
      });
    }
  };

  return (
    <StyledIconButton onClick={handleDelete}>
      {loading ? (
        <StyledSpinner color="primary" size="small" />
      ) : (
        <StyledDeleteIcon />
      )}
    </StyledIconButton>
  );
};

export default DeleteComment;
