import { styled } from "@mui/system";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { ReactComponent as EditIcon } from "assets/icons/button-edit.svg";

interface IStyledComment {
  editAccess?: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "editAccess",
})<IStyledComment>(({ theme, editAccess }) => ({
  border: editAccess ? `0.5px solid ${theme.palette.app.primary}` : "none",
  boxShadow:
    "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
  borderRadius: "12px",
  padding: "10px",
  margin: "20px 2px 2px",
  [theme.breakpoints.up("sm")]: {
    padding: "15px",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  borderRadius: "12px",
  alignItems: "flex-start",
  [theme.breakpoints.up("sm")]: {
    alignItems: "center",
  },
  justifyContent: "space-between",
}));

export const StyledBottomStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
}));

export const StyledEditIcon = styled(EditIcon)(({ theme }) => ({
  width: "16px",
}));

export const StyledReplyIcon = styled(ReplyIcon)(({ theme }) => ({
  width: "16px",
}));

export const StyledBox = styled(Box)({
  marginTop: "10px",
});

export const StyledCommentBox = styled(Box)({
  width: "100%",
});

export const StyledThreadStack = styled(Stack)(({ theme }) => ({
  paddingLeft: "15px",
}));
