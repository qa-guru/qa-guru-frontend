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
  color: theme.palette.white.main,
  minWidth: "147px",
  marginTop: "5px",
}));

export const StyledCommentStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "start",
});

export const StyledCommentBox = styled(Box)({
  width: "100%",
});
