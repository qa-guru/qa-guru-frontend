import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";

export const StyledWrapperStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
  textAlign: "start",
}));

export const StyledDateStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
});

export const StyledBox = styled(Box)(({ theme }) => ({
  lineHeight: "5px",
}));
