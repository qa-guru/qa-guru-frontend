import { styled } from "@mui/system";
import { Box, Button, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledWrapperColumnContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  boxSizing: "border-box",
  height: "calc(100vh - 295px)",
  marginTop: "12px",
  overflowY: "auto",
  scrollbarWidth: "none",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 283px )",
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

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
  marginTop: "-4px",
});

export const StyledRowStack = styled(Stack)({
  flexDirection: "row",
});

export const StyledCardBox = styled(Box)({
  marginBottom: "16px",
});
