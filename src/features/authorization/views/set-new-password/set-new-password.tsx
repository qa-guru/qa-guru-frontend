import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
import { ISetNewPassword } from "./set-new-password.types";

const SetNewPassword: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routeLogin = () => {
    navigate("/login");
  };

  const {
    control,
    formState: { errors },
  } = useForm<ISetNewPassword>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required(t("email.required")!),
        password: yup.string().required(t("password.required")!),
      })
    ),
  });

  return (
    <StyledWrapper>
      <StyledLogo />
      <StyledPaper>
        <form>
          <StyledStack>
            <InputText
              control={control}
              name="username"
              placeholder={t("enter.email")}
              label="E-mail"
              errors={errors}
            />
            <InputText
              control={control}
              name="password"
              placeholder={t("enter.password")}
              label={t("password")}
              type="password"
              errors={errors}
            />
            <InputText
              control={control}
              name="password"
              placeholder={t("password.confirm")}
              label={t("password")}
              type="password"
              errors={errors}
            />
            <StyledResetButton variant="contained" onClick={routeLogin}>
              Сохранить
            </StyledResetButton>
          </StyledStack>
        </form>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default SetNewPassword;
