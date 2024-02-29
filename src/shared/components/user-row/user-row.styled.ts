import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";

export const StyledWrapperStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
  textAlign: "start",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
  textAlign: "start",
  justifyContent: "space-between",
}));

export const StyledBox = styled(Box)({
  lineHeight: "5px",
});
