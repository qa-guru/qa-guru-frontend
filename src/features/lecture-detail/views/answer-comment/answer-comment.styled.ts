import { Box, FormHelperText, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export const StyledBox = styled(Box)({
  width: "100%",
});

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

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledCommentStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "start",
  margin: "20px 0 0",
  [theme.breakpoints.down("md")]: {
    margin: "20px 0 -10px",
  },
}));

export const StyledCommentBox = styled(Box)({
  width: "100%",
  position: "relative",
});

export const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.app.red,
  margin: "5px 5px 0",
}));
