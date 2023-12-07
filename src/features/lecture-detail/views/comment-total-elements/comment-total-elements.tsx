import { FC } from "react";
import { Typography } from "@mui/material";

import { ICommentTotalElements } from "./comment-total-elements.types";
import { StyledStack } from "./comment-total-elements.styled";

const CommentTotalElements: FC<ICommentTotalElements> = ({ totalElements }) => {
  return (
    <StyledStack>
      <Typography variant="h5">Комментарии</Typography>
      <Typography variant="h5">({totalElements})</Typography>
    </StyledStack>
  );
};

export default CommentTotalElements;
