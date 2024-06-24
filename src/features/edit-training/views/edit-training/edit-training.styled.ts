import { Stack, styled } from "@mui/system";
import { Button, darken, Paper } from "@mui/material";

export const StyledPaperStack = styled(Stack)({
  flexDirection: "column",
  gap: "20px",
  marginBottom: "30px",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  [theme.breakpoints.down("md")]: {
    padding: "12px",
  },
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
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
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

export const StyledSubmitButtonsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "16px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.app.pinkMain,
  color: theme.palette.app.white,
  gap: "8px",
  "&:hover": {
    backgroundColor: darken(theme.palette.app.pinkMain, 0.25),
  },
}));

export const StyledContinueButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
  gap: "8px",
}));

export const StyledCancelButton = styled(Button)({
  gap: "8px",
});
