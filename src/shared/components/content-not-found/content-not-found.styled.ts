import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledNotFoundBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
  [theme.breakpoints.down("md")]: {
    height: "200px",
  },
}));
