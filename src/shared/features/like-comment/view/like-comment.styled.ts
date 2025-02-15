import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export const StyledIconButton = styled(IconButton)({
  padding: 0,
});

export const StyledFavoriteBorder = styled(FavoriteBorder)(({ theme }) => ({
  width: "16px",
  color: theme.palette.app.red,
}));

export const StyledFavorite = styled(Favorite)(({ theme }) => ({
  width: "16px",
  color: theme.palette.app.red,
}));
