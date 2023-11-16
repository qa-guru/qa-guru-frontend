import { Box, styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const StyledNavigateButton = styled(Button)(({ theme }) => ({
  marginBottom: "25px",
  color: theme.palette.primary.main,
}));

export const StyledIcon = styled(ChevronLeftIcon)({
  marginRight: "10px",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginRight: "1vw",
});

export const StyledTypography = styled(Typography)({});
