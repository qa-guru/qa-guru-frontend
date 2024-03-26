import { styled } from "@mui/system";
import { Box, Button, DialogContent, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledModalBox = styled(Box)(({ theme }) => ({
  paddingTop: "16px",
  [theme.breakpoints.up("sm")]: {
    padding: 0,
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginTop: "25px",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: "auto",
  padding: "20px 35px",
  [theme.breakpoints.up("sm")]: {
    height: "calc(100dvh - 50px)",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  color: theme.palette.app.white,
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
