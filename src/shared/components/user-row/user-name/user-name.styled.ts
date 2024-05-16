import { styled } from "@mui/system";
import { Link } from "@mui/material";

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.app.primary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));
