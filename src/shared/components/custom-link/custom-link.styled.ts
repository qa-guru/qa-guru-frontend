import { styled } from "@mui/system";
import { Link } from "react-router-dom";

interface IStyledLink {
  isAvatar?: boolean;
  isUserRow?: boolean;
  isButton?: boolean;
}

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) =>
    !["isAvatar", "isUserRow", "isButton"].includes(prop as string),
})<IStyledLink>(({ theme, isAvatar, isUserRow, isButton }) => ({
  cursor: "pointer",
  color: isButton ? theme.palette.app.white : theme.palette.app.primary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: isUserRow && "underline",
    opacity: isAvatar && "0.7",
  },
}));
