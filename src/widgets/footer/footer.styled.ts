import { styled } from "@mui/system";
import { Box, Link, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  height: "70px",
  maxWidth: "1920px",
  margin: "0 auto",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 40px",
  [theme.breakpoints.down("md")]: {
    height: "150px",
    textAlign: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: theme.palette.app.purple,
  boxShadow: "none",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "7px",
  [theme.breakpoints.down("md")]: {
    marginTop: 0,
  },
}));

export const StyledLogo = styled(Logo)({
  width: "166px",
  height: "30px",
});

export const StyledSupportLink = styled(Link)(({ theme }) => ({
  color: theme.palette.app.primary,
  textDecoration: "none",
  whiteSpace: "nowrap",
  margin: "0 20px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
  },
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    marginTop: "10px",
  },
}));
