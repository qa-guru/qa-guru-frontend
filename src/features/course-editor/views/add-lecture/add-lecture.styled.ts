import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.app.primary,
  color: theme.palette.app.white,
  "&:hover": {
    color: theme.palette.app.textSecondary,
    backgroundColor: theme.palette.app.secondary,
  },
}));
