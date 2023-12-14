import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo-header.svg";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

export const StyledHeader = styled("header")({
  alignItems: "center",
  marginBottom: "24px",
});

export const StyledWrapper = styled(Box)({
  maxWidth: "1920px",
  margin: "0 auto",
  padding: "7px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "65px",
});

export const StyledPaper = styled(Paper)({
  borderRadius: 0,
});

export const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const StyledLogo = styled(Logo)(({ theme }) => ({
  marginTop: "7px",
  height: "31px",
  viewBox: "0 0 250 38",
  width: "120px",
  [theme.breakpoints.up("sm")]: {
    width: "166px",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(3),
}));
