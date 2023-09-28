import { styled } from "@mui/system";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: "30px",
  padding: "35px 25px",
  maxHeight: "73vh",
  overflowY: "auto",
  backgroundColor: theme.palette.grey.light,
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "18px",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  marginTop: "25px",
  gap: theme.spacing(2),
  flexDirection: "row",
}));

export const StyledColumnStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  flexWrap: "nowrap",
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "15px",
}));
