import { styled } from "@mui/system";
import { Paper, Stack, Box } from "@mui/material";

interface IStyledPaper {
  editAccess: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "editAccess",
})<IStyledPaper>(({ theme, editAccess }) => ({
  backgroundColor: editAccess
    ? theme.palette.primary.secondary
    : theme.palette.grey.secondary,
  borderRadius: "12px",
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

export const StyledCommentBox = styled(Box)({
  width: "100%",
});

export const StyledBox = styled(Box)({
  marginTop: "10px",
});
