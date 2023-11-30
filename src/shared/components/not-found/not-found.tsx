import { FC } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link } from "@mui/material";
import {
  StyledAlignBox,
  StyledButton,
  StyledCaptionTypography,
  StyledLensImage,
  StyledTypography,
  StyledWrapper,
} from "./not-found.styled";

const NotFound: FC = () => {
  return (
    <StyledWrapper>
      <StyledLensImage />
      <StyledAlignBox>
        <StyledTypography variant="h4">
          Nothing to see here! Please disperse!
        </StyledTypography>
        <StyledCaptionTypography>
          Мы не знаем, что тут написать:) <br /> А вы можете
        </StyledCaptionTypography>
        <Link href="https://t.me/qa_guru_support">
          <StyledButton variant="contained">
            Написать в поддержку
            <MailOutlineIcon />
          </StyledButton>
        </Link>
      </StyledAlignBox>
    </StyledWrapper>
  );
};

export default NotFound;
