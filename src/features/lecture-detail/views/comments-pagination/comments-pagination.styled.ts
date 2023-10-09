import { styled } from "@mui/system";
import { Stack, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginTop: "5px",
  gap: theme.spacing(2),
}));

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});
