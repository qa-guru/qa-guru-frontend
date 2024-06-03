import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
}));

export const StyledFavoriteBorder = styled(FavoriteBorder)({
  width: "16px",
});

export const StyledFavorite = styled(Favorite)({
  width: "16px",
});
