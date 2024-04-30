import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 2000,
  width: "100%",
  backgroundColor: theme.palette.app.white,
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
  padding: "10px",
  [theme.breakpoints.up("sm")]: {
    height: "calc(100dvh - 50px)",
    padding: "30px 15px 15px",
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
