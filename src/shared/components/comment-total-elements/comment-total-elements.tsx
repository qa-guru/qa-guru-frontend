import { FC } from "react";
import { Typography } from "@mui/material";

import { ICommentTotalElements } from "./comment-total-elements.types";
import { StyledStack } from "./comment-total-elements.styled";

const CommentTotalElements: FC<ICommentTotalElements> = ({ totalElements }) => {
  const displayText = totalElements !== 0 && `Комментарии (${totalElements})`;

  return (
    <StyledStack>
      <Typography variant="h5">{displayText}</Typography>
    </StyledStack>
  );
};

export default CommentTotalElements;
