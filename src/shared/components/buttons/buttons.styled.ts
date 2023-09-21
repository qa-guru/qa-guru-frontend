import { Box, styled } from "@mui/system";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: "25px",
  color: theme.palette.primary.main,
}));

export const StyledIcon = styled(ArrowBackIcon)(({ theme }) => ({
  marginRight: "10px",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
