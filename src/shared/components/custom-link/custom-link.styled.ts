import { styled } from "@mui/system";
import { Link } from "react-router-dom";

interface IStyledLink {
  opacity?: string;
  textDecorationHover?: string;
  color?: string;
}

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) =>
    !["opacity", "textDecorationHover", "color"].includes(prop as string),
})<IStyledLink>(({ theme, opacity, textDecorationHover, color }) => ({
  cursor: "pointer",
  color: color ?? theme.palette.app.primary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: textDecorationHover,
    opacity,
  },
}));
