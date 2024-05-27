import { styled } from "@mui/system";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

export const StyledNotFoundBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
  [theme.breakpoints.down("md")]: {
    height: "200px",
  },
}));

export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(3),
  margin: "10px 0",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(0.5),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  minWidth: "40px",
  height: "40px",
  backgroundColor: theme.palette.app.primary,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.app.white,
}));

export const StyledStack = styled(Stack)({
  marginTop: "15px",
  flexDirection: "row",
  gap: "12px",
  alignItems: "center",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.primary,
  textTransform: "uppercase",
}));
