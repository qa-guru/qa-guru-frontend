import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledContentBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  marginTop: "24px",
  top: "76px",
  bottom: "46px",
  [theme.breakpoints.down("md")]: {
    bottom: "150px",
    height: "calc(100vh - 150px)",
  },
}));
