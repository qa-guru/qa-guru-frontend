import { styled } from "@mui/system";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(3),
  marginTop: "25px",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white.main,
  width: "40px",
  height: "40px",
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  flexDirection: "row",
}));

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
});

export const StyledAnswerPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginBottom: "24px",
}));

export const StyledTitle = styled(Typography)({
  marginBottom: "15px",
});

export const StyledNavigateButton = styled(Button)(({ theme }) => ({
  marginBottom: "25px",
  color: theme.palette.primary.main,
}));

export const StyledIcon = styled(ArrowBackIcon)({
  marginRight: "10px",
});

export const StyledTypography = styled(Typography)({
  textTransform: "none",
});
