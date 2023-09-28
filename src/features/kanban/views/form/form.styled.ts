import { styled } from "@mui/system";
import { Stack } from "@mui/material";

export const StyledColumnStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  justifyContent: "center",
}));

export const StyledRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(1),
}));
