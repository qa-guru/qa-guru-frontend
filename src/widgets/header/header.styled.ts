import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo-header.svg";
import { Link } from "react-router-dom";

interface IStyledHeader {
  isPage404?: boolean;
}

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

export const StyledHeader = styled("header", {
  shouldForwardProp: (prop) => prop !== "isPage404",
})<IStyledHeader>(({ isPage404 }) => ({
  marginBottom: isPage404 ? 0 : "25px",
  alignItems: "center",
}));

export const StyledWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1920px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "65px",
  padding: 0,
  [theme.breakpoints.up("md")]: {
    padding: "7px 20px 7px",
  },
}));

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
