import { Box, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StyledWrapper = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
});

export const StyledBox = styled(Box)({
  maxWidth: "220px",
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.app.secondary,
  borderRadius: "100px",
  [theme.breakpoints.only("xs")]: {
    borderRadius: "30px",
  },
  padding: "7px 7px 7px 18px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "100%",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "7px",
  [theme.breakpoints.only("xs")]: {
    padding: 0,
  },
}));
