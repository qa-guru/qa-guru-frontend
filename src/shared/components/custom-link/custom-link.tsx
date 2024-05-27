import { FC } from "react";

import { StyledLink } from "./custom-link.styled";
import { ICustomLink } from "./custom-link.types";

const CustomLink: FC<ICustomLink> = ({
  path,
  children,
  opacity,
  textDecorationHover,
  color,
}) => {
  return (
    <StyledLink
      to={path}
      opacity={opacity}
      textDecorationHover={textDecorationHover}
      color={color}
    >
      {children}
    </StyledLink>
  );
};

export default CustomLink;
