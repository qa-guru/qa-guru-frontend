import { FC } from "react";
import { IconButton, Typography, Link } from "@mui/material";

import {
  StyledBox,
  StyledIconBox,
  StyledLogo,
  StyledPaper,
  StyledSupportLink,
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
    <footer style={{ zIndex: 2 }}>
      <StyledPaper>
        <StyledWrapper>
          <StyledBox>
            <StyledLogo />
          </StyledBox>
          <StyledSupportLink href="https://t.me/qa_guru_support">
            <Typography variant="body1">Написать в поддержку</Typography>
          </StyledSupportLink>
          <StyledIconBox>
            {socialIcons.map((socialIcon) => (
              <SocialIcon
                key={socialIcon.id}
                icon={socialIcon.component}
                url={socialIcon.url}
              />
            ))}
          </StyledIconBox>
        </StyledWrapper>
      </StyledPaper>
    </footer>
  );
};

export default Footer;
