import React from "react";
import { StyledBox, StyledFooter, StyledLogo } from "./footer.styled";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <StyledBox>
        <StyledLogo />
      </StyledBox>
    </StyledFooter>
  );
};

export default Footer;
