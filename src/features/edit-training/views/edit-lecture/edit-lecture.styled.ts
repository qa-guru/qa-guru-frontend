import { darken, Stack, styled } from "@mui/system";
import { Button, Paper } from "@mui/material";

export const StyledPaperStack = styled(Stack)({
  flexDirection: "column",
  gap: "20px",
  marginBottom: "25px",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  [theme.breakpoints.down("md")]: {
    padding: "12px",
  },
}));

export const StyledInfoStack = styled(Stack)({
  flexDirection: "column",
  width: "100%",
  gap: "20px",
});

export const StyledButtonsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "35px",
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

export const StyledContinueButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
  gap: "8px",
}));

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.app.pinkMain,
  color: theme.palette.app.white,
  "&:hover": {
    backgroundColor: darken(theme.palette.app.pinkMain, 0.25),
  },
}));
