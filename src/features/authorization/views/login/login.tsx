import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { InputText } from "shared/components/form";
import { useNavigate } from "react-router-dom";
import LocalSelector from "shared/components/local-selector/local-selector";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { ILogin, ILoginForm } from "./login.types";
import {
  StyledBottomStack,
  StyledButton,
  StyledLoadingButton,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
  StyledLocalSelectorWrapper,
} from "../views.styled";
import { ROUTES } from "../../constants";
import { StyledIconButton } from "../../../../widgets/header/header.styled";
import useSettings from "../../../../shared/hooks/use-settings";

const Login: FC<ILogin> = (props) => {
  const { isLoading, login } = props;
  const navigate = useNavigate();
  const { settings, toggleTheme } = useSettings();

  const routeRegister = () => {
    navigate(ROUTES.SIGNUP);
  };

  const roureReset = () => {
    navigate(ROUTES.RESET);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required("E-mail обязательное поле"),
        password: yup.string().required("Пароль обязательное поле"),
      })
    ),
  });

  const doLogin: SubmitHandler<ILoginForm> = async (data) => {
    await login(data.username, data.password);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(doLogin)();
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
        <StyledIconButton onClick={toggleTheme}>
          {settings.theme === "light" ? (
            <Brightness7 color="primary" />
          ) : (
            <Brightness4 color="primary" />
          )}
        </StyledIconButton>
        <LocalSelector />
      </StyledLocalSelectorWrapper>
      <StyledLogo />
      <StyledPaper>
        <form>
          <StyledStack>
            <InputText
              control={control}
              name="username"
              placeholder="Введите E-mail"
              label="E-mail"
              errors={errors}
            />
            <InputText
              control={control}
              name="password"
              placeholder="Введите пароль"
              label="Пароль"
              type="password"
              autoComplete="current-password"
              errors={errors}
            />
            <StyledLoadingButton
              onClick={handleSubmit(doLogin)}
              loading={isLoading}
              variant="contained"
            >
              Войти
            </StyledLoadingButton>
          </StyledStack>
        </form>
        <StyledBottomStack>
          <StyledButton variant="text" onClick={roureReset}>
            Восстановить пароль
          </StyledButton>
          <StyledButton variant="text" onClick={routeRegister}>
            Регистрация
          </StyledButton>
        </StyledBottomStack>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default Login;
