import { styled } from "@mui/system";
import { Paper, Stack } from "@mui/material";
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

export const StyledWrapper = styled(Stack)({
  flexDirection: "row",
  maxWidth: "1920px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "76px",
  gap: "10px",
  padding: "20px 40px",
});

export const StyledPaper = styled(Paper)({
  borderRadius: 0,
});

export const StyledLogo = styled(Logo)({
  marginTop: "7px",
  viewBox: "0 0 250 38",
});

export const StyledStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
});
