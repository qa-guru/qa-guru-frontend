import { styled } from "@mui/system";
import { Box, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(3),
  marginTop: "25px",
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  flexDirection: "row",
}));

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
});

export const StyledTitle = styled(Typography)({
  marginBottom: "15px",
});

export const StyledIcon = styled(ArrowBackIcon)({
  marginRight: "10px",
});

export const StyledAnswerBox = styled(Box)({
  marginBottom: "24px",
});
