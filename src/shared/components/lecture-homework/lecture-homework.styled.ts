import { styled } from "@mui/system";
import { Paper, Stack, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginTop: "25px",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(0.5),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "20px",
}));
