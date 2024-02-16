import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputText } from "shared/components/form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import LocalSelector from "shared/components/local-selector/local-selector";

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
  const { t } = useTranslation();

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
        newPassword: yup.string().required(t("password.required")),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("newPassword")], t("passwords.mismatch"))
          .required(t("password.required")),
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
        <LocalSelector />
      </StyledLocalSelectorWrapper>
      <StyledLogo />
      <StyledPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledStack>
            <InputText
              control={control}
              name="newPassword"
              placeholder={t("enter.password")}
              label={t("password")}
              type="password"
              errors={errors}
            />
            <InputText
              control={control}
              name="confirmPassword"
              placeholder={t("password.confirm")}
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
