import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  margin: "30px 0",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));
