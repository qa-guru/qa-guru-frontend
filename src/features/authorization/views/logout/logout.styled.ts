import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack } from "@mui/material";

export const StyledWrapper = styled(Box)({
  padding: "25px 10px 5px 20px",
  width: "300px",
});

export const StyledDialogContent = styled(DialogContent)({
  textAlign: "center",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(1),
  flexDirection: "row",
  justifyContent: "space-around",
  marginBottom: "15px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "110px",
  color: theme.palette.white.main,
}));

export const StyledItemStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  padding: "10px 0 0",
  alignItems: "center",
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  width: "110px",
  color: theme.palette.black.main,
}));
