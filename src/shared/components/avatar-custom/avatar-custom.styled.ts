import { styled } from "@mui/system";
import { Link, Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
}) as typeof Link;
