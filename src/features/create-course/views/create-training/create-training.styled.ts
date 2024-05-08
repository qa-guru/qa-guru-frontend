import { Stack, styled } from "@mui/system";
import { Paper } from "@mui/material";

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

export const StyledInfoStack = styled(Stack)({
  flexDirection: "column",
  width: "100%",
  gap: "20px",
});
