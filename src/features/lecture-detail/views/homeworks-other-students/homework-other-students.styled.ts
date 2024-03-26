import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
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
