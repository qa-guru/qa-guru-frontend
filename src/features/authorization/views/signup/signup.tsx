import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import LocalSelector from "shared/components/local-selector";
import { UserCreateInput } from "api/graphql/generated/graphql";
import { InputPhone, InputText } from "shared/components/form";

import {
  StyledBottomStack,
  StyledButton,
  StyledLoadingButton,
  StyledLocalSelectorWrapper,
  StyledLogo,
  StyledPaper,
  StyledStack,
} from "../views.styled";
import { ISignUp } from "./signup.types";
import { REQUIRED_SYMBOLS, ROUTES } from "../../constants";
import { StyledScreenBox, StyledWrapper } from "./signup.styled";

const Signup: FC<ISignUp> = (props) => {
  const { signup, isLoading } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required(t("firstName.required")),
        lastName: yup.string().required(t("lastName.required")),
        email: yup.string().required(t("email.required")),
        password: yup
          .string()
          .min(REQUIRED_SYMBOLS.MIN, t("password.required.min"))
          .max(REQUIRED_SYMBOLS.MAX, t("password.required.max"))
          .required(t("password.required")),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password")], t("passwords.mismatch"))
          .required(t("password.required")),
        phoneNumber: yup.string().required(t("phone.required")),
      })
    ),
  });

  const routeLogin = () => {
    navigate(ROUTES.AUTHORIZATION);
  };

  const passwordsMatch = getValues("password");

  const onSubmit: SubmitHandler<UserCreateInput> = (data) => {
    if (passwordsMatch) {
      signup(data);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <StyledWrapper>
      <StyledLocalSelectorWrapper>
        <LocalSelector />
      </StyledLocalSelectorWrapper>
      <StyledScreenBox>
        <StyledLogo />
        <StyledPaper>
          <form>
            <StyledStack>
              <InputText
                control={control}
                name="firstName"
                placeholder="Введите ваше имя"
                label={t("firstName")}
                errors={errors}
              />
              <InputText
                control={control}
                name="lastName"
                placeholder="Введите фамилию"
                label={t("lastName")}
                errors={errors}
              />
              <InputText
                control={control}
                name="email"
                placeholder={t("enter.email")}
                label="E-mail"
                errors={errors}
              />
              <InputPhone
                control={control}
                name="phoneNumber"
                placeholder="(555) 555-5555"
                label="Phone"
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
                name="confirmPassword"
                placeholder={t("password.confirm")}
                label="Повторите пароль"
                type="password"
                errors={errors}
              />
              <StyledLoadingButton
                onClick={handleSubmit(onSubmit)}
                loading={isLoading}
                variant="contained"
              >
                {t("registration")}
              </StyledLoadingButton>
            </StyledStack>
          </form>
          <StyledBottomStack>
            <StyledButton variant="text" onClick={routeLogin}>
              {t("auth.route")}
            </StyledButton>
          </StyledBottomStack>
        </StyledPaper>
      </StyledScreenBox>
    </StyledWrapper>
  );
};

export default Signup;
