import { styled } from "@mui/system";
import { Box, Container } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  minWidth: "100%",
});

export const StyledContainer = styled(Container)({
  flexGrow: 1,
  minWidth: "100%",
});

export const StyledBreadcrumbsContainer = styled(Container)(({ theme }) => ({
  marginBottom: "15px",
}));

export const StyledBreadcrumbsBox = styled(Box)(({ theme }) => ({
  marginLeft: "20px",
  [theme.breakpoints.up(1920)]: {
    marginLeft: 0,
  },
}));
