import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface IStyledColumn {
  showButton?: boolean;
}

export const StyledWrapperColumnContainer = styled(Box)<IStyledColumn>(
  ({ theme, showButton }) => ({
    flexGrow: 1,
    marginTop: "5px",
    boxSizing: "border-box",
    maxHeight: "72vh",
    [theme.breakpoints.up("lg")]: {
      maxHeight: "69.5vh",
    },
    overflowY: showButton ? "hidden" : "auto",
  })
);

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

export const StyledInfiniteScroll = styled(InfiniteScroll)(({ theme }) => ({
  overflow: "visible",
}));

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
  color: theme.palette.black.main,
}));
