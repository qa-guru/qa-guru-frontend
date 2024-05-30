import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const StyledStack = styled(Stack)({
  flexDirection: "row",
  paddingLeft: "20px",
  whiteSpace: "nowrap",
});
