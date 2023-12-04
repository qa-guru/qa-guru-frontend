import { styled } from "@mui/system";
import { Paper, Stack, Box } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

interface IStyledComment {
  editAccess?: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "editAccess",
})<IStyledComment>(({ theme, editAccess }) => ({
  backgroundColor: editAccess
    ? theme.palette.primary.secondary
    : theme.palette.grey.secondary,
  borderRadius: "12px",
  position: "relative",
  padding: "10px",
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
  gap: theme.spacing(1),
}));

export const StyledIconBox = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
});

export const StyledReplyIcon = styled(ReplyIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledBox = styled(Box)({
  marginTop: "10px",
});

export const StyledCommentBox = styled(Box)({
  width: "100%",
});
