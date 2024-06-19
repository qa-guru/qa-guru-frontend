import { FC } from "react";
import { Stack, Typography } from "@mui/material";

import {
  StyledFavorite,
  StyledFavoriteBorder,
  StyledIconButton,
} from "./like-comment.styled";
import { ILikeComment } from "./like-comment.types";

const LikeComment: FC<ILikeComment> = ({
  commentId,
  likeComment,
  likes,
  userLike,
}) => {
  const handleFavourite = async () => {
    if (commentId) {
      await likeComment({
        variables: { id: commentId },
      });
    }
  };

  const renderIcon = () =>
    userLike ? <StyledFavorite /> : <StyledFavoriteBorder />;

  return (
    <Stack direction="row" alignItems="center" spacing={0.3}>
      <StyledIconButton onClick={handleFavourite}>
        {renderIcon()}
      </StyledIconButton>
      <Typography variant="caption" color="textSecondary">
        {likes}
      </Typography>
    </Stack>
  );
};

export default LikeComment;
