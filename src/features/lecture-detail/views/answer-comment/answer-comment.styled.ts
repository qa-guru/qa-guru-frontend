import { Box, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export const StyledBox = styled(Box)({
  width: "100%",
});

export const StyledStack = styled(Stack)({
  flexDirection: "column",
  alignItems: "flex-end",
  marginTop: "15px",
});

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.white,
  marginTop: "5px",
}));

export const StyledCommentStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "start",
  margin: "0 5px 10px",
});

export const StyledCommentBox = styled(Box)({
  width: "100%",
});
