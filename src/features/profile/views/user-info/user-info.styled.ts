import { styled } from "@mui/system";
import { Box, Paper, Stack } from "@mui/material";

export const StyledPaper = styled(Paper)({
  padding: "24px",
  width: "50%",
});

export const StyledRowStack = styled(Stack)({
  flexDirection: "row",
  gap: "15px",
});

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
  gap: "15px",
});

export const StyledInfoBox = styled(Box)({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledDateStack = styled(Stack)({
  flexDirection: "row",
  gap: "5px",
  flexWrap: "wrap",
});

export const StyledWebsiteStack = styled(Stack)({
  flexDirection: "row",
  gap: "5px",
});

export const StyledIconStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginTop: "16px",
  [theme.breakpoints.down("lg")]: {
    gap: "8px",
  },
}));
