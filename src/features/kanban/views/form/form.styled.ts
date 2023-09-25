import { styled } from "@mui/system";
import { Button, Grid, Stack } from "@mui/material";

export const StyledColumnStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  justifyContent: "center",
}));

export const StyledSmallButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
}));

export const StyledLargeButton = styled(Button)(({ theme }) => ({
  fontSize: "12px",
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  flexWrap: "nowrap",
  gap: theme.spacing(1.5),
  alignItems: "center",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
}));
