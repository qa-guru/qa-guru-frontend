import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface IStyledColumn {
  showButton?: boolean;
}

export const StyledWrapperColumnContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "showButton",
})<IStyledColumn>(({ theme, showButton }) => ({
  flexGrow: 1,
  marginTop: "5px",
  boxSizing: "border-box",
  maxHeight: "57vh",
  [theme.breakpoints.up("md")]: {
    maxHeight: "65.5vh",
  },
  [theme.breakpoints.up("lg")]: {
    maxHeight: "63.5vh",
  },
  overflowY: showButton ? "hidden" : "auto",
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
  color: theme.palette.app.primary,
}));

export const StyledTypographyStatus = styled(Typography)({
  marginLeft: "8px",
  marginBottom: "5px",
});

export const StyledTypographyCount = styled(Typography)({
  marginLeft: "5px",
});

export const StyledWrapperBoxCircle = styled(Box)({
  textAlign: "center",
  marginTop: "15px",
});

export const StyledWrapper = styled(Box)({
  padding: "25px 10px 5px 20px",
  width: "390px",
});

export const StyledDialogContent = styled(DialogContent)({
  textAlign: "center",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(1),
  flexDirection: "row",
  justifyContent: "space-around",
  marginBottom: "15px",
}));

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});

export const StyledRowStack = styled(Stack)({
  flexDirection: "row",
});

export const StyledCardBox = styled(Box)({
  marginBottom: "16px",
});

export const StyledButton = styled(Button)({
  width: "145px",
});

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.app.black,
}));
