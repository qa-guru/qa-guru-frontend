import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputText } from "shared/components/form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./set-new-password.styled";
import { ISetNewPassword, ISetNewPasswordForm } from "./set-new-password.types";

const SetNewPassword: FC<ISetNewPassword> = ({ onSet, loading }) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ISetNewPasswordForm>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        newPassword: yup.string().required(t("password.required")!),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("newPassword")], t("passwords.mismatch"))
          .required(t("password.required")),
      })
    ),
  });

  const onSubmit = (data: ISetNewPasswordForm) => {
    onSet(data.newPassword, data.token);
  };

  return (
    <StyledWrapper>
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
            <StyledResetButton
              variant="contained"
              type="submit"
              disabled={loading}
            >
              Сохранить
            </StyledResetButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default SetNewPassword;
