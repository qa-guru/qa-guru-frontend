import { styled } from "@mui/system";
import { Autocomplete, Box, Stack } from "@mui/material";

export const StyledAlignStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const StyledIconBox = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: "20px",
}));

export const StyledRightAlignBox = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
}));

export const StyledAutocomplete = styled(Autocomplete)({
  margin: "12px",
  width: "30%",
});
