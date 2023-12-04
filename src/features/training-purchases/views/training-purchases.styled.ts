import { styled } from "@mui/system";
import { Box, CardActionArea, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledGrid = styled(Grid)({
  marginTop: "20px",
  justifyContent: "space-between",
});

export const StyledCardActionArea = styled(CardActionArea)({
  height: "100%",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("md")]: {
    padding: "20px",
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "uppercase",
}));

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
});
