import { styled } from "@mui/system";
import { Box, CircularProgress, Typography } from "@mui/material";

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
