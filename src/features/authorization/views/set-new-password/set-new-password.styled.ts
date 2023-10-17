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
  marginTop: "16px",
  [theme.breakpoints.up("sm")]: {
    width: "430px",
    marginTop: "22px",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  padding: "20px 34px 14px",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    padding: "32px 60px 20px",
    gap: theme.spacing(3),
  },
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.purple.main,
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledResetButton = styled(Button)({
  textTransform: "uppercase",
  width: "50%",
  alignSelf: "center",
});
