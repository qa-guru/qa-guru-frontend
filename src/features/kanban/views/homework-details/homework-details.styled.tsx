import { styled } from "@mui/system";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  padding: "35px 25px",
  maxHeight: "73.6vh",
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
  textDecoration: "none",
  color: theme.palette.black.main,
  "&:hover": { color: theme.palette.primary.main },
}));

export const StyledId = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "row",
  alignItems: "center",
  color: theme.palette.primary.main,
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

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
});

export const StyledTypography = styled(Typography)({
  flexWrap: "nowrap",
});

export const StyledTitle = styled(Typography)({
  marginBottom: "15px",
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white.main,
  width: "35px",
  height: "35px",
}));
