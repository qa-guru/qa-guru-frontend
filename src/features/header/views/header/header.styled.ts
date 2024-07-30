import { styled } from "@mui/system";
import { AppBar, Box, IconButton, Stack } from "@mui/material";

import { ReactComponent as DarkLogo } from "assets/icons/logo-header.svg";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  maxWidth: "1920px",
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

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: theme.palette.mode === "light" && theme.palette.app.white,
}));

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
