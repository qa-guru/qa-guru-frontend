import { styled } from "@mui/system";
import { Box, DialogContent, Paper, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface IStyledCard {
  isCurrentHomeworkActive?: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !["isCurrentHomeworkActive"].includes(prop as string),
})<IStyledCard>(({ theme, isCurrentHomeworkActive }) => ({
  flexGrow: "1",
  margin: "8px",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 300ms ease-in-out",
  },
  border: isCurrentHomeworkActive
    ? `1px solid ${theme.palette.app.primary}30`
    : `1px solid transparent`,
  cursor: "pointer",
}));

export const StyledCardHeader = styled(Stack, {
  shouldForwardProp: (prop) =>
    !["isCurrentHomeworkActive"].includes(prop as string),
})<IStyledCard>(({ theme, isCurrentHomeworkActive }) => ({
  backgroundColor: isCurrentHomeworkActive
    ? `1px solid ${theme.palette.app.primary}30`.slice(10)
    : theme.palette.app.lightGrey,
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

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: "auto",
  padding: "20px 35px",
  [theme.breakpoints.up("sm")]: {
    height: "calc(100dvh - 50px)",
  },
}));
