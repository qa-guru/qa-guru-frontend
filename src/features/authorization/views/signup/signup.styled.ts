import { styled } from "@mui/system";
import { Box, Stack } from "@mui/material";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.app.purple,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
}));

export const StyledScreenBox = styled(Box)({
  margin: "0",
});
