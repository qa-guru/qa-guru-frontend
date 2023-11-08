import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  StyledAlignBox,
  StyledButton,
  StyledCaptionTypography,
  StyledLensImage,
  StyledTypography,
  StyledWrapper,
} from "./no-data-error-page.styled";

const NoDataErrorPage: React.FC = () => {
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
        <StyledButton variant="contained">
          Написать в поддержку
          <MailOutlineIcon />
        </StyledButton>
      </StyledAlignBox>
    </StyledWrapper>
  );
};

export default NoDataErrorPage;
