import { Paper, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  marginBottom: "16px",
  [theme.breakpoints.down("md")]: {
    padding: "12px",
  },
}));

export const StyledPreview = styled("pre")(({ theme }) => ({
  margin: 0,
  padding: "12px",
  overflow: "auto",
  fontSize: "0.85rem",
  background: theme.palette.action.hover,
  borderRadius: "8px",
}));

export const StyledFlagRow = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
});
