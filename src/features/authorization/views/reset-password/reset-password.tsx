import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputText } from "shared/components/form";

import { IResetPassword } from "./reset-password.types";
import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./reset-password.styled";

const ResetPassword: FC<IResetPassword> = ({ onPasswordReset, loading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().email().required(t("email.required")),
      })
    ),
  });

  const onSubmit = () => {
    navigate("/reset/message");
  };

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledStack>
            <InputText
              control={control}
              name="username"
              placeholder={t("enter.email")}
              label="E-mail"
              errors={errors}
            />
            <StyledResetButton
              type="submit"
              variant="contained"
              disabled={loading}
            >
              Сбросить пароль
            </StyledResetButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default ResetPassword;
