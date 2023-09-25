import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";
import { grey, primary } from "../../../../theme/colors";

interface IStyledStack {
  isActive: boolean;
}

export const style = {
  paper: {
    cursor: "grab",
    flexGrow: "1",
    margin: 1,
    border: `1px solid transparent`,
    "&:hover": {
      transform: "scale(1.02)",
      transition: "transform 300ms ease-in-out",
    },
  },
  draggedPaper: {
    opacity: 0.5,
    cursor: "grabbing",
  },
  hiddenPaper: {
    visibility: "hidden",
  },
  cardHeader: {
    backgroundColor: grey.light,
    justifyContent: "space-between",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
    padding: 1,
    width: "100%",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    position: "relative",
  },
  activeCard: {
    border: `1px solid ${primary.main}80`,
  },
};

export const StyledPaper = styled(Paper)<{
  isDragging: boolean;
  isCardsHidden: boolean;
  isActive: boolean;
}>(({ theme, isDragging, isCardsHidden, isActive }) => ({
  cursor: "grab",
  flexGrow: 1,
  margin: 1,
  border: isActive
    ? `1px solid ${theme.palette.primary.main}80`
    : "1px solid transparent",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 300ms ease-in-out",
  },
  ...(isDragging && {
    opacity: 0.5,
    cursor: "grabbing",
    marginBottom: 2,
  }),
  ...(isCardsHidden &&
    !isDragging && {
      visibility: "hidden",
    }),
}));

export const StyledHeaderStack = styled(Stack)<IStyledStack>(
  ({ theme, isActive }) => ({
    backgroundColor: isActive
      ? `1px solid ${theme.palette.primary.main}80`.slice(10)
      : theme.palette.grey.light,
    justifyContent: "space-between",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
    padding: 8,
    width: "100%",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    position: "relative",
    flexDirection: "row",
  })
);

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: "10px",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginTop: "10px",
}));
