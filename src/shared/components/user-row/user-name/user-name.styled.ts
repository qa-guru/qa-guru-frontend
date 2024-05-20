import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.app.primary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));
