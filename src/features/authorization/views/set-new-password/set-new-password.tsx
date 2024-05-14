import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import ThemeSelector from "shared/components/theme-selector";

import {
  StyledLoadingButton,
  StyledSelectorWrapper,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "../views.styled";
import { ISetNewPassword } from "./set-new-password.types";
import InputPassword from "../input-password";

const SetNewPassword: FC<ISetNewPassword> = ({ setNewPassword, isLoading }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        newPassword: yup.string().required("Введите пароль"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("newPassword")], "Пароли не совпадают")
          .required("Повторите пароль"),
      })
    ),
  });

  const onSubmit: SubmitHandler<{
    newPassword: string;
    confirmPassword: string;
  }> = async (data) => {
    await setNewPassword(data.newPassword);
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
            <InputPassword
              control={control}
              name="newPassword"
              placeholder="Введите пароль"
              label="Пароль"
              errors={errors}
            />
            <InputPassword
              control={control}
              name="confirmPassword"
              placeholder="Повторите пароль"
              label="Повторите пароль"
              errors={errors}
            />
            <StyledLoadingButton
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              Сохранить
            </StyledLoadingButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default SetNewPassword;
