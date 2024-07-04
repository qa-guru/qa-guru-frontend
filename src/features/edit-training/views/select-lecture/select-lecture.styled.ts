import { styled } from "@mui/system";
import { Box, Button, darken, DialogContent, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import InfiniteScroll from "react-infinite-scroll-component";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  padding: "5px 0 0",
  margin: "20px 0",
  height: "calc(100dvh - 278px)",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 305px)",
  },
  [theme.breakpoints.only("xs")]: {
    height: "calc(100dvh - 265px)",
  },
}));

export const StyledDialogContent = styled(DialogContent)({
  overflowY: "auto",
  margin: 0,
  padding: "15px 0 0",
  scrollbarWidth: "none",
});

export const StyledBox = styled(Box)({
  marginTop: "25px",
  textAlign: "center",
});

export const StyledButtonBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledModalButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.app.pinkMain,
  color: theme.palette.app.white,
  gap: "8px",
  "&:hover": {
    backgroundColor: darken(theme.palette.app.pinkMain, 0.25),
  },
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "flex-end",
  [theme.breakpoints.only("xs")]: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 2000,
    width: "100%",
    backgroundColor: theme.palette.app.menu,
  },
}));

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
  marginRight: "5px",
  [theme.breakpoints.up("sm")]: {
    position: "absolute",
    cursor: "pointer",
    zIndex: 2000,
    top: "2px",
    right: "4px",
  },
}));

export const StyledInfiniteScroll = styled(InfiniteScroll)(({ theme }) => ({
  overflow: "visible",
  [theme.breakpoints.only("xs")]: {
    marginTop: "10px",
  },
}));
