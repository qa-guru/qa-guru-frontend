import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
