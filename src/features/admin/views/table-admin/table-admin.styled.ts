import { styled } from "@mui/system";
import {
  Button,
  DialogContent,
  Paper,
  Stack,
  Table,
  Typography,
} from "@mui/material";

export const StyledPaper = styled(Paper)({
  borderRadius: "2px",
  padding: "5px 0 0",
  marginBottom: "15px",
});

export const StyledTable = styled(Table)({
  tableLayout: "fixed",
});

export const StyledTitle = styled(Typography)({
  marginBottom: "30px",
});

export const StyledDialogContent = styled(DialogContent)({
  textAlign: "center",
});

export const StyledStack = styled(Stack)({
  flexDirection: "column",
  margin: "0 auto",
  gap: "10px",
  maxWidth: "120px",
});

export const StyledLoadMoreButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
}));
