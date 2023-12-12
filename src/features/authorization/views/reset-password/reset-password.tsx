import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { InputText } from "shared/components/form";

import { IResetForm, IResetPassword } from "./reset-password.types";
import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./reset-password.styled";

const ResetPassword: FC<IResetPassword> = ({ resetPassword, isLoading }) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IResetForm>({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().email().required(t("email.required")),
      })
    ),
  });

  const onSubmit = async (data: IResetForm) => {
    await resetPassword(data.username);
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
              disabled={isLoading}
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
