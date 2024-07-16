import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";

interface IStyledCard {
  isDragging?: boolean;
  isCardsHidden?: boolean;
  isActive?: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !["isDragging", "isCardsHidden", "isActive"].includes(prop as string),
})<IStyledCard>(({ theme, isDragging, isCardsHidden, isActive }) => ({
  flexGrow: "1",
  margin: "8px",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 300ms ease-in-out",
  },
  opacity: isDragging ? "0.5" : undefined,
  cursor: isDragging ? "grabbing" : "grab",
  visibility: isCardsHidden && !isDragging ? "hidden" : undefined,
  border: isActive
    ? `1px solid ${theme.palette.app.primary}30`
    : `1px solid transparent`,
  marginBottom: isDragging ? "15px" : undefined,
}));

export const StyledBox = styled(Box)({
  padding: "8px",
});

export const StyledUserRowStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginTop: "10px",
}));
