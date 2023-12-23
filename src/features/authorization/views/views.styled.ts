import { styled } from "@mui/system";
import { Box, Button, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

export const StyledLocalSelectorWrapper = styled(Box)({
  position: "absolute",
  top: "20px",
  right: "40px",
});

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.purple.main,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  bottom: "70px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    bottom: "150px",
  },
}));

export const StyledLogo = styled(Logo)({
  height: "auto",
  width: "250px",
  viewBox: "0 0 250 38",
});

export const StyledPaper = styled(Paper)({
  width: "390px",
  marginTop: "22px",
  padding: "40px 30px 20px",
  textAlign: "center",
});

export const StyledStack = styled(Stack)({
  gap: "35px",
});

export const StyledBottomStack = styled(Stack)({
  gap: "8px",
  marginTop: "20px",
});

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.white.main,
  width: "fit-content",
  alignSelf: "center",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
