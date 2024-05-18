import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";

interface IStyledCard {
  isDragging?: boolean;
  isCardsHidden?: boolean;
  isActive?: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !["isCardsHidden", "isActive"].includes(prop as string),
})<IStyledCard>(({ theme, isActive }) => ({
  flexGrow: "1",
  margin: "8px",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 300ms ease-in-out",
  },
  border: isActive
    ? `1px solid ${theme.palette.app.primary}30`
    : `1px solid transparent`,
}));

export const StyledCardHeader = styled(Stack, {
  shouldForwardProp: (prop) => !["isActive"].includes(prop as string),
})<IStyledCard>(({ theme, isActive }) => ({
  backgroundColor: isActive
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
