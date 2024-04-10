import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledWrapperColumnContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginTop: "12px",
  boxSizing: "border-box",
  height: "calc(100vh - 199px)",
  overflowY: "auto",
  scrollbarWidth: "none",
  [theme.breakpoints.only("sm")]: {
    height: "calc(100dvh - 210px)",
  },
  [theme.breakpoints.only("xs")]: {
    height: "calc(100dvh - 194px)",
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
  marginTop: "-4px",
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

export const StyledBoxWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});
