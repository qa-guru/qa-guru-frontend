import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack, Typography } from "@mui/material";

export const StyledWrapperColumnContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginTop: "5px",
  boxSizing: "border-box",
  maxHeight: "72vh",
  [theme.breakpoints.up("lg")]: {
    maxHeight: "69.5vh",
  },
}));

export const StyledWrapperColumnBox = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  display: "flex",
  flexGrow: "1",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxHeight: "25%",
  },
}));

export const StyledLoadMoreButton = styled(Button)(({ theme }) => ({
  margin: "1vh auto",
  color: theme.palette.primary.main,
}));

export const StyledTypographyStatus = styled(Typography)({
  fontSize: "20px",
  marginLeft: "8px",
  marginBottom: "5px",
});

export const StyledTypographyCount = styled(Typography)({
  fontSize: "20px",
  marginLeft: "5px",
});

export const StyledWrapperBoxCircle = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});

export const StyledWrapper = styled(Box)(({ theme }) => ({
  padding: "25px 10px 5px 20px",
  width: "390px",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  textAlign: "center",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(1),
  flexDirection: "row",
  justifyContent: "space-around",
  marginBottom: "15px",
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "145px",
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.black.main,
}));
