import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: "auto",
  padding: "20px 35px",
  [theme.breakpoints.up("sm")]: {
    height: "calc(100dvh - 50px)",
  },
}));

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  color: theme.palette.app.primary,
  zIndex: 2000,
  top: "8px",
  right: "8px",
  [theme.breakpoints.up("sm")]: {
    top: "12px",
    right: "12px",
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  paddingTop: "15px",
  [theme.breakpoints.up("sm")]: {
    paddingTop: 0,
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  alignItems: "center",
  flexDirection: "row",
  marginTop: "10px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));
