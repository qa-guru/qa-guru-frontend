import { styled } from "@mui/system";
import { Paper, Stack, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginBottom: "30px",
}));

export const StyledTypography = styled(Typography)({
  marginBottom: "15px",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(0.5),
  marginTop: "15px",
}));
