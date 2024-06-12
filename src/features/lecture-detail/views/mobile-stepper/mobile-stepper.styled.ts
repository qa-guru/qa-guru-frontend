import { styled } from "@mui/system";
import { Box, Icon, Paper } from "@mui/material";
import { Clear } from "@mui/icons-material";

export const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  zIndex: 5,
  backgroundColor: theme.palette.app.menu,
  width: "100vw",
}));

export const StyledClearIcon = styled(Clear)(({ theme }) => ({
  color: theme.palette.app.primary,
  marginRight: 0,
  cursor: "pointer",
}));

export const StyledMobilePaper = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 3000,
  height: "60px",
  borderRadius: 0,
}));

export const StyledIcon = styled(Icon)(({ theme }) => ({
  display: "flex",
  color: theme.palette.app.white,
  backgroundColor: theme.palette.app.primary,
  borderRadius: "50%",
  height: "35px",
  width: "35px",
  alignItems: "center",
  justifyContent: "center",
}));
