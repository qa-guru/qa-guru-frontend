import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
  "&:hover": {
    opacity: "0.7",
  },
});
