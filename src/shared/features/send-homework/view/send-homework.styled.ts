import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Stack, Box, FormHelperText, IconButton } from "@mui/material";

export const StyledBox = styled(Box)({
  width: "100%",
});

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.white,
  marginTop: "15px",
}));

export const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.app.red,
  margin: "5px 5px 0",
}));

export const StyledStack = styled(Stack)({
  flexDirection: "column",
  alignItems: "flex-end",
});

export const StyledIconButton = styled(IconButton)({
  padding: "10px 4px",
});
