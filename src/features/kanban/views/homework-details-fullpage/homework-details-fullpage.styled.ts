import { styled } from "@mui/system";
import { IconButton, Paper, Stack, Typography } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(3),
  marginTop: "25px",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white.main,
  width: "40px",
  height: "40px",
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  flexDirection: "row",
}));

export const StyledColumnStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "15px",
}));
