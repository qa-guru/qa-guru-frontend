import { styled } from "@mui/system";
import { Box, Stack, Typography } from "@mui/material";

export const StyledWrapperStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
  textAlign: "start",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  lineHeight: "5px",
}));

export const StyledFullNameTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledDateStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
});
