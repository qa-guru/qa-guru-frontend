import { styled } from "@mui/system";
import { Box, Paper } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: "8px 25px",
  maxHeight: "76vh",
  overflowY: "auto",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));
