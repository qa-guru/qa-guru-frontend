import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { InputText } from "shared/components/form";
import { useNavigate } from "react-router-dom";
import ThemeSelector from "shared/components/theme-selector";

import { IResetForm, IResetPassword } from "./reset-password.types";
import {
  StyledBottomStack,
  StyledButton,
  StyledLoadingButton,
  StyledSelectorWrapper,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "../views.styled";
import { ROUTES } from "../../constants";

const ResetPassword: FC<IResetPassword> = ({ resetPassword, isLoading }) => {
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
        username: yup
          .string()
          .transform((value) => value.toLowerCase())
          .email("Некорректный e-mail")
          .required("Введите e-mail"),
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
      <StyledSelectorWrapper>
        <ThemeSelector />
      </StyledSelectorWrapper>
      <StyledLogo />
      <StyledPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledStack>
            <InputText
              control={control}
              name="username"
              placeholder="Введите E-mail"
              label="E-mail"
              InputLabelProps={{ shrink: true }}
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
              Вход
            </StyledButton>
          </StyledBottomStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default ResetPassword;
