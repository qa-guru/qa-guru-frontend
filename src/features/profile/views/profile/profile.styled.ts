import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";

export const StyledButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
  margin: "0 0 15px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
