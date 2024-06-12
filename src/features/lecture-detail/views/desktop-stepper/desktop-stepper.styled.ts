import { styled } from "@mui/system";
import { Box, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: "70px",
  left: "45px",
  color: theme.palette.app.white,
  backgroundColor: theme.palette.app.primary,
  "&:hover": {
    color: theme.palette.app.textSecondary,
    backgroundColor: theme.palette.app.secondary,
  },
  [theme.breakpoints.only("md")]: {
    left: "5px",
  },
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 2000,
  width: "43vw",
  backgroundColor: theme.palette.app.menu,
  [theme.breakpoints.down("md")]: {
    width: "100vw",
    top: "60px",
  },
}));

export const StyledClearIcon = styled(Clear)(({ theme }) => ({
  color: theme.palette.app.primary,
  marginRight: 0,
  cursor: "pointer",
}));
