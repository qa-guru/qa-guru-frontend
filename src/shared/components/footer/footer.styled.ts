import { styled } from "@mui/system";
import { Box, Link, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  height: "60px",
  maxWidth: "1920px",
  margin: "0 auto",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 40px",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    padding: "10px 20px",
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
    display: "none",
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
}));

export const StyledIconBox = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  whiteSpace: "nowrap",
  gap: "15px",
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
  },
}));
