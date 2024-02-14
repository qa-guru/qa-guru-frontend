import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";

export const StyledButtonBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
  margin: "0 0 15px",
}));
