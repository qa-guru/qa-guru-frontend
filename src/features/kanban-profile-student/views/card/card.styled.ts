import { styled } from "@mui/system";
import { Box, DialogContent, Paper, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledPaper = styled(Paper)({
  flexGrow: "1",
  margin: "8px",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 300ms ease-in-out",
  },
  border: "1px solid transparent",
  cursor: "pointer",
});

export const StyledCardHeader = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.app.lightGrey,
  justifyContent: "space-between",
  boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
  padding: "8px",
  width: "100%",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  position: "relative",
  flexDirection: "row",
}));

export const StyledBox = styled(Box)({
  padding: "8px",
});

export const StyledUserRowStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginTop: "10px",
}));

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
  padding: "23px 10px 10px",
  [theme.breakpoints.up("sm")]: {
    height: "calc(100dvh - 50px)",
    padding: "30px 15px 15px",
  },
}));
