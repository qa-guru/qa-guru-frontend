import { styled } from "@mui/system";
import { Box, Button, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
  gap: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    padding: "32px 60px 20px",
  },
}));

export const StyledBottomStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  justifyContent: "center",
  margin: "8px 0",
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.purple.main,
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledAlignBox = styled(Box)({
  textAlign: "center",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: theme.palette.primary.main,
}));

export const StyledLoadingButton = styled(LoadingButton)({
  textTransform: "none",
  width: "60%",
  alignSelf: "center",
});
