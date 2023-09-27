import { styled } from "@mui/system";
import { DialogContent, Stack, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 200px)",
}));

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  zIndex: "1",
  top: "8px",
  right: "12px",
  [theme.breakpoints.up("sm")]: {
    top: "12px",
    right: "24px",
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
