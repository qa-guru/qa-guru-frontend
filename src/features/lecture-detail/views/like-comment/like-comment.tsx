import { FC, useState } from "react";
import { Stack, Typography } from "@mui/material";

import {
  StyledIconButton,
  StyledFavorite,
  StyledFavoriteBorder,
} from "./like-comment.styled";
import { ILikeComment } from "./like-comment.types";

const LikeComment: FC<ILikeComment> = ({ id, likeComment, likes }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourite = async () => {
    if (id) {
      await likeComment({
        variables: { id },
      });
      setIsFavourite(isFavourite ? false : true);
    }
  };

  return (
    <Stack direction="row">
      {isFavourite ? (
        <StyledIconButton onClick={handleFavourite}>
          <StyledFavorite color="primary" />
        </StyledIconButton>
      ) : (
        <StyledIconButton onClick={handleFavourite}>
          <StyledFavoriteBorder color="primary" />
        </StyledIconButton>
      )}
      {likes && (
        <Typography variant="caption" color="textSecondary">
          {likes}
        </Typography>
      )}
    </Stack>
  );
};

export default LikeComment;
