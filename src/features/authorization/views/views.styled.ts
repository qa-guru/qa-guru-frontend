import { styled } from "@mui/system";
import { Box, Button, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

export const StyledLocalSelectorWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  right: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    top: "5px",
    right: "5px",
  },
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.app.purple,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  top: 0,
  bottom: "70px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    bottom: "150px",
    height: "calc(100vh - 150px)",
  },
}));

export const StyledLogo = styled(Logo)({
  height: "auto",
  width: "250px",
  viewBox: "0 0 250 38",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "390px",
  marginTop: "22px",
  padding: "40px 30px 20px",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "290px",
  },
}));

export const StyledStack = styled(Stack)({
  gap: "35px",
});

export const StyledBottomStack = styled(Stack)({
  gap: "8px",
  marginTop: "15px",
  alignItems: "center",
});

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.white,
  alignSelf: "center",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.primary,
}));

export const StyledSignupWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  backgroundColor: theme.palette.app.purple,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  top: 0,
  bottom: "70px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    position: "inherit",
  },
}));

export const StyledSignupBox = styled(Box)({
  padding: "25px",
});

export const StyledSignupStack = styled(Stack)({
  gap: "28px",
  marginBottom: "30px",
});
