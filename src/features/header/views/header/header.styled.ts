import { styled } from "@mui/system";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import { ReactComponent as DarkLogo } from "assets/icons/logo-header.svg";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.app.primary,
}));

export const StyledHeader = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 200,
  alignItems: "center",
  marginBottom: "10px",
  [theme.breakpoints.only("xs")]: {
    marginBottom: "24px",
  },
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  maxWidth: "1920px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "60px",
  gap: "10px",
  padding: "20px 40px",
  [theme.breakpoints.down("md")]: {
    padding: "0 6px",
  },
}));

export const StyledPaper = styled(Paper)({
  borderRadius: 0,
});

export const StyledLogoIconButton = styled(IconButton)({
  padding: 0,
});

export const StyledIconBox = styled(Box)({
  marginTop: "7px",
});

export const StyledLogo = styled(Logo)(({ theme }) => ({
  width: "166px",
  height: "30px",
  [theme.breakpoints.down("sm")]: {
    width: "146px",
    height: "25px",
  },
}));

export const StyledDarkLogo = styled(DarkLogo)(({ theme }) => ({
  width: "166px",
  height: "30px",
  [theme.breakpoints.down("sm")]: {
    width: "146px",
    height: "25px",
  },
}));

export const StyledStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  marginRight: "10px",
});
