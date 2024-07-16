import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface IStyledPaper {
  hasMoreTrainingLectures: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "hasMoreTrainingLectures",
})<IStyledPaper>(({ hasMoreTrainingLectures }) => ({
  borderRadius: "10px",
  padding: "5px 0 0",
  margin: hasMoreTrainingLectures ? "20px 0 0" : "20px 0 40px",
  height: "100%",
  overflowY: "auto",
}));

export const StyledButtonStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "10px",
  [theme.breakpoints.only("xs")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
}));

export const StyledButtonsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "30px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

export const StyledSubmitButtonsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});
