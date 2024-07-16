import { styled } from "@mui/system";
import { Paper, Stack, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("md")]: {
    padding: "20px",
  },
  marginTop: "30px",
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  padding: "10px 30px 10px 0",
  width: "min-content",
  gap: theme.spacing(2),
  alignItems: "center",
}));

export const StyledTypography = styled(Typography)({
  marginBottom: "15px",
});
