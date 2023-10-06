import { styled } from "@mui/system";
import { Box, ListItemText, MenuItem } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "min-content",
  marginLeft: "16px",
  color: theme.palette.black.main,
}));

export const StyledMenuItem = styled(MenuItem)({
  marginBottom: "10px",
});

export const StyledListItemText = styled(ListItemText)({
  marginRight: "20px",
});
