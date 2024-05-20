import { styled } from "@mui/system";
import { Box, Button, DialogContent, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledModalBox = styled(Box)(({ theme }) => ({
  paddingTop: "16px",
  [theme.breakpoints.up("sm")]: {
    padding: 0,
  },
}));

export const StyledBox = styled(Box)({
  padding: "8px",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginTop: "25px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  color: theme.palette.app.white,
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 2000,
  width: "100%",
  backgroundColor: theme.palette.app.menu,
}));

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
  marginRight: "5px",
  [theme.breakpoints.up("sm")]: {
    margin: "5px 15px 0 0",
    cursor: "pointer",
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: "auto",
  scrollbarWidth: "none",
  height: "calc(100dvh - 50px)",
  padding: "6px 10px 80px",
  [theme.breakpoints.up("sm")]: {
    height: "calc(100dvh - 50px)",
    padding: "25px 15px 15px",
  },
}));
