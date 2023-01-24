import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Login from "./Login";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { ILoginForm } from "./Login.types";
import axios from "axios";

const LoginContainer: React.FC = () => {
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
    <Login
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      isLoading={isLoading}
      doLogin={doLogin}
      t={t}
    />
  );
};

export default LoginContainer;
