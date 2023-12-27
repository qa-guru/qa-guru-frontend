import { styled } from "@mui/system";
import { Box, Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
}));

export const StyledBox = styled(Box)({
  width: "100%",
});

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
  color: theme.palette.app.white,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "116px",
  color: theme.palette.app.black,
  backgroundColor: theme.palette.app.secondary,
}));
