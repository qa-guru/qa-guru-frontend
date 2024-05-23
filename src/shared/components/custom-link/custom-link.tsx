import { FC } from "react";

import { StyledLink } from "./custom-link.styled";
import { ICustomLink } from "./custom-link.types";

const CustomLink: FC<ICustomLink> = ({
  path,
  children,
  isAvatar,
  isUserRow,
  isButton,
}) => {
  return (
    <StyledLink
      to={path}
      isAvatar={isAvatar}
      isUserRow={isUserRow}
      isButton={isButton}
    >
      {children}
    </StyledLink>
  );
};

export default CustomLink;
