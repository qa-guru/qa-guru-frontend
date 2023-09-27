import { styled } from "@mui/system";
import { Box, Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
}));

export const StyledButtonsStack = styled(Stack)(({ theme }) => ({
  marginTop: "15px",
  gap: theme.spacing(2),
  justifyContent: "flex-end",
  flexDirection: "column-reverse",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  minWidth: "147px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "116px",
  color: theme.palette.black.main,
  backgroundColor: theme.palette.secondary.main,
}));
