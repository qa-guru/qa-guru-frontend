import { FC } from "react";
import { StyledBox, StyledFooter, StyledLogo } from "./footer.styled";

const Footer: FC = () => {
  return (
    <StyledFooter>
      <StyledBox>
        <StyledLogo />
      </StyledBox>
    </StyledFooter>
  );
};

export default Footer;
