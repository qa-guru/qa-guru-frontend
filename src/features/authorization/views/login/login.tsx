import React, { useEffect } from "react";
import { Box, FormControl, FormHelperText } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ILogin, ILoginForm } from "./login.types";
import {
  StyledButton,
  StyledLoadingButton,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "./login.styled";
import RHF from "../../../../shared/components/input-RHF";
import LocalSelector from "../../../../shared/components/buttons/local-selector/local-selector";

const Login: React.FC<ILogin> = (props) => {
  const { isLoading, login } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const routeRegister = () => {
    navigate("/register");
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
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="username"
                placeholder={t("enter.email")!}
                label="E-mail"
              />
              {errors?.username && (
                <FormHelperText error>
                  {errors?.username.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <RHF.InputTextField
                control={control}
                name="password"
                placeholder={t("enter.password")!}
                label={t("password")!}
                type="password"
              />
              {errors?.password && (
                <FormHelperText error>
                  {errors?.password.message}
                </FormHelperText>
              )}
            </FormControl>
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
        <Box textAlign="center">
          <StyledButton variant="text">{t("restore")}</StyledButton>
        </Box>
        <Box textAlign="center">
          <StyledButton variant="text" onClick={routeRegister}>
            {t("reg.route")}
          </StyledButton>
        </Box>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default Login;
