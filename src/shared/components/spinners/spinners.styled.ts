import { styled } from "@mui/system";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

export const StyledGrid = styled(Grid)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  justifyContent: "center",
  alignItems: "center",
});

export const StyledHomeworksBox = styled(Box)({
  display: "flex",
  gap: "10px",
  marginTop: "15px",
  alignItems: "center",
});

export const StyledTitle = styled(Typography)({
  margin: "10px 0 20px",
});

export const StyledSpinner = styled(CircularProgress)({
  marginBottom: "8px",
});
