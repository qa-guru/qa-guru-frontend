import { styled } from "@mui/system";
import {
  Autocomplete,
  Box,
  Paper,
  Stack,
  Table,
  Typography,
} from "@mui/material";

interface IStyledNavigationButton {
  navigationType: string;
}

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledPaper = styled(Paper)({
  borderRadius: "2px",
  padding: "5px 0 0",
  marginBottom: "30px",
});

export const StyledTitle = styled(Typography)({
  marginBottom: "30px",
});

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
