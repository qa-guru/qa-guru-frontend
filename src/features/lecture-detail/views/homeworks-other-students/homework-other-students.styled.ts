import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  margin: "25px 0 20px",
  gap: theme.spacing(1),
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  wordBreak: "break-all",
  [theme.breakpoints.up("md")]: {
    padding: "20px",
  },
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.primary,
  alignSelf: "center",
  margin: "15px 0 0",
  paddingBottom: 0,
}));
