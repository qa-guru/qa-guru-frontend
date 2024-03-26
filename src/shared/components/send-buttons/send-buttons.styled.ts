import { styled } from "@mui/system";
import { IconButton, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledButtonStack = styled(Stack)(({ theme }) => ({
  marginTop: "15px",
  gap: "15px",
  flexDirection: "row",
  justifyContent: "flex-end",
  [theme.breakpoints.down("md")]: {
    gap: 0,
    marginTop: 0,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "10px 4px",
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.white,
}));
