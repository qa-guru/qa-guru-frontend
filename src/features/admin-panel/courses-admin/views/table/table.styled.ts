import { styled } from "@mui/system";
import { Box, Paper } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface IStyledPaper {
  hasMoreTrainings: boolean;
}

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "hasMoreTrainings",
})<IStyledPaper>(({ theme, hasMoreTrainings }) => ({
  borderRadius: "10px",
  padding: "5px 0 0",
  margin: hasMoreTrainings ? "20px 0 0" : "20px 0 40px",
  height: "100%",
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    borderRadius: "10px 10px 0 0",
  },
}));

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

export const StyledInfiniteScroll = styled(InfiniteScroll)({
  overflow: "visible",
});
