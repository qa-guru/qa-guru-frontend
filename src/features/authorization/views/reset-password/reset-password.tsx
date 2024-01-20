import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { InputText } from "shared/components/form";
import LocalSelector from "shared/components/local-selector/local-selector";
import { useNavigate } from "react-router-dom";

import { IResetForm, IResetPassword } from "./reset-password.types";
import {
  StyledBottomStack,
  StyledButton,
  StyledLoadingButton,
  StyledLocalSelectorWrapper,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "../views.styled";
import { ROUTES } from "../../constants";

const ResetPassword: FC<IResetPassword> = ({ resetPassword, isLoading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const routeLogin = () => {
    navigate(ROUTES.AUTHORIZATION);
  };

  return (
    <StyledWrapper>
      <StyledLocalSelectorWrapper>
        <LocalSelector />
      </StyledLocalSelectorWrapper>
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
            <StyledLoadingButton
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              Сбросить пароль
            </StyledLoadingButton>
          </StyledStack>
          <StyledBottomStack>
            <StyledButton variant="text" onClick={routeLogin}>
              {t("auth.route")}
            </StyledButton>
          </StyledBottomStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default ResetPassword;
