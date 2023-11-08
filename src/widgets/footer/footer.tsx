import { FC } from "react";
import { IconButton, Link } from "@mui/material";
import {
  StyledBox,
  StyledLogo,
  StyledPaper,
  StyledWrapper,
} from "./footer.styled";
import { ISocialIcon, socialIcons } from "./footer.types";

const Footer: FC = () => {
  const SocialIcon: FC<ISocialIcon & { url: string }> = ({
    icon: Icon,
    url,
  }) => (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <IconButton>
        <Icon />
      </IconButton>
    </Link>
  );

  return (
    <footer>
      <StyledPaper>
        <StyledWrapper>
          <StyledBox>
            <StyledLogo />
          </StyledBox>
          {socialIcons.map((socialIcon) => (
            <SocialIcon
              key={socialIcon.id}
              icon={socialIcon.component}
              url={socialIcon.url}
            />
          ))}
        </StyledWrapper>
      </StyledPaper>
    </footer>
  );
};

export default Footer;
