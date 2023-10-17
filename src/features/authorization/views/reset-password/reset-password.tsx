import React from "react";
import { FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { IReset } from "./reset-password.types";
import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./reset-password.styled";
import RHF from "../../../../shared/components/input-RHF";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routeResetMessage = () => {
    navigate("/reset/message");
  };

  const {
    control,
    formState: { errors },
  } = useForm<IReset>({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(t("email.required")!),
      })
    ),
  });

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledPaper>
        <form>
          <StyledStack>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="username"
                placeholder={t("enter.email")!}
                label="E-mail"
              />
            </FormControl>
            <StyledResetButton variant="contained" onClick={routeResetMessage}>
              Сбросить пароль
            </StyledResetButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default ResetPassword;
