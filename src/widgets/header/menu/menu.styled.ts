import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  marginLeft: "52px",
  height: "50px",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(3),
}));
