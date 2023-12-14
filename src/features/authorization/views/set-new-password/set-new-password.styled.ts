import { styled } from "@mui/system";
import { Button, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

export const StyledLogo = styled(Logo)(({ theme }) => ({
  height: "32px",
  width: "225px",
  viewBox: "0 0 250 38",
  [theme.breakpoints.up("sm")]: {
    height: "48px",
    width: "280px",
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "310px",
  height: "240px",
  marginTop: "16px",
  [theme.breakpoints.up("sm")]: {
    width: "430px",
    height: "260px",
    marginTop: "22px",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  padding: "20px 34px 14px",
  gap: theme.spacing(3.5),
  [theme.breakpoints.up("sm")]: {
    padding: "32px 60px 20px",
  },
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.purple.main,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "65px",
  bottom: "65px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    bottom: "95px",
  },
}));

export const StyledResetButton = styled(Button)(({ theme }) => ({
  width: "50%",
  alignSelf: "center",
  color: theme.palette.white.main,
}));
