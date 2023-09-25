import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography, Box } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: "20px 0",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-end",
  marginTop: "15px",
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  minWidth: "147px",
  marginTop: "5px",
}));
