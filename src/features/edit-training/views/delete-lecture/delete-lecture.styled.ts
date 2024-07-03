import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack } from "@mui/material";

export const StyledWrapper = styled(Box)({
  padding: "30px 20px 10px",
  width: "300px",
});

export const StyledDialogContent = styled(DialogContent)({
  textAlign: "center",
});

export const StyledStack = styled(Stack)({
  width: "100%",
  gap: "40px",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "145px",
}));

export const StyledConfirmButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.app.white,
}));
