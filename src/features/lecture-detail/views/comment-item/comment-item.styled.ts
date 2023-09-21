import { styled } from "@mui/system";
import { Paper, Stack } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  padding: "10px",
  [theme.breakpoints.up("sm")]: {
    padding: "15px",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  borderRadius: "12px",
  alignItems: "flex-start",
  [theme.breakpoints.up("sm")]: {
    alignItems: "center",
  },
  justifyContent: "space-between",
}));
