import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LocalSelector from "shared/components/buttons/local-selector/local-selector";
import InputText from "shared/components/form/input-text";
import { ILogin, ILoginForm } from "./login.types";
import {
  StyledAlignBox,
  StyledButton,
  StyledLoadingButton,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "./login.styled";

const Login: FC<ILogin> = (props) => {
  const { isLoading, login } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routeRegister = () => {
    navigate("/register");
  };

  const roureReset = () => {
    navigate("/reset");
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
        username: yup.string().required(t("email.required")!),
        password: yup.string().required(t("password.required")!),
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
      <StyledLogo />
      <StyledPaper>
        <form>
          <StyledStack>
            <InputText
              control={control}
              name="username"
              placeholder={t("enter.email")!}
              label="E-mail"
              errors={errors}
            />
            <InputText
              control={control}
              name="password"
              placeholder={t("enter.password")!}
              label={t("password")!}
              type="password"
              errors={errors}
            />
            <LocalSelector />
            <StyledLoadingButton
              onClick={handleSubmit(doLogin)}
              loading={isLoading}
              variant="contained"
            >
              {t("login")}
            </StyledLoadingButton>
          </StyledStack>
        </form>
        <StyledAlignBox>
          <StyledButton variant="text" onClick={roureReset}>
            {t("restore")}
          </StyledButton>
        </StyledAlignBox>
        <StyledAlignBox>
          <StyledButton variant="text" onClick={routeRegister}>
            {t("reg.route")}
          </StyledButton>
        </StyledAlignBox>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default Login;
