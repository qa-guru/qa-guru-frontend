import { styled } from "@mui/system";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  padding: "35px 25px",
  maxHeight: "73.6vh",
  overflowY: "auto",
  backgroundColor: theme.palette.app.lightGrey,
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",
}));

export const StyledStatusContentBox = styled(Box)({
  marginTop: "15px",
});

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.app.textPrimary,
  "&:hover": { color: theme.palette.app.primary },
}));

export const StyledId = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "row",
  alignItems: "center",
}));

export const StyledIcon = styled(OpenInNewIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  marginTop: "25px",
  gap: theme.spacing(2),
  flexDirection: "row",
}));

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
});

export const StyledTypography = styled(Typography)({
  flexWrap: "nowrap",
});

export const StyledTitle = styled(Typography)({
  marginBottom: "15px",
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.app.primary,
  color: theme.palette.app.white,
  width: "35px",
  height: "35px",
}));
