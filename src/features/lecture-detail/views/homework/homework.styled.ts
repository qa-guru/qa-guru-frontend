import { styled } from "@mui/system";
import { Button, DialogContent, Paper, Box } from "@mui/material";
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

export const StyledDialogContent = styled(DialogContent)({
  overflowY: "auto",
  maxHeight: "calc(100vh - 200px)",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  color: theme.palette.app.white,
}));

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  zIndex: "1",
  top: "8px",
  [theme.breakpoints.up("xs")]: {
    top: "16px",
  },
  right: "12px",
  [theme.breakpoints.up("xs")]: {
    right: "24px",
  },
}));
