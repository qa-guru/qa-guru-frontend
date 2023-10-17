import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./reset-password-message.styled";

const ResetPasswordMessage: React.FC = () => {
  const navigate = useNavigate();

  const routeLogin = () => {
    navigate("/reset/password");
  };

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledPaper>
        <StyledStack>
          <Typography>
            На ваш E-mail была отправлена ссылка для сброса пароля
          </Typography>
          <StyledResetButton variant="contained" onClick={routeLogin}>
            Ok
          </StyledResetButton>
        </StyledStack>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default ResetPasswordMessage;
