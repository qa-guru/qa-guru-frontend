import { styled } from "@mui/system";
import { Typography, IconButton, Stack } from "@mui/material";

export const StyledTitleStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
});

export const StyledItemsStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
  minWidth: "35px",
  height: "35px",
  backgroundColor: theme.palette.app.primary,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.app.white,
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.app.primary,
  color: theme.palette.app.white,
  "&:hover": {
    color: theme.palette.app.textSecondary,
    backgroundColor: theme.palette.app.secondary,
  },
}));
