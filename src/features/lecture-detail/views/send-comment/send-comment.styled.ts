import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Stack, Box } from "@mui/material";

export const StyledBox = styled(Box)({
  width: "100%",
});

export const StyledStack = styled(Stack)({
  flexDirection: "column",
  alignItems: "flex-end",
  marginTop: "15px",
});

export const StyledLoadingButton = styled(LoadingButton)({
  minWidth: "147px",
});
