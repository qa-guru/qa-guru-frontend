import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Scalars, UserCreateInput } from "api/graphql/generated/graphql";
import { InputPhone, InputText } from "shared/components/form";
import ThemeSelector from "shared/components/theme-selector";

import {
  StyledBottomStack,
  StyledButton,
  StyledLoadingButton,
  StyledLocalSelectorWrapper,
  StyledLogo,
  StyledPaper,
  StyledSignupBox,
  StyledSignupStack,
  StyledSignupWrapper,
} from "../views.styled";
import { ISignUp } from "./signup.types";
import { REQUIRED_SYMBOLS, ROUTES } from "../../constants";

interface UserCreateInputCustom extends UserCreateInput {
  confirmPassword: Scalars["String"];
}

const Signup: FC<ISignUp> = (props) => {
  const { signup, isLoading } = props;
  const navigate = useNavigate();

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
    },
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required("Введите имя"),
        lastName: yup.string().required("Введите фамилию"),
        email: yup
          .string()
          .email("Некорректный e-mail")
          .required("Введите e-mail"),
        password: yup
          .string()
          .required("Введите пароль")
          .min(REQUIRED_SYMBOLS.MIN, "Необходимо более 8 символов"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Пароли не совпадают")
          .required("Повторите пароль"),
        phoneNumber: yup.string().required("Введите телефон"),
      })
    ),
  });

  const passwordsMatch = getValues("password") === getValues("confirmPassword");

  const routeLogin = () => {
    navigate(ROUTES.AUTHORIZATION);
  };

  const onSubmit: SubmitHandler<UserCreateInputCustom> = (data) => {
    const { confirmPassword, ...submitData } = data;

    if (passwordsMatch) {
      signup(submitData);
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
    <StyledSignupWrapper>
      <StyledLocalSelectorWrapper>
        <ThemeSelector />
      </StyledLocalSelectorWrapper>
      <StyledSignupBox>
        <StyledLogo />
        <StyledPaper>
          <form>
            <StyledSignupStack>
              <InputText
                control={control}
                name="firstName"
                placeholder="Введите ваше имя"
                label="Имя"
                errors={errors}
              />
              <InputText
                control={control}
                name="lastName"
                placeholder="Введите фамилию"
                label="Фамилия"
                errors={errors}
              />
              <InputText
                control={control}
                name="email"
                placeholder="Введите E-mail"
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
            </StyledSignupStack>
            <StyledLoadingButton
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              variant="contained"
            >
              Зарегистрироваться
            </StyledLoadingButton>
          </form>
          <StyledBottomStack>
            <StyledButton variant="text" onClick={routeLogin}>
              Вход
            </StyledButton>
          </StyledBottomStack>
        </StyledPaper>
      </StyledSignupBox>
    </StyledSignupWrapper>
  );
};

export default Signup;
