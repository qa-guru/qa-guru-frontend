import { styled } from "@mui/system";
import { Box, Stack, Typography } from "@mui/material";

export const StyledAlignStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const StyledRightAlignBox = styled(Box)({
  marginLeft: "auto",
});
