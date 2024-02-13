import { styled } from "@mui/system";
import { Link } from "@mui/material";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  textAlign: "start",
  "&:hover": {
    textDecoration: "underline",
  },
})) as typeof Link;
