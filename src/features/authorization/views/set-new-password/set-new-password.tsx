import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import ThemeSelector from "shared/components/theme-selector";

import {
  StyledLoadingButton,
  StyledLocalSelectorWrapper,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "../views.styled";
import { ISetNewPassword } from "./set-new-password.types";

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
        newPassword: yup.string().required("Пароль обязательное поле"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("newPassword")], "Пароли не совпадают")
          .required("Пароль обязательное поле"),
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
      <StyledLocalSelectorWrapper>
        <ThemeSelector />
      </StyledLocalSelectorWrapper>
      <StyledLogo />
      <StyledPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledStack>
            <InputText
              control={control}
              name="newPassword"
              placeholder="Введите пароль"
              label="Пароль"
              type="password"
              errors={errors}
            />
            <InputText
              control={control}
              name="confirmPassword"
              placeholder="Повторите пароль"
              label="Повторите пароль"
              type="password"
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
