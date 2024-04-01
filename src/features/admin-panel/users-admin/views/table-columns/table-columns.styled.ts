import { styled } from "@mui/system";
import { Box, Stack, Typography } from "@mui/material";

export const StyledUserRowBox = styled(Box)({
  position: "absolute",
  left: "10px",
});

export const StyledAlignStack = styled(Stack)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

export const StyledRating = styled(Typography)({
  marginTop: "50px",
});

export const StyledRatingBox = styled(Box)({
  textAlign: "end",
  marginTop: "40px",
});

export const StyledRightAlignBox = styled(Box)({
  marginLeft: "auto",
  position: "absolute",
  right: 0,
});

export const StyledEmail = styled(Typography)(({ theme }) => ({
  minWidth: "160px",
  wordBreak: "keep-all",
  [theme.breakpoints.only("xs")]: {
    wordBreak: "break-all",
  },
}));

export const StyledMobileBox = styled(Box)({
  textAlign: "end",
});

export const StyledDate = styled(Typography)({
  whiteSpace: "nowrap",
});
