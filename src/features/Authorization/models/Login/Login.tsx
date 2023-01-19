import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import RHF from "../../../../shared/ui/InputRHF";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import LocalSelector from "../../../../shared/ui/LocaleSelector/LocalSelector";
import { Button, FormControl, FormHelperText, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ILoginForm {
  password: string;
  username: string;
}

const Login = () => {
  const { t } = useTranslation();
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

  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const doLogin: SubmitHandler<ILoginForm> = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data.username, data.password);
      switch (response.status) {
        case 200:
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          enqueueSnackbar(t("login.unknownError"));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.data.status) {
          case 401:
            setIsLoading(false);
            enqueueSnackbar(t("login.unauthorized"));
            break;
          default:
            setIsLoading(false);
            enqueueSnackbar(t("login.unknownError"));
        }
      }
    }
  };

  return (
    <Stack
      sx={{ padding: { xs: "16px 30px 10px", md: "32px 60px 20px" } }}
      spacing={2}
    >
      <FormControl fullWidth>
        <RHF.InputTextField
          control={control}
          name="username"
          placeholder={t("enter.email")}
          label="E-mail"
        />
        {errors?.username && (
          <FormHelperText error>{errors?.username.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <RHF.InputTextField
          control={control}
          name="password"
          placeholder={t("enter.password")}
          label={t("password")!}
        />
        {errors?.password && (
          <FormHelperText error>{errors?.password.message}</FormHelperText>
        )}
      </FormControl>
      <LocalSelector />
      <Button
        onClick={handleSubmit(doLogin)}
        variant="contained"
        disabled={isLoading && true}
      >
        {isLoading && <CircularProgress size={20} />}
        {t("login")}
      </Button>
    </Stack>
  );
};

export default Login;
