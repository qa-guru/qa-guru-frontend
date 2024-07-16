import { FC } from "react";
import { CircularProgress } from "@mui/material";

import { IDeleteComment } from "./delete-comment.types";
import { StyledDeleteIcon, StyledIconButton } from "./delete-comment.styled";

const DeleteComment: FC<IDeleteComment> = ({ id, deleteComment, loading }) => {
  const handleDelete = async () => {
    if (id)
      await deleteComment({
        variables: { id },
      });
  };

  return (
    <StyledIconButton onClick={handleDelete}>
      {loading ? <CircularProgress size={20} /> : <StyledDeleteIcon />}
    </StyledIconButton>
  );
};

export default DeleteComment;
