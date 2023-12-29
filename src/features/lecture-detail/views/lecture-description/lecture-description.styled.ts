import { styled } from "@mui/system";
import { Paper, Stack, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("md")]: {
    padding: "20px",
  },
}));

export const StyledStack = styled(Stack)({
  alignItems: "center",
  marginTop: "16px",
  flexDirection: "row",
});

export const StyledTypography = styled(Typography)({
  marginBottom: "15px",
});

export const StyledCircle = styled(Typography)(({ theme }) => ({
  minWidth: "40px",
  height: "40px",
  backgroundColor: theme.palette.app.primary,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.app.white,
  marginRight: "15px",
}));
