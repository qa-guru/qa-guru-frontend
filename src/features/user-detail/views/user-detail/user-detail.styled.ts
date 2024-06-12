import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: "24px",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "12px",
  },
}));

export const StyledRowStack = styled(Stack)({
  flexDirection: "row",
  gap: "15px",
});

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
  gap: "15px",
});

export const StyledNameBox = styled(Box)({
  width: "fit-content",
});

export const StyledRatingBox = styled(Box)({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledHiddenIconBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
