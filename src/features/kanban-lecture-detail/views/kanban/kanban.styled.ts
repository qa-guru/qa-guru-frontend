import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledContentBox = styled(Box)(({ theme }) => ({
  height: "calc(100dvh - 66px - 24px - 60px)",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    overflow: "auto",
  },
}));
