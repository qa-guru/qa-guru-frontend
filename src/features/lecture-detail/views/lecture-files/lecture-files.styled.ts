import { styled } from "@mui/system";
import { List, Paper, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginBottom: "30px",
}));

export const StyledTitle = styled(Typography)({
  marginBottom: "8px",
});

export const StyledList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
