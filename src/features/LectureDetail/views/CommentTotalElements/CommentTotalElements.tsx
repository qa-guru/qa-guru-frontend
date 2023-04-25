import React from "react";
import { Stack, Typography } from "@mui/material";
import { ICommentTotalElements } from "./CommentTotalElements.types";

const CommentTotalElements: React.FC<ICommentTotalElements> = ({
  totalElements,
}) => {
  return (
    <Stack spacing={1} direction="row">
      <Typography variant="h5">Комментарии</Typography>
      <Typography variant="h5">({totalElements})</Typography>
    </Stack>
  );
};

export default CommentTotalElements;
