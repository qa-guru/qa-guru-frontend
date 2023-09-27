import { styled } from "@mui/system";
import { Stack, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginTop: "5px",
  gap: theme.spacing(2),
}));

export const StyledInfiniteScroll = styled(InfiniteScroll)(({ theme }) => ({
  overflow: "visible",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
}));
