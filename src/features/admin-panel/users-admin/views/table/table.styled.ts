import { styled } from "@mui/system";
import { Box, Paper } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface IStyledPaper {
  hasMoreUsers: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "hasMoreUsers",
})<IStyledPaper>(({ theme, hasMoreUsers }) => ({
  borderRadius: "10px",
  padding: "5px 0 0",
  margin: hasMoreUsers ? "20px 0 0" : "20px 0 40px",
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "none",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "10px 10px 0 0",
    margin: hasMoreUsers ? "0" : "0 0 20px",
  },
}));

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});
