import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import InputText from "shared/components/form/input-text";
import { IReset } from "./reset-password.types";
import {
  StyledLogo,
  StyledPaper,
  StyledResetButton,
  StyledStack,
  StyledWrapper,
} from "./reset-password.styled";

const ResetPassword: FC = () => {
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
        username: yup.string().required(t("email.required")),
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
