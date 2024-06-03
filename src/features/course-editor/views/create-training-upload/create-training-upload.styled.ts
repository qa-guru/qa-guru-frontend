import { Button, Paper, Stack, darken, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  [theme.breakpoints.down("md")]: {
    padding: "12px",
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

export const StyledButtonsStack = styled(Stack)(({ theme }) => ({
  marginTop: "20px",
  flexDirection: "row",
  justifyContent: "flex-end",
}));
