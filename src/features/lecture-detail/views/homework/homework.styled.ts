import { styled } from "@mui/system";
import { Button, DialogContent, Paper, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const style = {
  paper: { padding: { xs: "15px", md: "20px" }, mt: "25px" },
  scrollContainer: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
  button: { mt: "10px" },
  clearIcon: {
    position: "absolute",
    cursor: "pointer",
    zIndex: "1",
    top: { xs: "8px", sm: "16px" },
    right: { xs: "12px", sm: "24px" },
  },
};

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginTop: "25px",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 200px)",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: "20px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "10px",
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
