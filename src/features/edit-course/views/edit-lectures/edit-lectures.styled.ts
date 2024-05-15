import { darken, styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(3),
  margin: "10px 0",
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(0.5),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  minWidth: "40px",
  height: "40px",
  backgroundColor: theme.palette.app.primary,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.app.white,
}));

export const StyledStack = styled(Stack)({
  marginTop: "15px",
  flexDirection: "row",
  gap: "12px",
  alignItems: "center",
});

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.primary,
  textTransform: "uppercase",
}));

export const StyledButtonsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "20px",
  paddingBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.app.pinkMain,
  color: theme.palette.app.white,
  gap: "8px",
  "&:hover": {
    backgroundColor: darken(theme.palette.app.pinkMain, 0.25),
  },
}));

export const StyledCancelButton = styled(Button)({
  gap: "8px",
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.app.primary,
  color: theme.palette.app.white,
  "&:hover": {
    color: theme.palette.app.textSecondary,
    backgroundColor: theme.palette.app.secondary,
  },
}));
