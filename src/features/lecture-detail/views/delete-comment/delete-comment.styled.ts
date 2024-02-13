import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, DialogContent, IconButton, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
}));

export const StyledSpinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.app.primary,
  width: "16px",
}));

export const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
  width: "16px",
}));

export const StyledWrapper = styled(Box)({
  padding: "30px 20px 10px",
  width: "290px",
});

export const StyledDialogContent = styled(DialogContent)({
  textAlign: "center",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: "30px",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.app.white,
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.app.black,
}));
