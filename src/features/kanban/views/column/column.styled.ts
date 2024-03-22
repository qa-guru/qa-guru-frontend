import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface IStyledColumn {
  showButton?: boolean;
}

export const StyledWrapperColumnContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "showButton",
})<IStyledColumn>(({ showButton, theme }) => ({
  flexGrow: 1,
  marginTop: "5px",
  boxSizing: "border-box",
  height: "calc(100vh - 100px - 130px - 60px )",
  overflowY: showButton ? "hidden" : "auto",
  [theme.breakpoints.down("md")]: {
    height: showButton
      ? "calc(100dvh - 100px - 175px - 60px )"
      : "calc(100dvh - 100px - 130px - 60px )",
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
  margin: "5px auto",
  color: theme.palette.app.primary,
  textAlign: "center",
  width: "100%",
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
  padding: "30px 20px 10px",
  width: "300px",
});

export const StyledDialogContent = styled(DialogContent)({
  textAlign: "center",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: "40px",
  flexDirection: "row",
  justifyContent: "space-between",
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

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.app.white,
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.app.black,
}));
