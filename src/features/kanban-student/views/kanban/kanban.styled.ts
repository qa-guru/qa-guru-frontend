import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledContentBox = styled(Box)(({ theme }) => ({
  height: "calc(100dvh - 162px)",
  overflow: "hidden",
  maxWidth: "1920px",
  margin: "0 auto",
  justifyContent: "center",
  [theme.breakpoints.only("xs")]: {
    height: "calc(100dvh - 152px)",
  },
}));
