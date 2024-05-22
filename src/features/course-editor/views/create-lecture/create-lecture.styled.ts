import { Stack, darken, styled } from "@mui/system";
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

export const StyledButtonsStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "16px",
  marginBottom: "35px",
});

export const StyledCancelButton = styled(Button)({
  gap: "8px",
});

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.app.pinkMain,
  color: theme.palette.app.white,
  gap: "8px",
  "&:hover": {
    backgroundColor: darken(theme.palette.app.pinkMain, 0.25),
  },
}));
