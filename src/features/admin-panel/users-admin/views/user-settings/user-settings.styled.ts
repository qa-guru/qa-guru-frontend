import {
  DialogActions,
  DialogContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledPaper = styled(Paper)({
  padding: "20px",
  width: "100%",
  overflow: "visible",
});

export const StyledTypography = styled(Typography)({
  marginBottom: "15px",
});

export const StyledWrapper = styled(Stack)({
  padding: "15px",
});

export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  padding: "9px",
  gap: "20px",
});

export const StyledDialogActions = styled(DialogActions)({
  flexDirection: "column",
  gap: "15px",
});

export const StyledStack = styled(Stack)({
  width: "100%",
  gap: "40px",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",
});

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  position: "absolute",
  top: "5px",
  right: "5px",
  color: theme.palette.app.primary,
  marginRight: "5px",
  [theme.breakpoints.up("sm")]: {
    margin: "5px 15px 0 0",
    cursor: "pointer",
  },
}));
