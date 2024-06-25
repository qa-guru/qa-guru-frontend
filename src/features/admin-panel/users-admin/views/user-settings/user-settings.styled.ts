import { Box, Button, DialogContent, Stack } from "@mui/material";
import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";

export const StyledWrapper = styled(Box)({
  padding: "15px",
});

export const StyledDialogContent = styled(DialogContent)({
  padding: "9px",
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
