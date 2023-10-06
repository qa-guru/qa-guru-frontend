import { Box, styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const StyledNavigateButton = styled(Button)(({ theme }) => ({
  marginBottom: "25px",
  color: theme.palette.primary.main,
}));

export const StyledIcon = styled(ArrowBackIcon)({
  marginRight: "10px",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const StyledTypography = styled(Typography)({
  textTransform: "none",
});
