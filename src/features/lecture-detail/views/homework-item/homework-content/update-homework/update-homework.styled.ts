import { styled } from "@mui/system";
import { Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  marginTop: "15px",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column-reverse",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
  justifyContent: "flex-end",
  marginTop: "20px",
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  minWidth: "151px",
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  minWidth: "116px",
  backgroundColor: theme.palette.secondary,
  color: theme.palette.black.main,
}));
