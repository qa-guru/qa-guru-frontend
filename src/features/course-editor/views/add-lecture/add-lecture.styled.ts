import { Button, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));
