import { styled } from "@mui/system";
import { Button, Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  marginTop: "15px",
  gap: theme.spacing(2),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column-reverse",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
  justifyContent: "flex-end",
  marginTop: "20px",
  gap: theme.spacing(1),
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  minWidth: "151px",
  backgroundColor: theme.palette.primary.main,
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  minWidth: "116px",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.black.main,
}));
