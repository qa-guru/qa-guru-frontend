import { styled } from "@mui/system";
import { Box, Container } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  minWidth: "100%",
});

export const StyledContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minWidth: "100%",
  [theme.breakpoints.only("xs")]: {
    marginTop: "70px",
  },
}));

export const StyledBreadcrumbsContainer = styled(Container)({
  marginBottom: "15px",
  paddingTop: "65px",
});

export const StyledBreadcrumbsBox = styled(Box)(({ theme }) => ({
  paddingTop: "65px",
  [theme.breakpoints.only("sm")]: {
    marginLeft: "10px",
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: "20px",
  },
  [theme.breakpoints.up(1955)]: {
    marginLeft: 0,
  },
}));
